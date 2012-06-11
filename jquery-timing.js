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
	 * constant for testing undefined,
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
	JQUERY_TIMING = {},
	
	setTimeout = window.setTimeout,
	
	clearTimeout = window.clearTimeout,
	
	setInterval = window.setInterval,
	
	clearInterval = window.clearInterval;
	
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
		tic = {
			_activeExecutionPoint: lastAddedEntry,
			_ongoingLoops: [],
			_openEndLoopTimeout: setTimeout(function(){
				tic._openEndLoopTimeout = UNDEFINED;
				runTIC(tic, chainEnd);
			}, 0)
		},
		placeholder = {};
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
						if (tic._activeExecutionPoint._isChainEnd) {
							tic._activeExecutionPoint = lastAddedEntry;
							runTIC(tic);
						}
						return placeholder;
					};
				})(key);
			}
		}
		runTIC(tic);
		return placeholder;
	}
	
	/**
	 * 
	 * @param tic
	 * @returns
	 */
	function runTIC(tic, triggeredState) {
		if (triggeredState) {
			// inform trigger to fire
			triggeredState._trigger._isTriggered = TRUE;
			if (tic._activeExecutionPoint != triggeredState) {
				return;
			}
		}
		for (var executionState, context, method, trigger; executionState = tic._activeExecutionPoint;) {
			if (executionState._isChainEnd) {
				if (tic._ongoingLoops[0] && !tic._openEndLoopTimeout) {
					// start open repeat loop over again at the end of the chain
					tic._activeExecutionPoint = tic._ongoingLoops[0];
					tic._activeExecutionPoint._count++;
					continue;
				}
				break;
			}
			trigger = executionState._trigger;
			if (trigger) {
				if (trigger._isTriggered && !trigger._isInterrupted) {
					gotoNextStep(tic);
				} else {
					break;
				}
			}
			context = executionState._context;
			method = context[executionState._methodName];
			
			if (method == wait) {
				(trigger && trigger._isTriggered ? removeWaitTrigger : setupWaitTrigger)(tic,executionState);
			} else if (method == join) {
				(trigger && trigger._isTriggered ? removeJoinTrigger : setupJoinTrigger)(tic,executionState);
			} else if (method == then) {
				executionState._callback = executionState._methodArguments[0];
				gotoNextStep(tic);
			} else if (method == repeat) {
				(trigger && trigger._isTriggered ? resetRepeatTrigger : setupRepeatTrigger)(tic,executionState);
			} else if (method == until && tic._ongoingLoops[0]) {
				if (evaluateUntilCondition(tic,executionState)) {					
					gotoNextStep(tic);
					removeRepeatTrigger(tic);
				} else {
					tic._activeExecutionPoint = tic._ongoingLoops[0];
					tic._activeExecutionPoint._count++;
					continue;
				}
			} else {
				context = method.apply(context, executionState._methodArguments);
				gotoNextStep(tic);
			}			
			tic._activeExecutionPoint._context = context;
		}
	}
	
	function gotoNextStep(tic, executionState) {
		executionState = tic._activeExecutionPoint;		
		if (isFunction(executionState._callback)) {
			callbackWithLoopCounts(tic, executionState._context, executionState._callback);
		}
		tic._activeExecutionPoint = executionState._next;
	}
	
	function callbackWithLoopCounts(tic, context, callback, loopCounts) {
		loopCounts = [];
		$.each(tic._ongoingLoops, function(){
			loopCounts.push(this._count);
		});
		return callback.apply(context, loopCounts);
	}
	
	function setupWaitTrigger(tic, executionState, trigger) {
		function triggerAction(){
			runTIC(tic, executionState);
		}
		
		if (isFunction(executionState._methodArguments[0])) {
			executionState._callback = executionState._methodArguments[0];
		} else {
			trigger = executionState._methodArguments[0];
			executionState._callback = executionState._methodArguments[1];
		}
		
		executionState._trigger = isString(trigger) ? {
			_type: 'event',
			_action: triggerAction,
			_context: executionState._context.bind(trigger, triggerAction),
			_value: trigger
		} : {
			_type: 'timer',
			_action: triggerAction,
			_value: setTimeout(triggerAction, Math.max(0,trigger))
		};
		executionState._context.each(function(index,element){
			$(element).data(TIMEOUTS, addArrayElement($(element).data(TIMEOUTS), executionState._trigger));
		});
	}

	function stopWaitTrigger(trigger) {
		if (trigger._type == 'event') {
			trigger._context.unbind(trigger._value, trigger._action);
		} else  {
			clearTimeout(trigger._value);
		}
		trigger._isInterrupted = TRUE;
	}
	
	function removeWaitTrigger(tic, executionState) {
		stopWaitTrigger(executionState._trigger);
		executionState._context.each(function(index,element){
			$(element).data(TIMEOUTS, removeArrayElement($(element).data(TIMEOUTS), executionState._trigger));
		});
		executionState._trigger = UNDEFINED;
	}

	function setupJoinTrigger(tic, executionState, queueName) {
		if (isFunction(executionState._methodArguments[0])) {
			executionState._callback = executionState._methodArguments[0];
		} else {
			queueName = executionState._methodArguments[0];
			executionState._callback = executionState._methodArguments[1];
		}
		executionState._trigger = {};
		executionState._context.queue(queueName == UNDEFINED ? JQUERY_DEFAULT_EFFECTS_QUEUE : queueName, function(next){
			runTIC(tic, executionState);
			next();
		});
	}

	function removeJoinTrigger(tic, executionState) {
		executionState._trigger = UNDEFINED;
	}
	
	function setupRepeatTrigger(tic, executionState, trigger, firstRunNow) {
		function triggerAction(){
			runTIC(tic, executionState);
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
			_type: 'event',
			_action: triggerAction,
			_context: executionState._context.bind(trigger, triggerAction),
			_value: trigger,
			_isTriggered: firstRunNow
		} : {
			_type: 'timer',
			_action: triggerAction,
			_value: setInterval(triggerAction, Math.max(0,trigger)),
			_isTriggered: firstRunNow
		};
		executionState._context.each(function(index,element){
			$(element).data(INTERVALS, addArrayElement($(element).data(INTERVALS), executionState._trigger));
		});
		executionState._count = 0;
		tic._ongoingLoops.unshift(executionState);
	}
	
	function resetRepeatTrigger(tic, executionState) {
		executionState._trigger._isTriggered = !executionState._trigger._type;
	}

	function stopRepeatTrigger(trigger) {
		if (trigger._type == 'event') {
			trigger._context.unbind(trigger._value, trigger._action);
		}
		if (trigger._type == 'timer') {
			clearInterval(trigger._value);
		}
		trigger._isInterrupted = TRUE;
	}
	
	function removeRepeatTrigger(tic, executionState) {
		executionState = tic._ongoingLoops.shift();
		stopRepeatTrigger(executionState._trigger);
		executionState._context.each(function(index,element){
			$(element).data(INTERVALS, removeArrayElement($(element).data(INTERVALS), executionState._trigger));
		});
		executionState._trigger = UNDEFINED;
	}
	
	function evaluateUntilCondition(tic, executionState, condition) {
		condition = executionState._methodArguments[0];
		if (condition == UNDEFINED) {
			condition = !executionState._context.size();
		}
		if (isFunction(condition)) {
			condition = callbackWithLoopCounts(tic, executionState._context, condition);
		}
		if (typeof condition == "object") {
			condition = condition.toString();
		}
		return typeof condition == "number" ? tic._ongoingLoops[0]._count >= condition-1 : condition;
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
		}
	});

	/**
	 * $$ defines deferred variables that can be used in timed invocation chains 
	 * 
	 * @author CreativeCouple
	 * @author Peter Liske
	 */
	function $$(compute, $n){
		if (isString(compute)) {
			compute = new Function('x','return '+compute);
		}
		var hasRelatedVariable = isFunction($n),
		hasComputation = isFunction(compute),
		
		deferredVariable = function(x){
			if (arguments.length) {
				deferredVariable.value = x;
				if (hasRelatedVariable) {
					$n(x);
				}
			}
			return deferredVariable.toString();
		};
		deferredVariable.toString = function(){
			var x = hasRelatedVariable ? $n() : deferredVariable.value;
			return hasComputation ? compute(x) : x;
		};
		deferredVariable.$ = {
			toString: deferredVariable.toString
		};
		deferredVariable.mod = function(val){
			return $$(function(x){
				return x % val;
			}, deferredVariable);
		};
		deferredVariable.plus = function(val){
			return $$(function(x){
				return x + val;
			}, deferredVariable);
		};
		deferredVariable.neg = function(){
			return $$(function(x){
				return -x;
			}, deferredVariable);
		};
		
		return deferredVariable;
	};
	
	window.$$ = $$;

})(jQuery, window);
