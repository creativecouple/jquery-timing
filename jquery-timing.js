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
	all_mocked_function_names = {},
	originalEach = jQuery.fn.each;
	
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
		openEndLoopAllowed,
		isRunning,
		
		/**
		 * Invoke all the methods currently in the timed invocation chain.
		 * @author CreativeCouple
		 * @author Peter Liske
		 * 
		 * @param timedInvocationChain
		 * @param triggeredState optional state to be triggered
		 */
		timedInvocationChain = function() {
			while (!isRunning) try {
				// keep recursive calls away
				isRunning = !isRunning;
				// save current context state
				if (stepCallback) {
					stepCallback(jQuery.makeArray(executionState._context));
				}
				// leave the loop when waiting for a trigger
				if (executionState._triggered == 0) {
					return;
				}
				// check end of chain
				if (executionState._method._name) {
					// check if user tries to use a non-existing function call
					if (!executionState._context[executionState._method._name]) {
						throw 'no such method: '+executionState._method._name;
					}
					// check whether we came here triggered or not
					executionState = executionState._triggered ?
						/*
						 * There was some timing method that fulfilled its condition to go on to the next step.
						 * We use the triggered context as next context.
						 */
						{
							_context: executionState._triggered,
							// apply callback method before resetting _triggered
							_next: typeof executionState._callback == "function" &&
								executionState._callback.apply(executionState._triggered, jQuery(ongoingLoops).map(function(){
									return this._count;
								}).get()),
							// reset _triggered here - just for the case of repeat loop states
							_method: (executionState._triggered = 0) || executionState._method._next
						} :
						// check whether we have a timing enabled method
						executionState._context[executionState._method._name].timing ?
							/*
							 * Some timing method wants to get handled now.
							 */
							executionState._context[executionState._method._name].timing(timedInvocationChain, executionState, ongoingLoops) || executionState :
							/*
							 * Default case: no timing method.
							 * Just invoke method and use the return value as new context.
							 */
							{
								_context: executionState._context[executionState._method._name].apply(executionState._context, executionState._method._arguments),
								_method: executionState._method._next
							}
				} else {
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
					 * If we already waited a bit then we start over right there.
					 */
					if (!openEndLoopAllowed) {
						return;
					}
					// start open repeat loop over again at the end of the chain
					executionState = ongoingLoops[0]._openEndAction();
				}
			} finally {
				isRunning = !isRunning;
			}
		};
		window.setTimeout(function(){
			openEndLoopAllowed = !openEndLoopAllowed;
			timedInvocationChain();
		}, 0);
		return timedInvocationChain;
	}
	
	function createPlaceholder(context, callStack, instantInvocation) {
		var placeholder = {}, key;
		placeholder._ = context._ = context;
		
		for (key in context) {
			if (typeof context[key] == "function") {
				all_mocked_function_names[key] = key;
			}
		}
		jQuery.each(all_mocked_function_names, function(name){
			placeholder[name] = function(){
				callStack._name = name;
				callStack._arguments = arguments; 
				callStack = callStack._next = {};
				return instantInvocation && instantInvocation() || placeholder;
			};
		});

		return placeholder;
	}
	
	// initialize default mocked function names
	createPlaceholder([]);
	createPlaceholder('');
	createPlaceholder(jQuery());
	
	jQuery.each(['wait','repeat','join','then','until','all'], function(index, name){
		jQuery.fn[name] = function(){
			var callStack = {},
			placeholder = createPlaceholder(this, callStack, createTimedInvocationChain(this, callStack, function(elements){
					placeholder.length = 0;
					Array.prototype.push.apply(placeholder, elements);
				}));
			return placeholder[name].apply(this, arguments);
		};
	});
	
	jQuery.fn.each = function(callback){
		if (!callback || callback === jQuery) {
			var callStack = {},
			placeholder = createPlaceholder(this, callStack, createTimedInvocationChain(this, callStack, function(elements){
					placeholder.length = 0;
					Array.prototype.push.apply(placeholder, elements);
				}));
			return placeholder.each();
		}
		return originalEach.apply(this, arguments);
	};
	
	/**
	 * Define timeout or binding to wait for.
	 * 
	 * @param timedInvocationChain
	 * @param executionState
	 */
	jQuery.fn.wait.timing = function(timedInvocationChain, executionState) {
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
	 * Define interval or binding to repeat.
	 * 
	 * @param timedInvocationChain
	 * @param executionState
	 */
	jQuery.fn.repeat.timing = function(timedInvocationChain, executionState, ongoingLoops, firstRunNow) {
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
			
			triggerAction = timedInvocationChain;
			unrepeatAction = function(){
				jQuery(this).unbind('__unrepeat__', unrepeatAction);
				executionState._context = executionState._context.not(this);
				executionState._triggered = executionState._context.length && executionState._triggered && executionState._triggered.not(this);
				triggerAction = executionState._context.length && triggerAction;
			};
			executionState._untilAction = function(isEnd){
				if (!triggerAction || isEnd) {
					executionState._context.unbind('__unrepeat__', unrepeatAction);
				} else {
					executionState._triggered = executionState._context;
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
		executionState._openEndAction = function(){
			return jQuery.fn.until.timing(timedInvocationChain, null, ongoingLoops);
		};
		executionState._count = 0;

		ongoingLoops.unshift(executionState);
	};

	/**
	 * Defined to evaluate condition when calling .until()
	 */
	jQuery.fn.until.timing = function(timedInvocationChain, executionState, ongoingLoops) {
		if (!ongoingLoops.length || !ongoingLoops[0]._untilAction) {
			throw '.until() method must be used after .repeat() only';
		}

		var condition = !!executionState && executionState._method._arguments[0];
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
		if (condition) {
			executionState._triggered = executionState._context;
			ongoingLoops.shift()._untilAction(condition);
		} else {
			executionState = ongoingLcontextChangedoops[0];
			executionState._count++;
			executionState._untilAction();
			return executionState;
		}
	};
	
	/**
	 * Define to simply run callback method for .then()
	 */
	jQuery.fn.then.timing = function(timedInvocationChain, executionState){
		executionState._callback = executionState._method._arguments[0];
		executionState._triggered = executionState._context;
	};
	
	/**
	 * Define to wait for joining all animation queues.
	 * 
	 * @param timedInvocationChain
	 * @param executionState
	 */
	jQuery.fn.join.timing = function(timedInvocationChain, executionState) {
		var queueName,
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
			executionState._triggered = !(waitingElements = waitingElements.not(this)).length && executionState._context;
			timedInvocationChain();
			next();
		});
	};

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
	 * create replacement methods for .bind(), .on(), and .one()
	 * supporting chaining instead of giving a callback function
	 */
	jQuery.each(['bind','on','one','live','delegate'], function(index, name){
		var original = jQuery.fn[name];
		jQuery.fn[name] = original && function(){
			var originalUsage, i, callStack;
			for(i=0; i<arguments.length; i++) {
				if (typeof arguments[i] == "function" || (arguments[i] && typeof arguments[i] == "object") || arguments[i] === false) {
					if (arguments[i] !== jQuery) {
						// fix for jQuery 1.6 .one() + .unbind()
						if (typeof arguments[i] == "function" && jQuery.guid) {
							arguments[i].guid = arguments[i].guid || jQuery.guid++;
						}
						originalUsage = !originalUsage;
					}
					break;
				}
			}
			if (originalUsage) {
				return original.apply(this, arguments);
			}
			callStack = {};
			arguments[i] = function(){
				return (createTimedInvocationChain(jQuery(this), callStack))();
			};
			arguments.length = Math.max(arguments.length, i+1);
			return createPlaceholder(original.apply(this, arguments), callStack);
		};
	});


	/**
	 * Define interval or binding to repeat.
	 * 
	 * @param timedInvocationChain
	 * @param executionState
	 */
	jQuery.fn.each.timing = function(timedInvocationChain, executionState, ongoingLoops) {
		var waiting = executionState._context.length,
		contextChanged,
		key,
		elementSizes = executionState._context.map(function(){
			return 1;
		}).get(),
		innerTICs = executionState._context.map(function(index){
			var $this = jQuery(this),
			innerLoops = jQuery(ongoingLoops).map(function(){
				return {_count: this._count};
			}).get();
			innerLoops.unshift({
				_count: index,
				_allAction: function(method){
					if (!--waiting) {
						if (contextChanged) {
							executionState._triggered = jQuery(spreadPlaceholder);
							executionState._triggered.prevObject = executionState._context.prevObject;
						} else {
							executionState._triggered = executionState._context;
						}
						// FIXME wo gehts weiter
						timedInvocationChain();
					}
				}
			});
			return createTimedInvocationChain($this, executionState._method._next, function(elements){
				contextChanged = contextChanged || elements.length != 1 || elements[0] !== executionState._context[index];
				for(var i=0, pos=0; i<index; i++) {
					pos += elementSizes[i];
				}
				elements.unshift(pos,elementSizes[index]);
				Array.prototype.splice.apply(spreadPlaceholder, elements);
				elementSizes[index] = elements.length-2;
			}, innerLoops);
		}),
		spreadAction = function(){
			for(var i=0; i<executionState._context.length; i++) {
				(innerTICs[i])();
			}
			return spreadPlaceholder;
		},
		spreadPlaceholder = { length: 0 };
		for (key in all_mocked_function_names) {
			spreadPlaceholder[key] = spreadAction;
		}
		Array.prototype.push.apply(spreadPlaceholder, jQuery.makeArray(executionState._context))
		
		ongoingLoops.unshift(executionState);
		executionState._triggered = spreadPlaceholder;
	};

	/**
	 * Defined to evaluate condition when calling .until()
	 */
	jQuery.fn.all.timing = function(timedInvocationChain, executionState, ongoingLoops) {
		if (!ongoingLoops.length || !ongoingLoops[0]._allAction) {
			throw '.all() method must be used after .each() only';
		}

		/*
		 * This is called within the each loop.
		 * We have to leave the inner chain now.
		 */
		executionState._triggered = 0;
		ongoingLoops[0]._allAction();
	};
	
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
