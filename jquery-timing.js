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
	var TIMING_THREADS = {};
	
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
			_isChainEnd: true,
			_context: context
		},
		lastAddedEntry = {},
		placeholder = {},
		timedInvocationChain = {
			_activeExecutionPoint: chainEnd,
			_ongoingLoops: [],
			_openEndLoopTimeout: window.setTimeout(function(){
				timedInvocationChain._openEndLoopTimeout = undefined;
				if (timedInvocationChain._activeExecutionPoint._isChainEnd)
					runTimedInvocationChain(timedInvocationChain);
			}, 0),
			_placeholder: placeholder
		},
		key;
		for (key in context) {
			if (typeof context[key] == "function") {
				(function(name){
					placeholder[name] = function(){
						lastAddedEntry = lastAddedEntry._next = {
								_next: chainEnd,
								_context: chainEnd._context,
								_methodName: name,
								_methodArguments: arguments 
						};
						return timedInvocationChain._activeExecutionPoint._isChainEnd
							&& (timedInvocationChain._activeExecutionPoint = lastAddedEntry)
							&& runTimedInvocationChain(timedInvocationChain)
							|| placeholder;
					};
				})(key);
			}
		}
		placeholder._ = context._ = context;
		return placeholder[firstMethodName].apply(context, firstMethodArguments);
	}
	
	/**
	 * Invoke all the methods currently in the timed invocation chain.
	 * @author CreativeCouple
	 * @author Peter Liske
	 * 
	 * @param timedInvocationChain
	 * @param triggeredState optional state to be triggered
	 * @param sourceElement optional element as source of trigger
	 */
	function runTimedInvocationChain(timedInvocationChain, triggeredState) {
		if (triggeredState) {
			/*
			 * Reject triggering if none available.
			 * This can happen during .join() when the FXQ is empty.
			 * If this is also the current execution point, then we go on.
			 * Else we have to wait.
			 */
			if (!triggeredState._waitingForTrigger || timedInvocationChain._activeExecutionPoint != triggeredState) {
				return;
			}
		}
		for (var executionState, context, method, triggered; executionState = timedInvocationChain._activeExecutionPoint;) {
			// use triggered context in case of triggered execution
			triggered = executionState._waitingForTrigger && executionState._triggeredContext;
			context = triggered || executionState._context;
			/*
			 * Super-fast copying of current elements into our placeholder object.
			 * This enables re-using our placeholder via jQuery(...)
			 */
			timedInvocationChain._placeholder.length = 0;
			Array.prototype.push.apply(timedInvocationChain._placeholder, context.get());
			
			if (executionState._isChainEnd) {
				if (!timedInvocationChain._ongoingLoops[0]) {
					/*
					 * We've reached the end of our TIC
					 * and there is nothing left to wait.
					 * So we can safely return the original jQuery object.
					 */
					return context; 
				}
				/*
				 * Now we have ongoing loops but reached the chain's end.
				 * If we already waited a bit then we start over right there.
				 */
				if (!timedInvocationChain._openEndLoopTimeout) {
					// start open repeat loop over again at the end of the chain
					resetRepeatTrigger(timedInvocationChain, timedInvocationChain._activeExecutionPoint = timedInvocationChain._ongoingLoops[0]);
					continue;
				}
				return;
			}
			if (executionState._waitingForTrigger) {
				if (triggered) {
					gotoNextStep(timedInvocationChain);
				} else {
					return;
				}
			}
			
			method = context[executionState._methodName];
			if (method == wait) {
				if (!triggered) setupWaitTrigger(timedInvocationChain, executionState);
			} else if (method == join) {
				if (!triggered) setupJoinTrigger(timedInvocationChain, executionState);
			} else if (method == repeat) {
				if (!triggered) setupRepeatTrigger(timedInvocationChain, executionState);
			} else if (method == until && timedInvocationChain._ongoingLoops[0]) {
				if (evaluateUntilCondition(timedInvocationChain, executionState)) {					
					gotoNextStep(timedInvocationChain);
					removeRepeatTrigger(timedInvocationChain);
				} else {
					resetRepeatTrigger(timedInvocationChain, timedInvocationChain._activeExecutionPoint = timedInvocationChain._ongoingLoops[0]);
					continue;
				}
			} else if (method == then) {
				executionState._callback = executionState._methodArguments[0];
				gotoNextStep(timedInvocationChain);
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
	 */
	function gotoNextStep(timedInvocationChain) {
		timedInvocationChain._activeExecutionPoint._waitingForTrigger = timedInvocationChain._activeExecutionPoint._triggeredContext = undefined;
		if (typeof timedInvocationChain._activeExecutionPoint._callback == "function") {
			callbackWithLoopCounts(timedInvocationChain, timedInvocationChain._activeExecutionPoint._context, timedInvocationChain._activeExecutionPoint._callback);
		}
		timedInvocationChain._activeExecutionPoint = timedInvocationChain._activeExecutionPoint._next;
	}
	
	/**
	 * Run a callback method and hand current iteration numbers as arguments.
	 * 
	 * @param timedInvocationChain
	 * @param context the context to apply on
	 * @param callback the method to use
	 */
	function callbackWithLoopCounts(timedInvocationChain, context, callback) {
		return callback.apply(context, jQuery(timedInvocationChain._ongoingLoops).map(function(){
				return this._count;
			}).get());
	}
	
	/**
	 * Define timeout or binding to wait for.
	 * 
	 * @param timedInvocationChain
	 * @param executionState
	 * @param trigger - ignored from arguments, just here without "var" to save bytes in the minimized version
	 */
	function setupWaitTrigger(timedInvocationChain, executionState, trigger) {
		if (typeof executionState._methodArguments[0] == "function") {
			executionState._callback = executionState._methodArguments[0];
		} else {
			trigger = executionState._methodArguments[0];
			executionState._callback = executionState._methodArguments[1];
		}
		
		var triggerAction, unwaitAction, timeout;
		
		if (typeof trigger == "string") {

			triggerAction = function(){
				jQuery(this).unbind('__unwait__', unwaitAction).unbind(trigger, triggerAction);
				executionState._triggeredContext = executionState._triggeredContext && executionState._triggeredContext.add(this) || jQuery(this); 
				runTimedInvocationChain(timedInvocationChain, executionState);				
			};
			unwaitAction = function(){
				jQuery(this).unbind('__unwait__', unwaitAction).unbind(trigger, triggerAction);
				executionState._triggeredContext = executionState._triggeredContext && executionState._triggeredContext.not(this);
			};
			executionState._context.bind(trigger, triggerAction).bind('__unwait__', unwaitAction);

		} else {

			triggerAction = function(){
				executionState._context.unbind('__unwait__', unwaitAction);
				executionState._triggeredContext = executionState._context; 
				runTimedInvocationChain(timedInvocationChain, executionState);
			};
			unwaitAction = function(){
				jQuery(this).unbind('__unwait__', unwaitAction);
				executionState._context = executionState._context.not(this);
				if (!executionState._context.length)
					window.clearTimeout(timeout);
			};
			timeout = window.setTimeout(triggerAction, Math.max(0,trigger));
			executionState._context.bind('__unwait__', unwaitAction);

		}
		
		executionState._waitingForTrigger = true;
	}


	/**
	 * Define to wait for joining all animation queues.
	 * 
	 * @param timedInvocationChain
	 * @param executionState
	 * @param queueName optional queue name 
	 */
	function setupJoinTrigger(timedInvocationChain, executionState, queueName) {
		if (typeof executionState._methodArguments[0] == "function") {
			executionState._callback = executionState._methodArguments[0];
		} else {
			queueName = executionState._methodArguments[0];
			executionState._callback = executionState._methodArguments[1];
		}
		
		// wait for each element to reach the current end of its queue
		var waitingElements = jQuery(executionState._context);
		executionState._context.queue(queueName == undefined ? 'fx' : queueName, function(next){
			if (waitingElements.length && !(waitingElements = waitingElements.not(this)).length) {
				executionState._triggeredContext = executionState._context;
				runTimedInvocationChain(timedInvocationChain, executionState);
			}
			next();
		});
		executionState._waitingForTrigger = true;
	}


	function setupRepeatTrigger(timedInvocationChain, executionState, trigger, firstRunNow) {
		if (typeof executionState._methodArguments[0] == "function") {
			executionState._callback = executionState._methodArguments[0];
		} else if (typeof executionState._methodArguments[1] == "function") {
			trigger = executionState._methodArguments[0];
			executionState._callback = executionState._methodArguments[1];
		} else {
			trigger = executionState._methodArguments[0];
			firstRunNow = executionState._methodArguments[1];
			executionState._callback = executionState._methodArguments[2];
		}

		if (trigger == undefined) {
			
			executionState._unrepeatAction = function(){
				jQuery(this).unbind('__unrepeat__', executionState._unrepeatAction);
				executionState._context = executionState._context.not(this);
				if (!executionState._context.length)
					executionState._triggerAlways = undefined;
			};
			executionState._triggerAlways = firstRunNow = true;
			executionState._context.bind('__unrepeat__', executionState._unrepeatAction);
			
		} else if (typeof trigger == "string") {

			var triggerAction = function(){
				executionState._triggeredContext = executionState._triggeredContext && executionState._triggeredContext.add(this) || jQuery(this); 
				runTimedInvocationChain(timedInvocationChain, executionState);				
			};
			executionState._unrepeatAction = function(){
				jQuery(this).unbind('__unrepeat__', executionState._unrepeatAction).unbind(trigger, triggerAction);
				executionState._triggeredContext = executionState._triggeredContext && executionState._triggeredContext.not(this);
			};
			executionState._context.bind(trigger, triggerAction).bind('__unrepeat__', executionState._unrepeatAction);

		} else {

			executionState._unrepeatAction = function(){
				jQuery(this).unbind('__unrepeat__', executionState._unrepeatAction);
				executionState._context = executionState._context.not(this);
				if (!executionState._context.length)
					window.clearInterval(executionState._interval);
			};
			executionState._interval = window.setInterval(function(){				
					executionState._triggeredContext = executionState._context; 
					runTimedInvocationChain(timedInvocationChain, executionState);
				}, Math.max(0,trigger));
			executionState._context.bind('__unrepeat__', executionState._unrepeatAction);

		}
		if (firstRunNow) {
			executionState._triggeredContext = executionState._context;
		}
		executionState._count = 0;
		executionState._waitingForTrigger = true;
		timedInvocationChain._ongoingLoops.unshift(executionState);
	}
	
	function resetRepeatTrigger(timedInvocationChain, executionState) {
		executionState._count++;
		executionState._waitingForTrigger = true;
		if (executionState._triggerAlways)
			executionState._triggeredContext = executionState._context;
	}

	function removeRepeatTrigger(timedInvocationChain) {
		var executionState = timedInvocationChain._ongoingLoops.shift();
		executionState._context.unbind('__unrepeat__', executionState._unrepeatAction);
		if (executionState._interval)
			window.clearInterval(executionState._interval);
	}
	
	function evaluateUntilCondition(timedInvocationChain, executionState, condition) {
		condition = executionState._methodArguments[0];
		if (condition == undefined) {
			condition = !executionState._context.size();
		}
		if (typeof condition == "function") {
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
	
	/**
	 * stop waiting for underlying elements  
	 */
	function unwait() {
		return this.trigger('__unwait__');
	}

	/**
	 * start new timed invocation chain and apply repeat method 
	 */
	function repeat() {
		return createTIC(this,'repeat',arguments);
	}
	
	/**
	 * stop repeating for underlying elements  
	 */
	function unrepeat(contextToStop) {
		return this.trigger('__unrepeat__');
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
		if (typeof threadName == "string") {
			ARRAY.shift.apply(args);
		} else {
			threadName = '';
		}
		return method.apply(TIMING_THREADS[threadName] = (TIMING_THREADS[threadName] || jQuery('<div>').text(threadName)), args);
	}
	
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
				return callbackVariable.$();
			}
		};
		function evaluate(value){
			value = hasRelatedVariable ? Var() : callbackVariable.x;
			return hasComputation ? compute(value) : value;				
		}
		evaluate.toString = evaluate;
		jQuery.extend(callbackVariable,{
			x: 0,
			$: evaluate,
			toString: evaluate,
			_: {
				toString: callbackVariable.$
			},
			mod: function(val){
				return $$(function(x){
					return x % val;
				}, callbackVariable);
			},
			add: function(val){
				return $$(function(x){
					return x + val;
				}, callbackVariable);
			},
			neg: function(){
				return $$('-x', callbackVariable);
			},
			$$: function(compute){
				return $$(compute, callbackVariable);
			}
		});
		jQuery.each('abcdefghij', function(index, character){
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
	jQuery.fn.extend({
		wait: wait,
		unwait: unwait,
		repeat: repeat,
		unrepeat: unrepeat,
		until: until,
		then: then,
		join: join,
		$: jQuery
	});
	jQuery.extend({
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
