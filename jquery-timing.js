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
	 * constants for typeof operator,
	 * will shrink in minimization
	 */
	STRING = "string",
	
	/**
	 * constant for testing undefined,
	 * will shrink in minimization
	 */
	UNDEFINED = undefined,
	
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
	
	setInterval = window.setInterval;
	
	function isObject(object) {
		return typeof object == "object";
	}
	
	function isFunction(object) {
		return typeof object == "function";
	}

	function isString(object) {
		return typeof object == "string";
	}

	function isNumber(object) {
		return typeof object == "number";
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
	
	function createTIC(context, firstMethodName, firstMethodArguments) {
		var chainEnd = {
			_isChainEnd: true
		},
		lastAddedEntry = {
			_next: chainEnd,
			_context: context,
			_method: firstMethodName,
			_arguments: firstMethodArguments
		},
		tic = {
			_activeExecutionPoint: lastAddedEntry,
			_ongoingLoops: [],
			_openEndLoopTimeout: setTimeout(function(){
				tic._openEndLoopTimeout = false;
				if (tic._activeExecutionPoint._isChainEnd) {
					var lastRepeat = tic._ongoingLoops.pop();
					if (lastRepeat) {
						tic._activeExecutionPoint = lastRepeat;
						if (lastRepeat._nextIterationAllowedNow) {
							invokeTIC(tic);
						}
					}
				}
			}, 0)
		},
		placeholder = {};
		for (key in context) {
			if (isFunction(context[key])) {
				(function(name){
					placeholder[name] = function(){
						lastAddedEntry = lastAddedEntry._next = {
								_next: chainEnd,
								_method: name,
								_arguments: arguments 
						};
						if (tic._activeExecutionPoint._isChainEnd) {
							tic._activeExecutionPoint = lastAddedEntry;
							invokeTIC(tic);
						}
						return this;
					};
				})(key);
			}
		}
		invokeTIC(tic);
		return placeholder;
	}
	
	/**
	 * start new timed invocation chain and apply wait method 
	 */
	function wait(arg1, arg2, arg3) {
		return createTIC(this).wait(arg1, arg2, arg3);
	}
	
	/**
	 * start new timed invocation chain and apply unwait method 
	 */
	function unwait(arg1, arg2, arg3) {
		return createTIC(this).unwait(arg1, arg2, arg3);
	}

	/**
	 * start new timed invocation chain and apply repeat method 
	 */
	function repeat(arg1, arg2, arg3) {
		return createTIC(this).repeat(arg1, arg2, arg3);
	}
	
	/**
	 * start new timed invocation chain and apply unrepeat method 
	 */
	function unrepeat(arg1, arg2, arg3) {
		return createTIC(this).unrepeat(arg1, arg2, arg3);
	}
	
	/**
	 * start new timed invocation chain and apply until method 
	 */
	function until(arg1, arg2, arg3) {
		return createTIC(this).until(arg1, arg2, arg3);
	}
	
	/**
	 * start new timed invocation chain and apply then method 
	 */
	function then(arg1, arg2, arg3) {
		return createTIC(this).then(arg1, arg2, arg3);
	}
	
	/**
	 * start new timed invocation chain and apply join method 
	 */
	function join(arg1, arg2, arg3) {
		return createTIC(this).join(arg1, arg2, arg3);
	}
	
	/**
	 * Start a new queue to apply all the timing methods on.
	 * This will be used in the static variants.
	 *   
	 * @param threadName the optional name of the timing thread 
	 * @param method the method to be called
	 * @param args the original function arguments
	 */
	function useThread(threadName, method, args){
		if (typeof threadName == STRING) {
			Array.prototype.shift.apply(args);
		} else {
			threadName = '';
		}
		return method.apply(JQUERY_TIMING[threadName] = (JQUERY_TIMING[threadName] || $('<div>')), args);
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
		if (typeof compute == STRING) {
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
