tests[".repeat() functionality"] = {
		
		"instant open for-loop": {
		
			".repeat(callback) + .unrepeat()": function($, test) {
				var x = 0;
				var $x = test.element('<div>');
				var callback = function(){
					x++; test.check();
					if (x > 1000) { $x.unrepeat(); throw "repeat loop running infinitely"; };
				};
				$x.repeat(callback);
				test.assertEquals("instant open .repeat() should fire exactly once", 1, x);
				$x.unrepeat();
				test.assertEquals("instant open .repeat() should not fire on .unrepeat()", 1, x);
				window.setTimeout(function(){
					test.assertEquals(".repeat() should not have fired anymore", 1, x);
					$x.unrepeat();
					test.assertEquals(".repeat() should not have fired anymore after .unrepeat()", 1, x);
					test.done();
				}, 100);
			},
	
			".repeat().then(callback) + .unrepeat()": function($, test) {
				var x = 0;
				var $x = test.element('<div>');
				var callback = function(){
					x++; test.check();
					if (x > 1000) { $x.unrepeat(); throw "repeat loop running infinitely"; };
				};
				var TIC = $x.repeat();
				test.assertEquals("TIC has to wait for .then()", 0, x);
				TIC.then(callback);
				test.assertEquals("instant open .repeat() should fire once", 1, x);
				$x.unrepeat();
				test.assertEquals("instant open .repeat() should not fire on .unrepeat()", 1, x);
				window.setTimeout(function(){
					test.assertEquals(".repeat() should not have fired anymore", 1, x);
					$x.unrepeat();
					test.assertEquals(".repeat() should not have fired anymore after .unrepeat()", 1, x);
					test.done();
				}, 100);
			},
	
			".repeat() + .unrepeat() + .then(callback)": function($, test) {
				var x = 0;
				var $x = test.element('<div>');
				var callback = function(){
					x++; test.check();
					if (x > 1000) { $x.unrepeat(); throw "repeat loop running infinitely"; };
				};
				var TIC = $x.repeat();
				test.assertEquals("TIC has to wait for .then()", 0, x);
				$x.unrepeat();
				TIC.then(callback);
				test.assertEquals("instant open .repeat() should fire once, because .unrepeat() was too late", 1, x);
				window.setTimeout(function(){
					test.assertEquals(".repeat() should not have fired anymore", 1, x);
					$x.unrepeat();
					test.assertEquals(".repeat() should not have fired anymore after .unrepeat()", 1, x);
					test.done();
				}, 100);
			},
	
			".repeat() + .unrepeat() +…+ .then(callback)": function($, test) {
				var x = 0;
				var $x = test.element('<div>');
				var callback = function(){
					x++; test.check();
					if (x > 1000) { $x.unrepeat(); throw "repeat loop running infinitely"; };
				};
				var TIC = $x.repeat();
				test.assertEquals("TIC has to wait for .then()", 0, x);
				$x.unrepeat();
				window.setTimeout(function(){
					TIC.then(callback);
					test.assertEquals("instant open .repeat() should not fire, because .unrepeat() was earlier", 0, x);
					window.setTimeout(function(){
						test.assertEquals(".repeat() should not have fired anymore", 0, x);
						$x.unrepeat();
						test.assertEquals(".repeat() should not have fired anymore after .unrepeat()", 0, x);
						test.done();
					}, 100);
				}, 0);
			},
			
			".repeat(X).eq(X).doSomething()": function($, test) {
				var x = 0;
				var $x = test.element($('<div>').add('<span>').add('<p>'));
				var callback = function(i){
					test.assertEquals("loop iteration must match", i, x);
					x++; test.check();
					if (x > 1000) { $x.unrepeat(); throw "repeat loop running infinitely"; };
				};
				var X=$.X();
				$x.repeat(X).eq(X).then(callback);
				test.assertEquals("then must be run first time", 1, x);
				window.setTimeout(function(){
					test.assertEquals(".repeat() should have run until empty selection", 4, x);
					test.done();
				}, 100);
			},
	
		},

		"open for-loop with delay": {
		
			".repeat(callback).wait(timeout) + .unrepeat()": function($, test) {
				var x = 0;
				var timeout = 100;
				var $x = test.element('<div>');
				var callback = function(y){
					test.assertEquals("callback argument must be iteration number", x,y);
					x++; test.check();
					if (x > 1000) { $x.unrepeat(); throw "repeat loop running infinitely"; };
				};
				$x.repeat(callback).wait(timeout);
				test.assertEquals("instant open .repeat() should fire once", 1, x);
				window.setTimeout(function(){
					test.assertEquals(".repeat() should not fire again before timeout", 1, x);
					$x.unrepeat();
					test.assertEquals(".repeat() should not fire on .unrepeat()", 1, x);
					window.setTimeout(function(){
						test.assertEquals(".repeat() should not have fired because of .unrepeat()", 1, x);
						window.setTimeout(function(){
							test.assertEquals(".repeat() should not have fired anymore", 1, x);
							$x.unrepeat();
							test.assertEquals(".repeat() should not have fired anymore after .unrepeat()", 1, x);
							test.done();
						}, timeout);
					}, timeout);
				}, timeout/2);
			},
	
			".repeat().then(callback).wait(timeout) + .unrepeat()": function($, test) {
				var x = 0;
				var timeout = 100;
				var $x = test.element('<div>');
				var callback = function(y){
					test.assertEquals("callback argument must be iteration number", x,y);
					x++; test.check();
					if (x > 1000) { $x.unrepeat(); throw "repeat loop running infinitely"; };
				};
				$x.repeat().then(callback).wait(timeout);
				test.assertEquals("instant open .repeat() should fire once", 1, x);
				window.setTimeout(function(){
					test.assertEquals(".repeat() should not fire again before timeout", 1, x);
					$x.unrepeat();
					test.assertEquals(".repeat() should not fire on .unrepeat()", 1, x);
					window.setTimeout(function(){
						test.assertEquals(".repeat() should not have fired because of .unrepeat()", 1, x);
						window.setTimeout(function(){
							test.assertEquals(".repeat() should not have fired anymore", 1, x);
							$x.unrepeat();
							test.assertEquals(".repeat() should not have fired anymore after .unrepeat()", 1, x);
							test.done();
						}, timeout);
					}, timeout);
				}, timeout/2);
			},
	
			".repeat(callback).wait(timeout) +…+ .unrepeat()": function($, test) {
				var x = 0;
				var timeout = 100;
				var $x = test.element('<div>');
				var callback = function(y){
					test.assertEquals("callback argument must be iteration number", x,y);
					x++; test.check();
					if (x > 1000) { $x.unrepeat(); throw "repeat loop running infinitely"; };
				};
				$x.repeat(callback).wait(timeout);
				test.assertEquals("instant open .repeat() should fire once", 1, x);
				window.setTimeout(function(){
					test.assertEquals(".repeat() should not fire again before timeout", 1, x);
					window.setTimeout(function(){
						test.assertEquals(".repeat() should have fired again after timeout", 2, x);
						$x.unrepeat();
						test.assertEquals(".unrepeat() should not fire anything", 2, x);
						window.setTimeout(function(){
							test.assertEquals(".repeat() should not have fired anymore", 2, x);
							$x.unrepeat();
							test.assertEquals(".repeat() should not have fired anymore after .unrepeat()", 2, x);
							test.done();
						}, timeout);
					}, timeout);
				}, timeout/2);
			},
			
			".repeat().then(callback).wait(timeout) +…+ .unrepeat()": function($, test) {
				var x = 0;
				var timeout = 100;
				var $x = test.element('<div>');
				var callback = function(y){
					test.assertEquals("callback argument must be iteration number", x,y);
					x++; test.check();
					if (x > 1000) { $x.unrepeat(); throw "repeat loop running infinitely"; };
				};
				$x.repeat().then(callback).wait(timeout);
				test.assertEquals("instant open .repeat() should fire once", 1, x);
				window.setTimeout(function(){
					test.assertEquals(".repeat() should not fire again before timeout", 1, x);
					window.setTimeout(function(){
						test.assertEquals(".repeat() should have fired again after timeout", 2, x);
						$x.unrepeat();
						test.assertEquals(".unrepeat() should not fire anything", 2, x);
						window.setTimeout(function(){
							test.assertEquals(".repeat() should not have fired anymore", 2, x);
							$x.unrepeat();
							test.assertEquals(".repeat() should not have fired anymore after .unrepeat()", 2, x);
							test.done();
						}, timeout);
					}, timeout);
				}, timeout/2);
			},
			
		},
		
		"for-loop until countdown": {

			".repeat(callback).until(count)": function($, test) {
				var x = 0;
				var count = 10;
				var $x = test.element('<div>');
				var callback = function(y){
					test.assertEquals("callback argument must be iteration number", x,y);
					x++; test.check();
					if (x > 1000) { $x.unrepeat(); throw "repeat loop running infinitely"; };
				};
				var TIC = $x.repeat(callback).until(count);
				test.assertEquals(".repeat() should have fired exactly "+count+" times", count, x);
				test.assertEquals("instant for-loop should return original jQuery object", $x, TIC);
				window.setTimeout(function(){
					test.assertEquals(".repeat() should not have fired anymore", count, x);
					test.done();
				}, 100);
			},
	
			".repeat().then(callback).until(count)": function($, test) {
				var x = 0;
				var count = 10;
				var $x = test.element('<div>');
				var callback = function(y){
					test.assertEquals("callback argument must be iteration number", x,y);
					x++; test.check();
					if (x > 1000) { $x.unrepeat(); throw "repeat loop running infinitely"; };
				};
				var TIC = $x.repeat().then(callback).until(count);
				test.assertEquals(".repeat() should have fired exactly "+count+" times", count, x);
				test.assertEquals("instant for-loop should return original jQuery object", $x, TIC);
				window.setTimeout(function(){
					test.assertEquals(".repeat() should not have fired anymore", count, x);
					test.done();
				}, 100);
			},
	
			".repeat().until(count).then(callback)": function($, test) {
				var x = 0;
				var count = 10;
				var $x = test.element('<div>');
				var callback = function(){
					x++; test.check();
					if (x > 1000) { $x.unrepeat(); throw "repeat loop running infinitely"; };
				};
				var TIC = $x.repeat(function(){
					test.assertEquals("callback must not be fired before end of loop", 0, x);
				}).until(count);
				test.assertEquals("TIC has to wait for .then()", 0, x);
				test.assertEquals("instant for-loop should return original jQuery object", $x, TIC);
				TIC.then(callback);
				test.assertEquals("callback should have fired exactly once", 1, x);
				window.setTimeout(function(){
					test.assertEquals("callback should not have fired anymore", 1, x);
					test.done();
				}, 100);
			},
	
			".repeat(callback).until(count) % .unrepeat()": function($, test) {
				var x = 0;
				var count = 10;
				var stopAfter = count/2;
				var $x = test.element('<div>');
				var callback = function(y){
					test.assertEquals("callback argument must be iteration number", x,y);
					x++; test.check();
					if (x > 1000) { $x.unrepeat(); throw "repeat loop running infinitely"; };
				};
				var TIC = $x.repeat(callback).then(function(){
					if (x >= stopAfter) {
						$x.unrepeat();
					}
				}).until(count);
				test.assertEquals("instant open .repeat() should have fired exactly "+stopAfter+" times", stopAfter, x);
				test.assertNotEquals("broken instant for-loop should not return original jQuery object", $x, TIC);
				window.setTimeout(function(){
					test.assertEquals(".repeat() should not have fired anymore", stopAfter, x);
					test.done();
				}, 100);
			},
	
			".repeat().then(callback).until(count) % .unrepeat()": function($, test) {
				var x = 0;
				var count = 10;
				var stopAfter = count/2;
				var $x = test.element('<div>');
				var callback = function(y){
					test.assertEquals("callback argument must be iteration number", x,y);
					x++; test.check();
					if (x > 1000) { $x.unrepeat(); throw "repeat loop running infinitely"; };
				};
				var TIC = $x.repeat(function(){
					if (x >= stopAfter-1) {
						$x.unrepeat();
					}
				}).then(callback).until(count);
				test.assertEquals("instant open .repeat() should have fired exactly "+stopAfter+" times", stopAfter, x);
				test.assertNotEquals("broken instant for-loop should not return original jQuery object", $x, TIC);
				window.setTimeout(function(){
					test.assertEquals(".repeat() should not have fired anymore", stopAfter, x);
					test.done();
				}, 100);
			},
	
			".repeat().until(count).then(callback) % .unrepeat()": function($, test) {
				var x = 0;
				var count = 10;
				var stopAfter = count/2;
				var $x = test.element('<div>');
				var callback = function(){
					x++; test.check();
					if (x > 1000) { $x.unrepeat(); throw "repeat loop running infinitely"; };
				};
				var TIC = $x.repeat(function(y){
					test.assertEquals("callback must not be fired before end of loop", 0, x);
					if (y >= stopAfter-1) {
						$x.unrepeat();
					}
				}).until(count).then(callback);
				test.assertEquals("callback must not be fired because of .unrepeat()", 0, x);
				test.assertNotEquals("broken instant for-loop should not return original jQuery object", $x, TIC);
				window.setTimeout(function(){
					test.assertEquals("callback should not have fired anymore", 0, x);
					test.done();
				}, 100);
			},
			
			".wait(timeout) +…+ .repeat(callback).until(count)": function($, test) {
				var x = 0;
				var count = 10;
				var $x = test.element('<div>');
				var callback = function(y){
					test.assertEquals("callback argument must be iteration number", x,y);
					x++; test.check();
					if (x > 1000) { $x.unrepeat(); throw "repeat loop running infinitely"; };
				};
				var tic = $x.wait();
				window.setTimeout(function(){
					tic.repeat(callback).until(count);
					test.assertEquals(".repeat() should fire exactly "+count+" times", count, x);
					window.setTimeout(function(){
						test.assertEquals(".unrepeat() should not fire again", count, x);
						tic.then(function(){
							test.done();
						});
					}, 10);
				}, 10);
			},

			".repeat().until(1)._": function($, test) {
				var $x = test.element('<div>');
				var TIC = $x.repeat().until(1);
				var _ = TIC._;
				test.assertEquals("tic must be same object because of instant invocation", $x, TIC);
				test.assertEquals("underscore must return original object", $x, _);
				test.done();
			},

		},

		"for-loop until condition callback": {

			".repeat(callback).until(boolean condition)": function($, test) {
				var x = 0;
				var count = 10;
				var stopAfter = count/2;
				var $x = test.element('<div>');
				var callback = function(y){
					test.assertEquals("callback argument must be iteration number", x,y);
					x++; test.check();
					if (x > 1000) { $x.unrepeat(); throw "repeat loop running infinitely"; };
				};
				var TIC = $x.repeat(callback).until(function(y){
					test.assertEquals("callback argument must be iteration number", x-1,y);
					return x >= stopAfter;
				});
				test.assertEquals("instant .repeat() should have fired exactly "+stopAfter+" times", stopAfter, x);
				test.assertEquals("instant for-loop should return original jQuery object", $x, TIC);
				window.setTimeout(function(){
					test.assertEquals(".repeat() should not have fired anymore", stopAfter, x);
					test.done();
				}, 100);
			},
			
			".repeat().then(callback).until(boolean condition)": function($, test) {
				var x = 0;
				var count = 10;
				var stopAfter = count/2;
				var $x = test.element('<div>');
				var callback = function(y){
					test.assertEquals("callback argument must be iteration number", x,y);
					x++; test.check();
					if (x > 1000) { $x.unrepeat(); throw "repeat loop running infinitely"; };
				};
				var TIC = $x.repeat().then(callback).until(function(y){
					test.assertEquals("callback argument must be iteration number", x-1,y);
					return x >= stopAfter;
				});
				test.assertEquals("instant .repeat() should have fired exactly "+stopAfter+" times", stopAfter, x);
				test.assertEquals("instant for-loop should return original jQuery object", $x, TIC);
				window.setTimeout(function(){
					test.assertEquals(".repeat() should not have fired anymore", stopAfter, x);
					test.done();
				}, 100);
			},
			
			".repeat(callback).until(number condition)": function($, test) {
				var x = 0;
				var count = 10;
				var stopAfter = count/2;
				var $x = test.element('<div>');
				var callback = function(y){
					test.assertEquals("callback argument must be iteration number", x,y);
					x++; test.check();
					if (x > 1000) { $x.unrepeat(); throw "repeat loop running infinitely"; };
				};
				var TIC = $x.repeat(callback).until(function(y){
					test.assertEquals("callback argument must be iteration number", x-1,y);
					return stopAfter;
				});
				test.assertEquals("instant .repeat() should have fired exactly "+stopAfter+" times", stopAfter, x);
				test.assertEquals("instant for-loop should return original jQuery object", $x, TIC);
				window.setTimeout(function(){
					test.assertEquals(".repeat() should not have fired anymore", stopAfter, x);
					test.done();
				}, 100);
			},
			
			".repeat().then(callback).until(number condition)": function($, test) {
				var x = 0;
				var count = 10;
				var stopAfter = count/2;
				var $x = test.element('<div>');
				var callback = function(y){
					test.assertEquals("callback argument must be iteration number", x,y);
					x++; test.check();
					if (x > 1000) { $x.unrepeat(); throw "repeat loop running infinitely"; };
				};
				var TIC = $x.repeat().then(callback).until(function(y){
					test.assertEquals("callback argument must be iteration number", x-1,y);
					return stopAfter;
				});
				test.assertEquals("instant .repeat() should have fired exactly "+stopAfter+" times", stopAfter, x);
				test.assertEquals("instant for-loop should return original jQuery object", $x, TIC);
				window.setTimeout(function(){
					test.assertEquals(".repeat() should not have fired anymore", stopAfter, x);
					test.done();
				}, 100);
			}
			
		},
		
		"for-loop until empty selection": {

			".repeat(X).eq(X).until()": function($, test) {
				var x = 0;
				var $x = test.element($('<div>').add('<span>').add('<p>'));
				var size=3;
				test.assertEquals("test selection has wrong size", 3, $x.size());
				var callback = function(y){
					test.assertEquals("callback argument must be iteration number", x,y);
					x++; test.check();
					if (x > 1000) { $x.unrepeat(); throw "repeat loop running infinitely"; };
				};
				var X=$.X();
				var TIC = $x.repeat(X);
				test.assertNotEquals("instant for-loop should return TIC object during the loop", $x, TIC);
				var tic2 = TIC.eq(X).then(callback);
				test.assertEquals("instant .repeat() should have fired once for now", 1, x);
				test.assertEquals("instant for-loop should return same TIC object while loop not finished", tic2, TIC);
				var $y = TIC.until();
				test.assertEquals("instant .repeat() should have fired exactly "+(size+1)+" times", size+1, x);
				test.assertNotEquals("instant for-loop should return a jQuery object after instant loop", $y, TIC);
				test.assertNotEquals("jQuery object after instant loop should not be the starting one", $x, $y);
				test.assertEquals("jQuery object after instant loop should be empty jQuery selection", 0, $y.size());
				window.setTimeout(function(){
					test.assertEquals(".repeat() should not have fired anymore", size+1, x);
					test.done();
				}, 100);
			},
			
			".repeat(X).then(callback).eq(X).until() +…+ .then(callback)": function($, test) {
				var x = 0;
				var $x = test.element($('<div>').add('<span>').add('<p>'));
				var size=3;
				test.assertEquals("test selection has wrong size", 3, $x.size());
				var callback = function(){
					x++; test.check();
					if (x > 1000) { $x.unrepeat(); throw "repeat loop running infinitely"; };
				};
				var X=$.X();
				var TIC = $x.repeat(X);
				test.assertNotEquals("instant for-loop should return TIC object during the loop", $x, TIC);
				var tic2 = TIC.then(callback).eq(X);
				test.assertEquals("instant .repeat() should have fired once for now", 1, x);
				test.assertEquals("instant for-loop should return same TIC object while loop not finished", tic2, TIC);
				var $y = TIC.until();
				test.assertEquals("instant .repeat() should have fired exactly "+(size+1)+" times", size+1, x);
				test.assertNotEquals("instant for-loop should return a jQuery object after instant loop", $y, TIC);
				test.assertNotEquals("jQuery object after instant loop should not be the starting one", $x, $y);
				test.assertEquals("jQuery object after instant loop should be empty jQuery selection", 0, $y.size());
				window.setTimeout(function(){
					test.assertEquals(".repeat() should not have fired anymore", size+1, x);
					TIC.then(callback);
					test.assertEquals(".repeat() should have fired once more after .then()", size+2, x);
					test.done();
				}, 100);
			},
			
			".repeat(X).eq(X).until($,false)": function($, test) {
				var x = 0;
				var $x = test.element($('<div>').add('<span>').add('<p>'));
				var size=3;
				test.assertEquals("test selection has wrong size", 3, $x.size());
				var callback = function(y){
					test.assertEquals("callback argument must be iteration number", x,y);
					x++; test.check();
					if (x > 1000) { $x.unrepeat(); throw "repeat loop running infinitely"; };
				};
				var X=$.X();
				var TIC = $x.repeat(X);
				test.assertNotEquals("instant for-loop should return TIC object during the loop", $x, TIC);
				var tic2 = TIC.eq(X).then(callback);
				test.assertEquals("instant .repeat() should have fired once for now", 1, x);
				test.assertEquals("instant for-loop should return same TIC object while loop not finished", tic2, TIC);
				var $y = TIC.until($,false);
				test.assertEquals("instant .repeat() should have fired exactly "+(size+1)+" times", size+1, x);
				test.assertNotEquals("instant for-loop should return a jQuery object after instant loop", $y, TIC);
				test.assertNotEquals("jQuery object after instant loop should not be the starting one", $x, $y);
				test.assertEquals("jQuery object after instant loop should be empty jQuery selection", 0, $y.size());
				window.setTimeout(function(){
					test.assertEquals(".repeat() should not have fired anymore", size+1, x);
					test.done();
				}, 100);
			},
			
			".repeat().doSomething().next().until($)": function($, test) {
				var x = 0;
				var $x = test.element('<div><p></p><span></span><div></div></div>').children();
				var callback = function(){
					x++; test.check();
					if (x > 1000) { $x.unrepeat(); throw "repeat loop running infinitely"; };
				};
				var $y = $x.eq(0).repeat().then(callback).next().until($);
				test.assertEquals("instant .repeat() should have fired for each element", 3, x);
				test.assertEquals("instant loop must return with empty jQuery object", 0, $y.length);
				$y.then(function(){
					test.done();
				});
			},
	
		},
		
		"infinite for-loop": {

			".repeat().until(false) % .unrepeat()": function($, test) {
				var x = 0;
				var count = 10;
				var stopAfter = count/2;
				var $x = test.element('<div>');
				var callback = function(y){
					test.assertEquals("callback argument must be iteration number", x,y);
					x++; test.check();
					if (x > 1000) { $x.unrepeat(); throw "repeat loop running infinitely"; };
				};
				var TIC = $x.repeat(function(y){
					if (y >= stopAfter-1) {
						$x.unrepeat();
					}
				}).then(callback).until(false);
				test.assertNotEquals("unfinished for-loop should not return original jQuery object", $x, TIC);
				TIC.then(function(){
					test.fail("can never call something after infinite loops");
				});
				test.assertEquals(".repeat() should have fired exactly "+stopAfter+" times", stopAfter, x);
				window.setTimeout(function(){
					test.assertEquals("callback should not have fired anymore", stopAfter, x);
					test.done();
				}, 100);
			}
		
		},

		"event-loop with open end": {

			".repeat(event,callback)": function($, test) {
				var x = 0;
				var count = 10;
				var event = 'myEvent';
				var $x = test.element('<div>');
				var callback = function(y){
					test.assertEquals("callback argument must be iteration number", x,y);
					x++; test.check();
					if (x > 1000) { $x.unrepeat(); throw "repeat loop running infinitely"; };
				};
				$x.repeat(event,callback);
				test.assertEquals(".repeat(event) should wait for event to be triggered", 0, x);
				for (var i=1; i<=count; i++) {
					$x.trigger(event);
					test.assertEquals(".repeat(event) should be fired on each trigger", i, x);
				}
				window.setTimeout(function(){
					test.assertEquals(".repeat(event) should not have been fired again", count, x);
					for (var i=1; i<=count; i++) {
						$x.trigger(event);
						test.assertEquals(".repeat(event) should wait for event to be triggered", i+count, x);
					}
					$x.unrepeat();
					$x.trigger(event);
					test.assertEquals(".repeat(event) should not fire anymore", 2*count, x);
					$x.trigger(event);
					window.setTimeout(function(){
						$x.trigger(event);
						test.assertEquals("callback should not have fired anymore", 2*count, x);
						test.done();
					}, 100);
				}, 1);			
			},
			
			".repeat(event,true,callback)": function($, test) {
				var x = 0;
				var count = 10;
				var event = 'myEvent';
				var $x = test.element('<div>');
				var callback = function(y){
					test.assertEquals("callback argument must be iteration number", x,y);
					x++; test.check();
					if (x > 1000) { $x.unrepeat(); throw "repeat loop running infinitely"; };
				};
				$x.repeat(event,true,callback);
				test.assertEquals(".repeat(event) should have been fired already", 1, x);
				for (var i=1; i<=count; i++) {
					$x.trigger(event);
					test.assertEquals(".repeat(event) should be fired on each trigger", i+1, x);
				}
				window.setTimeout(function(){
					test.assertEquals(".repeat(event) should not have been fired again", count+1, x);
					for (var i=1; i<=count; i++) {
						$x.trigger(event);
						test.assertEquals(".repeat(event) should wait for event to be triggered", i+count+1, x);
					}
					$x.unrepeat();
					$x.trigger(event);
					test.assertEquals(".repeat(event) should not fire anymore", 2*count+1, x);
					$x.trigger(event);
					window.setTimeout(function(){
						$x.trigger(event);
						test.assertEquals("callback should not have fired anymore", 2*count+1, x);
						test.done();
					}, 100);
				}, 1);			
			},
			
			".repeat(event)._": function($, test) {
				var $x = test.element('<div>');
				var TIC = $x.repeat('myEvent');
				var _ = TIC._;
				test.assertNotEquals("tic must be new object", $x, TIC);
				test.assertEquals("underscore must return original object", $x, _);
				test.done();
			},

		},
		
		"event-loop until countdown": {

			".repeat(event,callback).until(count)": function($, test) {
				var x = 0;
				var count = 10;
				var event = 'myEvent';
				var $x = test.element('<div>');
				var callback = function(y){
					test.assertEquals("callback argument must be iteration number", x,y);
					x++; test.check();
					if (x > 1000) { $x.unrepeat(); throw "repeat loop running infinitely"; };
				};
				var TIC = $x.repeat(event,callback).until(count);
				test.assertNotEquals("event-triggered loop should not return original jQuery object", $x, TIC);
				for (var i=0; i<count; i++) {
					test.assertEquals(".repeat(event) should wait for event to be triggered", i, x);
					$x.trigger(event);
				}
				test.assertEquals(".repeat(event) should been fired exactly " + count + " times", count, x);
				$x.trigger(event);
				test.assertEquals(".repeat(event) should not fire anymore", count, x);
				$x.trigger(event);
				window.setTimeout(function(){
					$x.trigger(event);
					test.assertEquals("callback should not have fired anymore", count, x);
					test.done();
				}, 100);
			},
			
			".repeat(event,true,callback).until(count)": function($, test) {
				var x = 0;
				var count = 10;
				var event = 'myEvent';
				var $x = test.element('<div>');
				var callback = function(y){
					test.assertEquals("callback argument must be iteration number", x,y);
					x++; test.check();
					if (x > 1000) { $x.unrepeat(); throw "repeat loop running infinitely"; };
				};
				var TIC = $x.repeat(event,true,callback).until(count);
				test.assertNotEquals("event-triggered loop should not return original jQuery object", $x, TIC);
				test.assertEquals(".repeat(event,true) should have been fired already", 1, x);
				for (var i=1; i<=count; i++) {
					test.assertEquals(".repeat(event) should wait for event to be triggered", i, x);
					$x.trigger(event);
				}
				test.assertEquals(".repeat(event) should been fired exactly " + count + " times", count, x);
				$x.trigger(event);
				test.assertEquals(".repeat(event) should not fire anymore", count, x);
				$x.trigger(event);
				window.setTimeout(function(){
					$x.trigger(event);
					test.assertEquals("callback should not have fired anymore", count, x);
					test.done();
				}, 100);
			},
			
			".repeat(ev1).wait(ev2).until(count)": function($, test) {
				var x = 0, y = 0, z = 0;
				var $x = test.element('<div>');
				var TIC = $x.repeat('ev1', function(){
						x++;
						$x.trigger('ev2');
						test.assertEquals('states x,y must not be mixed up by ev1:ev2', x-1, y);
						test.assertEquals('states x,z must not be mixed up by ev1:ev2', x-1, z);
						$x.trigger('ev1');
						test.assertEquals('states x,y must not be mixed up by ev1:ev1', x-1, y);
						test.assertEquals('states x,z must not be mixed up by ev1:ev1', x-1, z);
					}).wait('ev2', function(){
						y++;
						$x.trigger('ev1');
						test.assertEquals('states y,x must not be mixed up by ev2:ev1', y, x);
						test.assertEquals('states y,z must not be mixed up by ev2:ev1', y-1, z);
						$x.trigger('ev2');
						test.assertEquals('states y,x must not be mixed up by ev2:ev2', y, x);
						test.assertEquals('states y,z must not be mixed up by ev2:ev2', y-1, z);
					}).then(function(){
						z++;
					}).until(3);
				
				test.assertNotEquals("event-triggered loop should not return original jQuery object", $x, TIC);
				test.assertEquals(".repeat(ev1) should not have been fired already", 0, x);
				test.assertEquals("not yet waiting for .wait(ev2)", 0, y);
				$x.trigger('ev2');
				test.assertEquals("ev2 does nothing with .repeat() while waiting for ev1", 0, x);
				test.assertEquals("ev2 does nothing with .wait() while waiting for ev1", 0, y);
				$x.trigger('ev1');
				test.assertEquals(".repeat() fired once", 1, x);
				test.assertEquals(".wait() still waiting for first trigger", 0, y);
				$x.trigger('ev1');
				test.assertEquals("ev1 does nothing with .repeat() while waiting for ev2", 1, x);
				test.assertEquals("ev1 does nothing with .wait() while waiting for ev2", 0, y);
				$x.trigger('ev2');
				test.assertEquals(".repeat() has been fired in the meantime", 2, x);
				test.assertEquals(".wait() fired once", 1, y);
				$x.trigger('ev1');
				test.assertEquals("ev1 does nothing with .repeat() while waiting for ev2", 2, x);
				test.assertEquals("ev1 does nothing with .wait() while waiting for ev2", 1, y);
				$x.trigger('ev2');
				test.assertEquals(".repeat() has been fired in the meantime", 3, x);
				test.assertEquals(".wait() fired twice", 2, y);
				$x.trigger('ev2');
				test.assertEquals(".repeat() cannot fire because of end of loop", 3, x);
				test.assertEquals(".wait() fired again", 3, y);
				$x.trigger('ev1');
				test.assertEquals("ev1 does nothing with .repeat() after loop", 3, x);
				test.assertEquals("ev1 does nothing with .wait() after loop", 3, y);
				$x.trigger('ev2');
				test.assertEquals("ev2 does nothing with .repeat() after loop", 3, x);
				test.assertEquals("ev2 does nothing with .wait() after loop", 3, y);
				$x.trigger('ev1');
				test.assertEquals("ev1 still does nothing with .repeat() after loop", 3, x);
				test.assertEquals("ev1 still does nothing with .wait() after loop", 3, y);
				$x.trigger('ev2');
				test.assertEquals("ev2 still does nothing with .repeat() after loop", 3, x);
				test.assertEquals("ev2 still does nothing with .wait() after loop", 3, y);
				test.done();
			},
			
		},
		
		"interval-loop with open end": {

			".repeat(interval,callback)": function($, test) {
				var x = 0;
				var interval = 100;
				var $x = test.element('<div>');
				var callback = function(y){
					test.assertEquals("callback argument must be iteration number", x,y);
					x++; test.check();
					if (x > 1000) { $x.unrepeat(); throw "repeat loop running infinitely"; };
				};
				var TIC = $x.repeat(interval,callback);
				test.assertNotEquals("interval-triggered loop should not return original jQuery object", $x, TIC);
				test.assertEquals(".repeat(interval) should wait for interval", 0, x);
				window.setTimeout(function(){
					test.assertEquals(".repeat(event) should still wait for interval", 0, x);
					window.setTimeout(function(){
						test.assertEquals(".repeat(event) should have been triggered", 1, x);
						window.setTimeout(function(){
							test.assertEquals(".repeat(event) should have been triggered again", 2, x);
							$x.unrepeat();
							window.setTimeout(function(){
								test.assertEquals(".repeat(event) should not fire anymore", 2, x);
								test.done();
							}, 2*interval);
						}, interval);
					}, interval);
				}, interval / 2);			
			},
			
			".repeat(interval,true,callback)": function($, test) {
				var x = 0;
				var interval = 100;
				var $x = test.element('<div>');
				var callback = function(y){
					test.assertEquals("callback argument must be iteration number", x,y);
					x++; test.check();
					if (x > 1000) { $x.unrepeat(); throw "repeat loop running infinitely"; };
				};
				var TIC = $x.repeat(interval,true,callback);
				test.assertNotEquals("interval-triggered loop should not return original jQuery object", $x, TIC);
				test.assertEquals(".repeat(interval) should have been run already", 1, x);
				window.setTimeout(function(){
					test.assertEquals(".repeat(event) should wait for interval", 1, x);
					window.setTimeout(function(){
						test.assertEquals(".repeat(event) should have been triggered", 2, x);
						window.setTimeout(function(){
							test.assertEquals(".repeat(event) should have been triggered again", 3, x);
							$x.unrepeat();
							window.setTimeout(function(){
								test.assertEquals(".repeat(event) should not fire anymore", 3, x);
								test.done();
							}, 2*interval);
						}, interval);
					}, interval);
				}, interval / 2);			
			}
			
		},
		
		"interval-loop until countdown": {

			".repeat(interval,callback).until(count)": function($, test) {
				var x = 0;
				var count = 2;
				var interval = 100;
				var $x = test.element('<div>');
				var callback = function(y){
					test.assertEquals("callback argument must be iteration number", x,y);
					x++; test.check();
					if (x > 1000) { $x.unrepeat(); throw "repeat loop running infinitely"; };
				};
				var TIC = $x.repeat(interval,callback).until(count);
				test.assertNotEquals("interval-triggered loop should not return original jQuery object", $x, TIC);
				test.assertEquals(".repeat(interval) should wait for interval", 0, x);
				window.setTimeout(function(){
					test.assertEquals(".repeat(event) should still wait for interval", 0, x);
					window.setTimeout(function(){
						test.assertEquals(".repeat(event) should have been triggered", 1, x);
						window.setTimeout(function(){
							test.assertEquals(".repeat(event) should not have been triggered again", 2, x);
							window.setTimeout(function(){
								test.assertEquals(".repeat(event) should not fire anymore", 2, x);
								TIC.then(function(){
									test.done();
								});
							}, 2*interval);
						}, interval);
					}, interval);
				}, interval / 2);			
			},		
	
			".repeat(interval,true,callback).until(count)": function($, test) {
				var x = 0;
				var count = 2;
				var interval = 100;
				var $x = test.element('<div>');
				var callback = function(y){
					test.assertEquals("callback argument must be iteration number", x,y);
					x++; test.check();
					if (x > 1000) { $x.unrepeat(); throw "repeat loop running infinitely"; };
				};
				var TIC = $x.repeat(interval,true,callback).until(count);
				test.assertNotEquals("interval-triggered loop should not return original jQuery object", $x, TIC);
				test.assertEquals(".repeat(interval) should have been run already", 1, x);
				window.setTimeout(function(){
					test.assertEquals(".repeat(event) should wait for interval", 1, x);
					window.setTimeout(function(){
						test.assertEquals(".repeat(event) should have been triggered", 2, x);
						window.setTimeout(function(){
							test.assertEquals(".repeat(event) should not have been triggered again", 2, x);
							window.setTimeout(function(){
								test.assertEquals(".repeat(event) should not fire anymore", 2, x);
								TIC.then(function(){
									test.done();
								});
							}, 2*interval);
						}, interval);
					}, interval);
				}, interval / 2);			
			},		
	
			"instant .repeat(interval,true).until(1)": function($, test) {
				var x = 0;
				var interval = 100;
				var $x = test.element('<div>');
				var callback = function(y){
					test.assertEquals("callback argument must be iteration number", x,y);
					x++; test.check();
					if (x > 1000) { $x.unrepeat(); throw "repeat loop running infinitely"; };
				};
				var TIC = $x.repeat(interval,true,callback).until(1);
				test.assertEquals("instantly stopped interval-triggered loop should return original jQuery object", $x, TIC);
				test.assertEquals(".repeat(interval) should have been run once", 1, x);
				window.setTimeout(function(){
					test.assertEquals(".repeat(event) should not have been triggered again", 1, x);
					test.done();
				}, 2*interval);
			}
			
		},

		"accessing interim states": {
		
			"tic=$('.some').repeat(X).eq(X).wait(timeout).until(count) + $(tic)": function($, test){
				var $x = test.element('<div><p>1</p><p>2</p><p>3</p></div>');
				var timeout = 100;
				var size = 3;
				test.assertEquals("test object has too less children", size, $x.children().size());
				
				var X=$.X();
				var tic = $x.children().repeat(X).eq(X).wait(timeout).until(size);
				
				test.assertNotEquals("waiting tic is not the same as original object", $x, tic);
				
				window.setTimeout(function(){
					test.assertEquals("tic should stay on one child", 1, $(tic).size());
					test.assertEquals("tic should stay on first child", "1", $(tic).text());
					window.setTimeout(function(){
						test.assertEquals("tic should stay on one child", 1, $(tic).size());
						test.assertEquals("tic should stay on second child", "2", $(tic).text());
						window.setTimeout(function(){
							test.assertEquals("tic should stay on one child", 1, $(tic).size());
							test.assertEquals("tic should stay on third child", "3", $(tic).text());
							window.setTimeout(function(){
								test.assertEquals("tic should still stay on third children", "3", $(tic).text());
								var $y = tic.next();
								test.assertNotEquals("return value of instant call to .next() must be original object", tic, $y);
								test.assertEquals(".next() should return empty set after last child", 0, $y.size());
								test.done();
							}, timeout);
						}, timeout);
					}, timeout);
				}, timeout / 2);
			},
			
			"$('.multiple').repeat(event).next() + $('#single').trigger(event)": function($, test){
				var $x = test.element('<div><p>1</p><p>2</p><p>3</p></div>').children();
				var event = 'myEvent';
				var $y=null;
				var tic = $x.repeat(event).then(function(){$y=this;}).next().until(2);
				test.assertNotEquals("waiting tic is not the same as original object", $x, tic);
				test.assertEquals("tic should stay on all elements", 3, $(tic).size());
				$x.eq(2).trigger(event);
				test.assertEquals("tic should stay again on all elements", '123', $y.text());
				$x.eq(1).trigger(event);
				test.assertEquals("tic should have used all elements again", '123', $y.text());
				$x.eq(0).trigger(event);
				test.assertEquals("tic should stay on last element set after .next()", '23', $(tic).text());
				$y = tic.then();
				test.assertEquals("after loop last context goes on", '23', $y.text());
				test.done();
			},
			
			"$('.multiple').repeat(event).next().until(null,true) + $('#single').trigger(event)": function($, test){
				var $x = test.element('<div><p>1</p><p>2</p><p>3</p></div>').children();
				var event = 'myEvent';
				var $y=null;
				var tic = $x.repeat(event).next().until(function(){$y=this; return null;},true);
				test.assertNotEquals("waiting tic is not the same as original object", $x, tic);
				test.assertEquals("tic should stay on all elements", 3, $(tic).size());
				$x.eq(2).trigger(event);
				test.assertEquals("tic should have used .next() elements only", '23', $y.text());
				test.assertEquals("tic should stay on .next() elements only", '23', $(tic).text());
				$x.eq(0).trigger(event);
				test.assertEquals("repeat should again have used .next() elements", '3', $y.text());
				test.assertEquals("repeat should again stay on .next() elements", '3', $(tic).text());
				$x.eq(2).unrepeat();
				test.assertEquals(".unrepeat() should not change the context", '3', $y.text());
				$x.eq(2).trigger(event);
				test.assertEquals("tic should ignore trigger from unrepeated element", '3', $(tic).text());
				$x.eq(1).trigger(event);
				test.assertEquals("repeat should go on with new context", '', $y.text());
				$y = tic.then();
				test.assertEquals("after loop last context goes on", 0, $y.size());
				test.done();
			},
			
			"$('.multiple').repeat().one(event) + $('#single').unrepeat()": function($, test){
				var $x = test.element('<div><p>1</p><p>2</p><p>3</p></div>').children();
				var event1 = 'myEvent';
				var event2 = 'myOtherEvent';
				var x=0, y=0;
				var callback1 = function(){ x++; test.check(); };
				var callback2 = function(){ test.assertEquals("context must contain first triggered element only", 1, this.size()); y++; test.check(); };
				var tic = $x.repeat(event1,callback1).one(event2).then(callback2).until(3);
				$x.eq(2).trigger(event1);
				test.assertEquals("repeat started once", 1, x);			
				test.assertEquals("tic should stay on all elements", '123', $(tic).text());			
				test.assertEquals(".one() should wait for trigger", 0, y);			
				$x.eq(1).trigger(event1);
				test.assertEquals("tic should still stay on all elements in first repeat", '123', $(tic).text());			
				test.assertEquals(".one() should still wait for trigger", 0, y);
				$x.eq(2).trigger(event2);
				test.assertEquals(".one() should have fired once", 1, y);
				test.assertEquals("repeat started over", 2, x);
				test.assertEquals("tic should wait again for all elements", '123', $(tic).text());
				$x.eq(1).trigger(event2);
				test.assertEquals(".one() should have fired again", 2, y);
				test.assertEquals("repeat still waiting for third event2", 2, x);
				test.assertEquals("tic should wait for all elements again", '123', $(tic).text());
				$x.eq(0).unrepeat().trigger(event1);
				test.assertEquals("repeat still waiting for third event", 2, x);
				test.assertEquals(".one() still waiting for third event", 2, y);
				test.assertEquals("tic should wait for remaining elements", '23', $(tic).text());
				$x.eq(1).trigger(event2);
				test.assertEquals("repeat should ignore event2 when waiting for event1", 2, x);
				test.assertEquals(".one() still waiting for third event2 after event1", 2, y);
				test.assertEquals("tic should wait for remaining elements", '23', $(tic).text());
				$x.eq(1).trigger(event1);
				test.assertEquals("repeat started over", 3, x);
				test.assertEquals(".one() should still wait for third event2", 2, y);
				test.assertEquals("tic should wait again for all remaining elements", '23', $(tic).text());
				$x.eq(1).trigger(event2);
				test.assertEquals(".one() should have fired third time", 3, y);
				test.assertEquals("repeat did not start over", 3, x);
				test.assertEquals("tic should have left the loop with single element", '2', $(tic).text());
				tic.then(function(){
					test.done();
				});
				test.fail('tic should have left the loop');
			}
			
		},
		
		"deferred loops": {
			
			".wait(timeout).repeat().until(count)": function($, test){
				var $x = test.element('<div>');
				var x=0, y=0;
				var callback1 = function(){ x++; test.check(); };
				var callback2 = function(){ y++; test.check(); };
				$x.wait(1).then(callback1).repeat(callback2).until(3);
				test.assertEquals("waiting for little timeout", 0, x);
				test.assertEquals("waiting for loop start", 0, y);
				window.setTimeout(function(){
					test.assertEquals(".wait() passed by", 1, x);
					test.assertEquals(".repeat()..until() also ended", 3, y);
					test.done();
				}, 10);
			},

			".wait(timeout) +…+ .repeat().until(count)": function($, test){
				var $x = test.element('<div>');
				var x=0, y=0;
				var callback1 = function(){ x++; test.check(); };
				var callback2 = function(){ y++; test.check(); };
				var tic = $x.wait(1,callback1);
				test.assertEquals("waiting for little timeout", 0, x);
				test.assertEquals("waiting for loop start", 0, y);
				window.setTimeout(function(){
					test.assertEquals(".wait() passed by", 1, x);
					test.assertEquals(".repeat() not yet defined", 0, y);
					tic.repeat(callback2).until(3);
					test.assertEquals(".wait() is past", 1, x);
					test.assertEquals(".repeat()..until() also ended", 3, y);
					test.done();
				}, 10);
			},

			".wait(event).repeat(event).then(callback)": function($, test){
				var $x = test.element('<div>');
				var x=0, y=0;
				var callback1 = function(){ x++; test.check(); };
				var callback2 = function(){ y++; test.check(); };
				$x.wait('evt', callback1).repeat('evt').then(callback2);
				test.assertEquals("waiting for event", 0, x);
				test.assertEquals("loop start waiting for event", 0, y);
				$x.trigger('evt');
				test.assertEquals(".wait() passed by", 1, x);
				test.assertEquals("loop start still waiting for event", 0, y);
				$x.trigger('evt');
				test.assertEquals(".wait() is past", 1, x);
				test.assertEquals(".repeat()..until() run once", 1, y);
				$x.trigger('evt');
				test.assertEquals(".wait() is past", 1, x);
				test.assertEquals(".repeat()..until() run again", 2, y);
				$x.trigger('evt');
				test.assertEquals(".wait() is past", 1, x);
				test.assertEquals("and again...", 3, y);
				test.done();
			},
			
		},
		
		"nested loops":  {
		
			".repeat().repeat().until(callback).until(count)": function($,test) {
				var x=0, y=0;
				$('<div>').repeat(function(i){
					test.assertEquals("outer loop count wrong", x, i);
					x++;
				}).repeat(function(i,j){
					test.assertEquals("outer loop count wrong", x, j+1);
					test.assertEquals("inner loop count wrong", y, j*(j+1)/2+i);
					y++;
				}).until(function(){
					return x;
				}).until(10)
				._
				.then(function(){
					test.assertEquals("outer loop count wrong", 10, x);
					test.assertEquals("inner loop count wrong", 55, y);
					test.done();
				});
			},
			
			".repeat(event).repeat().until(callback).until(count)": function($,test) {
				var x=0, y=0;
				$('<div>').repeat('evt', function(i){
					test.assertEquals("outer loop count wrong", x, i);
					x++;
				}).repeat(function(i,j){
					test.assertEquals("outer loop count wrong", x, j+1);
					test.assertEquals("inner loop count wrong", y, j*(j+1)/2+i);
					y++;
				}).until(function(){
					return x;
				}).until(10)
				._
				.repeat().trigger('evt').until(5)
				.then(function(){
					test.assertEquals("outer loop count wrong", 5, x);
					test.assertEquals("inner loop count wrong", 15, y);
				})
				.repeat().trigger('evt').until(10)
				.then(function(){
					test.assertEquals("outer loop count wrong", 10, x);
					test.assertEquals("inner loop count wrong", 55, y);
					test.done();
				});
			},

			".repeat(interval).repeat().until(callback).until(count)": function($,test) {
				var x=0, y=0;
				$('<div>').repeat(10, function(i){
					test.assertEquals("outer loop count wrong", x, i);
					x++;
				}).repeat(function(i,j){
					test.assertEquals("outer loop count wrong", x, j+1);
					test.assertEquals("inner loop count wrong", y, j*(j+1)/2+i);
					y++;
				}).until(function(){
					return x;
				}).until(10)
				._
				.wait(500)
				.then(function(){
					test.assertEquals("outer loop count wrong", 10, x);
					test.assertEquals("inner loop count wrong", 55, y);
					test.done();
				});
			},

			".repeat().repeat(event).until(callback).until(count)": function($,test) {
				var x=0, y=0;
				$('<div>').repeat(function(i){
					test.assertEquals("outer loop count wrong", x, i);
					x++;
				}).repeat('evt', function(i,j){
					test.assertEquals("outer loop count wrong", x, j+1);
					test.assertEquals("inner loop count wrong", y, j*(j+1)/2+i);
					y++;
				}).until(function(){
					return x;
				}).until(10)
				._
				.repeat().trigger('evt').until(20)
				.then(function(){
					test.assertEquals("outer loop count wrong", 6, x);
					test.assertEquals("inner loop count wrong", 20, y);
				})
				.repeat().trigger('evt').until(20)
				.then(function(){
					test.assertEquals("outer loop count wrong", 9, x);
					test.assertEquals("inner loop count wrong", 40, y);
				})
				.repeat().trigger('evt').until(20)
				.then(function(){
					test.assertEquals("outer loop count wrong", 10, x);
					test.assertEquals("inner loop count wrong", 55, y);
					test.done();
				});
			},

			".repeat(event).repeat(event).until(callback).until(count)": function($,test) {
				var x=0, y=0;
				$('<div>').repeat('evt', function(i){
					test.assertEquals("outer loop count wrong", x, i);
					x++;
				}).repeat('evt', function(i,j){
					test.assertEquals("outer loop count wrong", x, j+1);
					test.assertEquals("inner loop count wrong", y, j*(j+1)/2+i);
					y++;
				}).until(function(){
					return x;
				}).until(10)
				._
				.repeat().trigger('evt').until(20)
				.then(function(){
					test.assertEquals("outer loop count wrong", 6, x);
					test.assertEquals("inner loop count wrong", 19, y);
				})
				.repeat().trigger('evt').until(20)
				.then(function(){
					test.assertEquals("outer loop count wrong", 9, x);
					test.assertEquals("inner loop count wrong", 39, y);
				})
				.repeat().trigger('evt').until(20)
				.then(function(){
					test.assertEquals("outer loop count wrong", 10, x);
					test.assertEquals("inner loop count wrong", 55, y);
					test.done();
				});
			},

			".repeat(interval).repeat(event).until(callback).until(count)": function($,test) {
				var x=0, y=0;
				$('<div>').repeat(10, function(i){
					test.assertEquals("outer loop count wrong", x, i);
					x++;
				}).repeat('evt', function(i,j){
					test.assertEquals("outer loop count wrong", x, j+1);
					test.assertEquals("inner loop count wrong", y, j*(j+1)/2+i);
					y++;
				}).until(function(){
					return x;
				}).until(10)
				._
				.repeat().trigger('evt').until(20)
				.then(function(){
					test.assertEquals("outer loop must wait", 0, x);
					test.assertEquals("inner loop must wait", 0, y);
				})
				.wait(50).repeat().trigger('evt').until(20)
				.then(function(){
					test.assertEquals("outer loop count wrong", 2, x);
					test.assertEquals("inner loop count wrong", 3, y);
				})
				.wait(50).repeat().trigger('evt').until(20)
				.then(function(){
					test.assertEquals("outer loop count wrong", 4, x);
					test.assertEquals("inner loop count wrong", 10, y);
				})
				.repeat().wait(50).repeat().trigger('evt').until(20).until(3)
				.then(function(){
					test.assertEquals("outer loop count wrong", 10, x);
					test.assertEquals("inner loop count wrong", 55, y);
					test.done();
				});
			},

			".repeat().repeat(interval).until(callback).until(count)": function($,test) {
				var x=0, y=0;
				$('<div>').repeat(function(i){
					test.assertEquals("outer loop count wrong", x, i);
					x++;
				}).repeat(10, function(i,j){
					test.assertEquals("outer loop count wrong", x, j+1);
					test.assertEquals("inner loop count wrong", y, j*(j+1)/2+i);
					y++;
				}).until(function(){
					return x;
				}).until(5)
				._
				.wait(500)
				.then(function(){
					test.assertEquals("outer loop count wrong", 5, x);
					test.assertEquals("inner loop count wrong", 15, y);
					test.done();
				});
			},

			".repeat(event).repeat(interval).until(callback).until(count)": function($,test) {
				var x=0, y=0;
				$('<div>').repeat('evt', function(i){
					test.assertEquals("outer loop count wrong", x, i);
					x++;
				}).repeat(10, function(i,j){
					test.assertEquals("outer loop count wrong", x, j+1);
					test.assertEquals("inner loop count wrong", y, j*(j+1)/2+i);
					y++;
				}).until(function(){
					return x;
				}).until(5)
				._
				.trigger('evt')
				.then(function(){
					test.assertEquals("outer loop count wrong", 1, x);
					test.assertEquals("inner loop count wrong", 0, y);
				}).wait(50)
				.then(function(){
					test.assertEquals("outer loop count wrong", 1, x);
					test.assertEquals("inner loop count wrong", 1, y);
				})
				.repeat().trigger('evt').wait(50).until(10)
				.then(function(){
					test.assertEquals("outer loop count wrong", 5, x);
					test.assertEquals("inner loop count wrong", 15, y);
					test.done();
				});
			},

			".repeat(interval).repeat(interval).until(callback).until(count)": function($,test) {
				var x=0, y=0;
				$('<div>').repeat(10, function(i){
					test.assertEquals("outer loop count wrong", x, i);
					x++;
				}).repeat(10, function(i,j){
					test.assertEquals("outer loop count wrong", x, j+1);
					test.assertEquals("inner loop count wrong", y, j*(j+1)/2+i);
					y++;
				}).until(function(){
					return x;
				}).until(5)
				._
				.wait(500)
				.then(function(){
					test.assertEquals("outer loop count wrong", 5, x);
					test.assertEquals("inner loop count wrong", 15, y);
					test.done();
				});
			},

		},
		
};
