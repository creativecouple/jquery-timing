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

(function($){
	
	/**
	 * constants to be used as member for jQuery's data function 
	 */
	var TIMEOUTS = '__timeouts', INTERVALS = '__intervals',
	
	/**
	 * constant token for internal usage to perceive concatenated calls of #repeat, #wait, #now, and #until
	 */
	EASY_TIMING = {};
	
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
				_token: EASY_TIMING,
				_placeholder: _placeholder
		},
		
		// each context's member is checked
		member;
		
		for (member in context) {
			if (typeof context[member] === "function") {
				(function(functionName){
					_placeholder[functionName] = function(){
						callStack = callStack.next = {
								_name: functionName,
								_args: arguments,
								_token: EASY_TIMING
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
	 * @param _repeat internally used data object for concatenated calls of #repeat, #wait, #now, and #until
	 */
	function invokeCallStack(callStack, context, _repeat) {
		// now invoke method chain up to first #until
		for (var invocation = callStack.next, object = context, repetition = _repeat, method, repetition_end; invocation; invocation = invocation.next) {
			method = object[invocation._name];
			// check if we reached one of our own methods
			if (method === until) {
				// forward repetition data and invocation stack to #until method
				repetition_end = until.call(object, invocation._args[0], repetition);
				if (repetition_end) {
					// the loop has come to an end :-)
					window.clearInterval(repetition._timer);
					// clean interval arrays
					repetition._context.each(function(){
						removeArrayElement($(this).data(INTERVALS), repetition._timer);
					});
					repetition = repetition_end;
				} else {
					// the #until method said that it want to do more iterations, so we break our method chain here
					break;
				}
			} else if (method === repeat) {
				// forward repetition data and invocation stack to #repeat method
				repeat.call(object, invocation._args[0], invocation._args[1], repetition, invocation);
				break;
			} else if (method === wait) {
				// forward repetition data and invocation stack to #wait method
				wait.call(object, invocation._args[0], repetition, invocation);
				break;
			} else if (method === now) {
				// forward repetition data and invocation stack to #now method
				object = now.call(object, invocation._args[0], repetition);
			} else {
				object = method.apply(object, invocation._args);
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
	 * @param _repeat internally used data object for concatenated calls of #repeat, #wait, #now, and #until
	 * @param _callStack internally used data object for concatenated calls of #repeat, #wait, #now, and #until
	 */
	function wait(timeout, _repeat, _callStack){
		// store context
		var original = this,
		
		// create new call stack if necessary 
		callStack = (_callStack && _callStack._token === EASY_TIMING) ? _callStack : createPlaceholderCallStack(original),
		
		// define timer
		timer = window.setTimeout(function(){
			// now invoke the stuff
			invokeCallStack(callStack, original, _repeat);
			// clean timer arrays
			original.each(function(){
				removeArrayElement($(this).data(TIMEOUTS), timer);
			});
		}, Math.max(1, (typeof timeout === "function" ? Number(timeout.call(original)) : timeout) || 0));
		
		// update timer array
		this.each(function(){
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
	 * @param timeout the timeout in milliseconds between each invocation of the method chain
	 * @param firstCallNow a boolean whether to run the first invocation now or only after the given timeout, defaults to <code>false</code>
	 * @param _repeat internally used data object for concatenated calls of #repeat, #wait, #now, and #until
	 * @param _callStack internally used data object for concatenated calls of #repeat, #wait, #now, and #until
	 */
	function repeat(timeout, firstCallNow, _repeat, _callStack){
		// store context
		var original = this,
		
		// create new call stack if necessary 
		callStack = (_callStack && _callStack._token === EASY_TIMING) ? _callStack : createPlaceholderCallStack(original),
		
		// define timer
		timer = window.setInterval(function(){
			// increase repetition counter
			_repeat._count++;
			// now invoke the stuff
			invokeCallStack(callStack, original, _repeat);
		}, Math.max(1, (typeof timeout === "function" ? Number(timeout.call(original)) : timeout) || 0));
		
		// define internal repetition information
		_repeat = {
				_count: 0,
				_context: original,
				_timer: timer,
				_prev: (_repeat && _repeat._token === EASY_TIMING) ? _repeat : {},
				_token: EASY_TIMING
		};
		
		// update interval array
		this.each(function(){
			$(this).data(INTERVALS, addArrayElement($(this).data(INTERVALS), timer));
		});

		if (firstCallNow) {
			window.setTimeout(function(){
				// increase repetition counter
				_repeat._count++;
				// now invoke the stuff
				invokeCallStack(callStack, original, _repeat);
			}, 1);
		}
		
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
				window.clearInterval(this);
			});			
		});
		return this.data(INTERVALS, []);
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
	 * @param _repeat internally used data object to perceive concatenated calls of #repeat, #wait, #now, and #until
	 */
	function until(condition, _repeat){
		if (!_repeat || _repeat._token !== EASY_TIMING) {
			throw new Error(".until() method cannot be called without previous use of .repeat()");
		}
		if (typeof condition === "undefined") {
			condition = this.length <= 0;
		}
		if (typeof condition === "function") {
			condition = condition.call(this, _repeat._count);
		}
		if (typeof condition === "number") {
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
	 * @param _repeat internally used data object to perceive concatenated calls of #repeat, #wait, #now, and #until
	 */
	function now(callback, _repeat) {
		if (typeof callback === "function") {
			var args = [];
			for (; _repeat && (_repeat._token === EASY_TIMING); _repeat = _repeat._prev) {
				args.push(_repeat._count);
			}
			callback.apply(this, args);
		}
		return this;
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
		now: now
	});
})(jQuery);
