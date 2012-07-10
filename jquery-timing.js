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
	all_mocked_function_names = {};
	
	/**
	 * Initialize a new timed invocation chain. First entry is the given method.
	 * 
	 * @author CreativeCouple
	 * @author Peter Liske
	 * 
	 * @param context
	 * @returns the placeholder to collect all concatenated function calls
	 */
	function createTimedInvocationChain(context, callStack, stepCallback) {
		var executionState = {
				_context: context,
				_method: callStack
		},
		ongoingLoops = [],
		openEndLoopTimeout = window.setTimeout(function(){
			openEndLoopTimeout = null;
			timedInvocationChain();
		}, 0),
		method;
		
		/**
		 * Invoke all the methods currently in the timed invocation chain.
		 * @author CreativeCouple
		 * @author Peter Liske
		 * 
		 * @param timedInvocationChain
		 * @param triggeredState optional state to be triggered
		 */
		function timedInvocationChain() {
			while (true) {
				if (stepCallback) {
					stepCallback(executionState._context);
				}
				
				if (executionState._triggered == 0) {
					return;
				}
				if (executionState._method._name) {
					method = executionState._context[executionState._method._name];
					if (!method) {
						throw 'no such method: '+executionState._method._name;
					}
					executionState = executionState._triggered ?
						/*
						 * There was some timing method that fulfilled its condition
						 * to go on to the next step.
						 * We use the _triggered context as next context.
						 */
						{
							_context: executionState._triggered,
							_next: typeof executionState._callback == "function" &&
								executionState._callback.apply(executionState._triggered, jQuery(ongoingLoops).map(function(){
									return this._count;
								}).get()),
							// reset _triggered here - just for the case of repeat loop states
							_method: (executionState._triggered = 0) || executionState._method._next
						} :
						method._timing ?
							method._timing(timedInvocationChain, executionState, ongoingLoops) || executionState :
							{
								_context: method.apply(executionState._context, executionState._method._arguments),
								_method: executionState._method._next
							};
				} else {
					if (!ongoingLoops[0]) {
						/*
						 * We've reached the end of our TIC
						 * and there is nothing left to wait.
						 * So we can safely return the original jQuery object.
						 */
						return executionState._context; 
					}
					/*
					 * Now we have ongoing loops but reached the chain's end.
					 * If we already waited a bit then we start over right there.
					 */
					if (openEndLoopTimeout) {
						return;
					}
					// start open repeat loop over again at the end of the chain
					executionState = until._timing(timedInvocationChain, false, ongoingLoops);
				}
			}
		};
		return timedInvocationChain;
	}
	
	function createPlaceholder(context, callStack, instantInvocation) {
		var placeholder = {},
		key;
		for (key in context) {
			if (typeof context[key] == "function") {
				all_mocked_function_names[key] = key;
			}
		}
		$.each(all_mocked_function_names, function(name){
			placeholder[name] = function(){
				callStack._name = name;
				callStack._arguments = arguments; 
				callStack = callStack._next = {};
				return instantInvocation && instantInvocation() || placeholder;
			};
		});

		placeholder._ = context._ = context;
		return placeholder;
	}
	
	// initialize default mocked function names
	createPlaceholder(new Object());
	createPlaceholder(new Array());
	createPlaceholder(new String());
	createPlaceholder(new Function());
	
	function createSimpleTIC(context) {
		var callStack = {},
		placeholder,
		timedInvocationChain = createTimedInvocationChain(context, callStack, function(elements){
			/*
			 * Super-fast copying of current elements into our placeholder object.
			 * This enables re-using our placeholder via jQuery(...)
			 */
			placeholder.length = 0;
			Array.prototype.push.apply(placeholder, jQuery.makeArray(elements));
		});
		return placeholder = createPlaceholder(context, callStack, timedInvocationChain);
	}
	
	/**
	 * start new timed invocation chain and apply wait method 
	 */
	function wait() {
		return createSimpleTIC(this).wait.apply(this,arguments);
	}
	
	/**
	 * Define timeout or binding to wait for.
	 * 
	 * @param timedInvocationChain
	 * @param executionState
	 */
	wait._timing = function(timedInvocationChain, executionState) {
		var trigger, triggerAction, unwaitAction;
		
		executionState._triggered = 0;

		if (typeof executionState._method._arguments[0] == "function") {
			executionState._callback = executionState._method._arguments[0];
		} else {
			trigger = executionState._method._arguments[0];
			executionState._callback = executionState._method._arguments[1];
		}
		
		if (typeof trigger == "string") {

			triggerAction = function(){
				jQuery(this).unbind(trigger, triggerAction).unbind('__unwait__', unwaitAction);
				executionState._triggered = executionState._triggered && executionState._triggered.add(this) || jQuery(this); 
				timedInvocationChain();
			};
			unwaitAction = function(){
				jQuery(this).unbind('__unwait__', unwaitAction);
				executionState._context = executionState._context.not(this);
				executionState._triggered = executionState._context.length && executionState._triggered && executionState._triggered.not(this);
				jQuery(this).unbind(trigger, triggerAction);
			};
			executionState._context.bind(trigger, triggerAction);

		} else {

			triggerAction = window.setTimeout(function(){
				executionState._context.unbind('__unwait__', unwaitAction);
				executionState._triggered = executionState._context; 
				timedInvocationChain();
			}, Math.max(0,trigger));
			unwaitAction = function(){
				jQuery(this).unbind('__unwait__', unwaitAction);
				executionState._context = executionState._context.not(this);
				executionState._triggered = executionState._context.length && executionState._triggered && executionState._triggered.not(this);
				if (!executionState._context.length)
					window.clearTimeout(triggerAction);
			};

		}
		executionState._context.bind('__unwait__', unwaitAction);
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
		return createSimpleTIC(this).repeat.apply(this,arguments);
	}
	
	/**
	 * Define interval or binding to repeat.
	 * 
	 * @param timedInvocationChain
	 * @param executionState
	 */
	repeat._timing = function(timedInvocationChain, executionState, ongoingLoops, firstRunNow) {
		var trigger, triggerAction, unrepeatAction;
		
		executionState._triggered = 0;

		if (typeof executionState._method._arguments[0] == "function") {
			executionState._callback = executionState._method._arguments[0];
		} else if (typeof executionState._method._arguments[1] == "function") {
			trigger = executionState._method._arguments[0];
			executionState._callback = executionState._method._arguments[1];
		} else {
			trigger = executionState._method._arguments[0];
			executionState._triggered = !!executionState._method._arguments[1] && executionState._context;
			executionState._callback = executionState._method._arguments[2];
		}
		
		if (trigger == null) {
			
			triggerAction = true;
			unrepeatAction = function(){
				jQuery(this).unbind('__unrepeat__', unrepeatAction);
				executionState._context = executionState._context.not(this);
				executionState._triggered = executionState._context.length && executionState._triggered && executionState._triggered.not(this);
				triggerAction = executionState._context.length && triggerAction;
			};
			executionState._untilAction = function(isEnd){
				if (!isEnd && triggerAction) {
					executionState._triggered = executionState._context;
				} else {
					executionState._context.unbind('__unrepeat__', unrepeatAction);
				}
			};
			executionState._triggered = executionState._context;
			
		} else if (typeof trigger == "string") {

			triggerAction = function(){
				executionState._triggered = executionState._triggered && executionState._triggered.add(this) || jQuery(this); 
				timedInvocationChain();				
			};
			unrepeatAction = function(){
				jQuery(this).unbind('__unrepeat__', unrepeatAction);
				executionState._context = executionState._context.not(this);
				executionState._triggered = executionState._context.length && executionState._triggered && executionState._triggered.not(this);
				jQuery(this).unbind(trigger, triggerAction);
			};
			executionState._untilAction = function(isEnd){
				if (isEnd) {
					executionState._context.unbind('__unrepeat__', unrepeatAction).unbind(trigger, triggerAction);
				}
			};
			executionState._context.bind(trigger, triggerAction);

		} else {

			triggerAction = window.setInterval(function(){				
				executionState._triggered = executionState._context; 
				timedInvocationChain();
			}, Math.max(0, trigger));
			unrepeatAction = function(){
				jQuery(this).unbind('__unrepeat__', unrepeatAction);
				executionState._context = executionState._context.not(this);
				executionState._triggered = executionState._context.length && executionState._triggered && executionState._triggered.not(this);
				if (!executionState._context.length)
					window.clearInterval(triggerAction);
			};
			executionState._untilAction = function(isEnd){
				if (isEnd) {
					executionState._context.unbind('__unrepeat__', unrepeatAction);
					window.clearInterval(triggerAction);
				}
			};

		}
		executionState._context.bind('__unrepeat__', unrepeatAction);

		executionState._count = 0;
		ongoingLoops.unshift(executionState);
	};
		
	/**
	 * stop repeating for underlying elements  
	 */
	function unrepeat() {
		return this.trigger('__unrepeat__');
	}
	
	/**
	 * start new timed invocation chain and apply until method 
	 */
	function until() {
		throw '.until() method must be used after .repeat() only';
	}
	
	until._timing = function(timedInvocationChain, executionState, ongoingLoops) {
		var condition = executionState && executionState._method._arguments[0];
		if (condition == null) {
			condition = !executionState._context.size();
		}
		if (typeof condition == "function") {
			condition = condition.apply(executionState._context, jQuery(ongoingLoops).map(function(){
				return this._count;
			}).get());
		}
		if (typeof condition == "object") {
			condition = condition.toString();
		}
		if (typeof condition == "number") {
			condition = ongoingLoops[0]._count >= condition-1;
		}
		if (condition && executionState) {
			executionState._triggered = executionState._context;
			executionState = ongoingLoops.shift();
			executionState._untilAction(true);
		} else {
			executionState = ongoingLoops[0];
			executionState._count++;
			executionState._untilAction();
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
	
	then._timing = function(timedInvocationChain, executionState){
		executionState._callback = executionState._method._arguments[0];
		executionState._triggered = executionState._context;
	};
	
	/**
	 * start new timed invocation chain and apply join method 
	 */
	function join() {
		return createSimpleTIC(this).join.apply(this,arguments);
	}
	
	/**
	 * Define to wait for joining all animation queues.
	 * 
	 * @param timedInvocationChain
	 * @param executionState
	 */
	join._timing = function(timedInvocationChain, executionState) {
		var canTrigger, queueName,
		waitingElements = jQuery(executionState._context);
		
		executionState._triggered = 0;
		
		if (typeof executionState._method._arguments[0] == "function") {
			executionState._callback = executionState._method._arguments[0];
		} else {
			queueName = executionState._method._arguments[0];
			executionState._callback = executionState._method._arguments[1];
		}
		
		// wait for each element to reach the current end of its queue
		executionState._context.queue(queueName == null ? 'fx' : queueName, function(next){
			if (waitingElements.length && !(waitingElements = waitingElements.not(this)).length) {
				executionState._triggered = executionState._context;
				if (canTrigger)
					timedInvocationChain();
			}
			next();
		});
		canTrigger = true;
	};
	
	/*
	 * create replacement methods for .bind(), .on(), and .one()
	 */
	$.each(['bind','on','one'], function(index, name){
		var original = jQuery.fn[name];
		jQuery.fn[name] = original && function(trigger){
			if (typeof trigger != "object") {
				var classicalUsage, i, callStack;
				for(i=1; i<arguments.length; i++) {
					if (typeof arguments[i] == "function") {
						if (arguments[i] !== jQuery) {
							// fix for jQuery 1.6 .one() + .unbind()
							arguments[i].guid = arguments[i].guid || jQuery.guid++;
							classicalUsage = true;
						}
						break;
					}
				}
				if (!classicalUsage) {
					callStack = {};
					arguments[i] = function(){
						return (createTimedInvocationChain(jQuery(this), callStack))();
					};
					arguments.length = Math.max(arguments.length, i+1);
					return createPlaceholder(original.apply(this, arguments), callStack);
				}
			}
			return original.apply(this, arguments);
		};
	});
	
	/**
	 * Start or re-use a thread group to apply all the timing methods on.
	 * This will be used in the static variants.
	 *   
	 * @param name the optional name of the timing thread 
	 * @param method the method to be called
	 * @param args the original function arguments
	 */
	function useThreadGroup(name, method, args){
		if (typeof name == "string") {
			Array.prototype.shift.apply(args);
		} else {
			name = '';
		}
		return method.apply(THREAD_GROUPS[name] = (THREAD_GROUPS[name] || jQuery('<div>').text(name)), args);
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
		jQuery.extend(callbackVariable, {
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
		wait: function(name) {
			return useThreadGroup(name, wait, arguments);
		},
		unwait: function(name) {
			return useThreadGroup(name, unwait, arguments);
		},
		repeat: function(name) {
			return useThreadGroup(name, repeat, arguments);
		},
		unrepeat: function(name) {
			return useThreadGroup(name, unrepeat, arguments);
		},
		then: function(name) {
			return useThreadGroup(name, then, arguments);
		},
		join: function(name) {
			return useThreadGroup(name, join, arguments);
		},
		$$: $$
	});

})(jQuery, window);
