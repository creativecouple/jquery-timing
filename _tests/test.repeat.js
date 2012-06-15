suite = {
		
		"instant open for-loop": null,
		
		".repeat(callback) + .unrepeat()": function($, test) {
			var x = 0;
			var $x = $('<div>');
			var callback = function(){
				x++; test.check();
				if (x > 1000) { $x.unrepeat(); throw "repeat loop running infinitely"; };
			}
			var TIC = $x.repeat(callback);
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
			var $x = $('<div>');
			var callback = function(){
				x++; test.check();
				if (x > 1000) { $x.unrepeat(); throw "repeat loop running infinitely"; };
			}
			var TIC = $x.repeat()
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
			var $x = $('<div>');
			var callback = function(){
				x++; test.check();
				if (x > 1000) { $x.unrepeat(); throw "repeat loop running infinitely"; };
			}
			var TIC = $x.repeat()
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
			var $x = $('<div>');
			var callback = function(){
				x++; test.check();
				if (x > 1000) { $x.unrepeat(); throw "repeat loop running infinitely"; };
			}
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

		"open for-loop with delay": null,
		
		".repeat(callback).wait(timeout) + .unrepeat()": function($, test) {
			var x = 0;
			var timeout = 100;
			var $x = $('<div>');
			var callback = function(y){
				test.assertEquals("callback argument must be iteration number", x,y);
				x++; test.check();
				if (x > 1000) { $x.unrepeat(); throw "repeat loop running infinitely"; };
			}
			var TIC = $x.repeat(callback).wait(timeout);
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
			var $x = $('<div>');
			var callback = function(y){
				test.assertEquals("callback argument must be iteration number", x,y);
				x++; test.check();
				if (x > 1000) { $x.unrepeat(); throw "repeat loop running infinitely"; };
			}
			var TIC = $x.repeat().then(callback).wait(timeout);
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
			var $x = $('<div>');
			var callback = function(y){
				test.assertEquals("callback argument must be iteration number", x,y);
				x++; test.check();
				if (x > 1000) { $x.unrepeat(); throw "repeat loop running infinitely"; };
			}
			var TIC = $x.repeat(callback).wait(timeout);
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
			var $x = $('<div>');
			var callback = function(y){
				test.assertEquals("callback argument must be iteration number", x,y);
				x++; test.check();
				if (x > 1000) { $x.unrepeat(); throw "repeat loop running infinitely"; };
			}
			var TIC = $x.repeat().then(callback).wait(timeout);
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
		
		"for-loop until countdown": null,

		".repeat(callback).until(count)": function($, test) {
			var x = 0;
			var count = 10;
			var $x = $('<div>');
			var callback = function(y){
				test.assertEquals("callback argument must be iteration number", x,y);
				x++; test.check();
				if (x > 1000) { $x.unrepeat(); throw "repeat loop running infinitely"; };
			}
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
			var $x = $('<div>');
			var callback = function(y){
				test.assertEquals("callback argument must be iteration number", x,y);
				x++; test.check();
				if (x > 1000) { $x.unrepeat(); throw "repeat loop running infinitely"; };
			}
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
			var $x = $('<div>');
			var callback = function(){
				x++; test.check();
				if (x > 1000) { $x.unrepeat(); throw "repeat loop running infinitely"; };
			}
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
			var $x = $('<div>');
			var callback = function(y){
				test.assertEquals("callback argument must be iteration number", x,y);
				x++; test.check();
				if (x > 1000) { $x.unrepeat(); throw "repeat loop running infinitely"; };
			}
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
			var $x = $('<div>');
			var callback = function(y){
				test.assertEquals("callback argument must be iteration number", x,y);
				x++; test.check();
				if (x > 1000) { $x.unrepeat(); throw "repeat loop running infinitely"; };
			}
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
			var $x = $('<div>');
			var callback = function(){
				x++; test.check();
				if (x > 1000) { $x.unrepeat(); throw "repeat loop running infinitely"; };
			}
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

		"for-loop until condition callback": null,

		".repeat(callback).until(boolean condition)": function($, test) {
			var x = 0;
			var count = 10;
			var stopAfter = count/2;
			var $x = $('<div>');
			var callback = function(y){
				test.assertEquals("callback argument must be iteration number", x,y);
				x++; test.check();
				if (x > 1000) { $x.unrepeat(); throw "repeat loop running infinitely"; };
			}
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
			var $x = $('<div>');
			var callback = function(y){
				test.assertEquals("callback argument must be iteration number", x,y);
				x++; test.check();
				if (x > 1000) { $x.unrepeat(); throw "repeat loop running infinitely"; };
			}
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
			var $x = $('<div>');
			var callback = function(y){
				test.assertEquals("callback argument must be iteration number", x,y);
				x++; test.check();
				if (x > 1000) { $x.unrepeat(); throw "repeat loop running infinitely"; };
			}
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
			var $x = $('<div>');
			var callback = function(y){
				test.assertEquals("callback argument must be iteration number", x,y);
				x++; test.check();
				if (x > 1000) { $x.unrepeat(); throw "repeat loop running infinitely"; };
			}
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
		},
		
		"for-loop until empty selection": null,

		".repeat(X).eq(X).until()": function($, test) {
			var x = 0;
			var $x = $('<div>').add('<span>').add('<p>');
			var size=3;
			test.assertEquals("test selection has wrong size", 3, $x.size());
			var callback = function(y){
				test.assertEquals("callback argument must be iteration number", x,y);
				x++; test.check();
				if (x > 1000) { $x.unrepeat(); throw "repeat loop running infinitely"; };
			}
			var X=$$();
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
			var $x = $('<div>').add('<span>').add('<p>');
			var size=3;
			test.assertEquals("test selection has wrong size", 3, $x.size());
			var callback = function(){
				x++; test.check();
				if (x > 1000) { $x.unrepeat(); throw "repeat loop running infinitely"; };
			}
			var X=$$();
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
		
		"infinite for-loop": null,

		".repeat().until(false) % .unrepeat()": function($, test) {
			var x = 0;
			var count = 10;
			var stopAfter = count/2;
			var $x = $('<div>');
			var callback = function(y){
				test.assertEquals("callback argument must be iteration number", x,y);
				x++; test.check();
				if (x > 1000) { $x.unrepeat(); throw "repeat loop running infinitely"; };
			}
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
		},

		"event-loop with open end": null,

		".repeat(event,callback)": function($, test) {
			var x = 0;
			var count = 10;
			var event = 'myEvent';
			var $x = $('<div>');
			var callback = function(y){
				test.assertEquals("callback argument must be iteration number", x,y);
				x++; test.check();
				if (x > 1000) { $x.unrepeat(); throw "repeat loop running infinitely"; };
			};
			var TIC = $x.repeat(event,callback);
			test.assertEquals(".repeat(event) should wait for event to be triggered", 0, x);
			for (var i=1; i<=count; i++) {
				$x.trigger(event);
				test.assertEquals(".repeat(event) should be fired only once for now because it is open", 1, x);
			}
			window.setTimeout(function(){
				test.assertEquals(".repeat(event) should now have been fired again", 2, x);
				for (var i=1; i<=count; i++) {
					$x.trigger(event);
					test.assertEquals(".repeat(event) should wait for event to be triggered", i+2, x);
				}
				$x.unrepeat();
				$x.trigger(event);
				test.assertEquals(".repeat(event) should not fire anymore", count+2, x);
				$x.trigger(event);
				window.setTimeout(function(){
					$x.trigger(event);
					test.assertEquals("callback should not have fired anymore", count+2, x);
					test.done();
				}, 100);
			}, 1);			
		},
		
		".repeat(event,true,callback)": function($, test) {
			var x = 0;
			var count = 10;
			var event = 'myEvent';
			var $x = $('<div>');
			var callback = function(y){
				test.assertEquals("callback argument must be iteration number", x,y);
				x++; test.check();
				if (x > 1000) { $x.unrepeat(); throw "repeat loop running infinitely"; };
			}			
			var TIC = $x.repeat(event,true,callback);
			test.assertEquals(".repeat(event) should have been fired already", 1, x);
			for (var i=1; i<=count; i++) {
				$x.trigger(event);
				test.assertEquals(".repeat(event) should be fired only once for now because it is open", 1, x);
			}
			window.setTimeout(function(){
				test.assertEquals(".repeat(event) should now have been fired again", 2, x);
				for (var i=1; i<=count; i++) {
					$x.trigger(event);
					test.assertEquals(".repeat(event) should wait for event to be triggered", i+2, x);
				}
				$x.unrepeat();
				$x.trigger(event);
				test.assertEquals(".repeat(event) should not fire anymore", count+2, x);
				$x.trigger(event);
				window.setTimeout(function(){
					$x.trigger(event);
					test.assertEquals("callback should not have fired anymore", count+2, x);
					test.done();
				}, 100);
			}, 1);			
		},
		
		"event-loop until countdown": null,

		".repeat(event,callback).until(count)": function($, test) {
			var x = 0;
			var count = 10;
			var event = 'myEvent';
			var $x = $('<div>');
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
			var $x = $('<div>');
			var callback = function(y){
				test.assertEquals("callback argument must be iteration number", x,y);
				x++; test.check();
				if (x > 1000) { $x.unrepeat(); throw "repeat loop running infinitely"; };
			};
			var TIC = $x.repeat(event,true,callback).until(count);
			test.assertNotEquals("event-triggered loop should not return original jQuery object", $x, TIC);
			test.assertEquals(".repeat(event) should have been fired already", 1, x);
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
		
		"interval-loop with open end": null,

		".repeat(interval,callback)": function($, test) {
			var x = 0;
			var count = 10;
			var interval = 100;
			var $x = $('<div>');
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
			var count = 10;
			var interval = 100;
			var $x = $('<div>');
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
		},		
		
		"interval-loop until countdown": null,

		".repeat(interval,callback).until(count)": function($, test) {
			var x = 0;
			var count = 2;
			var interval = 100;
			var $x = $('<div>');
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
			var $x = $('<div>');
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
			var $x = $('<div>');
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
		},		

};