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
			window.setTimeout(function(){
				test.assertEquals(".repeat() should not have fired anymore", stopAfter, x);
				test.done();
			}, 100);
		},
		
		"for-loop until empty selection": null,

		".repeat(X).eq(X).until()": function($, test) {
			var x = 0;
			var count = 10;
			var $x = $(['<div>','<span>','<p>']);
			var size=3;
			test.assertEquals("test selection has wrong size", 3, $x.size());
			var callback = function(y){
				test.assertEquals("callback argument must be iteration number", x,y);
				x++; test.check();
				if (x > 1000) { $x.unrepeat(); throw "repeat loop running infinitely"; };
			}
			var X=$$();
			var TIC = $x.repeat(X).eq(X).then(callback).until();
			test.assertEquals("instant .repeat() should have fired exactly "+(size+1)+" times", size+1, x);
			window.setTimeout(function(){
				test.assertEquals(".repeat() should not have fired anymore", size+1, x);
				test.done();
			}, 100);
		},
		
		".repeat(X).then(callback).eq(X).until() +…+ .then(callback)": function($, test) {
			var x = 0;
			var count = 10;
			var $x = $(['<div>','<span>','<p>']);
			var size=3;
			test.assertEquals("test selection has wrong size", 3, $x.size());
			var callback = function(){
				x++; test.check();
				if (x > 1000) { $x.unrepeat(); throw "repeat loop running infinitely"; };
			}
			var X=$$();
			var TIC = $x.repeat(X).then(callback).eq(X).until();
			test.assertEquals("instant .repeat() should have fired exactly "+(size+1)+" times", size+1, x);
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
			}).then(callback).until(false).then(function(){
				test.fail("can never call something after infinite loops");
			});
			test.assertEquals(".repeat() should have fired exactly "+stopAfter+" times", stopAfter, x);
			window.setTimeout(function(){
				test.assertEquals("callback should not have fired anymore", stopAfter, x);
				test.done();
			}, 100);
		},

		"event-loop with open end": null,

		"event-loop until countdown": null,

		"event-loop until condition callback": null,

		"event-loop until empty selection": null,

		"interval-loop with open end": null,

		"interval-loop until countdown": null,

		"interval-loop until condition callback": null,

		"interval-loop until empty selection": null,

};