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
			_context: context
		},
		lastAddedEntry = {},
		placeholder = {},
		executionState = chainEnd,
		ongoingLoops = [],
		openEndLoopTimeout = window.setTimeout(function(){
			openEndLoopTimeout = undefined;
			if (executionState == chainEnd)
				timedInvocationChain();
		}, 0),
		method, triggered, nextStep,
		
		/**
		 * Invoke all the methods currently in the timed invocation chain.
		 * @author CreativeCouple
		 * @author Peter Liske
		 * 
		 * @param timedInvocationChain
		 * @param triggeredState optional state to be triggered
		 */
		timedInvocationChain = function() {
			while (true) {
				// use triggered context in case of triggered execution
				triggered = executionState._waitingForTrigger && executionState._triggeredContext;
				context = triggered || executionState._context;
				/*
				 * Super-fast copying of current elements into our placeholder object.
				 * This enables re-using our placeholder via jQuery(...)
				 */
				placeholder.length = 0;
				Array.prototype.push.apply(placeholder, context.get());
				
				if (executionState._waitingForTrigger) {
					if (!triggered) {
						return;
					}
					gotoNextStep();
				}
				
				if (executionState._methodName) {
					method = context[executionState._methodName];
					if (method._timingAction) {
						nextStep = !triggered && method._timingAction(timedInvocationChain, executionState, ongoingLoops);
						if (nextStep === true) {
							gotoNextStep();
						} else {
							executionState = nextStep || executionState; 
						}
					} else {
						context = method.apply(context, executionState._methodArguments);
						gotoNextStep();
					}
				} else {
					if (!ongoingLoops[0]) {
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
					if (openEndLoopTimeout) {
						return;
					}
					// start open repeat loop over again at the end of the chain
					executionState = until._timingAction(timedInvocationChain, false, ongoingLoops);
				}
			}
		}, 
		key;
		
		/**
		 * Go on one step in the timed invocation chain.
		 * Optionally call callback method.
		 * 
		 * @param timedInvocationChain
		 */
		function gotoNextStep() {
			executionState._waitingForTrigger = executionState._triggeredContext = undefined;
			if (typeof executionState._callback == "function") {
				callbackWithLoopCounts(ongoingLoops, executionState._context, executionState._callback);
			}
			executionState = executionState._next;
			executionState._context = context;
		}

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
						return executionState == chainEnd
							&& (executionState = lastAddedEntry)
							&& timedInvocationChain()
							|| placeholder;
					};
				})(key);
			}
		}
		placeholder._ = context._ = context;
		return placeholder[firstMethodName].apply(context, firstMethodArguments);
	}
	
	/**
	 * Run a callback method and hand current iteration numbers as arguments.
	 * 
	 * @param timedInvocationChain
	 * @param context the context to apply on
	 * @param callback the method to use
	 */
	function callbackWithLoopCounts(ongoingLoops, context, callback) {
		return callback.apply(context, jQuery(ongoingLoops).map(function(){
				return this._count;
			}).get());
	}
	
	/**
	 * start new timed invocation chain and apply wait method 
	 */
	function wait() {
		return createTIC(this,'wait',arguments);
	}
	
	/**
	 * Define timeout or binding to wait for.
	 * 
	 * @param timedInvocationChain
	 * @param executionState
	 */
	wait._timingAction = function(timedInvocationChain, executionState) {
		var trigger, triggerAction, unwaitAction, timeout;
		
		if (typeof executionState._methodArguments[0] == "function") {
			executionState._callback = executionState._methodArguments[0];
		} else {
			trigger = executionState._methodArguments[0];
			executionState._callback = executionState._methodArguments[1];
		}
		
		
		if (typeof trigger == "string") {

			triggerAction = function(){
				jQuery(this).unbind('__unwait__', unwaitAction).unbind(trigger, triggerAction);
				executionState._triggeredContext = executionState._triggeredContext && executionState._triggeredContext.add(this) || jQuery(this); 
				timedInvocationChain();				
			};
			unwaitAction = function(){
				jQuery(this).unbind('__unwait__', unwaitAction).unbind(trigger, triggerAction);
				executionState._triggeredContext = executionState._triggeredContext && executionState._triggeredContext.not(this);
			};
			executionState._context.bind(trigger, triggerAction).bind('__unwait__', unwaitAction);

		} else {

			unwaitAction = function(){
				jQuery(this).unbind('__unwait__', unwaitAction);
				executionState._context = executionState._context.not(this);
				if (!executionState._context.length)
					window.clearTimeout(timeout);
			};
			timeout = window.setTimeout(function(){
					executionState._context.unbind('__unwait__', unwaitAction);
					executionState._triggeredContext = executionState._context; 
					timedInvocationChain();
				}, Math.max(0,trigger));
			executionState._context.bind('__unwait__', unwaitAction);

		}
		
		executionState._waitingForTrigger = true;
	};

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
	 * Define interval or binding to repeat.
	 * 
	 * @param timedInvocationChain
	 * @param executionState
	 */
	repeat._timingAction = function(timedInvocationChain, executionState, ongoingLoops, firstRunNow) {
		if (typeof executionState._methodArguments[0] == "function") {
			executionState._callback = executionState._methodArguments[0];
		} else if (typeof executionState._methodArguments[1] == "function") {
			executionState._trigger = executionState._methodArguments[0];
			executionState._callback = executionState._methodArguments[1];
		} else {
			executionState._trigger = executionState._methodArguments[0];
			firstRunNow = executionState._methodArguments[1];
			executionState._callback = executionState._methodArguments[2];
		}

		if (executionState._trigger == undefined) {
			
			executionState._unrepeatAction = function(){
				jQuery(this).unbind('__unrepeat__', executionState._unrepeatAction);
				executionState._context = executionState._context.not(this);
				executionState._trigger = executionState._context.length && executionState._trigger;
			};
			firstRunNow = true;
			executionState._context.bind('__unrepeat__', executionState._unrepeatAction);
			
		} else if (typeof executionState._trigger == "string") {

			executionState._timingAction = function(){
				executionState._triggeredContext = executionState._triggeredContext && executionState._triggeredContext.add(this) || jQuery(this); 
				timedInvocationChain();				
			};
			executionState._unrepeatAction = function(){
				jQuery(this).unbind('__unrepeat__', executionState._unrepeatAction).unbind(executionState._trigger, executionState._timingAction);
				executionState._triggeredContext = executionState._triggeredContext && executionState._triggeredContext.not(this);
			};
			executionState._context.bind(executionState._trigger, executionState._timingAction).bind('__unrepeat__', executionState._unrepeatAction);

		} else {

			executionState._unrepeatAction = function(){
				jQuery(this).unbind('__unrepeat__', executionState._unrepeatAction);
				executionState._context = executionState._context.not(this);
				if (!executionState._context.length)
					window.clearInterval(executionState._trigger);
			};
			executionState._trigger = window.setInterval(function(){				
					executionState._triggeredContext = executionState._context; 
					timedInvocationChain();
				}, Math.max(0, executionState._trigger));
			executionState._context.bind('__unrepeat__', executionState._unrepeatAction);

		}
		if (firstRunNow) {
			executionState._triggeredContext = executionState._context;
		}
		executionState._count = 0;
		executionState._waitingForTrigger = true;
		ongoingLoops.unshift(executionState);
	};
		
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
	
	until._timingAction = function(timedInvocationChain, executionState, ongoingLoops) {
		var condition = executionState && executionState._methodArguments[0];
		if (condition == undefined) {
			condition = !executionState._context.size();
		}
		if (typeof condition == "function") {
			condition = callbackWithLoopCounts(ongoingLoops, executionState._context, condition);
		}
		if (typeof condition == "object") {
			condition = condition.toString();
		}
		if (typeof condition == "number") {
			condition = ongoingLoops[0]._count >= condition-1;
		}
		if (condition) {					
			executionState = ongoingLoops.shift();
			executionState._context.unbind('__unrepeat__', executionState._unrepeatAction);
			if (executionState._trigger == undefined) {
				executionState._trigger = 0;
			} else if (typeof executionState._trigger == "string") {
				executionState._context.unbind(executionState._trigger, executionState._timingAction);
			} else {
				window.clearInterval(executionState._trigger);
			}
			return true;
		} else {
			executionState = ongoingLoops[0];
			executionState._count++;
			executionState._waitingForTrigger = true;
			if (executionState._trigger == undefined)
				executionState._triggeredContext = executionState._context;
			return executionState;
		}
	};
	
	/**
	 * start new timed invocation chain and apply then method 
	 */
	function then(callback) {
		callback.apply(this);
		return this;
	}
	
	then._timingAction = function(timedInvocationChain, executionState){
		executionState._callback = executionState._methodArguments[0];
		return true;
	};
	
	/**
	 * start new timed invocation chain and apply join method 
	 */
	function join() {
		return createTIC(this,'join',arguments);
	}
	
	/**
	 * Define to wait for joining all animation queues.
	 * 
	 * @param timedInvocationChain
	 * @param executionState
	 */
	join._timingAction = function(timedInvocationChain, executionState) {
		var queueName,
		waitingElements = jQuery(executionState._context);
		
		if (typeof executionState._methodArguments[0] == "function") {
			executionState._callback = executionState._methodArguments[0];
		} else {
			queueName = executionState._methodArguments[0];
			executionState._callback = executionState._methodArguments[1];
		}
		
		// wait for each element to reach the current end of its queue
		executionState._context.queue(queueName == undefined ? 'fx' : queueName, function(next){
			if (waitingElements.length && !(waitingElements = waitingElements.not(this)).length) {
				executionState._triggeredContext = executionState._context;
				timedInvocationChain();
			}
			next();
		});
		executionState._waitingForTrigger = true;
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
			Array.prototype.shift.apply(args);
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
