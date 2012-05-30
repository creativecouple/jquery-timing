/**
 * timing.jquery.js
 * 
 * JavaScript functions for waiting / repeating / stopping jQuery actions.
 * 
 * This code is published under the MIT License (MIT).
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * For examples, reference, and other information see
 * http://creativecouple.github.com/jquery-timing/
 * 
 * @author CreativeCouple
 * @author Peter Liske
 * @copyright (c) 2011 by CreativeCouple
 * @see http://creativecouple.github.com/jquery-timing/
 */

(function($, window){
	
	/**
	 * constants to be used as member for jQuery's data function 
	 */
	var TIMEOUTS = '__timeouts', INTERVALS = '__intervals',
	
	/**
	 * constants for typeof operator
	 */
	OBJECT = "object", FUNCTION = "function", NUMBER = "number", STRING = "string", UNDEFINED = "undefined",
	
	/**
	 * jQuery default effects queue
	 */
	JQUERY_DEFAULT_EFFECTS_QUEUE = 'fx',
	
	/**
	 * constant token for internal usage to perceive concatenated calls of #repeat, #wait, #until, #then, and #then
	 */
	JQUERY_TIMING = {};
	
	/**
	 * Remove a specific element value from a numeric array. The value is compared with the === operator.
	 * 
	 * @param array a numeric array or undefined
	 * @param element some value that has to be removed from the array 
	 * @returns the array itself
	 */
	function removeArrayElement(array, element) {
		array = array || [];
		for (var i=0; i<array.length; i++) {
			if (array[i] === element) {
				if (i < array.length-1) {
					array[i] = array.pop();
					i--;
				} else {
					array.pop();
				}
			}
		}
		return array;
	}
	
	/**
	 * Add a given element value to a numeric array. 
	 *  
	 * @param array a numeric array or undefined
	 * @param element some value to be added at the array's end
	 * @returns the array itself 
	 */
	function addArrayElement(array, element) {
		array = array || [];
		array.push(element);
		return array;
	}
	
	/**
	 * Generate a placeholder object that has fake methods to fill a call stack on each following method invocation.
	 * This is the core functionality which ensures that the method chain is working although invoked later.
	 * 
	 * @author CreativeCouple
	 * @author Peter Liske
	 * @param context the method context to be faked
	 */
	function createPlaceholderCallStack(context) {
		// placeholder will be a substitute for the context
		var _placeholder = {},
		
		// callStack is a linked list of method invocations
		callStack = {
				_token: JQUERY_TIMING,
				_placeholder: _placeholder
		},
		
		// each context's member is checked
		member;
		
		for (member in context) {
			if (typeof context[member] === FUNCTION) {
				(function(functionName){
					_placeholder[functionName] = function(){
						callStack = callStack._next = {
								_name: functionName,
								_args: arguments,
								_token: JQUERY_TIMING
						};
						return _placeholder;
					};
				})(member);
			}
		}
		return callStack;
	}
	
	/**
	 * Invoke the methods in a call stack - up to #until method.
	 * At #until methods it is checked whether to go on or break the invocation chain.
	 * 
	 * @author CreativeCouple
	 * @author Peter Liske
	 * @param callStack the call stack to iterate
	 * @param context the method context to be faked
	 * @param _repeat internally used data object for concatenated calls of #repeat, #wait, #until, #then, and #then
	 */
	function invokeCallStack(callStack, context, _repeat) {
		// first run optional callback method
		runMethodWithRepeatCounts(context, callStack._callback, _repeat);
		// now invoke method chain up to first #until
		for (var invocation = callStack._next, object = context, repetition = _repeat; invocation; invocation = invocation._next) {
			// first run optional callback method
			runMethodWithRepeatCounts(object, invocation._callback, repetition);
			var method = object[invocation._name];
			// check if we reached one of our own methods
			if (method === until) {
				// forward repetition data and invocation stack to #until method
				var repetition_end = until.call(object, invocation._args[0], repetition);
				if (repetition_end) {
					// the loop has come to an end :-)
					if (typeof repetition._timer === OBJECT) {
						// we have an interruption object instead of an interval timer
						repetition._timer._interrupted = true;
					} else {
						window.clearInterval(repetition._timer);
					}
					// clean interval arrays
					repetition._context.each(function(){
						removeArrayElement($(this).data(INTERVALS), repetition._timer);
					});
					repetition = repetition_end;
				} else {
					// the #until method said that it want to do more iterations, so we break our method chain here
					if (typeof repetition._timer === OBJECT) {
						// if repeat loop runs without interval timer we start it over by faking the method chain's end
						invocation = {};
					} else {
						break;
					}
				}
			} else if (method === repeat) {
				// forward repetition data and invocation stack to #repeat method
				repeat.call(object, invocation._args[0], invocation._args[1], invocation._args[2], repetition, invocation);
				break;
			} else if (method === wait) {
				// forward repetition data and invocation stack to #wait method
				wait.call(object, invocation._args[0], invocation._args[1], repetition, invocation);
				break;
			} else if (method === join) {
				// forward repetition data and invocation stack to #join method
				join.call(object, invocation._args[0], invocation._args[1], repetition, invocation);
				break;
			} else if (method === then) {
				// forward repetition data and invocation stack to #then method
				object = then.call(object, invocation._args[0], repetition);
			} else {
				object = method.apply(object, invocation._args);
			}
			if (!invocation._next) {
				// if we come here then the method chain ends without setting a new timer
				for (; repetition && (repetition._token === JQUERY_TIMING) && (typeof repetition._timer === OBJECT); repetition = repetition._prev) {
					// if repeat loop without interval timer is not interrupted then we have to start it over again right here
					if (!repetition._timer._interrupted) {
						object = repetition._context;
						invocation = repetition._invocation;
						repetition._count++;
						// run optional callback method
						runMethodWithRepeatCounts(object, invocation._callback, repetition);
						break;
					}
				}
			}
		}
	}
	
	/**
	 * Delay all chained method calls to later invocation.
	 * The timeout can be cancelled by calling #unwait on the same object. 
	 * 
	 * @author CreativeCouple
	 * @author Peter Liske
	 * @param timeout the timeout in milliseconds to wait before invoking the delayed method chain
	 * @param callback optional method to be invoked right after the pause
	 * @param _repeat internally used data object for concatenated calls of #repeat, #wait, #until, #then, and #then
	 * @param _callStack internally used data object for concatenated calls of #repeat, #wait, #until, #then, and #then
	 */
	function wait(timeout, callback, _repeat, _callStack){
		// fix parameters
		if (typeof timeout === FUNCTION) {
			callback = timeout;
			timeout = 0;
		}
		// store context
		var original = this,
		
		// create new call stack if necessary 
		callStack = (_callStack && _callStack._token === JQUERY_TIMING) ? _callStack : createPlaceholderCallStack(original),
		
		timer;
		
		// register callback function
		callStack._callback = callback;
		// define timer
		timer = window.setTimeout(function(){
			// now invoke the stuff
			invokeCallStack(callStack, original, _repeat);
			// clean timer arrays
			original.each(function(){
				removeArrayElement($(this).data(TIMEOUTS), timer);
			});
		}, Math.max(0, timeout || 0));
		
		// update timer array
		original.each(function(){
			$(this).data(TIMEOUTS, addArrayElement($(this).data(TIMEOUTS), timer));
		});
		
		return callStack._placeholder;
	}
	
	/**
	 * Break all waiting timers from any invocation of #wait on this jQuery object. 
	 * 
	 * @author CreativeCouple
	 * @author Peter Liske
	 */
	function unwait(){
		this.each(function(){
			$.each($(this).data(TIMEOUTS) || [], function(){
				window.clearTimeout(this);
			});			
		});
		return this.data(TIMEOUTS, []);
	}
	
	/**
	 * Repeat all chained method calls on a given interval.
	 * The loop can be stopped by using the #until method within the method chain or at some time calling #unrepeat on the same object.
	 * 
	 * @author CreativeCouple
	 * @author Peter Liske
	 * @param timeout the timeout in milliseconds between each invocation of the method chain.
	 *   If skipped then the loop is run immediately.
	 * @param firstCallNow a boolean whether to run the first invocation now or only after the given timeout, defaults to <code>false</code>
	 * @param callback optional method to be invoked with each iteration
	 * @param _repeat internally used data object for concatenated calls of #repeat, #wait, #until, #then, and #then
	 * @param _callStack internally used data object for concatenated calls of #repeat, #wait, #until, #then, and #then
	 */
	function repeat(timeout, firstCallNow, callback, _repeat, _callStack){
		// fix parameters
		if (typeof timeout === FUNCTION) {
			callback = timeout;
			timeout = 0;
		}
		if (typeof firstCallNow === FUNCTION) {
			callback = firstCallNow;
			firstCallNow = false;
		}
		// store context
		var original = this,
		
		// create new call stack if necessary 
		callStack = (_callStack && _callStack._token === JQUERY_TIMING) ? _callStack : createPlaceholderCallStack(original);
				
		// define internal repetition information
		_repeat = {
				_count: 0,
				_context: original,
				_prev: (_repeat && (_repeat._token === JQUERY_TIMING)) ? _repeat : {},
				_token: JQUERY_TIMING,
				_invocation: callStack
		};

		// the action method
		function action(){
			// increase repetition counter
			_repeat._count++;
			// now invoke the stuff
			invokeCallStack(callStack, original, _repeat);
		}
		
		// register callback function
		callStack._callback = callback;
		
		if (firstCallNow || !timeout) {
			window.setTimeout(action, 0);
		}
		
		_repeat._timer = timeout ?
			// define timer as interval
			window.setInterval(action, Math.max(0, timeout)) :
			// or define timer as interruption object
			{ _interrupted: false };
		
		
		// update interval array
		original.each(function(){
			$(this).data(INTERVALS, addArrayElement($(this).data(INTERVALS), _repeat._timer));
		});

		return callStack._placeholder;
	}
	
	/**
	 * Interrupt all waiting interval timers from any invocation of #repeat on this jQuery object. 
	 * 
	 * @author CreativeCouple
	 * @author Peter Liske
	 */
	function unrepeat() {
		this.each(function(){
			$.each($(this).data(INTERVALS) || [], function(){
				if (typeof this === OBJECT) {
					this._interrupted = true;
				} else {
					window.clearInterval(this);
				}
			});			
		});
		return this.data(INTERVALS, []);
	}
	
	/**
	 * Calls a method within a specified context and gives the repeat counts as arguments.
	 * 
	 * @param context the context to apply the method on
	 * @param method the function to be used
	 * @param _repeat internally used data object for concatenated calls of #repeat, #wait, #until, #then, and #then
	 */
	function runMethodWithRepeatCounts(context, method, _repeat) {
		if (typeof method === FUNCTION) {
			var args = [], repetition;
			for (repetition = _repeat; repetition && (repetition._token === JQUERY_TIMING); repetition = repetition._prev) {
				args.push(repetition._count);
			}
			return method.apply(context, args);
		}
	}
	
	/**
	 * Define when to stop a repeat-loop.
	 * 
	 * @author CreativeCouple
	 * @author Peter Liske
	 * @param condition optional parameter to define the stop condition
	 * <ul>
	 *  <li>If not given then the loop stops as soon as the jQuery selection is empty.</li>
	 *  <li>If given as boolean the loop stops in case of <code>true</code> and goes on and on in case of <code>false</code>.</li>
	 *  <li>If given as numeric integer the loop stops in case at that number of iteration have passed.
	 *      Values lower than <code>1</code> are treated as <code>1</code>.</li>
	 *  <li>If given as callback function it is called with the number of passed iterations as only argument.
	 *      The <code>this</code> context is the current jQuery selection.
	 *      The return value is treated as boolean or number as defined above.</li>
	 * </ul>
	 * @param _repeat internally used data object to perceive concatenated calls of #repeat, #wait, #until, #then, and #then
	 */
	function until(condition, _repeat){
		if (!_repeat || _repeat._token !== JQUERY_TIMING) {
			throw new Error(".until() method cannot be called without previous use of .repeat()");
		}
		if (typeof condition === UNDEFINED) {
			condition = this.length <= 0;
		}
		if (typeof condition === FUNCTION) {
			condition = runMethodWithRepeatCounts(this, condition, _repeat);
		}
		if (typeof condition === NUMBER) {
			condition = _repeat._count >= condition;
		}
		return condition ? _repeat._prev : false;
	}
	
	/**
	 * Invoke a callback function when this method is called.
	 * 
	 * @author CreativeCouple
	 * @author Peter Liske
	 * @param callback function which is called in the context of the jQuery selection object. 
	 * The only argument when invoking is the current number of repeat operations - if any. 
	 * @param _repeat internally used data object to perceive concatenated calls of #repeat, #wait, #until, #then, and #then
	 */
	function then(callback, _repeat) {
		runMethodWithRepeatCounts(this, callback, _repeat);
		return this;
	}
	
	/**
	 * Wait for a jQuery queue to finalize. 
	 * This waiting can be cancelled by calling .stop() on the jQuery object. 
	 * 
	 * @author CreativeCouple
	 * @author Peter Liske
	 * @param queueName optional queue name to wait for
	 * @param callback optional method to be invoked right after the queue finalized
	 * @param _repeat internally used data object for concatenated calls of #repeat, #wait, #until, #then, and #then
	 * @param _callStack internally used data object for concatenated calls of #repeat, #wait, #until, #then, and #then
	 */
	function join(queueName, callback, _repeat, _callStack){
		// fix parameters
		if (typeof queueName === FUNCTION) {
			callback = queueName;
			// use the default jQuery queue if none given
			queueName = JQUERY_DEFAULT_EFFECTS_QUEUE;
		}
		// store context
		var original = this,
		
		// create new call stack if necessary 
		callStack = (_callStack && _callStack._token === JQUERY_TIMING) ? _callStack : createPlaceholderCallStack(original);
		
		// register callback function
		callStack._callback = callback;

		window.setTimeout(function(){
			// wait for jQuery queue to finalize
			original.queue(queueName, function(){
				// now invoke the stuff
				invokeCallStack(callStack, original, _repeat);
			});
		}, 0);
		
		return callStack._placeholder;
	}
	

	/**
	 * Start a new queue to apply all the timing methods on.
	 * This will be used in the static variants.
	 *   
	 * @param threadName the optional name of the timing thread 
	 * @param method the method to be called
	 * @param args the original function arguments
	 */
	function startQueue(threadName, method, args){
		if (typeof threadName === STRING) {
			Array.prototype.shift.apply(args);
		} else {
			threadName = '';
		}
		JQUERY_TIMING[threadName] = JQUERY_TIMING[threadName] || $('<div>');
		return method.apply(JQUERY_TIMING[threadName], args);
	}
	
	/*
	 * now put the whole stuff into jQuery and let the games begin...
	 */
	$.fn.extend({
		wait: wait,
		unwait: unwait,
		repeat: repeat,
		unrepeat: unrepeat,
		until: until,
		then: then,
		join: join
	});
	$.extend({
		wait: function(threadName) {
			return startQueue(threadName, wait, arguments);
		},
		unwait: function(threadName) {
			return startQueue(threadName, unwait, arguments);
		},
		repeat: function(threadName) {
			return startQueue(threadName, repeat, arguments);
		},
		unrepeat: function(threadName) {
			return startQueue(threadName, unrepeat, arguments);
		},
		then: function(threadName) {
			return startQueue(threadName, then, arguments);
		}
	});
})(jQuery, window);
