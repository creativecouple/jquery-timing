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

(function(jQuery, window){
	/**
	 * object to store statically invoked threads
	 */
	var THREAD_GROUPS = {},
	
	/**
	 * unique timing identifier for different purposes
	 */
	tuid = 1,

	/**
	 * remember original core function $.each()
	 */
	originalEach = jQuery.fn.each,

	/**
	 * remember original core function $.on() (or $.bind())
	 */
	originalOn = jQuery.fn.on || jQuery.fn.bind,
	
	/**
	 * remember original core function $.off() (or $.unbind())
	 */
	originalOff = jQuery.fn.off || jQuery.fn.unbind,
	
	/**
	 * remember original core function $.animate()
	 */
	originalAnimate = jQuery.fn.animate,

	loopEndMethods = {};
	
	function sameOrNextJQuery(before, after) {
		after = jQuery(after);
		after.prevObject = before;
		if (before.length !== after.length) {
			return after;
		}
		for (var i=0; i < before.length; i++) {
			if (before[i] !== after[i]) {
				return after;
			}
		}
		return before;
	}
	
	function loopCounts(loops) {
		var ret = [];
		for (var i=0; i<loops.length; i++) {
			ret[i] = loops[i]._count;
		}
		return ret;
	}
	
	/**
	 * Initialize a new timed invocation chain.
	 * 
	 * @author CreativeCouple
	 * @author Peter Liske
	 * 
	 * @param context initial context
	 * @param methodStack linked list of methods that has been or will be filled by someone else 
	 * @param ongoingLoops optional arguments for callback parameters
	 * @param onStepCallback function to call on each step
	 * @returns the timed invocation chain method
	 */
	function createTimedInvocationChain(context, methodStack, ongoingLoops, onStepCallback) {
		ongoingLoops = ongoingLoops || [];
		var executionState = {
				_context: context,
				_method: methodStack
		},
		preventRecursion = false,
		method;
		
		function hookupToMockup(state, mockup){
			state._canContinue = false;
			mockup.then(function(){
				state._next = sameOrNextJQuery(state._context, state._next);
				state._canContinue = true;
				timedInvocationChain();
			});
		}
		
		/**
		 * Invoke all the methods currently in the timed invocation chain.
		 * 
		 * @author CreativeCouple
		 * @author Peter Liske
		 */
		function timedInvocationChain(deferredReturnValue) {
			while (!preventRecursion) try {
				// keep recursive calls away
				preventRecursion = !preventRecursion;
				// save current context state
				if (onStepCallback) {
					onStepCallback(jQuery.makeArray(executionState._context));
				}
				// leave the chain when waiting for a trigger
				if (executionState._canContinue == false) {
					return deferredReturnValue;
				}
				// check end of chain
				if (!executionState._method._name) {
					if (!ongoingLoops.length) {
						/*
						 * We've reached the end of our TIC
						 * and there is nothing left to wait for.
						 * So we can safely return the original jQuery object
						 * hence enabling instant invocation.
						 */
						return executionState._context; 
					}
					/*
					 * Now we have ongoing loops but reached the chain's end.
					 */
					var otherExecutionState = ongoingLoops[0]._openEndAction && ongoingLoops[0]._openEndAction(timedInvocationChain, executionState, ongoingLoops) || executionState;
					if (otherExecutionState == executionState) {
						// if innermost loop can't help us, just leave the chain
						return deferredReturnValue;
					}
					executionState = otherExecutionState;
					continue;
				}
				// check if user tries to use a non-existing function call
				method = executionState._context[executionState._method._name] || loopEndMethods[executionState._method._name];
				if (!method) {					
					throw 'no such method "'+executionState._method._name+'" on object ('+executionState._context+')';
				}
				// check whether we came here triggered or not
				if (method.timing && !executionState._canContinue) {
					// prevent automatic re-trigger in case of loops
					executionState._canContinue = false;
					// handle timing method
					executionState = method.timing(timedInvocationChain, executionState, ongoingLoops, onStepCallback) || executionState;
				} else {
					if (!method.timing && !executionState._canContinue) {
						// prevent automatic re-trigger in case of loops
						executionState._next = executionState._context[executionState._method._name].apply(executionState._context, executionState._method._arguments);
						if (executionState._next instanceof MockupPlaceholder) {
							hookupToMockup(executionState, executionState._next);
							continue;
						}
					}
					// go to next step
					otherExecutionState = {
							_context: executionState._next,
							_method: executionState._method._next
					};
					// prevent automatic re-trigger in case of loops
					executionState._canContinue = false;
					executionState._next = null;
					// invoke callback method with given arguments
					if (typeof executionState._callback == "function") {
						executionState._callback.apply(executionState._context, loopCounts(ongoingLoops));
					}
					executionState = otherExecutionState;
				}
			} catch(e) {
				/*
				 * We had a runtime exception.
				 * In plain JavaScript live the chain would break now.
				 * So we do, too.
				 */
				preventRecursion = !preventRecursion;
				throw e;
			} finally {
				preventRecursion = !preventRecursion;
			}
		};
		return timedInvocationChain;
	}
	
	/**
	 * Create a placeholder object to collect chained method calls.
	 * 
	 * @author CreativeCouple
	 * @author Peter Liske
	 *
	 * @param context initial context
	 * @param methodStack a linked list that this placeholder will fill with call parameters 
	 * @return the placeholder object
	 */
	function MockupPlaceholder(context, methodStack, onStepCallback) {
		this['.methods'] = methodStack;
		this['.callback'] = onStepCallback;
		this._ = context._ = context;
		this.length = 0;
		Array.prototype.push.apply(this, jQuery.makeArray(context));
		
		for (var key in context) {
			if (!MockupPlaceholder.prototype[key] && typeof context[key] == "function") (function(name){
				this[key] = MockupPlaceholder.prototype[key] = function(){
					this['.methods']._name = name;
					this['.methods']._arguments = arguments;
					this['.methods'] = this['.methods']._next = {};
					return this['.callback'] ? this['.callback'](this, name, arguments) : this;
				};
			})(key);
		}
	}
	
	/**
	 * Create replacement methods for .bind(), .on(), .one(), .live(), and .delegate()
	 * that support chaining instead of giving a callback function.
	 */
	jQuery.each(['bind','on','one','live','delegate'], function(index, name){
		if (jQuery.fn[name]) {
			var original = jQuery.fn[name];
			jQuery.fn[name] = function(){
				var i, methodStack = {};
				for(i=0; i<arguments.length; i++) {
					if (typeof arguments[i] == "function" || (arguments[i] && typeof arguments[i] == "object") || arguments[i] === false) {
						if (arguments[i] !== jQuery) {
							// fix for jQuery 1.6 .one() + .unbind()
							if (typeof arguments[i] == "function" && jQuery.guid) {
								arguments[i].guid = arguments[i].guid || jQuery.guid++;
							}
							return original.apply(this, arguments);
						}
						break;
					}
				}
				Array.prototype.splice.call(arguments, i, 1, function(event){
					return (createTimedInvocationChain(jQuery(this), methodStack, [{ _count: event }]))();
				});
				return new MockupPlaceholder(original.apply(this, arguments), methodStack);
			};
		}
	});
	
	/**
	 * Create replacement method for .animate()
	 * that support chaining if $ is given as callback function.
	 */
	jQuery.fn.animate = function(){
		if (arguments[arguments.length-1] === jQuery) {
			var event = '_timing'+tuid++;
			arguments[arguments.length-1] = function(){
				jQuery(this).trigger(event);
			};
			return this.each().one(event).all(originalAnimate.apply(this, arguments));
		}
		return originalAnimate.apply(this, arguments);
	};
		
	/**
	 * Define new methods .wait(), .repeat(), .join(), .then()
	 * which will always start a new TIC if invoked outside of a TIC.  
	 */
	jQuery.each(['wait','repeat','join','then'], function(index, name){
		jQuery.fn[name] = function(){
			var methodStack = {},
			placeholder = new MockupPlaceholder(this, methodStack, createTimedInvocationChain(this, methodStack, [], function(elements){
					placeholder.length = 0;
					Array.prototype.push.apply(placeholder, elements);
				}));
			return placeholder[name].apply(placeholder, arguments);
		};
	});
	
	/**
	 * Define to wait for joining all animation queues.
	 * 
	 * @param timedInvocationChain
	 * @param executionState
	 */
	jQuery.fn.join.timing = function(timedInvocationChain, executionState) {
		var queueName,
		waitingElements = executionState._context.length;
		
		if (typeof executionState._method._arguments[0] == "function") {
			executionState._callback = executionState._method._arguments[0];
		} else {
			queueName = executionState._method._arguments[0];
			executionState._callback = executionState._method._arguments[1];
		}
		
		// wait for each element to reach the current end of its queue
		executionState._context.queue(queueName == null ? 'fx' : queueName, function(next){
			executionState._canContinue = !--waitingElements;
			executionState._next = executionState._context;
			timedInvocationChain();
			next();
		});
	};

	/**
	 * Define to simply run callback method for .then()
	 * 
	 * @param timedInvocationChain
	 * @param executionState
	 */
	jQuery.fn.then.timing = function(timedInvocationChain, executionState){
		executionState._callback = executionState._method._arguments[0];
		executionState._next = executionState._context;
		executionState._canContinue = true;
	};
	
	/**
	 * Define timeout or binding to wait for.
	 * 
	 * @param timedInvocationChain
	 * @param executionState
	 */
	jQuery.fn.wait.timing = function(timedInvocationChain, executionState) {
		var trigger, triggerAction, unwaitAction;
		
		if (typeof executionState._method._arguments[0] == "function") {
			executionState._callback = executionState._method._arguments[0];
		} else {
			trigger = executionState._method._arguments[0];
			executionState._callback = executionState._method._arguments[1];
		}
		
		if (typeof trigger == "string") {

			triggerAction = function(){
				originalOff.call(originalOff.call(executionState._context, trigger, triggerAction), '__unwait__', unwaitAction);
				executionState._next = jQuery(this); 
				executionState._canContinue = true;
				timedInvocationChain();
			};
			unwaitAction = function(){
				originalOff.call(originalOff.call(jQuery(this), trigger, triggerAction), '__unwait__', unwaitAction);
				executionState._context = executionState._context.not(this);
				executionState._canContinue = executionState._context.length && executionState._canContinue;
			};
			originalOn.call(executionState._context, trigger, triggerAction);

		} else {

			triggerAction = window.setTimeout(function(){
				originalOff.call(executionState._context, '__unwait__', unwaitAction);
				executionState._next = executionState._context;
				executionState._canContinue = true; 
				timedInvocationChain();
			}, Math.max(0,trigger));
			unwaitAction = function(){
				originalOff.call(jQuery(this), '__unwait__', unwaitAction);
				executionState._context = executionState._context.not(this);
				executionState._canContinue = executionState._context.length && executionState._canContinue;
				if (!executionState._context.length)
					window.clearTimeout(triggerAction);
			};

		}
		originalOn.call(executionState._context, '__unwait__', unwaitAction);
	};

	/**
	 * Define to simply run callback method for .then()
	 * 
	 * @param timedInvocationChain
	 * @param executionState
	 */
	jQuery.fn.each = function(callback){
		if (!callback || callback === jQuery) {
			var methodStack = {},
			placeholder = new MockupPlaceholder(this, methodStack, createTimedInvocationChain(this, methodStack, [], function(elements){
					placeholder.length = 0;
					Array.prototype.push.apply(placeholder, elements);
				}));
			return placeholder.each();
		}
		return originalEach.apply(this, arguments);
	};
	
	/**
	 * Define interval or binding to repeat.
	 * 
	 * @param timedInvocationChain
	 * @param executionState
	 */
	jQuery.fn.each.timing = function(timedInvocationChain, executionState, ongoingLoops, onStepCallback) {
		if (executionState._method._arguments[0] && executionState._method._arguments[0] !== jQuery) {
			executionState._canContinue = true;
			executionState._next = originalEach.apply(executionState._context, executionState._methods._arguments);
			return;
		}
		
		var size = executionState._context.length,
		waiting = size,
		key, methodToGoOn,
		innerTICs = [],
		innerElements = [],
		proxyPlaceholder = {};

		function spreadAction(){
			for (var i=0; i<size; i++) {
				(innerTICs[i])();
			}
			return proxyPlaceholder;
		}
		
		for (key in MockupPlaceholder.prototype) {
			proxyPlaceholder[key] = spreadAction;
		}
		proxyPlaceholder.length = size;
		executionState._context.each(function(index){
			var innerLoops = ongoingLoops.slice();
			innerElements[index] = [proxyPlaceholder[index] = this];
			innerLoops.unshift({
				_count: index,
				_allAction: function(state){
					if (!--waiting) {
						methodToGoOn = state._method._next;
						timedInvocationChain();
					}
				},
				_fixOpenLoop: loopEndMethods.all				
			});
			innerTICs[index] = createTimedInvocationChain(jQuery(this), executionState._method._next, innerLoops, function(elements){
				innerElements[index] = elements;
				proxyPlaceholder.length = 0;
				for (var i=0; i<size; i++) {
					Array.prototype.push.apply(proxyPlaceholder, innerElements[i]);
				}
				if (onStepCallback)
					onStepCallback(jQuery.makeArray(proxyPlaceholder));
			});
		});

		executionState._next = proxyPlaceholder;
		executionState._canContinue = true;
		executionState._openEndAction = function(){
			if (!waiting) {
				ongoingLoops.shift();
				return {
					_context: sameOrNextJQuery(executionState._context, proxyPlaceholder),
					_method: methodToGoOn
				}
			}
		};
		executionState._count = size;
		
		ongoingLoops.unshift(executionState);
	};

	loopEndMethods.all = function(executionState){
		jQuery.extend(executionState._method, {
			_next: jQuery.extend({}, executionState._method),
			_name: 'all',
			_arguments: []
		});
		executionState._canContinue = null;
	};
	loopEndMethods.all.timing = function(timedInvocationChain, executionState, ongoingLoops) {
		if (!ongoingLoops.length || !ongoingLoops[0]._fixOpenLoop) {
			throw '.all() method must be used after .each() only';
		}
		if (!ongoingLoops[0]._allAction) {
			ongoingLoops[0]._fixOpenLoop(executionState);
			return;
		}
		
		ongoingLoops[0]._allAction(executionState);
	};
	
	/**
	 * Define interval or binding to repeat.
	 * 
	 * @param timedInvocationChain
	 * @param executionState
	 */
	jQuery.fn.repeat.timing = function(timedInvocationChain, executionState, ongoingLoops) {
		var trigger,
		firstRunNow,
		unrepeatAction,
		openLoopWaiting;

		if (typeof executionState._method._arguments[0] == "function") {
			executionState._callback = executionState._method._arguments[0];
		} else if (typeof executionState._method._arguments[1] == "function") {
			trigger = executionState._method._arguments[0];
			executionState._callback = executionState._method._arguments[1];
		} else {
			trigger = executionState._method._arguments[0];
			firstRunNow = executionState._method._arguments[1];
			executionState._callback = executionState._method._arguments[2];
		}
		
		function triggerAction() {
			executionState._next = (this === window) ? executionState._context : (executionState._next ? executionState._next.add(this) : jQuery(this));
			executionState._canContinue = true;
			timedInvocationChain();
		}
		
		if (trigger == null) {
			
			unrepeatAction = function(){
				originalOff.call(jQuery(this), '__unrepeat__', unrepeatAction);
				executionState._context = executionState._context.not(this);
				executionState._next = executionState._context;
				executionState._canContinue = executionState._context.length && executionState._canContinue;
				trigger = executionState._context.length && trigger;
			};
			firstRunNow = true;
			openLoopWaiting = window.setTimeout(function(){
				openLoopWaiting = false;
				timedInvocationChain();
			},0);
			executionState._openEndAction = function(){
				if (!openLoopWaiting) {
					executionState._count++;
					executionState._next = executionState._context;
					executionState._canContinue = trigger == null && executionState._context.length;
					return executionState;
				}
			};
			
		} else if (typeof trigger == "string") {

			unrepeatAction = function(){
				originalOff.call(jQuery(this), '__unrepeat__', unrepeatAction);
				executionState._context = executionState._context.not(this);
				executionState._next = executionState._next && executionState._next.not(this);
				executionState._canContinue = executionState._context.length && executionState._canContinue;
				originalOff.call(jQuery(this), trigger, triggerAction);
			};
			originalOn.call(executionState._context, trigger, triggerAction);
			executionState._openEndAction = function(){
				if (executionState._canContinue) {
					executionState._count++;
					return executionState;
				}
			};

		} else {

			unrepeatAction = function(){
				originalOff.call(jQuery(this), '__unrepeat__', unrepeatAction);
				executionState._context = executionState._context.not(this);
				executionState._next = executionState._context;
				executionState._canContinue = executionState._context.length && executionState._canContinue;
				if (!executionState._context.length)
					window.clearInterval(trigger);
			};
			trigger = window.setInterval(triggerAction, Math.max(0, trigger));
			executionState._openEndAction = function(){
				if (executionState._canContinue) {
					executionState._count++;
					return executionState;
				}
			};

		}
		
		originalOn.call(executionState._context, '__unrepeat__', unrepeatAction);
		executionState._count = 0;
		executionState._untilAction = function(end){
			if (end) {
				unrepeatAction.apply(executionState._context);
			} else if (trigger == null) {
				triggerAction();
			}
		};
		executionState._fixOpenLoop = loopEndMethods.until;

		if (firstRunNow) {
			triggerAction();
		}
		
		ongoingLoops.unshift(executionState);
	};

	/**
	 * Defined to evaluate condition when calling .until()
	 */
	loopEndMethods.until = function(executionState){
		jQuery.extend(executionState._method, {
			_next: jQuery.extend({}, executionState._method),
			_name: 'until',
			_arguments: [false]
		});
		executionState._canContinue = null;
	};
	loopEndMethods.until.timing = function(timedInvocationChain, executionState, ongoingLoops) {
		if (!ongoingLoops.length || !ongoingLoops[0]._fixOpenLoop) {
			throw '.until() method must be used after .repeat() only';
		}
		if (!ongoingLoops[0]._untilAction) {
			ongoingLoops[0]._fixOpenLoop(executionState);
			return;
		}

		var condition = !!executionState && executionState._method._arguments[0];
		if (condition == null) {
			condition = !executionState._context.size();
		}
		if (typeof condition == "function") {
			condition = condition.apply(executionState._context, loopCounts(ongoingLoops));
		}
		if (typeof condition == "object") {
			condition = condition.toString();
		}
		if (typeof condition == "number") {
			condition = ongoingLoops[0]._count >= condition-1;
		}
		if (condition) {
			executionState._canContinue = true;
			executionState._next = executionState._context;
			ongoingLoops.shift()._untilAction(condition);
		} else {
			executionState = ongoingLoops[0];
			executionState._count++;
			executionState._untilAction();
			return executionState;
		}
	};
	
	// support .until() and .all()
	new MockupPlaceholder(loopEndMethods);
	
	/**
	 * Define unwait and unrepeat methods.
	 */
	jQuery.each(['unwait','unrepeat'], function(index, name){
		jQuery.fn[name] = function(){
			return this.trigger('__'+name+'__');
		};
	});
	
	/**
	 * define all static timing methods:
	 *  $.wait, $.repeat ,$.join, $.then, $.unwait, $.unrepeat
	 */
	jQuery.each(['wait','repeat','join','then','unwait','unrepeat'], function(index, name){
		jQuery[name] = function(){
			var group = typeof arguments[0] == "string" ? Array.prototype.shift.apply(arguments) : '';
			return jQuery.fn[name].apply(THREAD_GROUPS[group] = (THREAD_GROUPS[group] || jQuery('<div>').text(group)), arguments);
		};
	});

	/**
	 * $$ defines deferred variables that can be used in timed invocation chains 
	 * 
	 * @author CreativeCouple
	 * @author Peter Liske
	 */
	function $$(compute, Var, calculation){
		if (typeof compute == "string") {
			calculation = new Function('x','return ['+compute+'\n,x]');
			compute = function(x, result){
				result = calculation(x);
				callbackVariable.x = result[1];
				return result[0];
			};
		}
		var hasRelatedVariable = typeof Var == "function",
		hasComputation = typeof compute == "function",
		
		callbackVariable = function(value) {
			if (arguments.length == 1) {
				callbackVariable.x = value;
				if (hasRelatedVariable) {
					Var(value);
				}
			} else {
				return evaluate();
			}
		};
		function evaluate(value){
			value = hasRelatedVariable ? Var() : callbackVariable.x;
			return hasComputation ? compute(value) : value;				
		}
		
		callbackVariable.x = 0;
		callbackVariable._ = { toString: callbackVariable.$ = callbackVariable.toString = evaluate.toString = evaluate };
		callbackVariable.mod = function(val){
			return $$(function(x){
				return x % val;
			}, callbackVariable);
		};
		callbackVariable.add = function(val){
			return $$(function(x){
				return x + val;
			}, callbackVariable);
		};
		callbackVariable.neg = function(){
			return $$('-x', callbackVariable);
		};
		callbackVariable.$$ = function(compute){
			return $$(compute, callbackVariable);
		};
		jQuery.each('abcdefghij', function(index, character){
			callbackVariable[index] = callbackVariable[character] = function(){
				callbackVariable(arguments[index]);
			};
		});
		
		return callbackVariable;
	};
	
	jQuery.$$ = window.$$ = jQuery.X = $$;
	
	/**
	 * Define chained version of $().
	 * This allows to use .end() to come back to previous jQuery selection.
	 */
	jQuery.fn.$ = function(){
		var ret = jQuery.apply(window, arguments);
		ret.prevObject = this;
		return ret;
	};
	
})(jQuery, window);
