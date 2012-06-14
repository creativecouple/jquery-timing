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
	 * constants to be used as member for jQuery's data function,
	 * will shrink in minimization 
	 */
	var TIMEOUTS = '__timeouts', INTERVALS = '__intervals',
	
	/**
	 * constant for JavaScript constants,
	 * will shrink in minimization
	 */
	UNDEFINED = undefined, TRUE = true,
	
	/**
	 * jQuery default effects queue,
	 * will shrink in minimization
	 */
	JQUERY_DEFAULT_EFFECTS_QUEUE = 'fx',
	
	/**
	 * constant token for internal usage to perceive concatenated calls of #repeat, #wait, #until, #then, and #then,
	 * will shrink in minimization
	 */
	JQUERY_TIMING = {};
	
	function isFunction(object) {
		return typeof object == "function";
	}

	function isString(object) {
		return typeof object == "string";
	}

	/**
	 * Remove a specific element value from a numeric array. The value is compared with the === operator.
	 * 
	 * @param array a numeric array or undefined
	 * @param element some value that has to be removed from the array 
	 * @returns the array itself
	 */
	function removeArrayElement(array, element) {
		array = array || [];
		for (var i=0; i < array.length; i++) {
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
	 * Initialize a new timed invocation chain. First entry is the given method.
	 * 
	 * @author CreativeCouple
	 * @author Peter Liske
	 * 
	 * @param context
	 * @param firstMethodName
	 * @param firstMethodArguments
	 * @returns the placeholder to collect all concatenated function calls
	 */
	function createTIC(context, firstMethodName, firstMethodArguments) {
		var chainEnd = {
			_isChainEnd: TRUE,
			_trigger: {}
		},
		lastAddedEntry = {
			_next: chainEnd,
			_context: context,
			_methodName: firstMethodName,
			_methodArguments: firstMethodArguments
		},
		timedInvocationChain = {
			_activeExecutionPoint: lastAddedEntry,
			_ongoingLoops: [],
			_openEndLoopTimeout: window.setTimeout(function(){
				timedInvocationChain._openEndLoopTimeout = UNDEFINED;
				runTimedInvocationChain(timedInvocationChain, chainEnd);
			}, 0)
		},
		placeholder = {},
		key;
		for (key in context) {
			if (isFunction(context[key])) {
				(function(name){
					placeholder[name] = function(){
						lastAddedEntry = lastAddedEntry._next = {
								_next: chainEnd,
								_context: chainEnd._context,
								_methodName: name,
								_methodArguments: arguments 
						};
						if (timedInvocationChain._activeExecutionPoint._isChainEnd) {
							timedInvocationChain._activeExecutionPoint = lastAddedEntry;
							runTimedInvocationChain(timedInvocationChain);
						}
						return placeholder;
					};
				})(key);
			}
		}
		runTimedInvocationChain(timedInvocationChain);
		return placeholder;
	}
	
	/**
	 * Invoke all the methods currently in the timed invocation chain.
	 * @author CreativeCouple
	 * @author Peter Liske
	 * 
	 * @param timedInvocationChain
	 * @param triggeredState optional state to be triggered
	 */
	function runTimedInvocationChain(timedInvocationChain, triggeredState) {
		if (triggeredState) {
			// inform trigger to fire
			if (triggeredState._trigger) {
				triggeredState._trigger._isTriggered = TRUE;
				if (timedInvocationChain._activeExecutionPoint != triggeredState) {
					return;
				}
			} else {
				return triggeredState._trigger = { _isTriggered: TRUE };
			}
		}
		for (var executionState, context, method, trigger; executionState = timedInvocationChain._activeExecutionPoint;) {
			if (executionState._isChainEnd) {
				if (timedInvocationChain._ongoingLoops[0] && !timedInvocationChain._openEndLoopTimeout) {
					// start open repeat loop over again at the end of the chain
					timedInvocationChain._activeExecutionPoint = timedInvocationChain._ongoingLoops[0];
					timedInvocationChain._activeExecutionPoint._count++;
					continue;
				}
				break;
			}
			trigger = executionState._trigger;
			if (trigger) {
				if (trigger._isTriggered && !trigger._isInterrupted) {
					gotoNextStep(timedInvocationChain);
				} else {
					break;
				}
			}
			context = executionState._context;
			method = context[executionState._methodName];
			
			if (method == wait) {
				(trigger && trigger._isTriggered ? removeWaitTrigger : setupWaitTrigger)(timedInvocationChain,executionState);
			} else if (method == join) {
				(trigger && trigger._isTriggered ? removeJoinTrigger : setupJoinTrigger)(timedInvocationChain,executionState);
			} else if (method == then) {
				executionState._callback = executionState._methodArguments[0];
				gotoNextStep(timedInvocationChain);
			} else if (method == repeat) {
				(trigger && trigger._isTriggered ? resetRepeatTrigger : setupRepeatTrigger)(timedInvocationChain,executionState);
			} else if (method == until && timedInvocationChain._ongoingLoops[0]) {
				if (evaluateUntilCondition(timedInvocationChain,executionState)) {					
					gotoNextStep(timedInvocationChain);
					removeRepeatTrigger(timedInvocationChain);
				} else {
					timedInvocationChain._activeExecutionPoint = timedInvocationChain._ongoingLoops[0];
					timedInvocationChain._activeExecutionPoint._count++;
					continue;
				}
			} else {
				context = method.apply(context, executionState._methodArguments);
				gotoNextStep(timedInvocationChain);
			}			
			timedInvocationChain._activeExecutionPoint._context = context;
		}
	}
	
	/**
	 * Go on one step in the timed invocation chain.
	 * Optionally call callback method.
	 * 
	 * @param timedInvocationChain
	 * @param executionState - ignored from arguments, just here without "var" to save bytes in the minimized version
	 */
	function gotoNextStep(timedInvocationChain, executionState) {
		executionState = timedInvocationChain._activeExecutionPoint;		
		if (isFunction(executionState._callback)) {
			callbackWithLoopCounts(timedInvocationChain, executionState._context, executionState._callback);
		}
		timedInvocationChain._activeExecutionPoint = executionState._next;
	}
	
	/**
	 * Run a callback method and hand current iteration numbers as arguments.
	 * 
	 * @param timedInvocationChain
	 * @param context the context to apply on
	 * @param callback the method to use
	 * @param loopCounts - ignored from arguments, just here without "var" to save bytes in the minimized version
	 */
	function callbackWithLoopCounts(timedInvocationChain, context, callback, loopCounts) {
		loopCounts = [];
		$.each(timedInvocationChain._ongoingLoops, function(){
			loopCounts.push(this._count);
		});
		return callback.apply(context, loopCounts);
	}
	
	/**
	 * Define timeout or binding to wait for.
	 * 
	 * @param timedInvocationChain
	 * @param executionState
	 * @param trigger - ignored from arguments, just here without "var" to save bytes in the minimized version
	 */
	function setupWaitTrigger(timedInvocationChain, executionState, trigger) {
		function triggerAction(){
			runTimedInvocationChain(timedInvocationChain, executionState);
		}
		
		if (isFunction(executionState._methodArguments[0])) {
			executionState._callback = executionState._methodArguments[0];
		} else {
			trigger = executionState._methodArguments[0];
			executionState._callback = executionState._methodArguments[1];
		}
		
		executionState._trigger = isString(trigger) ? {
			_type: '_event_',
			_action: triggerAction,
			_context: executionState._context.bind(trigger, triggerAction),
			_value: trigger
		} : {
			_type: '_timeout_',
			_action: triggerAction,
			_value: window.setTimeout(triggerAction, Math.max(0,trigger))
		};
		executionState._context.each(function(index,element){
			$(element).data(TIMEOUTS, addArrayElement($(element).data(TIMEOUTS), executionState._trigger));
		});
	}

	/**
	 * Clear timeout or remove binding for a waiting trigger.
	 * 
	 * @param trigger
	 */
	function stopWaitTrigger(trigger) {
		if (trigger._type == '_event_') {
			trigger._context.unbind(trigger._value, trigger._action);
		}
		if (trigger._type == '_timeout_') {
			window.clearTimeout(trigger._value);
		}
		trigger._isInterrupted = TRUE;
	}
	
	function removeWaitTrigger(timedInvocationChain, executionState) {
		stopWaitTrigger(executionState._trigger);
		executionState._context.each(function(index,element){
			$(element).data(TIMEOUTS, removeArrayElement($(element).data(TIMEOUTS), executionState._trigger));
		});
		executionState._trigger = UNDEFINED;
	}

	function setupJoinTrigger(timedInvocationChain, executionState, queueName, waitingElements) {
		if (isFunction(executionState._methodArguments[0])) {
			executionState._callback = executionState._methodArguments[0];
		} else {
			queueName = executionState._methodArguments[0];
			executionState._callback = executionState._methodArguments[1];
		}
		// wait for each element to reach the current end of its queue
		waitingElements = Array.prototype.slice.call(executionState._context);
		if (waitingElements.length) {			
			executionState._context.queue(queueName == UNDEFINED ? JQUERY_DEFAULT_EFFECTS_QUEUE : queueName, function(next){
				if (waitingElements.length) {
					removeArrayElement(waitingElements, this);
					if (!waitingElements.length) {
						runTimedInvocationChain(timedInvocationChain, executionState);
					}
				}
				next();
			});
		} else {
			runTimedInvocationChain(timedInvocationChain, executionState);
		}
		executionState._trigger = executionState._trigger || { };
	}

	function removeJoinTrigger(timedInvocationChain, executionState) {
		executionState._trigger = UNDEFINED;
	}
	
	function setupRepeatTrigger(timedInvocationChain, executionState, trigger, firstRunNow) {
		function triggerAction(){
			runTimedInvocationChain(timedInvocationChain, executionState);
		}
		
		// determine parameters
		if (isFunction(executionState._methodArguments[0])) {
			executionState._callback = executionState._methodArguments[0];
		} else if (isFunction(executionState._methodArguments[1])) {
			trigger = executionState._methodArguments[0];
			executionState._callback = executionState._methodArguments[1];
		} else {
			trigger = executionState._methodArguments[0];
			firstRunNow = executionState._methodArguments[1];
			executionState._callback = executionState._methodArguments[2];
		}
		
		executionState._trigger = trigger == UNDEFINED ? {
			_isTriggered: TRUE
		} : isString(trigger) ? {
			_type: '_event_',
			_action: triggerAction,
			_context: executionState._context.bind(trigger, triggerAction),
			_value: trigger,
			_isTriggered: firstRunNow
		} : {
			_type: '_interval_',
			_action: triggerAction,
			_value: window.setInterval(triggerAction, Math.max(0,trigger)),
			_isTriggered: firstRunNow
		};
		executionState._context.each(function(index,element){
			$(element).data(INTERVALS, addArrayElement($(element).data(INTERVALS), executionState._trigger));
		});
		executionState._count = 0;
		timedInvocationChain._ongoingLoops.unshift(executionState);
	}
	
	function resetRepeatTrigger(timedInvocationChain, executionState) {
		executionState._trigger._isTriggered = !executionState._trigger._type;
	}

	function stopRepeatTrigger(trigger) {
		if (trigger._type == '_event_') {
			trigger._context.unbind(trigger._value, trigger._action);
		}
		if (trigger._type == '_interval_') {
			window.clearInterval(trigger._value);
		}
		trigger._isInterrupted = TRUE;
	}
	
	function removeRepeatTrigger(timedInvocationChain, executionState) {
		executionState = timedInvocationChain._ongoingLoops.shift();
		stopRepeatTrigger(executionState._trigger);
		executionState._context.each(function(index,element){
			$(element).data(INTERVALS, removeArrayElement($(element).data(INTERVALS), executionState._trigger));
		});
		executionState._trigger = UNDEFINED;
	}
	
	function evaluateUntilCondition(timedInvocationChain, executionState, condition) {
		condition = executionState._methodArguments[0];
		if (condition == UNDEFINED) {
			condition = !executionState._context.size();
		}
		if (isFunction(condition)) {
			condition = callbackWithLoopCounts(timedInvocationChain, executionState._context, condition);
		}
		if (typeof condition == "object") {
			condition = condition.toString();
		}
		return typeof condition == "number" ? timedInvocationChain._ongoingLoops[0]._count >= condition-1 : condition;
	}



	/**
	 * start new timed invocation chain and apply wait method 
	 */
	function wait() {
		return createTIC(this,'wait',arguments);
	}
	
	function unwait() {
		return this.each(function(triggers){
			triggers = $(this).data(TIMEOUTS);
			while (triggers && triggers.length){
				stopWaitTrigger(triggers.pop());
			}
		});
	}

	function repeat() {
		return createTIC(this,'repeat',arguments);
	}
	
	/**
	 * start new timed invocation chain and apply unrepeat method 
	 */
	function unrepeat() {
		return this.each(function(triggers){
			triggers = $(this).data(INTERVALS);
			while (triggers && triggers.length){
				stopRepeatTrigger(triggers.pop());
			}
		});
	}
	
	/**
	 * start new timed invocation chain and apply until method 
	 */
	function until() {
		throw '.until() method must be used after .repeat() only';
	}
	
	/**
	 * start new timed invocation chain and apply then method 
	 */
	function then(callback) {
		callback.apply(this);
		return this;
	}
	
	/**
	 * start new timed invocation chain and apply join method 
	 */
	function join() {
		return createTIC(this,'join',arguments);
	}
	
	/**
	 * Start a new thread to apply all the timing methods on.
	 * This will be used in the static variants.
	 *   
	 * @param threadName the optional name of the timing thread 
	 * @param method the method to be called
	 * @param args the original function arguments
	 */
	function useThread(threadName, method, args){
		if (isString(threadName)) {
			Array.prototype.shift.apply(args);
		} else {
			threadName = '';
		}
		return method.apply(JQUERY_TIMING[threadName] = (JQUERY_TIMING[threadName] || $('<div>').text(threadName)), args);
	}
	
	/**
	 * $$ defines deferred variables that can be used in timed invocation chains 
	 * 
	 * @author CreativeCouple
	 * @author Peter Liske
	 */
	function $$(compute, Var, calculation){
		if (isString(compute)) {
			calculation = new Function('x','return ['+compute+'\n,x]');
			compute = function(x, result){
				result = calculation(x);
				callbackVariable.x = result[1];
				return result[0];
			};
		}
		var hasRelatedVariable = isFunction(Var),
		hasComputation = isFunction(compute),
		
		callbackVariable = function(value) {
			if (arguments.length == 1) {
				callbackVariable.x = value;
				if (hasRelatedVariable) {
					Var(value);
				}
			} else {
				return callbackVariable.$();
			}
		};
		
		callbackVariable.x = 0;
		callbackVariable.$ = callbackVariable.toString = function(value){
			value = hasRelatedVariable ? Var() : callbackVariable.x;
			return hasComputation ? compute(value) : value;				
		};
		callbackVariable.$.toString = callbackVariable.$;
		callbackVariable._ = {
				toString: callbackVariable.$
		};
		
		callbackVariable.mod = function(val){
			return $$(function(x){
				return x % val;
			}, callbackVariable);
		};
		callbackVariable.plus = function(val){
			return $$(function(x){
				return x + val;
			}, callbackVariable);
		};
		callbackVariable.neg = function(){
			return $$(function(x){
				return -x;
			}, callbackVariable);
		};
		callbackVariable.$$ = function(compute){
			return $$(compute, callbackVariable);
		};
		$.each('abcdefghij', function(index, character){
			callbackVariable[index] = callbackVariable[character] = function(){
				callbackVariable(arguments[index]);
			};
		});
		
		return callbackVariable;
	};
	
	window.$$ = $$;
	
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
		join: join,
		$: $
	});
	$.extend({
		wait: function(threadName) {
			return useThread(threadName, wait, arguments);
		},
		unwait: function(threadName) {
			return useThread(threadName, unwait, arguments);
		},
		repeat: function(threadName) {
			return useThread(threadName, repeat, arguments);
		},
		unrepeat: function(threadName) {
			return useThread(threadName, unrepeat, arguments);
		},
		then: function(threadName) {
			return useThread(threadName, then, arguments);
		},
		join: function(threadName) {
			return useThread(threadName, join, arguments);
		},
		$$: $$
	});


})(jQuery, window);
