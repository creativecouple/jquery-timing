tests[".join() functionality"] = {
		
	_version: ['1.4'],
		
	"joining empty default queue instantly": {
		
		".join(callback)" : function($, test) {
			var x = 0;
			var callback = function(){ x++; test.check(); };
			var $x = test.element($('<div>').add('<p>'));
			var TIC = $x.join(callback);
			$x.delay(10000);
			test.assertEquals("instant .join() should fire", 1, x);
			test.assertEquals("instant .join() should return original jQuery object", $x, TIC);
			$x.dequeue();
			test.assertEquals("instant .join() should not fire anymore after .dequeue()", 1, x);
			window.setTimeout(function(){
				test.assertEquals(".join() should not have fired anymore", 1, x);
				$x.dequeue();
				test.assertEquals(".join() should not have fired anymore after .dequeue()", 1, x);
				test.done();
			}, 100);
		},
		
		".join().then(callback)" : function($, test) {
			var x = 0;
			var callback = function(){ x++; test.check(); };
			var $x = test.element($('<div>').add('<p>'));
			var TIC = $x.join();
			$x.delay(10000);
			test.assertEquals("TIC must not fire before .then()", 0, x);
			test.assertEquals("instant .join() should return original jQuery object", $x, TIC);
			TIC.then(callback);
			test.assertEquals("instant .join() should fire after .then()", 1, x);
			$x.dequeue();
			test.assertEquals("instant .join() should not fire anymore after .dequeue()", 1, x);
			window.setTimeout(function(){
				test.assertEquals(".join() should not have fired anymore", 1, x);
				$x.dequeue();
				test.assertEquals(".join() should not have fired anymore after .dequeue()", 1, x);
				test.done();
			}, 100);
		},

		".join(callback) + .stop()" : function($, test) {
			var x = 0;
			var callback = function(){ x++; test.check(); };
			var $x = test.element($('<div>').add('<p>'));
			var TIC = $x.join(callback);
			$x.delay(10000);
			test.assertEquals("instant .join() should fire", 1, x);
			test.assertEquals("instant .join() should return original jQuery object", $x, TIC);
			$x.stop();
			test.assertEquals("instant .join() should not fire anymore after .stop()", 1, x);
			$x.dequeue();
			test.assertEquals("instant .join() should not fire anymore after .dequeue()", 1, x);
			window.setTimeout(function(){
				test.assertEquals(".join() should not have fired anymore", 1, x);
				$x.dequeue();
				test.assertEquals(".join() should not have fired anymore after .dequeue()", 1, x);
				test.done();
			}, 100);
		},
		
		".join(callback) + .stop(true)" : function($, test) {
			var x = 0;
			var callback = function(){ x++; test.check(); };
			var $x = test.element($('<div>').add('<p>'));
			var TIC = $x.join(callback);
			$x.delay(10000);
			test.assertEquals("instant .join() should fire", 1, x);
			test.assertEquals("instant .join() should return original jQuery object", $x, TIC);
			$x.stop(true);
			test.assertEquals("instant .join() should not fire anymore after .stop(true)", 1, x);
			$x.dequeue();
			test.assertEquals("instant .join() should not fire anymore after .dequeue()", 1, x);
			window.setTimeout(function(){
				test.assertEquals(".join() should not have fired anymore", 1, x);
				$x.dequeue();
				test.assertEquals(".join() should not have fired anymore after .dequeue()", 1, x);
				test.done();
			}, 100);
		},
		
		".join().then(callback) + .stop()" : function($, test) {
			var x = 0;
			var callback = function(){ x++; test.check(); };
			var $x = test.element($('<div>').add('<p>'));
			var TIC = $x.join();
			$x.delay(10000);
			test.assertEquals("TIC must not fire before .then()", 0, x);
			test.assertEquals("instant .join() should return original jQuery object", $x, TIC);
			TIC.then(callback);
			test.assertEquals("instant .join() should fire after .then()", 1, x);
			$x.stop();
			test.assertEquals("instant .join() should not fire anymore after .stop()", 1, x);
			$x.dequeue();
			test.assertEquals("instant .join() should not fire anymore after .dequeue()", 1, x);
			window.setTimeout(function(){
				test.assertEquals(".join() should not have fired anymore", 1, x);
				$x.dequeue();
				test.assertEquals(".join() should not have fired anymore after .dequeue()", 1, x);
				test.done();
			}, 100);
		},
		
		".join().then(callback) + .stop(true)" : function($, test) {
			var x = 0;
			var callback = function(){ x++; test.check(); };
			var $x = test.element($('<div>').add('<p>'));
			var TIC = $x.join();
			$x.delay(10000);
			test.assertEquals("TIC must not fire before .then()", 0, x);
			test.assertEquals("instant .join() should return original jQuery object", $x, TIC);
			TIC.then(callback);
			test.assertEquals("instant .join() should fire after .then()", 1, x);
			$x.stop(true);
			test.assertEquals("instant .join() should not fire anymore after .stop(true)", 1, x);
			$x.dequeue();
			test.assertEquals("instant .join() should not fire anymore after .dequeue()", 1, x);
			window.setTimeout(function(){
				test.assertEquals(".join() should not have fired anymore", 1, x);
				$x.dequeue();
				test.assertEquals(".join() should not have fired anymore after .dequeue()", 1, x);
				test.done();
			}, 100);
		},

		".join() + .stop() + .then(callback)" : function($, test) {
			var x = 0;
			var callback = function(){ x++; test.check(); };
			var $x = test.element($('<div>').add('<p>'));
			var TIC = $x.join();
			$x.delay(10000);
			test.assertEquals("TIC must not fire before .then()", 0, x);
			test.assertEquals("instant .join() should return original jQuery object", $x, TIC);
			$x.stop();
			test.assertEquals("TIC must not fire after .stop() before .then()", 0, x);
			TIC.then(callback);
			test.assertEquals("instant .join() should fire after .then(), because .stop() was too late", 1, x);
			$x.dequeue();
			test.assertEquals("instant .join() should not fire anymore after .dequeue()", 1, x);
			window.setTimeout(function(){
				test.assertEquals(".join() should not have fired anymore", 1, x);
				$x.dequeue();
				test.assertEquals(".join() should not have fired anymore after .dequeue()", 1, x);
				test.done();
			}, 100);
		},
		
		".join() + .stop(true) + .then(callback)" : function($, test) {
			var x = 0;
			var callback = function(){ x++; test.check(); };
			var $x = test.element($('<div>').add('<p>'));
			var TIC = $x.join();
			$x.delay(10000);
			test.assertEquals("TIC must not fire before .then()", 0, x);
			test.assertEquals("instant .join() should return original jQuery object", $x, TIC);
			$x.stop(true);
			test.assertEquals("TIC must not fire after .stop(true) before .then()", 0, x);
			TIC.then(callback);
			test.assertEquals("instant .join() should fire after .then(), because .stop(true) was too late", 1, x);
			$x.dequeue();
			test.assertEquals("instant .join() should not fire anymore after .dequeue()", 1, x);
			window.setTimeout(function(){
				test.assertEquals(".join() should not have fired anymore", 1, x);
				$x.dequeue();
				test.assertEquals(".join() should not have fired anymore after .dequeue()", 1, x);
				test.done();
			}, 100);
		},
		
		".join() + .unwait() + .then(callback)" : function($, test) {
			var x = 0;
			var callback = function(){ x++; test.check(); };
			var $x = test.element($('<div>').add('<p>'));
			var TIC = $x.join();
			$x.delay(10000);
			test.assertEquals("TIC must not fire before .then()", 0, x);
			test.assertEquals("instant .join() should return original jQuery object", $x, TIC);
			$x.unwait();
			test.assertEquals("TIC must not fire after .unwait() before .then()", 0, x);
			TIC.then(callback);
			test.assertEquals("instant .join() should fire after .then(), because .unwait() should be ignored", 1, x);
			$x.dequeue();
			test.assertEquals("instant .join() should not fire anymore after .dequeue()", 1, x);
			window.setTimeout(function(){
				test.assertEquals(".join() should not have fired anymore", 1, x);
				$x.dequeue();
				test.assertEquals(".join() should not have fired anymore after .dequeue()", 1, x);
				test.done();
			}, 100);
		},
		
		".join() + .unrepeat() + .then(callback)" : function($, test) {
			var x = 0;
			var callback = function(){ x++; test.check(); };
			var $x = test.element($('<div>').add('<p>'));
			var TIC = $x.join();
			$x.delay(10000);
			test.assertEquals("TIC must not fire before .then()", 0, x);
			test.assertEquals("instant .join() should return original jQuery object", $x, TIC);
			$x.unrepeat();
			test.assertEquals("TIC must not fire after .unwait() before .then()", 0, x);
			TIC.then(callback);
			test.assertEquals("instant .join() should fire after .then(), because .unwait() should be ignored", 1, x);
			$x.dequeue();
			test.assertEquals("instant .join() should not fire anymore after .dequeue()", 1, x);
			window.setTimeout(function(){
				test.assertEquals(".join() should not have fired anymore", 1, x);
				$x.dequeue();
				test.assertEquals(".join() should not have fired anymore after .dequeue()", 1, x);
				test.done();
			}, 100);
		},
		
		"$('.multiple').join() instantly": function($, test) {
			var x = 0;
			var callback = function(){ x++; test.check(); };
			var $x = test.element($('<div>').add('<span>').add('<p>'));
			test.assertEquals("not enough objects", 3, $x.size());
			var TIC = $x.join(callback);
			$x.delay(10000);
			test.assertEquals("join should fire once for multiple objects", 1, x);
			test.assertEquals("instant .join() should return original jQuery object", $x, TIC);
			test.done();
		},
		
		".stop().join()._": function($, test) {
			var $x = test.element($('<div>').add('<p>'));
			var TIC = $x.stop().join();
			$x.delay(10000);
			var _ = TIC._;
			test.assertEquals("tic must be same object because of instant invocation", $x, TIC);
			test.assertEquals("underscore must return original object", $x, _);
			test.done();
		},

		"$('empty').join().doNow()": function($, test) {
			$('none').join().then(function(){
				test.done();
			});
			test.fail("empty .join() must return immediately");
		},
		
	},

	"joining empty default queue instantly with .promise()": {
		
		_version: ['1.6'],
		
		".join(true,callback)" : function($, test) {
			var x = 0;
			var callback = function(){ x++; test.check(); };
			var $x = test.element($('<div>').add('<p>'));
			var TIC = $x.join(true,callback);
			$x.delay(10000);
			test.assertEquals("instant .join(true) should fire", 1, x);
			test.assertEquals("instant .join(true) should return original jQuery object", $x, TIC);
			$x.dequeue();
			test.assertEquals("instant .join(true) should not fire anymore after .dequeue()", 1, x);
			window.setTimeout(function(){
				test.assertEquals(".join(true) should not have fired anymore", 1, x);
				$x.dequeue();
				test.assertEquals(".join(true) should not have fired anymore after .dequeue()", 1, x);
				test.done();
			}, 100);
		},
		
		".join(true).then(callback)" : function($, test) {
			var x = 0;
			var callback = function(){ x++; test.check(); };
			var $x = test.element($('<div>').add('<p>'));
			var TIC = $x.join(true);
			$x.delay(10000);
			test.assertEquals("TIC must not fire before .then()", 0, x);
			test.assertEquals("instant .join(true) should return original jQuery object", $x, TIC);
			TIC.then(callback);
			test.assertEquals("instant .join(true) should fire after .then()", 1, x);
			$x.dequeue();
			test.assertEquals("instant .join(true) should not fire anymore after .dequeue()", 1, x);
			window.setTimeout(function(){
				test.assertEquals(".join(true) should not have fired anymore", 1, x);
				$x.dequeue();
				test.assertEquals(".join(true) should not have fired anymore after .dequeue()", 1, x);
				test.done();
			}, 100);
		},

		".join(true,callback) + .stop()" : function($, test) {
			var x = 0;
			var callback = function(){ x++; test.check(); };
			var $x = test.element($('<div>').add('<p>'));
			var TIC = $x.join(true,callback);
			$x.delay(10000);
			test.assertEquals("instant .join(true) should fire", 1, x);
			test.assertEquals("instant .join(true) should return original jQuery object", $x, TIC);
			$x.stop();
			test.assertEquals("instant .join(true) should not fire anymore after .stop()", 1, x);
			$x.dequeue();
			test.assertEquals("instant .join(true) should not fire anymore after .dequeue()", 1, x);
			window.setTimeout(function(){
				test.assertEquals(".join(true) should not have fired anymore", 1, x);
				$x.dequeue();
				test.assertEquals(".join(true) should not have fired anymore after .dequeue()", 1, x);
				test.done();
			}, 100);
		},
		
		".join(true,callback) + .stop(true)" : function($, test) {
			var x = 0;
			var callback = function(){ x++; test.check(); };
			var $x = test.element($('<div>').add('<p>'));
			var TIC = $x.join(true,callback);
			$x.delay(10000);
			test.assertEquals("instant .join(true) should fire", 1, x);
			test.assertEquals("instant .join(true) should return original jQuery object", $x, TIC);
			$x.stop(true);
			test.assertEquals("instant .join(true) should not fire anymore after .stop(true)", 1, x);
			$x.dequeue();
			test.assertEquals("instant .join(true) should not fire anymore after .dequeue()", 1, x);
			window.setTimeout(function(){
				test.assertEquals(".join(true) should not have fired anymore", 1, x);
				$x.dequeue();
				test.assertEquals(".join(true) should not have fired anymore after .dequeue()", 1, x);
				test.done();
			}, 100);
		},
		
		".join(true).then(callback) + .stop()" : function($, test) {
			var x = 0;
			var callback = function(){ x++; test.check(); };
			var $x = test.element($('<div>').add('<p>'));
			var TIC = $x.join(true);
			$x.delay(10000);
			test.assertEquals("TIC must not fire before .then()", 0, x);
			test.assertEquals("instant .join(true) should return original jQuery object", $x, TIC);
			TIC.then(callback);
			test.assertEquals("instant .join(true) should fire after .then()", 1, x);
			$x.stop();
			test.assertEquals("instant .join(true) should not fire anymore after .stop()", 1, x);
			$x.dequeue();
			test.assertEquals("instant .join(true) should not fire anymore after .dequeue()", 1, x);
			window.setTimeout(function(){
				test.assertEquals(".join(true) should not have fired anymore", 1, x);
				$x.dequeue();
				test.assertEquals(".join(true) should not have fired anymore after .dequeue()", 1, x);
				test.done();
			}, 100);
		},
		
		".join(true).then(callback) + .stop(true)" : function($, test) {
			var x = 0;
			var callback = function(){ x++; test.check(); };
			var $x = test.element($('<div>').add('<p>'));
			var TIC = $x.join(true);
			$x.delay(10000);
			test.assertEquals("TIC must not fire before .then()", 0, x);
			test.assertEquals("instant .join(true) should return original jQuery object", $x, TIC);
			TIC.then(callback);
			test.assertEquals("instant .join(true) should fire after .then()", 1, x);
			$x.stop(true);
			test.assertEquals("instant .join(true) should not fire anymore after .stop(true)", 1, x);
			$x.dequeue();
			test.assertEquals("instant .join(true) should not fire anymore after .dequeue()", 1, x);
			window.setTimeout(function(){
				test.assertEquals(".join(true) should not have fired anymore", 1, x);
				$x.dequeue();
				test.assertEquals(".join(true) should not have fired anymore after .dequeue()", 1, x);
				test.done();
			}, 100);
		},

		".join(true) + .stop() + .then(callback)" : function($, test) {
			var x = 0;
			var callback = function(){ x++; test.check(); };
			var $x = test.element($('<div>').add('<p>'));
			var TIC = $x.join(true);
			$x.delay(10000);
			test.assertEquals("TIC must not fire before .then()", 0, x);
			test.assertEquals("instant .join(true) should return original jQuery object", $x, TIC);
			$x.stop();
			test.assertEquals("TIC must not fire after .stop() before .then()", 0, x);
			TIC.then(callback);
			test.assertEquals("instant .join(true) should fire after .then(), because .stop() was too late", 1, x);
			$x.dequeue();
			test.assertEquals("instant .join(true) should not fire anymore after .dequeue()", 1, x);
			window.setTimeout(function(){
				test.assertEquals(".join(true) should not have fired anymore", 1, x);
				$x.dequeue();
				test.assertEquals(".join(true) should not have fired anymore after .dequeue()", 1, x);
				test.done();
			}, 100);
		},
		
		".join(true) + .stop(true) + .then(callback)" : function($, test) {
			var x = 0;
			var callback = function(){ x++; test.check(); };
			var $x = test.element($('<div>').add('<p>'));
			var TIC = $x.join(true);
			$x.delay(10000);
			test.assertEquals("TIC must not fire before .then()", 0, x);
			test.assertEquals("instant .join(true) should return original jQuery object", $x, TIC);
			$x.stop(true);
			test.assertEquals("TIC must not fire after .stop(true) before .then()", 0, x);
			TIC.then(callback);
			test.assertEquals("instant .join(true) should fire after .then(), because .stop(true) was too late", 1, x);
			$x.dequeue();
			test.assertEquals("instant .join(true) should not fire anymore after .dequeue()", 1, x);
			window.setTimeout(function(){
				test.assertEquals(".join(true) should not have fired anymore", 1, x);
				$x.dequeue();
				test.assertEquals(".join(true) should not have fired anymore after .dequeue()", 1, x);
				test.done();
			}, 100);
		},
		
		".join(true) + .unwait() + .then(callback)" : function($, test) {
			var x = 0;
			var callback = function(){ x++; test.check(); };
			var $x = test.element($('<div>').add('<p>'));
			var TIC = $x.join(true);
			$x.delay(10000);
			test.assertEquals("TIC must not fire before .then()", 0, x);
			test.assertEquals("instant .join(true) should return original jQuery object", $x, TIC);
			$x.unwait();
			test.assertEquals("TIC must not fire after .unwait() before .then()", 0, x);
			TIC.then(callback);
			test.assertEquals("instant .join(true) should fire after .then(), because .unwait() should be ignored", 1, x);
			$x.dequeue();
			test.assertEquals("instant .join(true) should not fire anymore after .dequeue()", 1, x);
			window.setTimeout(function(){
				test.assertEquals(".join(true) should not have fired anymore", 1, x);
				$x.dequeue();
				test.assertEquals(".join(true) should not have fired anymore after .dequeue()", 1, x);
				test.done();
			}, 100);
		},
		
		".join(true) + .unrepeat() + .then(callback)" : function($, test) {
			var x = 0;
			var callback = function(){ x++; test.check(); };
			var $x = test.element($('<div>').add('<p>'));
			var TIC = $x.join(true);
			$x.delay(10000);
			test.assertEquals("TIC must not fire before .then()", 0, x);
			test.assertEquals("instant .join(true) should return original jQuery object", $x, TIC);
			$x.unrepeat();
			test.assertEquals("TIC must not fire after .unwait() before .then()", 0, x);
			TIC.then(callback);
			test.assertEquals("instant .join(true) should fire after .then(), because .unwait() should be ignored", 1, x);
			$x.dequeue();
			test.assertEquals("instant .join(true) should not fire anymore after .dequeue()", 1, x);
			window.setTimeout(function(){
				test.assertEquals(".join(true) should not have fired anymore", 1, x);
				$x.dequeue();
				test.assertEquals(".join(true) should not have fired anymore after .dequeue()", 1, x);
				test.done();
			}, 100);
		},
		
		"$('.multiple').join(true) instantly": function($, test) {
			var x = 0;
			var callback = function(){ x++; test.check(); };
			var $x = test.element($('<div>').add('<span>').add('<p>'));
			test.assertEquals("not enough objects", 3, $x.size());
			var TIC = $x.join(true,callback);
			$x.delay(10000);
			test.assertEquals("join should fire once for multiple objects", 1, x);
			test.assertEquals("instant .join(true) should return original jQuery object", $x, TIC);
			test.done();
		},
		
		".stop().join(true)._": function($, test) {
			var $x = test.element($('<div>').add('<p>'));
			var TIC = $x.stop().join(true);
			$x.delay(10000);
			var _ = TIC._;
			test.assertEquals("tic must be same object because of instant invocation", $x, TIC);
			test.assertEquals("underscore must return original object", $x, _);
			test.done();
		},

		"$('empty').join(true).doNow()": function($, test) {
			$('none').join(true).then(function(){
				test.done();
			});
			test.fail("empty .join(true) must return immediately");
		},
		
	},

	"joining empty default queue deferred": {
		
		".join(callback) …" : function($, test) {
			var x = 0;
			var callback = function(){ x++; test.check(); };
			var $x = test.element($('<div>').add('<p>'));
			$x.join(callback);
			$x.delay(10000);
			window.setTimeout(function(){
				test.assertEquals("instant .join() should have fired", 1, x);
				$x.dequeue();
				test.assertEquals("instant .join() should not fire anymore after .dequeue()", 1, x);
				window.setTimeout(function(){
					test.assertEquals(".join() should not have fired anymore", 1, x);
					$x.dequeue();
					test.assertEquals(".join() should not have fired anymore after .dequeue()", 1, x);
					test.done();
				}, 100);
			}, 100);
		},
		
		".join() +…+ .then(callback)" : function($, test) {
			var x = 0;
			var callback = function(){ x++; test.check(); };
			var $x = test.element($('<div>').add('<p>'));
			var TIC = $x.join();
			$x.delay(10000);
			window.setTimeout(function(){
				test.assertEquals("TIC must not fire before .then()", 0, x);
				TIC.then(callback);
				test.assertEquals("instant .join() should fire after .then()", 1, x);
				$x.dequeue();
				test.assertEquals("instant .join() should not fire anymore after .dequeue()", 1, x);
				window.setTimeout(function(){
					test.assertEquals(".join() should not have fired anymore", 1, x);
					$x.dequeue();
					test.assertEquals(".join() should not have fired anymore after .dequeue()", 1, x);
					test.done();
				}, 100);
			}, 100);
		},

		".join(callback) +…+ .stop()" : function($, test) {
			var x = 0;
			var callback = function(){ x++; test.check(); };
			var $x = test.element($('<div>').add('<p>'));
			$x.join(callback);
			$x.delay(10000);
			window.setTimeout(function(){
				test.assertEquals("instant .join() should fire", 1, x);
				$x.stop();
				test.assertEquals("instant .join() should not fire anymore after .stop()", 1, x);
				$x.dequeue();
				test.assertEquals("instant .join() should not fire anymore after .dequeue()", 1, x);
				window.setTimeout(function(){
					test.assertEquals(".join() should not have fired anymore", 1, x);
					$x.dequeue();
					test.assertEquals(".join() should not have fired anymore after .dequeue()", 1, x);
					test.done();
				}, 100);
			}, 100);
		},
		
		".join(callback) +…+ .stop()" : function($, test) {
			var x = 0;
			var callback = function(){ x++; test.check(); };
			var $x = test.element($('<div>').add('<p>'));
			$x.join(callback);
			$x.delay(10000);
			window.setTimeout(function(){
				test.assertEquals("instant .join() should fire", 1, x);
				$x.stop();
				test.assertEquals("instant .join() should not fire anymore after .stop()", 1, x);
				$x.dequeue();
				test.assertEquals("instant .join() should not fire anymore after .dequeue()", 1, x);
				window.setTimeout(function(){
					test.assertEquals(".join() should not have fired anymore", 1, x);
					$x.dequeue();
					test.assertEquals(".join() should not have fired anymore after .dequeue()", 1, x);
					test.done();
				}, 100);
			}, 100);
		},
		
		".join() +…+ .then(callback) + .stop()" : function($, test) {
			var x = 0;
			var callback = function(){ x++; test.check(); };
			var $x = test.element($('<div>').add('<p>'));
			var TIC = $x.join();
			$x.delay(10000);
			window.setTimeout(function(){
				test.assertEquals("TIC must not fire before .then()", 0, x);
				TIC.then(callback);
				test.assertEquals("instant .join() should fire after .then()", 1, x);
				$x.stop();
				test.assertEquals("instant .join() should not fire anymore after .stop()", 1, x);
				$x.dequeue();
				test.assertEquals("instant .join() should not fire anymore after .dequeue()", 1, x);
				window.setTimeout(function(){
					test.assertEquals(".join() should not have fired anymore", 1, x);
					$x.dequeue();
					test.assertEquals(".join() should not have fired anymore after .dequeue()", 1, x);
					test.done();
				}, 100);
			}, 100);
		},
		
		".join() +…+ .then(callback) + .stop(true)" : function($, test) {
			var x = 0;
			var callback = function(){ x++; test.check(); };
			var $x = test.element($('<div>').add('<p>'));
			var TIC = $x.join();
			$x.delay(10000);
			window.setTimeout(function(){
				test.assertEquals("TIC must not fire before .then()", 0, x);
				TIC.then(callback);
				test.assertEquals("instant .join() should fire after .then()", 1, x);
				$x.stop(true);
				test.assertEquals("instant .join() should not fire anymore after .stop(true)", 1, x);
				$x.dequeue();
				test.assertEquals("instant .join() should not fire anymore after .dequeue()", 1, x);
				window.setTimeout(function(){
					test.assertEquals(".join() should not have fired anymore", 1, x);
					$x.dequeue();
					test.assertEquals(".join() should not have fired anymore after .dequeue()", 1, x);
					test.done();
				}, 100);
			}, 100);
		},
		
		".join() +…+ .stop() + .then(callback)" : function($, test) {
			var x = 0;
			var callback = function(){ x++; test.check(); };
			var $x = test.element($('<div>').add('<p>'));
			var TIC = $x.join();
			$x.delay(10000);
			window.setTimeout(function(){
				test.assertEquals("TIC must not fire before .then()", 0, x);
				$x.stop();
				test.assertEquals("TIC must not fire after .stop() before .then()", 0, x);
				TIC.then(callback);
				test.assertEquals("instant .join() should fire after .then(), because .stop() was too late", 1, x);
				$x.dequeue();
				test.assertEquals("instant .join() should not fire anymore after .dequeue()", 1, x);
				window.setTimeout(function(){
					test.assertEquals(".join() should not have fired anymore", 1, x);
					$x.dequeue();
					test.assertEquals(".join() should not have fired anymore after .dequeue()", 1, x);
					test.done();
				}, 100);
			}, 100);
		},
		
		".join() +…+ .stop(true) + .then(callback)" : function($, test) {
			var x = 0;
			var callback = function(){ x++; test.check(); };
			var $x = test.element($('<div>').add('<p>'));
			var TIC = $x.join();
			$x.delay(10000);
			window.setTimeout(function(){
				test.assertEquals("TIC must not fire before .then()", 0, x);
				$x.stop(true);
				test.assertEquals("TIC must not fire after .stop(true) before .then()", 0, x);
				TIC.then(callback);
				test.assertEquals("instant .join() should fire after .then(), because .stop(true) was too late", 1, x);
				$x.dequeue();
				test.assertEquals("instant .join() should not fire anymore after .dequeue()", 1, x);
				window.setTimeout(function(){
					test.assertEquals(".join() should not have fired anymore", 1, x);
					$x.dequeue();
					test.assertEquals(".join() should not have fired anymore after .dequeue()", 1, x);
					test.done();
				}, 100);
			}, 100);
		},
		
		".join() +…+ .unwait() + .then(callback)" : function($, test) {
			var x = 0;
			var callback = function(){ x++; test.check(); };
			var $x = test.element($('<div>').add('<p>'));
			var TIC = $x.join();
			$x.delay(10000);
			window.setTimeout(function(){
				test.assertEquals("TIC must not fire before .then()", 0, x);
				$x.unwait();
				test.assertEquals("TIC must not fire after .unwait() before .then()", 0, x);
				TIC.then(callback);
				test.assertEquals("instant .join() should fire after .then(), because .unwait() should be ignored", 1, x);
				$x.dequeue();
				test.assertEquals("instant .join() should not fire anymore after .dequeue()", 1, x);
				window.setTimeout(function(){
					test.assertEquals(".join() should not have fired anymore", 1, x);
					$x.dequeue();
					test.assertEquals(".join() should not have fired anymore after .dequeue()", 1, x);
					test.done();
				}, 100);
			}, 100);
		},
		
		".join() +…+ .unrepeat() + .then(callback)" : function($, test) {
			var x = 0;
			var callback = function(){ x++; test.check(); };
			var $x = test.element($('<div>').add('<p>'));
			var TIC = $x.join();
			$x.delay(10000);
			window.setTimeout(function(){
				test.assertEquals("TIC must not fire before .then()", 0, x);
				$x.unrepeat();
				test.assertEquals("TIC must not fire after .unwait() before .then()", 0, x);
				TIC.then(callback);
				test.assertEquals("instant .join() should fire after .then(), because .unwait() should be ignored", 1, x);
				$x.dequeue();
				test.assertEquals("instant .join() should not fire anymore after .dequeue()", 1, x);
				window.setTimeout(function(){
					test.assertEquals(".join() should not have fired anymore", 1, x);
					$x.dequeue();
					test.assertEquals(".join() should not have fired anymore after .dequeue()", 1, x);
					test.done();
				}, 100);
			}, 100);
		},
		
	},

	"joining empty default queue deferred with .promise()": {
		
		_version: ['1.6'],
		
		".join(true,callback) …" : function($, test) {
			var x = 0;
			var callback = function(){ x++; test.check(); };
			var $x = test.element($('<div>').add('<p>'));
			$x.join(true,callback);
			$x.delay(10000);
			window.setTimeout(function(){
				test.assertEquals("instant .join(true) should have fired", 1, x);
				$x.dequeue();
				test.assertEquals("instant .join(true) should fire after .dequeue()", 1, x);
				window.setTimeout(function(){
					test.assertEquals(".join(true) should not have fired anymore", 1, x);
					$x.dequeue();
					test.assertEquals(".join(true) should not have fired anymore after .dequeue()", 1, x);
					test.done();
				}, 100);
			}, 100);
		},
		
		".join(true) +…+ .then(callback)" : function($, test) {
			var x = 0;
			var callback = function(){ x++; test.check(); };
			var $x = test.element($('<div>').add('<p>'));
			var TIC = $x.join(true);
			$x.delay(10000);
			window.setTimeout(function(){
				test.assertEquals("TIC must not fire before .then()", 0, x);
				TIC.then(callback);
				test.assertEquals("instant .join(true) should fire after .then()", 1, x);
				$x.dequeue();
				test.assertEquals("instant .join(true) should not fire anymore after .dequeue()", 1, x);
				window.setTimeout(function(){
					test.assertEquals(".join(true) should not have fired anymore", 1, x);
					$x.dequeue();
					test.assertEquals(".join(true) should not have fired anymore after .dequeue()", 1, x);
					test.done();
				}, 100);
			}, 100);
		},
		
		".join(true,callback) +…+ .stop()" : function($, test) {
			var x = 0;
			var callback = function(){ x++; test.check(); };
			var $x = test.element($('<div>').add('<p>'));
			$x.join(true,callback);
			$x.delay(10000);
			window.setTimeout(function(){
				test.assertEquals("instant .join(true) should fire", 1, x);
				$x.stop();
				test.assertEquals("instant .join(true) should not fire anymore after .stop()", 1, x);
				$x.dequeue();
				test.assertEquals("instant .join(true) should not fire anymore after .dequeue()", 1, x);
				window.setTimeout(function(){
					test.assertEquals(".join(true) should not have fired anymore", 1, x);
					$x.dequeue();
					test.assertEquals(".join(true) should not have fired anymore after .dequeue()", 1, x);
					test.done();
				}, 100);
			}, 100);
		},
		
		".join(true,callback) +…+ .stop()" : function($, test) {
			var x = 0;
			var callback = function(){ x++; test.check(); };
			var $x = test.element($('<div>').add('<p>'));
			$x.join(true,callback);
			$x.delay(10000);
			window.setTimeout(function(){
				test.assertEquals("instant .join(true) should fire", 1, x);
				$x.stop();
				test.assertEquals("instant .join(true) should not fire anymore after .stop()", 1, x);
				$x.dequeue();
				test.assertEquals("instant .join(true) should not fire anymore after .dequeue()", 1, x);
				window.setTimeout(function(){
					test.assertEquals(".join(true) should not have fired anymore", 1, x);
					$x.dequeue();
					test.assertEquals(".join(true) should not have fired anymore after .dequeue()", 1, x);
					test.done();
				}, 100);
			}, 100);
		},
		
		".join(true) +…+ .then(callback) + .stop()" : function($, test) {
			var x = 0;
			var callback = function(){ x++; test.check(); };
			var $x = test.element($('<div>').add('<p>'));
			var TIC = $x.join(true);
			$x.delay(10000);
			window.setTimeout(function(){
				test.assertEquals("TIC must not fire before .then()", 0, x);
				TIC.then(callback);
				test.assertEquals("instant .join(true) should fire after .then()", 1, x);
				$x.stop();
				test.assertEquals("instant .join(true) should not fire anymore after .stop()", 1, x);
				$x.dequeue();
				test.assertEquals("instant .join(true) should not fire anymore after .dequeue()", 1, x);
				window.setTimeout(function(){
					test.assertEquals(".join(true) should not have fired anymore", 1, x);
					$x.dequeue();
					test.assertEquals(".join(true) should not have fired anymore after .dequeue()", 1, x);
					test.done();
				}, 100);
			}, 100);
		},
		
		".join(true) +…+ .then(callback) + .stop(true)" : function($, test) {
			var x = 0;
			var callback = function(){ x++; test.check(); };
			var $x = test.element($('<div>').add('<p>'));
			var TIC = $x.join(true);
			$x.delay(10000);
			window.setTimeout(function(){
				test.assertEquals("TIC must not fire before .then()", 0, x);
				TIC.then(callback);
				test.assertEquals("instant .join(true) should fire after .then()", 1, x);
				$x.stop(true);
				test.assertEquals("instant .join(true) should not fire anymore after .stop(true)", 1, x);
				$x.dequeue();
				test.assertEquals("instant .join(true) should not fire anymore after .dequeue()", 1, x);
				window.setTimeout(function(){
					test.assertEquals(".join(true) should not have fired anymore", 1, x);
					$x.dequeue();
					test.assertEquals(".join(true) should not have fired anymore after .dequeue()", 1, x);
					test.done();
				}, 100);
			}, 100);
		},
		
		".join(true) +…+ .stop() + .then(callback)" : function($, test) {
			var x = 0;
			var callback = function(){ x++; test.check(); };
			var $x = test.element($('<div>').add('<p>'));
			var TIC = $x.join(true);
			$x.delay(10000);
			window.setTimeout(function(){
				test.assertEquals("TIC must not fire before .then()", 0, x);
				$x.stop();
				test.assertEquals("TIC must not fire after .stop() before .then()", 0, x);
				TIC.then(callback);
				test.assertEquals("instant .join(true) should fire after .then(), because .stop() was too late", 1, x);
				$x.dequeue();
				test.assertEquals("instant .join(true) should not fire anymore after .dequeue()", 1, x);
				window.setTimeout(function(){
					test.assertEquals(".join(true) should not have fired anymore", 1, x);
					$x.dequeue();
					test.assertEquals(".join(true) should not have fired anymore after .dequeue()", 1, x);
					test.done();
				}, 100);
			}, 100);
		},
		
		".join(true) +…+ .stop(true) + .then(callback)" : function($, test) {
			var x = 0;
			var callback = function(){ x++; test.check(); };
			var $x = test.element($('<div>').add('<p>'));
			var TIC = $x.join(true);
			$x.delay(10000);
			window.setTimeout(function(){
				test.assertEquals("TIC must not fire before .then()", 0, x);
				$x.stop(true);
				test.assertEquals("TIC must not fire after .stop(true) before .then()", 0, x);
				TIC.then(callback);
				test.assertEquals("instant .join(true) should fire after .then(), because .stop(true) was too late", 1, x);
				$x.dequeue();
				test.assertEquals("instant .join(true) should not fire anymore after .dequeue()", 1, x);
				window.setTimeout(function(){
					test.assertEquals(".join(true) should not have fired anymore", 1, x);
					$x.dequeue();
					test.assertEquals(".join(true) should not have fired anymore after .dequeue()", 1, x);
					test.done();
				}, 100);
			}, 100);
		},
		
		".join(true) +…+ .unwait() + .then(callback)" : function($, test) {
			var x = 0;
			var callback = function(){ x++; test.check(); };
			var $x = test.element($('<div>').add('<p>'));
			var TIC = $x.join(true);
			$x.delay(10000);
			window.setTimeout(function(){
				test.assertEquals("TIC must not fire before .then()", 0, x);
				$x.unwait();
				test.assertEquals("TIC must not fire after .unwait() before .then()", 0, x);
				TIC.then(callback);
				test.assertEquals("instant .join(true) should fire after .then(), because .unwait() should be ignored", 1, x);
				$x.dequeue();
				test.assertEquals("instant .join(true) should not fire anymore after .dequeue()", 1, x);
				window.setTimeout(function(){
					test.assertEquals(".join(true) should not have fired anymore", 1, x);
					$x.dequeue();
					test.assertEquals(".join(true) should not have fired anymore after .dequeue()", 1, x);
					test.done();
				}, 100);
			}, 100);
		},
		
		".join(true) +…+ .unrepeat() + .then(callback)" : function($, test) {
			var x = 0;
			var callback = function(){ x++; test.check(); };
			var $x = test.element($('<div>').add('<p>'));
			var TIC = $x.join(true);
			$x.delay(10000);
			window.setTimeout(function(){
				test.assertEquals("TIC must not fire before .then()", 0, x);
				$x.unrepeat();
				test.assertEquals("TIC must not fire after .unwait() before .then()", 0, x);
				TIC.then(callback);
				test.assertEquals("instant .join(true) should fire after .then(), because .unwait() should be ignored", 1, x);
				$x.dequeue();
				test.assertEquals("instant .join(true) should not fire anymore after .dequeue()", 1, x);
				window.setTimeout(function(){
					test.assertEquals(".join(true) should not have fired anymore", 1, x);
					$x.dequeue();
					test.assertEquals(".join(true) should not have fired anymore after .dequeue()", 1, x);
					test.done();
				}, 100);
			}, 100);
		},
		
	},
	
	"joining ongoing default queue": {
		
		".delay(timeout).join(callback)" : function($, test) {
			var x = 0;
			var timeout = 100;
			var callback = function(){ x++; test.check(); };
			var $x = test.element($('<div>').add('<p>'));
			$x.delay(timeout).join(callback);
			$x.delay(10000);
			test.assertEquals("active queue should wait", 0, x);
			window.setTimeout(function(){
				test.assertEquals("active queue should wait until delay is over", 0, x);
				window.setTimeout(function(){
					test.assertEquals(".join() must have fired after delay is over", 1, x);
					$x.dequeue();
					test.assertEquals(".join() should not fire anymore after .dequeue()", 1, x);
					window.setTimeout(function(){
						test.assertEquals(".join() should not have fired anymore", 1, x);
						$x.dequeue();
						test.assertEquals(".join() should not have fired anymore after .dequeue()", 1, x);
						test.done();
					}, 100);
				}, timeout);
			}, timeout / 2);
		},
		
		".delay(timeout).join().then(callback)" : function($, test) {
			var x = 0;
			var timeout = 100;
			var callback = function(){ x++; test.check(); };
			var $x = test.element($('<div>').add('<p>'));
			$x.delay(timeout).join().then(callback);
			$x.delay(10000);
			test.assertEquals("active queue should wait", 0, x);
			window.setTimeout(function(){
				test.assertEquals("active queue should wait until delay is over", 0, x);
				window.setTimeout(function(){
					test.assertEquals(".join() must have fired after delay is over", 1, x);
					$x.dequeue();
					test.assertEquals(".join() should not fire anymore after .dequeue()", 1, x);
					window.setTimeout(function(){
						test.assertEquals(".join() should not have fired anymore", 1, x);
						$x.dequeue();
						test.assertEquals(".join() should not have fired anymore after .dequeue()", 1, x);
						test.done();
					}, 100);
				}, timeout);
			}, timeout / 2);
		},

		".delay(timeout).join(callback) + .stop()" : function($, test) {
			var x = 0;
			var timeout = 100;
			var callback = function(){ x++; test.check(); };
			var $x = test.element($('<div>').add('<p>'));
			$x.delay(timeout).join(callback);
			$x.delay(10000);
			test.assertEquals("active queue should wait", 0, x);
			window.setTimeout(function(){
				test.assertEquals("active queue should wait until delay is over", 0, x);
				$x.stop();
				test.assertEquals(".join() should fire after .stop()", 1, x);
				$x.dequeue();
				test.assertEquals(".join() should not fire again after .dequeue()", 1, x);
				window.setTimeout(function(){
					test.assertEquals(".join() must not have fired again", 1, x);
					$x.dequeue();
					test.assertEquals(".join() should not fire again after .dequeue()", 1, x);
					window.setTimeout(function(){
						test.assertEquals(".join() should not have fired anymore", 1, x);
						$x.dequeue();
						test.assertEquals(".join() should not have fired anymore after .dequeue()", 1, x);
						test.done();
					}, 100);
				}, timeout);
			}, timeout / 2);
		},
		
		".delay(timeout).join(callback) + .stop(true)" : function($, test) {
			var x = 0;
			var timeout = 100;
			var callback = function(){ x++; test.check(); };
			var $x = test.element($('<div>').add('<p>'));
			$x.delay(timeout).join(callback);
			$x.delay(10000);
			test.assertEquals("active queue should wait", 0, x);
			window.setTimeout(function(){
				test.assertEquals("active queue should wait until delay is over", 0, x);
				$x.stop(true);
				test.assertEquals(".join() should not fire after .stop(true)", 0, x);
				window.setTimeout(function(){
					test.assertEquals(".join() must not have fired after delay is over, because of .stop(true)", 0, x);
					$x.dequeue();
					test.assertEquals(".join() should not fire again after .dequeue()", 0, x);
					window.setTimeout(function(){
						test.assertEquals(".join() should not have fired anymore", 0, x);
						$x.dequeue();
						test.assertEquals(".join() should not have fired anymore after .dequeue()", 0, x);
						test.done();
					}, 100);
				}, timeout);
			}, timeout / 2);
		},
		
		".delay(timeout).join().then(callback) + .stop()" : function($, test) {
			var x = 0;
			var timeout = 100;
			var callback = function(){ x++; test.check(); };
			var $x = test.element($('<div>').add('<p>'));
			$x.delay(timeout).join().then(callback);
			$x.delay(10000);
			test.assertEquals("active queue should wait", 0, x);
			window.setTimeout(function(){
				test.assertEquals("active queue should wait until delay is over", 0, x);
				$x.stop();
				test.assertEquals(".join() should fire after .stop()", 1, x);
				window.setTimeout(function(){
					test.assertEquals(".join() must not have again", 1, x);
					$x.dequeue();
					test.assertEquals(".join() should not fire again after .dequeue()", 1, x);
					window.setTimeout(function(){
						test.assertEquals(".join() should not have fired anymore", 1, x);
						$x.dequeue();
						test.assertEquals(".join() should not have fired anymore after .dequeue()", 1, x);
						test.done();
					}, 100);
				}, timeout);
			}, timeout / 2);
		},
		
		".delay(timeout).join().then(callback) + .stop(true)" : function($, test) {
			var x = 0;
			var timeout = 100;
			var callback = function(){ x++; test.check(); };
			var $x = test.element($('<div>').add('<p>'));
			$x.delay(timeout).join().then(callback);
			$x.delay(10000);
			test.assertEquals("active queue should wait", 0, x);
			window.setTimeout(function(){
				test.assertEquals("active queue should wait until delay is over", 0, x);
				$x.stop(true);
				test.assertEquals(".join() should not fire after .stop(true)", 0, x);
				window.setTimeout(function(){
					test.assertEquals(".join() must not have fired after delay is over, because of .stop(true)", 0, x);
					$x.dequeue();
					test.assertEquals(".join() should not fire again after .dequeue()", 0, x);
					window.setTimeout(function(){
						test.assertEquals(".join() should not have fired anymore", 0, x);
						$x.dequeue();
						test.assertEquals(".join() should not have fired anymore after .dequeue()", 0, x);
						test.done();
					}, 100);
				}, timeout);
			}, timeout / 2);
		},
		
		".delay(timeout).join() + .stop() + .then(callback)" : function($, test) {
			var x = 0;
			var timeout = 100;
			var callback = function(){ x++; test.check(); };
			var $x = test.element($('<div>').add('<p>'));
			var TIC = $x.delay(timeout).join();
			$x.delay(10000);
			test.assertEquals("active queue should wait", 0, x);
			window.setTimeout(function(){
				test.assertEquals("active queue should wait until delay is over", 0, x);
				$x.stop();
				test.assertEquals("TIC must wait until .then()", 0, x);
				TIC.then(callback);
				test.assertEquals(".join() should fire after .stop()", 1, x);
				window.setTimeout(function(){
					test.assertEquals(".join() must not have fired again", 1, x);
					$x.dequeue();
					test.assertEquals(".join() should not fire again after .dequeue()", 1, x);
					window.setTimeout(function(){
						test.assertEquals(".join() should not have fired anymore", 1, x);
						$x.dequeue();
						test.assertEquals(".join() should not have fired anymore after .dequeue()", 1, x);
						test.done();
					}, 100);
				}, timeout);
			}, timeout / 2);
		},
		
		".delay(timeout).join() + .stop(true) + .then(callback)" : function($, test) {
			var x = 0;
			var timeout = 100;
			var callback = function(){ x++; test.check(); };
			var $x = test.element($('<div>').add('<p>'));
			var TIC = $x.delay(timeout).join();
			$x.delay(10000);
			test.assertEquals("active queue should wait", 0, x);
			window.setTimeout(function(){
				test.assertEquals("active queue should wait until delay is over", 0, x);
				$x.stop(true);
				test.assertEquals("TIC must wait until .then()", 0, x);
				TIC.then(callback);
				test.assertEquals(".join() should not fire after .stop(true)", 0, x);
				window.setTimeout(function(){
					test.assertEquals(".join() must not have fired again", 0, x);
					$x.dequeue();
					test.assertEquals(".join() should not fire again after .dequeue()", 0, x);
					window.setTimeout(function(){
						test.assertEquals(".join() should not have fired anymore", 0, x);
						$x.dequeue();
						test.assertEquals(".join() should not have fired anymore after .dequeue()", 0, x);
						test.done();
					}, 100);
				}, timeout);
			}, timeout / 2);
		},
		
		".delay(timeout).join(callback) + .unwait()" : function($, test) {
			var x = 0;
			var timeout = 100;
			var callback = function(){ x++; test.check(); };
			var $x = test.element($('<div>').add('<p>'));
			$x.delay(timeout).join(callback);
			$x.delay(10000);
			test.assertEquals("active queue should wait", 0, x);
			window.setTimeout(function(){
				test.assertEquals("active queue should wait until delay is over", 0, x);
				$x.unwait();
				test.assertEquals(".join() should not fire in case of .unwait()", 0, x);
				window.setTimeout(function(){
					test.assertEquals(".join() must have fired after delay is over", 1, x);
					$x.dequeue();
					test.assertEquals(".join() should not fire anymore after .dequeue()", 1, x);
					window.setTimeout(function(){
						test.assertEquals(".join() should not have fired anymore", 1, x);
						$x.dequeue();
						test.assertEquals(".join() should not have fired anymore after .dequeue()", 1, x);
						test.done();
					}, 100);
				}, timeout);
			}, timeout / 2);
		},
		
		".delay(timeout).join().then(callback) + .unwait()" : function($, test) {
			var x = 0;
			var timeout = 100;
			var callback = function(){ x++; test.check(); };
			var $x = test.element($('<div>').add('<p>'));
			$x.delay(timeout).join().then(callback);
			$x.delay(10000);
			test.assertEquals("active queue should wait", 0, x);
			window.setTimeout(function(){
				test.assertEquals("active queue should wait until delay is over", 0, x);
				$x.unwait();
				test.assertEquals(".join() should not fire in case of .unwait()", 0, x);
				window.setTimeout(function(){
					test.assertEquals(".join() must have fired after delay is over", 1, x);
					$x.dequeue();
					test.assertEquals(".join() should not fire anymore after .dequeue()", 1, x);
					window.setTimeout(function(){
						test.assertEquals(".join() should not have fired anymore", 1, x);
						$x.dequeue();
						test.assertEquals(".join() should not have fired anymore after .dequeue()", 1, x);
						test.done();
					}, 100);
				}, timeout);
			}, timeout / 2);
		},
		
		".delay(timeout).join() + .unwait() + .then(callback)" : function($, test) {
			var x = 0;
			var timeout = 100;
			var callback = function(){ x++; test.check(); };
			var $x = test.element($('<div>').add('<p>'));
			var TIC = $x.delay(timeout).join();
			$x.delay(10000);
			test.assertEquals("active queue should wait", 0, x);
			window.setTimeout(function(){
				test.assertEquals("active queue should wait until delay is over", 0, x);
				$x.unwait();
				test.assertEquals("TIC has to wait until .then()", 0, x);
				TIC.then(callback);
				test.assertEquals(".join() should not fire in case of .unwait()", 0, x);
				window.setTimeout(function(){
					test.assertEquals(".join() must have fired after delay is over", 1, x);
					$x.dequeue();
					test.assertEquals(".join() should not fire anymore after .dequeue()", 1, x);
					window.setTimeout(function(){
						test.assertEquals(".join() should not have fired anymore", 1, x);
						$x.dequeue();
						test.assertEquals(".join() should not have fired anymore after .dequeue()", 1, x);
						test.done();
					}, 100);
				}, timeout);
			}, timeout / 2);
		},
		
		".delay(timeout).join(callback) + .unrepeat()" : function($, test) {
			var x = 0;
			var timeout = 100;
			var callback = function(){ x++; test.check(); };
			var $x = test.element($('<div>').add('<p>'));
			$x.delay(timeout).join(callback);
			$x.delay(10000);
			test.assertEquals("active queue should wait", 0, x);
			window.setTimeout(function(){
				test.assertEquals("active queue should wait until delay is over", 0, x);
				$x.unrepeat();
				test.assertEquals(".join() should not fire in case of .unrepeat()", 0, x);
				window.setTimeout(function(){
					test.assertEquals(".join() must have fired after delay is over", 1, x);
					$x.dequeue();
					test.assertEquals(".join() should not fire anymore after .dequeue()", 1, x);
					window.setTimeout(function(){
						test.assertEquals(".join() should not have fired anymore", 1, x);
						$x.dequeue();
						test.assertEquals(".join() should not have fired anymore after .dequeue()", 1, x);
						test.done();
					}, 100);
				}, timeout);
			}, timeout / 2);
		},
		
		".delay(timeout).join().then(callback) + .unrepeat()" : function($, test) {
			var x = 0;
			var timeout = 100;
			var callback = function(){ x++; test.check(); };
			var $x = test.element($('<div>').add('<p>'));
			$x.delay(timeout).join().then(callback);
			$x.delay(10000);
			test.assertEquals("active queue should wait", 0, x);
			window.setTimeout(function(){
				test.assertEquals("active queue should wait until delay is over", 0, x);
				$x.unrepeat();
				test.assertEquals(".join() should not fire in case of .unrepeat()", 0, x);
				window.setTimeout(function(){
					test.assertEquals(".join() must have fired after delay is over", 1, x);
					$x.dequeue();
					test.assertEquals(".join() should not fire anymore after .dequeue()", 1, x);
					window.setTimeout(function(){
						test.assertEquals(".join() should not have fired anymore", 1, x);
						$x.dequeue();
						test.assertEquals(".join() should not have fired anymore after .dequeue()", 1, x);
						test.done();
					}, 100);
				}, timeout);
			}, timeout / 2);
		},
		
		".delay(timeout).join() + .unrepeat() + .then(callback)" : function($, test) {
			var x = 0;
			var timeout = 100;
			var callback = function(){ x++; test.check(); };
			var $x = test.element($('<div>').add('<p>'));
			var TIC = $x.delay(timeout).join();
			$x.delay(10000);
			test.assertEquals("active queue should wait", 0, x);
			window.setTimeout(function(){
				test.assertEquals("active queue should wait until delay is over", 0, x);
				$x.unrepeat();
				test.assertEquals("TIC has to wait until .then()", 0, x);
				TIC.then(callback);
				test.assertEquals(".join() should not fire in case of .unrepeat()", 0, x);
				window.setTimeout(function(){
					test.assertEquals(".join() must have fired after delay is over", 1, x);
					$x.dequeue();
					test.assertEquals(".join() should not fire anymore after .dequeue()", 1, x);
					window.setTimeout(function(){
						test.assertEquals(".join() should not have fired anymore", 1, x);
						$x.dequeue();
						test.assertEquals(".join() should not have fired anymore after .dequeue()", 1, x);
						test.done();
					}, 100);
				}, timeout);
			}, timeout / 2);
		},
		
		"$('.multiple').join() deferred": function($, test) {
			var x = 0;
			var callback = function(){ x++; test.check(); };
			var $x = test.element($('<div>').add('<span>').add('<p>'));
			var timeout = 100;
			$x.eq(0).delay(timeout);
			$x.eq(2).delay(timeout*2);
			$x.join(callback);
			$x.delay(10000);
			test.assertEquals("join should wait until all elements joined", 0, x);
			window.setTimeout(function(){
				test.assertEquals("join should still wait until all elements joined", 0, x);
				window.setTimeout(function(){
					test.assertEquals("join should have fired once", 1, x);
					window.setTimeout(function(){
						test.assertEquals("join should not fire anymore", 1, x);
						test.done();
					}, timeout);
				}, timeout);
			}, timeout*1.5);
		},
		
		".delay(timeout).join()._": function($, test) {

			var $x = test.element($('<div>').add('<p>'));
			var TIC = $x.delay(100).join();
			$x.delay(10000);
			var _ = TIC._;
			test.assertNotEquals("tic must be new object", $x, TIC);
			test.assertEquals("underscore must return original object", $x, _);
			test.done();
		},

	},

	"joining ongoing default queue with .promise()": {
		
		_version: ['1.6'],
		
		".delay(timeout).join(true,callback)" : function($, test) {
			var x = 0;
			var timeout = 100;
			var callback = function(){ x++; test.check(); };
			var $x = test.element($('<div>').add('<p>'));
			$x.delay(timeout).join(true,callback);
			$x.delay(10000);
			test.assertEquals("active queue should wait", 0, x);
			window.setTimeout(function(){
				test.assertEquals("active queue should wait until delay is over", 0, x);
				window.setTimeout(function(){
					test.assertEquals(".join(true) must not have fired after first delay is over", 0, x);
					$x.dequeue();
					test.assertEquals(".join(true) should fire after .dequeue()", (compareVersion($().jquery,'1.7.99') <= 0) ? 0 : 1, x);
					window.setTimeout(function(){
						test.assertEquals(".join(true) should not have fired anymore", 1, x);
						$x.dequeue();
						test.assertEquals(".join(true) should not have fired anymore after .dequeue()", 1, x);
						test.done();
					}, 100);
				}, timeout);
			}, timeout / 2);
		},
		
		".delay(timeout).join(true).then(callback)" : function($, test) {
			var x = 0;
			var timeout = 100;
			var callback = function(){ x++; test.check(); };
			var $x = test.element($('<div>').add('<p>'));
			$x.delay(timeout).join(true).then(callback);
			$x.delay(10000);
			test.assertEquals("active queue should wait", 0, x);
			window.setTimeout(function(){
				test.assertEquals("active queue should wait until delay is over", 0, x);
				window.setTimeout(function(){
					test.assertEquals(".join(true) must not have fired after first delay is over", 0, x);
					$x.dequeue();
					test.assertEquals(".join(true) should not fire anymore after .dequeue()", (compareVersion($().jquery,'1.7.99') <= 0) ? 0 : 1, x);
					window.setTimeout(function(){
						test.assertEquals(".join(true) should not have fired anymore", 1, x);
						$x.dequeue();
						test.assertEquals(".join(true) should not have fired anymore after .dequeue()", 1, x);
						test.done();
					}, 100);
				}, timeout);
			}, timeout / 2);
		},

		".delay(timeout).join(true,callback) + .stop()" : function($, test) {
			var x = 0;
			var timeout = 100;
			var callback = function(){ x++; test.check(); };
			var $x = test.element($('<div>').add('<p>'));
			$x.delay(timeout).join(true,callback);
			$x.delay(10000);
			test.assertEquals("active queue should wait", 0, x);
			window.setTimeout(function(){
				test.assertEquals("active queue should wait until delay is over", 0, x);
				$x.stop();
				test.assertEquals(".join(true) should not fire after .stop() because fxq isn't empty", 0, x);
				$x.dequeue();
				test.assertEquals(".join(true) should fire after .dequeue()", (compareVersion($().jquery,'1.7.99') <= 0) ? 0 : 1, x);
				window.setTimeout(function(){
					test.assertEquals(".join(true) must have fired", 1, x);
					$x.dequeue();
					test.assertEquals(".join(true) should not fire again after .dequeue()", 1, x);
					window.setTimeout(function(){
						test.assertEquals(".join(true) should not have fired anymore", 1, x);
						$x.dequeue();
						test.assertEquals(".join(true) should not have fired anymore after .dequeue()", 1, x);
						test.done();
					}, 100);
				}, timeout);
			}, timeout / 2);
		},
		
		".delay(timeout).join(true,callback) + .stop(true)" : function($, test) {
			var x = 0;
			var timeout = 100;
			var callback = function(){ x++; test.check(); };
			var $x = test.element($('<div>').add('<p>'));
			$x.delay(timeout).join(true,callback);
			$x.delay(10000);
			test.assertEquals("active queue should wait", 0, x);
			window.setTimeout(function(){
				test.assertEquals("active queue should wait until delay is over", 0, x);
				$x.stop(true);
				test.assertEquals(".join(true) must have fired after .stop(true)", (compareVersion($().jquery,'1.7.99') <= 0) ? 0 : 1, x);
				window.setTimeout(function(){
					test.assertEquals(".join(true) should fire after .stop(true), because fxq is now empty", 1, x);
					$x.dequeue();
					test.assertEquals(".join(true) should not fire again after .dequeue()", 1, x);
					window.setTimeout(function(){
						test.assertEquals(".join(true) should not have fired anymore", 1, x);
						$x.dequeue();
						test.assertEquals(".join(true) should not have fired anymore after .dequeue()", 1, x);
						test.done();
					}, 100);
				}, timeout / 2);
			}, timeout / 2);
		},
		
		".delay(timeout).join(true).then(callback) + .stop()" : function($, test) {
			var x = 0;
			var timeout = 100;
			var callback = function(){ x++; test.check(); };
			var $x = test.element($('<div>').add('<p>'));
			$x.delay(timeout).join(true).then(callback);
			$x.delay(10000);
			test.assertEquals("active queue should wait", 0, x);
			window.setTimeout(function(){
				test.assertEquals("active queue should wait until delay is over", 0, x);
				$x.stop();
				test.assertEquals(".join(true) should not fire after .stop() because fxq isn't empty", 0, x);
				$x.dequeue();
				test.assertEquals(".join(true) should fire after .dequeue()", (compareVersion($().jquery,'1.7.99') <= 0) ? 0 : 1, x);
				window.setTimeout(function(){
					test.assertEquals(".join(true) must have fired", 1, x);
					$x.dequeue();
					test.assertEquals(".join(true) should not fire again after .dequeue()", 1, x);
					window.setTimeout(function(){
						test.assertEquals(".join(true) should not have fired anymore", 1, x);
						$x.dequeue();
						test.assertEquals(".join(true) should not have fired anymore after .dequeue()", 1, x);
						test.done();
					}, 100);
				}, timeout);
			}, timeout / 2);
		},
		
		".delay(timeout).join(true).then(callback) + .stop(true)" : function($, test) {
			var x = 0;
			var timeout = 100;
			var callback = function(){ x++; test.check(); };
			var $x = test.element($('<div>').add('<p>'));
			$x.delay(timeout).join(true).then(callback);
			$x.delay(10000);
			test.assertEquals("active queue should wait", 0, x);
			window.setTimeout(function(){
				test.assertEquals("active queue should wait until delay is over", 0, x);
				$x.stop(true);
				test.assertEquals(".join(true) should fire after .stop(true)", (compareVersion($().jquery,'1.7.99') <= 0) ? 0 : 1, x);
				window.setTimeout(function(){
					test.assertEquals(".join(true) must have fired after delay is over, because fxq is empty", 1, x);
					$x.dequeue();
					test.assertEquals(".join(true) should not fire again after .dequeue()", 1, x);
					window.setTimeout(function(){
						test.assertEquals(".join(true) should not have fired anymore", 1, x);
						$x.dequeue();
						test.assertEquals(".join(true) should not have fired anymore after .dequeue()", 1, x);
						test.done();
					}, 100);
				}, timeout);
			}, timeout / 2);
		},
		
		".delay(timeout).join(true) + .stop() + .then(callback)" : function($, test) {
			var x = 0;
			var timeout = 100;
			var callback = function(){ x++; test.check(); };
			var $x = test.element($('<div>').add('<p>'));
			var TIC = $x.delay(timeout).join(true);
			$x.delay(10000);
			test.assertEquals("active queue should wait", 0, x);
			window.setTimeout(function(){
				test.assertEquals("active queue should wait until delay is over", 0, x);
				$x.stop();
				test.assertEquals("TIC must wait until .then()", 0, x);
				TIC.then(callback);
				test.assertEquals(".join(true) should not fire after .stop() because fxq isn't empty", 0, x);
				$x.dequeue();
				test.assertEquals(".join(true) should fire after .dequeue()", (compareVersion($().jquery,'1.7.99') <= 0) ? 0 : 1, x);
				window.setTimeout(function(){
					test.assertEquals(".join(true) must have fired", 1, x);
					$x.dequeue();
					test.assertEquals(".join(true) should not fire again after .dequeue()", 1, x);
					window.setTimeout(function(){
						test.assertEquals(".join(true) should not have fired anymore", 1, x);
						$x.dequeue();
						test.assertEquals(".join(true) should not have fired anymore after .dequeue()", 1, x);
						test.done();
					}, 100);
				}, timeout);
			}, timeout / 2);
		},
		
		".delay(timeout).join(true) + .stop(true) + .then(callback)" : function($, test) {
			var x = 0;
			var timeout = 100;
			var callback = function(){ x++; test.check(); };
			var $x = test.element($('<div>').add('<p>'));
			var TIC = $x.delay(timeout).join(true);
			$x.delay(10000);
			test.assertEquals("active queue should wait", 0, x);
			window.setTimeout(function(){
				test.assertEquals("active queue should wait until delay is over", 0, x);
				$x.stop(true);
				test.assertEquals("TIC must wait until .then()", 0, x);
				TIC.then(callback);
				test.assertEquals(".join(true) should fire after .stop(true)", (compareVersion($().jquery,'1.7.99') <= 0) ? 0 : 1, x);
				window.setTimeout(function(){
					test.assertEquals(".join(true) must have fired", 1, x);
					$x.dequeue();
					test.assertEquals(".join(true) should not fire again after .dequeue()", 1, x);
					window.setTimeout(function(){
						test.assertEquals(".join(true) should not have fired anymore", 1, x);
						$x.dequeue();
						test.assertEquals(".join(true) should not have fired anymore after .dequeue()", 1, x);
						test.done();
					}, 100);
				}, timeout);
			}, timeout / 2);
		},
		
		".delay(timeout).join(true,callback) + .unwait()" : function($, test) {
			var x = 0;
			var timeout = 100;
			var callback = function(){ x++; test.check(); };
			var $x = test.element($('<div>').add('<p>'));
			$x.delay(timeout).join(true,callback);
			$x.delay(10000);
			test.assertEquals("active queue should wait", 0, x);
			window.setTimeout(function(){
				test.assertEquals("active queue should wait until delay is over", 0, x);
				$x.unwait();
				test.assertEquals(".join(true) should not fire in case of .unwait()", 0, x);
				window.setTimeout(function(){
					test.assertEquals(".join(true) must not have fired after first delay is over", 0, x);
					$x.dequeue();
					test.assertEquals(".join(true) should fire after .dequeue()", (compareVersion($().jquery,'1.7.99') <= 0) ? 0 : 1, x);
					window.setTimeout(function(){
						test.assertEquals(".join(true) should not have fired anymore", 1, x);
						$x.dequeue();
						test.assertEquals(".join(true) should not have fired anymore after .dequeue()", 1, x);
						test.done();
					}, 100);
				}, timeout);
			}, timeout / 2);
		},
		
		".delay(timeout).join(true).then(callback) + .unwait()" : function($, test) {
			var x = 0;
			var timeout = 100;
			var callback = function(){ x++; test.check(); };
			var $x = test.element($('<div>').add('<p>'));
			$x.delay(timeout).join(true).then(callback);
			$x.delay(10000);
			test.assertEquals("active queue should wait", 0, x);
			window.setTimeout(function(){
				test.assertEquals("active queue should wait until delay is over", 0, x);
				$x.unwait();
				test.assertEquals(".join(true) should not fire in case of .unwait()", 0, x);
				window.setTimeout(function(){
					test.assertEquals(".join(true) must not have fired after first delay is over", 0, x);
					$x.dequeue();
					test.assertEquals(".join(true) should fire after .dequeue()",  (compareVersion($().jquery,'1.7.99') <= 0) ? 0 : 1, x);
					window.setTimeout(function(){
						test.assertEquals(".join(true) should not have fired anymore", 1, x);
						$x.dequeue();
						test.assertEquals(".join(true) should not have fired anymore after .dequeue()", 1, x);
						test.done();
					}, 100);
				}, timeout);
			}, timeout / 2);
		},
		
		".delay(timeout).join(true) + .unwait() + .then(callback)" : function($, test) {
			var x = 0;
			var timeout = 100;
			var callback = function(){ x++; test.check(); };
			var $x = test.element($('<div>').add('<p>'));
			var TIC = $x.delay(timeout).join(true);
			$x.delay(10000);
			test.assertEquals("active queue should wait", 0, x);
			window.setTimeout(function(){
				test.assertEquals("active queue should wait until delay is over", 0, x);
				$x.unwait();
				test.assertEquals("TIC has to wait until .then()", 0, x);
				TIC.then(callback);
				test.assertEquals(".join(true) should not fire in case of .unwait()", 0, x);
				window.setTimeout(function(){
					test.assertEquals(".join(true) must not have fired after first delay is over", 0, x);
					$x.dequeue();
					test.assertEquals(".join(true) should fire after .dequeue()", (compareVersion($().jquery,'1.7.99') <= 0) ? 0 : 1, x);
					window.setTimeout(function(){
						test.assertEquals(".join(true) should not have fired anymore", 1, x);
						$x.dequeue();
						test.assertEquals(".join(true) should not have fired anymore after .dequeue()", 1, x);
						test.done();
					}, 100);
				}, timeout);
			}, timeout / 2);
		},
		
		".delay(timeout).join(true,callback) + .unrepeat()" : function($, test) {
			var x = 0;
			var timeout = 100;
			var callback = function(){ x++; test.check(); };
			var $x = test.element($('<div>').add('<p>'));
			$x.delay(timeout).join(true,callback);
			$x.delay(10000);
			test.assertEquals("active queue should wait", 0, x);
			window.setTimeout(function(){
				test.assertEquals("active queue should wait until delay is over", 0, x);
				$x.unrepeat();
				test.assertEquals(".join(true) should not fire in case of .unrepeat()", 0, x);
				window.setTimeout(function(){
					test.assertEquals(".join(true) must not have fired after first delay is over", 0, x);
					$x.dequeue();
					test.assertEquals(".join(true) should fire after .dequeue()", (compareVersion($().jquery,'1.7.99') <= 0) ? 0 : 1, x);
					window.setTimeout(function(){
						test.assertEquals(".join(true) should not have fired anymore", 1, x);
						$x.dequeue();
						test.assertEquals(".join(true) should not have fired anymore after .dequeue()", 1, x);
						test.done();
					}, 100);
				}, timeout);
			}, timeout / 2);
		},
		
		".delay(timeout).join(true).then(callback) + .unrepeat()" : function($, test) {
			var x = 0;
			var timeout = 100;
			var callback = function(){ x++; test.check(); };
			var $x = test.element($('<div>').add('<p>'));
			$x.delay(timeout).join(true).then(callback);
			$x.delay(10000);
			test.assertEquals("active queue should wait", 0, x);
			window.setTimeout(function(){
				test.assertEquals("active queue should wait until delay is over", 0, x);
				$x.unrepeat();
				test.assertEquals(".join(true) should not fire in case of .unrepeat()", 0, x);
				window.setTimeout(function(){
					test.assertEquals(".join(true) must not have fired after first delay is over", 0, x);
					$x.dequeue();
					test.assertEquals(".join(true) should fire after .dequeue()", (compareVersion($().jquery,'1.7.99') <= 0) ? 0 : 1, x);
					window.setTimeout(function(){
						test.assertEquals(".join(true) should not have fired anymore", 1, x);
						$x.dequeue();
						test.assertEquals(".join(true) should not have fired anymore after .dequeue()", 1, x);
						test.done();
					}, 100);
				}, timeout);
			}, timeout / 2);
		},
		
		".delay(timeout).join(true) + .unrepeat() + .then(callback)" : function($, test) {
			var x = 0;
			var timeout = 100;
			var callback = function(){ x++; test.check(); };
			var $x = test.element($('<div>').add('<p>'));
			var TIC = $x.delay(timeout).join(true);
			$x.delay(10000);
			test.assertEquals("active queue should wait", 0, x);
			window.setTimeout(function(){
				test.assertEquals("active queue should wait until delay is over", 0, x);
				$x.unrepeat();
				test.assertEquals("TIC has to wait until .then()", 0, x);
				TIC.then(callback);
				test.assertEquals(".join(true) should not fire in case of .unrepeat()", 0, x);
				window.setTimeout(function(){
					test.assertEquals(".join(true) must not have fired after first delay is over", 0, x);
					$x.dequeue();
					test.assertEquals(".join(true) should fire after .dequeue()", (compareVersion($().jquery,'1.7.99') <= 0) ? 0 : 1, x);
					window.setTimeout(function(){
						test.assertEquals(".join(true) should not have fired anymore", 1, x);
						$x.dequeue();
						test.assertEquals(".join(true) should not have fired anymore after .dequeue()", 1, x);
						test.done();
					}, 100);
				}, timeout);
			}, timeout / 2);
		},
		
		"$('.multiple').join(true) deferred": function($, test) {
			var x = 0;
			var callback = function(){ x++; test.check(); };
			var $x = test.element($('<div>').add('<span>').add('<p>'));
			var timeout = 100;
			$x.eq(0).delay(timeout);
			$x.eq(2).delay(timeout*2);
			$x.join(true,callback);
			$x.delay(10000);
			test.assertEquals("join should wait until all elements joined", 0, x);
			window.setTimeout(function(){
				test.assertEquals("join should still wait until all elements joined", 0, x);
				window.setTimeout(function(){
					test.assertEquals("join should not have fired yet", 0, x);
					$x.dequeue();
					window.setTimeout(function(){
						test.assertEquals("join should have fired", 1, x);
						test.done();
					}, timeout);
				}, timeout);
			}, timeout*1.5);
		},
		
		".delay(timeout).join(true)._": function($, test) {

			var $x = test.element($('<div>').add('<p>'));
			var TIC = $x.delay(100).join(true);
			$x.delay(10000);
			var _ = TIC._;
			test.assertNotEquals("tic must be new object", $x, TIC);
			test.assertEquals("underscore must return original object", $x, _);
			test.done();
		},

	},
	
	"joining empty named queue instantly": {

		".join(queue,callback) + .dequeue(queue)" : function($, test) {
			var x = 0;
			var queue = 'myFX';
			var callback = function(){ x++; test.check(); };
			var $x = test.element($('<div>').add('<p>'));
			var TIC = $x.join(queue, callback);
			$x.delay(10000,queue);
			$x.delay(10000,queue);
			test.assertEquals("empty named queues should wait until .dequeue()", 0, x);
			test.assertNotEquals(".join(queue) should return TIC placeholder", $x, TIC);
			$x.dequeue(queue);
			test.assertEquals(".join(queue) should fire after .dequeue(queue)", 1, x);
			$x.dequeue(queue);
			test.assertEquals(".join(queue) should not fire anymore after .dequeue(queue)", 1, x);
			window.setTimeout(function(){
				test.assertEquals(".join(queue) should not have fired anymore", 1, x);
				$x.dequeue(queue);
				test.assertEquals(".join(queue) should not have fired anymore after .dequeue(queue)", 1, x);
				test.done();
			}, 100);
		},
		
		".join(queue).then(callback) + .dequeue(queue)" : function($, test) {
			var x = 0;
			var queue = 'myFX';
			var callback = function(){ x++; test.check(); };
			var $x = test.element($('<div>').add('<p>'));
			var TIC = $x.join(queue).then(callback);
			$x.delay(10000,queue);
			test.assertEquals("empty named queues should wait until .dequeue()", 0, x);
			test.assertNotEquals(".join(queue) should return TIC placeholder", $x, TIC);
			$x.dequeue(queue);
			test.assertEquals(".join(queue) should fire after .dequeue(queue)", 1, x);
			$x.dequeue(queue);
			test.assertEquals(".join(queue) should not fire anymore after .dequeue(queue)", 1, x);
			window.setTimeout(function(){
				test.assertEquals(".join(queue) should not have fired anymore", 1, x);
				$x.dequeue(queue);
				test.assertEquals(".join(queue) should not have fired anymore after .dequeue(queue)", 1, x);
				test.done();
			}, 100);
		},

		".join(queue) + .dequeue(queue) + .then(callback)" : function($, test) {
			var x = 0;
			var queue = 'myFX';
			var callback = function(){ x++; test.check(); };
			var $x = test.element($('<div>').add('<p>'));
			var TIC = $x.join(queue);
			$x.delay(10000,queue);
			test.assertEquals("empty named queues should wait until .dequeue()", 0, x);
			test.assertNotEquals(".join(queue) should return TIC placeholder", $x, TIC);
			$x.dequeue(queue);
			test.assertEquals("TIC should wait until .then()", 0, x);
			var $y = TIC.then(callback);
			test.assertEquals("TIC should fire after .then() because of .dequeue(queue)", 1, x);
			test.assertEquals("instant .then() should return original object", $x, $y);
			$x.dequeue(queue);
			test.assertEquals(".join(queue) should not fire anymore after .dequeue(queue)", 1, x);
			window.setTimeout(function(){
				test.assertEquals(".join(queue) should not have fired anymore", 1, x);
				$x.dequeue(queue);
				test.assertEquals(".join(queue) should not have fired anymore after .dequeue(queue)", 1, x);
				test.done();
			}, 100);
		},

		".join(queue,callback) + .stop(queue) + .dequeue(queue)" : function($, test) {
			var x = 0;
			var queue = 'myFX';
			var callback = function(){ x++; test.check(); };
			var $x = test.element($('<div>').add('<p>'));
			var TIC = $x.join(queue,callback);
			$x.delay(10000,queue);
			test.assertEquals("empty named queues should wait until .dequeue()", 0, x);
			test.assertNotEquals(".join(queue) should return TIC placeholder", $x, TIC);
			$x.stop(queue);
			if (compareVersion($().jquery,'1.7.0') < 0) {
				test.assertEquals(".join(queue) should not fire on .stop(queue)", 0, x);
			} else {
				test.assertEquals(".join(queue) should fire on .stop(queue)", 1, x);
			}
			$x.dequeue(queue);
			test.assertEquals(".join(queue) should not fire anymore after .dequeue(queue)", 1, x);
			window.setTimeout(function(){
				test.assertEquals(".join(queue) should not have fired anymore", 1, x);
				$x.stop(queue);
				test.assertEquals(".join(queue) should not have fired anymore after .stop(queue)", 1, x);
				$x.dequeue(queue);
				test.assertEquals(".join(queue) should not have fired anymore after .dequeue(queue)", 1, x);
				test.done();
			}, 100);
		},
		
		".join(queue,callback) + .stop(queue,true) + .dequeue(queue)" : function($, test) {
			var x = 0;
			var queue = 'myFX';
			var callback = function(){ x++; test.check(); };
			var $x = test.element($('<div>').add('<p>'));
			var TIC = $x.join(queue,callback);
			$x.delay(10000,queue);
			test.assertEquals("empty named queues should wait until .dequeue()", 0, x);
			test.assertNotEquals(".join(queue) should return TIC placeholder", $x, TIC);
			$x.stop(queue,true);
			test.assertEquals(".join(queue) should not fire on .stop(queue,true)", 0, x);
			$x.dequeue(queue);
			if (compareVersion($().jquery,'1.7.0') < 0) {
				test.assertEquals(".join(queue) should fire after .dequeue(queue)", 1, x--);
			} else {
				test.assertEquals(".join(queue) should not fire anymore after .dequeue(queue)", 0, x);
			}
			window.setTimeout(function(){
				test.assertEquals(".join(queue) should not have fired anymore", 0, x);
				$x.stop(queue,true);
				test.assertEquals(".join(queue) should not have fired anymore after .stop(queue,true)", 0, x);
				$x.dequeue(queue);
				test.assertEquals(".join(queue) should not have fired anymore after .dequeue(queue)", 0, x);
				test.done();
			}, 100);
		},
		
		".join(queue).then(callback) + .stop(queue) + .dequeue(queue)" : function($, test) {
			var x = 0;
			var queue = 'myFX';
			var callback = function(){ x++; test.check(); };
			var $x = test.element($('<div>').add('<p>'));
			var TIC = $x.join(queue).then(callback);
			$x.delay(10000,queue);
			test.assertEquals("empty named queues should wait until .dequeue()", 0, x);
			test.assertNotEquals(".join(queue) should return TIC placeholder", $x, TIC);
			$x.stop(queue);
			if (compareVersion($().jquery,'1.7.0') < 0) {
				test.assertEquals(".join(queue) should not fire on .stop(queue)", 0, x);
			} else {
				test.assertEquals(".join(queue) should fire on .stop(queue)", 1, x);
			}
			$x.dequeue(queue);
			test.assertEquals(".join(queue) should not fire anymore after .dequeue(queue)", 1, x);
			window.setTimeout(function(){
				test.assertEquals(".join(queue) should not have fired anymore", 1, x);
				$x.stop(queue);
				test.assertEquals(".join(queue) should not have fired anymore after .stop(queue)", 1, x);
				$x.dequeue(queue);
				test.assertEquals(".join(queue) should not have fired anymore after .dequeue(queue)", 1, x);
				test.done();
			}, 100);
		},
		
		".join(queue).then(callback) + .stop(queue,true) + .dequeue(queue)" : function($, test) {
			var x = 0;
			var queue = 'myFX';
			var callback = function(){ x++; test.check(); };
			var $x = test.element($('<div>').add('<p>'));
			var TIC = $x.join(queue).then(callback);
			$x.delay(10000,queue);
			test.assertEquals("empty named queues should wait until .dequeue()", 0, x);
			test.assertNotEquals(".join(queue) should return TIC placeholder", $x, TIC);
			$x.stop(queue,true);
			test.assertEquals(".join(queue) should not fire on .stop(queue,true)", 0, x);
			$x.dequeue(queue);
			if (compareVersion($().jquery,'1.7.0') < 0) {
				test.assertEquals(".join(queue) should fire after .dequeue(queue)", 1, x--);
			} else {
				test.assertEquals(".join(queue) should not fire anymore after .dequeue(queue)", 0, x);
			}
			window.setTimeout(function(){
				test.assertEquals(".join(queue) should not have fired anymore", 0, x);
				$x.stop(queue,true);
				test.assertEquals(".join(queue) should not have fired anymore after .stop(queue,true)", 0, x);
				$x.dequeue(queue);
				test.assertEquals(".join(queue) should not have fired anymore after .dequeue(queue)", 0, x);
				test.done();
			}, 100);
		},
		
		".join(queue) + .stop(queue) + .then(callback) + .dequeue(queue)" : function($, test) {
			var x = 0;
			var queue = 'myFX';
			var callback = function(){ x++; test.check(); };
			var $x = test.element($('<div>').add('<p>'));
			var TIC = $x.join(queue);
			$x.delay(10000,queue);
			test.assertEquals("empty named queues should wait until .dequeue()", 0, x);
			test.assertNotEquals(".join(queue) should return TIC placeholder", $x, TIC);
			$x.stop(queue);
			test.assertEquals("TIC must wait until .then()", 0, x);
			TIC.then(callback);
			if (compareVersion($().jquery,'1.7.0') < 0) {
				test.assertEquals(".join(queue) should not fire on .stop(queue)", 0, x);
			} else {
				test.assertEquals(".join(queue) should fire on .stop(queue)", 1, x);
			}
			$x.dequeue(queue);
			test.assertEquals(".join(queue) should not fire anymore after .dequeue(queue)", 1, x);
			window.setTimeout(function(){
				test.assertEquals(".join(queue) should not have fired anymore", 1, x);
				$x.stop(queue);
				test.assertEquals(".join(queue) should not have fired anymore after .stop(queue)", 1, x);
				$x.dequeue(queue);
				test.assertEquals(".join(queue) should not have fired anymore after .dequeue(queue)", 1, x);
				test.done();
			}, 100);
		},
		
		".join(queue) + .stop(queue,true) + .then(callback) + .dequeue(queue)" : function($, test) {
			var x = 0;
			var queue = 'myFX';
			var callback = function(){ x++; test.check(); };
			var $x = test.element($('<div>').add('<p>'));
			var TIC = $x.join(queue);
			$x.delay(10000,queue);
			test.assertEquals("empty named queues should wait until .dequeue()", 0, x);
			test.assertNotEquals(".join(queue) should return TIC placeholder", $x, TIC);
			$x.stop(queue,true);
			test.assertEquals("TIC must wait until .then()", 0, x);
			TIC.then(callback);
			test.assertEquals(".join(queue) should not fire on .stop(queue,true)", 0, x);
			$x.dequeue(queue);
			if (compareVersion($().jquery,'1.7.0') < 0) {
				test.assertEquals(".join(queue) should fire after .dequeue(queue)", 1, x--);
			} else {
				test.assertEquals(".join(queue) should not fire anymore after .dequeue(queue)", 0, x);
			}
			window.setTimeout(function(){
				test.assertEquals(".join(queue) should not have fired anymore", 0, x);
				$x.stop(queue,true);
				test.assertEquals(".join(queue) should not have fired anymore after .stop(queue,true)", 0, x);
				$x.dequeue(queue);
				test.assertEquals(".join(queue) should not have fired anymore after .dequeue(queue)", 0, x);
				test.done();
			}, 100);
		},
		
		".join(queue,callback) + .unwait() + .dequeue(queue)" : function($, test) {
			var x = 0;
			var queue = 'myFX';
			var callback = function(){ x++; test.check(); };
			var $x = test.element($('<div>').add('<p>'));
			var TIC = $x.join(queue, callback);
			$x.delay(10000,queue);
			test.assertEquals("empty named queues should wait until .dequeue()", 0, x);
			test.assertNotEquals(".join(queue) should return TIC placeholder", $x, TIC);
			$x.unwait();
			test.assertEquals(".join(queue) must not fire on .unwait(queue)", 0, x);
			$x.dequeue(queue);
			test.assertEquals(".join(queue) should fire after .dequeue()", 1, x);
			$x.dequeue(queue);
			test.assertEquals(".join(queue) should not fire anymore after .dequeue(queue)", 1, x);
			window.setTimeout(function(){
				test.assertEquals(".join(queue) should not have fired anymore", 1, x);
				$x.unwait(queue);
				test.assertEquals(".join(queue) should not have fired anymore after .unwait(queue)", 1, x);
				$x.dequeue(queue);
				test.assertEquals(".join(queue) should not have fired anymore after .dequeue(queue)", 1, x);
				test.done();
			}, 100);
		},
		
		".join(queue).then(callback) + .unwait() + .dequeue(queue)" : function($, test) {
			var x = 0;
			var queue = 'myFX';
			var callback = function(){ x++; test.check(); };
			var $x = test.element($('<div>').add('<p>'));
			var TIC = $x.join(queue).then(callback);
			$x.delay(10000,queue);
			test.assertEquals("empty named queues should wait until .dequeue()", 0, x);
			test.assertNotEquals(".join(queue) should return TIC placeholder", $x, TIC);
			$x.unwait();
			test.assertEquals(".join(queue) must not fire on .unwait(queue)", 0, x);
			$x.dequeue(queue);
			test.assertEquals(".join(queue) should fire after .dequeue()", 1, x);
			$x.dequeue(queue);
			test.assertEquals(".join(queue) should not fire anymore after .dequeue(queue)", 1, x);
			window.setTimeout(function(){
				test.assertEquals(".join(queue) should not have fired anymore", 1, x);
				$x.unwait(queue);
				test.assertEquals(".join(queue) should not have fired anymore after .unwait(queue)", 1, x);
				$x.dequeue(queue);
				test.assertEquals(".join(queue) should not have fired anymore after .dequeue(queue)", 1, x);
				test.done();
			}, 100);
		},
		
		".join(queue) + .unwait() + .then(callback) + .dequeue(queue)" : function($, test) {
			var x = 0;
			var queue = 'myFX';
			var callback = function(){ x++; test.check(); };
			var $x = test.element($('<div>').add('<p>'));
			var TIC = $x.join(queue);
			$x.delay(10000,queue);
			test.assertEquals("empty named queues should wait until .dequeue()", 0, x);
			test.assertNotEquals(".join(queue) should return TIC placeholder", $x, TIC);
			$x.unwait();
			test.assertEquals("TIC must wait until .then()", 0, x);
			TIC.then(callback);
			test.assertEquals(".join(queue) must not fire on .unwait(queue)", 0, x);
			$x.dequeue(queue);
			test.assertEquals(".join(queue) should fire after .dequeue()", 1, x);
			$x.dequeue(queue);
			test.assertEquals(".join(queue) should not fire anymore after .dequeue(queue)", 1, x);
			window.setTimeout(function(){
				test.assertEquals(".join(queue) should not have fired anymore", 1, x);
				$x.unwait(queue);
				test.assertEquals(".join(queue) should not have fired anymore after .unwait(queue)", 1, x);
				$x.dequeue(queue);
				test.assertEquals(".join(queue) should not have fired anymore after .dequeue(queue)", 1, x);
				test.done();
			}, 100);
		},
		
		".join(queue,callback) + .unrepeat() + .dequeue(queue)" : function($, test) {
			var x = 0;
			var queue = 'myFX';
			var callback = function(){ x++; test.check(); };
			var $x = test.element($('<div>').add('<p>'));
			var TIC = $x.join(queue, callback);
			$x.delay(10000,queue);
			test.assertEquals("empty named queues should wait until .dequeue()", 0, x);
			test.assertNotEquals(".join(queue) should return TIC placeholder", $x, TIC);
			$x.unrepeat(queue);
			test.assertEquals(".join(queue) must not fire on .unrepeat(queue)", 0, x);
			$x.dequeue(queue);
			test.assertEquals(".join(queue) should fire after .dequeue()", 1, x);
			$x.dequeue(queue);
			test.assertEquals(".join(queue) should not fire anymore after .dequeue(queue)", 1, x);
			window.setTimeout(function(){
				test.assertEquals(".join(queue) should not have fired anymore", 1, x);
				$x.unrepeat(queue);
				test.assertEquals(".join(queue) should not have fired anymore after .unrepeat(queue)", 1, x);
				$x.dequeue(queue);
				test.assertEquals(".join(queue) should not have fired anymore after .dequeue(queue)", 1, x);
				test.done();
			}, 100);
		},
		
		".join(queue).then(callback) + .unrepeat() + .dequeue(queue)" : function($, test) {
			var x = 0;
			var queue = 'myFX';
			var callback = function(){ x++; test.check(); };
			var $x = test.element($('<div>').add('<p>'));
			var TIC = $x.join(queue).then(callback);
			$x.delay(10000,queue);
			test.assertEquals("empty named queues should wait until .dequeue()", 0, x);
			test.assertNotEquals(".join(queue) should return TIC placeholder", $x, TIC);
			$x.unrepeat(queue);
			test.assertEquals(".join(queue) must not fire on .unrepeat(queue)", 0, x);
			$x.dequeue(queue);
			test.assertEquals(".join(queue) should fire after .dequeue()", 1, x);
			$x.dequeue(queue);
			test.assertEquals(".join(queue) should not fire anymore after .dequeue(queue)", 1, x);
			window.setTimeout(function(){
				test.assertEquals(".join(queue) should not have fired anymore", 1, x);
				$x.unrepeat(queue);
				test.assertEquals(".join(queue) should not have fired anymore after .unrepeat(queue)", 1, x);
				$x.dequeue(queue);
				test.assertEquals(".join(queue) should not have fired anymore after .dequeue(queue)", 1, x);
				test.done();
			}, 100);
		},
		
		".join(queue) + .unrepeat() + .then(callback) + .dequeue(queue)" : function($, test) {
			var x = 0;
			var queue = 'myFX';
			var callback = function(){ x++; test.check(); };
			var $x = test.element($('<div>').add('<p>'));
			var TIC = $x.join(queue);
			$x.delay(10000,queue);
			test.assertEquals("empty named queues should wait until .dequeue()", 0, x);
			test.assertNotEquals(".join(queue) should return TIC placeholder", $x, TIC);
			$x.unrepeat(queue);
			test.assertEquals("TIC must wait until .then()", 0, x);
			TIC.then(callback);
			test.assertEquals(".join(queue) must not fire on .unrepeat(queue)", 0, x);
			$x.dequeue(queue);
			test.assertEquals(".join(queue) should fire after .dequeue()", 1, x);
			$x.dequeue(queue);
			test.assertEquals(".join(queue) should not fire anymore after .dequeue(queue)", 1, x);
			window.setTimeout(function(){
				test.assertEquals(".join(queue) should not have fired anymore", 1, x);
				$x.unrepeat(queue);
				test.assertEquals(".join(queue) should not have fired anymore after .unrepeat(queue)", 1, x);
				$x.dequeue(queue);
				test.assertEquals(".join(queue) should not have fired anymore after .dequeue(queue)", 1, x);
				test.done();
			}, 100);
		},
		
	},
		
	"joining empty named queue instantly with .promise()": {
		
		_version: ['1.6'],

		".join(queue,true,callback)" : function($, test) {
			var queue = 'myFX';
			var x = 0;
			var callback = function(){ x++; test.check(); };
			var $x = test.element($('<div>').add('<p>'));
			var TIC = $x.join(queue,true,callback);
			$x.delay(10000,queue);
			test.assertEquals("instant .join(queue,true) should fire", 1, x);
			test.assertEquals("instant .join(queue,true) should return original jQuery object", $x, TIC);
			$x.dequeue();
			test.assertEquals("instant .join(queue,true) should not fire anymore after .dequeue()", 1, x);
			window.setTimeout(function(){
				test.assertEquals(".join(queue,true) should not have fired anymore", 1, x);
				$x.dequeue();
				test.assertEquals(".join(queue,true) should not have fired anymore after .dequeue()", 1, x);
				test.done();
			}, 100);
		},
		
		".join(queue,true).then(callback)" : function($, test) {
			var queue = 'myFX';
			var x = 0;
			var callback = function(){ x++; test.check(); };
			var $x = test.element($('<div>').add('<p>'));
			var TIC = $x.join(queue,true);
			$x.delay(10000,queue);
			test.assertEquals("TIC must not fire before .then()", 0, x);
			test.assertEquals("instant .join(queue,true) should return original jQuery object", $x, TIC);
			TIC.then(callback);
			test.assertEquals("instant .join(queue,true) should fire after .then()", 1, x);
			$x.dequeue();
			test.assertEquals("instant .join(queue,true) should not fire anymore after .dequeue()", 1, x);
			window.setTimeout(function(){
				test.assertEquals(".join(queue,true) should not have fired anymore", 1, x);
				$x.dequeue();
				test.assertEquals(".join(queue,true) should not have fired anymore after .dequeue()", 1, x);
				test.done();
			}, 100);
		},

		".join(queue,true,callback) + .stop()" : function($, test) {
			var queue = 'myFX';
			var x = 0;
			var callback = function(){ x++; test.check(); };
			var $x = test.element($('<div>').add('<p>'));
			var TIC = $x.join(queue,true,callback);
			$x.delay(10000,queue);
			test.assertEquals("instant .join(queue,true) should fire", 1, x);
			test.assertEquals("instant .join(queue,true) should return original jQuery object", $x, TIC);
			$x.stop();
			test.assertEquals("instant .join(queue,true) should not fire anymore after .stop()", 1, x);
			$x.dequeue();
			test.assertEquals("instant .join(queue,true) should not fire anymore after .dequeue()", 1, x);
			window.setTimeout(function(){
				test.assertEquals(".join(queue,true) should not have fired anymore", 1, x);
				$x.dequeue();
				test.assertEquals(".join(queue,true) should not have fired anymore after .dequeue()", 1, x);
				test.done();
			}, 100);
		},
		
		".join(queue,true,callback) + .stop(true)" : function($, test) {
			var queue = 'myFX';
			var x = 0;
			var callback = function(){ x++; test.check(); };
			var $x = test.element($('<div>').add('<p>'));
			var TIC = $x.join(queue,true,callback);
			$x.delay(10000,queue);
			test.assertEquals("instant .join(queue,true) should fire", 1, x);
			test.assertEquals("instant .join(queue,true) should return original jQuery object", $x, TIC);
			$x.stop(true);
			test.assertEquals("instant .join(queue,true) should not fire anymore after .stop(true)", 1, x);
			$x.dequeue();
			test.assertEquals("instant .join(queue,true) should not fire anymore after .dequeue()", 1, x);
			window.setTimeout(function(){
				test.assertEquals(".join(queue,true) should not have fired anymore", 1, x);
				$x.dequeue();
				test.assertEquals(".join(queue,true) should not have fired anymore after .dequeue()", 1, x);
				test.done();
			}, 100);
		},
		
		".join(queue,true).then(callback) + .stop()" : function($, test) {
			var queue = 'myFX';
			var x = 0;
			var callback = function(){ x++; test.check(); };
			var $x = test.element($('<div>').add('<p>'));
			var TIC = $x.join(queue,true);
			$x.delay(10000,queue);
			test.assertEquals("TIC must not fire before .then()", 0, x);
			test.assertEquals("instant .join(queue,true) should return original jQuery object", $x, TIC);
			TIC.then(callback);
			test.assertEquals("instant .join(queue,true) should fire after .then()", 1, x);
			$x.stop();
			test.assertEquals("instant .join(queue,true) should not fire anymore after .stop()", 1, x);
			$x.dequeue();
			test.assertEquals("instant .join(queue,true) should not fire anymore after .dequeue()", 1, x);
			window.setTimeout(function(){
				test.assertEquals(".join(queue,true) should not have fired anymore", 1, x);
				$x.dequeue();
				test.assertEquals(".join(queue,true) should not have fired anymore after .dequeue()", 1, x);
				test.done();
			}, 100);
		},
		
		".join(queue,true).then(callback) + .stop(true)" : function($, test) {
			var queue = 'myFX';
			var x = 0;
			var callback = function(){ x++; test.check(); };
			var $x = test.element($('<div>').add('<p>'));
			var TIC = $x.join(queue,true);
			$x.delay(10000,queue);
			test.assertEquals("TIC must not fire before .then()", 0, x);
			test.assertEquals("instant .join(queue,true) should return original jQuery object", $x, TIC);
			TIC.then(callback);
			test.assertEquals("instant .join(queue,true) should fire after .then()", 1, x);
			$x.stop(true);
			test.assertEquals("instant .join(queue,true) should not fire anymore after .stop(true)", 1, x);
			$x.dequeue();
			test.assertEquals("instant .join(queue,true) should not fire anymore after .dequeue()", 1, x);
			window.setTimeout(function(){
				test.assertEquals(".join(queue,true) should not have fired anymore", 1, x);
				$x.dequeue();
				test.assertEquals(".join(queue,true) should not have fired anymore after .dequeue()", 1, x);
				test.done();
			}, 100);
		},

		".join(queue,true) + .stop() + .then(callback)" : function($, test) {
			var queue = 'myFX';
			var x = 0;
			var callback = function(){ x++; test.check(); };
			var $x = test.element($('<div>').add('<p>'));
			var TIC = $x.join(queue,true);
			$x.delay(10000,queue);
			test.assertEquals("TIC must not fire before .then()", 0, x);
			test.assertEquals("instant .join(queue,true) should return original jQuery object", $x, TIC);
			$x.stop();
			test.assertEquals("TIC must not fire after .stop() before .then()", 0, x);
			TIC.then(callback);
			test.assertEquals("instant .join(queue,true) should fire after .then(), because .stop() was too late", 1, x);
			$x.dequeue();
			test.assertEquals("instant .join(queue,true) should not fire anymore after .dequeue()", 1, x);
			window.setTimeout(function(){
				test.assertEquals(".join(queue,true) should not have fired anymore", 1, x);
				$x.dequeue();
				test.assertEquals(".join(queue,true) should not have fired anymore after .dequeue()", 1, x);
				test.done();
			}, 100);
		},
		
		".join(queue,true) + .stop(true) + .then(callback)" : function($, test) {
			var queue = 'myFX';
			var x = 0;
			var callback = function(){ x++; test.check(); };
			var $x = test.element($('<div>').add('<p>'));
			var TIC = $x.join(queue,true);
			$x.delay(10000,queue);
			test.assertEquals("TIC must not fire before .then()", 0, x);
			test.assertEquals("instant .join(queue,true) should return original jQuery object", $x, TIC);
			$x.stop(true);
			test.assertEquals("TIC must not fire after .stop(true) before .then()", 0, x);
			TIC.then(callback);
			test.assertEquals("instant .join(queue,true) should fire after .then(), because .stop(true) was too late", 1, x);
			$x.dequeue();
			test.assertEquals("instant .join(queue,true) should not fire anymore after .dequeue()", 1, x);
			window.setTimeout(function(){
				test.assertEquals(".join(queue,true) should not have fired anymore", 1, x);
				$x.dequeue();
				test.assertEquals(".join(queue,true) should not have fired anymore after .dequeue()", 1, x);
				test.done();
			}, 100);
		},
		
		".join(queue,true) + .unwait() + .then(callback)" : function($, test) {
			var queue = 'myFX';
			var x = 0;
			var callback = function(){ x++; test.check(); };
			var $x = test.element($('<div>').add('<p>'));
			var TIC = $x.join(queue,true);
			$x.delay(10000,queue);
			test.assertEquals("TIC must not fire before .then()", 0, x);
			test.assertEquals("instant .join(queue,true) should return original jQuery object", $x, TIC);
			$x.unwait();
			test.assertEquals("TIC must not fire after .unwait() before .then()", 0, x);
			TIC.then(callback);
			test.assertEquals("instant .join(queue,true) should fire after .then(), because .unwait() should be ignored", 1, x);
			$x.dequeue();
			test.assertEquals("instant .join(queue,true) should not fire anymore after .dequeue()", 1, x);
			window.setTimeout(function(){
				test.assertEquals(".join(queue,true) should not have fired anymore", 1, x);
				$x.dequeue();
				test.assertEquals(".join(queue,true) should not have fired anymore after .dequeue()", 1, x);
				test.done();
			}, 100);
		},
		
		".join(queue,true) + .unrepeat() + .then(callback)" : function($, test) {
			var queue = 'myFX';
			var x = 0;
			var callback = function(){ x++; test.check(); };
			var $x = test.element($('<div>').add('<p>'));
			var TIC = $x.join(queue,true);
			$x.delay(10000,queue);
			test.assertEquals("TIC must not fire before .then()", 0, x);
			test.assertEquals("instant .join(queue,true) should return original jQuery object", $x, TIC);
			$x.unrepeat();
			test.assertEquals("TIC must not fire after .unwait() before .then()", 0, x);
			TIC.then(callback);
			test.assertEquals("instant .join(queue,true) should fire after .then(), because .unwait() should be ignored", 1, x);
			$x.dequeue();
			test.assertEquals("instant .join(queue,true) should not fire anymore after .dequeue()", 1, x);
			window.setTimeout(function(){
				test.assertEquals(".join(queue,true) should not have fired anymore", 1, x);
				$x.dequeue();
				test.assertEquals(".join(queue,true) should not have fired anymore after .dequeue()", 1, x);
				test.done();
			}, 100);
		},
		
		"$('.multiple').join(queue,true) instantly": function($, test) {
			var queue = 'myFX';
			var x = 0;
			var callback = function(){ x++; test.check(); };
			var $x = test.element($('<div>').add('<span>').add('<p>'));
			test.assertEquals("not enough objects", 3, $x.size());
			var TIC = $x.join(queue,true,callback);
			$x.delay(10000,queue);
			test.assertEquals("join should fire once for multiple objects", 1, x);
			test.assertEquals("instant .join(queue,true) should return original jQuery object", $x, TIC);
			test.done();
		},
		
		".stop().join(queue,true)._": function($, test) {
			var queue = 'myFX';
			var $x = test.element($('<div>').add('<p>'));
			var TIC = $x.stop().join(queue,true);
			$x.delay(10000,queue);
			var _ = TIC._;
			test.assertEquals("tic must be same object because of instant invocation", $x, TIC);
			test.assertEquals("underscore must return original object", $x, _);
			test.done();
		},

		"$('empty').join(queue,true).doNow()": function($, test) {
			var queue = 'myFX';
			$('none').join(queue,true).then(function(){
				test.done();
			});
			test.fail("empty .join(queue,true) must return immediately");
		},
		
	},
		
	"joining empty named queue deferred": {

		".join(queue,callback) +…+ .dequeue(queue)" : function($, test) {
			var x = 0;
			var queue = 'myFX';
			var callback = function(){ x++; test.check(); };
			var $x = test.element($('<div>').add('<p>'));
			$x.join(queue, callback);
			$x.delay(10000,queue);
			window.setTimeout(function(){
				test.assertEquals("empty named queues should wait until .dequeue()", 0, x);
				$x.dequeue(queue);
				test.assertEquals(".join(queue) should fire after .dequeue(queue)", 1, x);
				$x.dequeue(queue);
				test.assertEquals(".join(queue) should not fire anymore after .dequeue(queue)", 1, x);
				window.setTimeout(function(){
					test.assertEquals(".join(queue) should not have fired anymore", 1, x);
					$x.dequeue(queue);
					test.assertEquals(".join(queue) should not have fired anymore after .dequeue(queue)", 1, x);
					test.done();
				}, 100);
			}, 100);
		},
		
		".join(queue) +…+ .then(callback) + .dequeue(queue)" : function($, test) {
			var x = 0;
			var queue = 'myFX';
			var callback = function(){ x++; test.check(); };
			var $x = test.element($('<div>').add('<p>'));
			var TIC = $x.join(queue);
			$x.delay(10000,queue);
			window.setTimeout(function(){
				TIC.then(callback);
				test.assertEquals("empty named queues should wait until .dequeue()", 0, x);
				$x.dequeue(queue);
				test.assertEquals(".join(queue) should fire after .dequeue(queue)", 1, x);
				$x.dequeue(queue);
				test.assertEquals(".join(queue) should not fire anymore after .dequeue(queue)", 1, x);
				window.setTimeout(function(){
					test.assertEquals(".join(queue) should not have fired anymore", 1, x);
					$x.dequeue(queue);
					test.assertEquals(".join(queue) should not have fired anymore after .dequeue(queue)", 1, x);
					test.done();
				}, 100);
			}, 100);
		},

		".join(queue) +…+ .dequeue(queue) + .then(callback)" : function($, test) {
			var x = 0;
			var queue = 'myFX';
			var callback = function(){ x++; test.check(); };
			var $x = test.element($('<div>').add('<p>'));
			var TIC = $x.join(queue);
			$x.delay(10000,queue);
			window.setTimeout(function(){
				test.assertEquals("empty named queues should wait until .dequeue()", 0, x);
				$x.dequeue(queue);
				test.assertEquals("TIC should wait until .then()", 0, x);
				TIC.then(callback);
				test.assertEquals("TIC should fire after .then() because of .dequeue(queue)", 1, x);
				$x.dequeue(queue);
				test.assertEquals(".join(queue) should not fire anymore after .dequeue(queue)", 1, x);
				window.setTimeout(function(){
					test.assertEquals(".join(queue) should not have fired anymore", 1, x);
					$x.dequeue(queue);
					test.assertEquals(".join(queue) should not have fired anymore after .dequeue(queue)", 1, x);
					test.done();
				}, 100);
			}, 100);
		},

		".join(queue,callback) +…+ .stop(queue) + .dequeue(queue)" : function($, test) {
			var x = 0;
			var queue = 'myFX';
			var callback = function(){ x++; test.check(); };
			var $x = test.element($('<div>').add('<p>'));
			$x.join(queue,callback);
			$x.delay(10000,queue);
			window.setTimeout(function(){
				test.assertEquals("empty named queues should wait until .dequeue()", 0, x);
				$x.stop(queue);
				if (compareVersion($().jquery,'1.7.0') < 0) {
					test.assertEquals(".join(queue) should not fire on .stop(queue)", 0, x);
				} else {
					test.assertEquals(".join(queue) must fire because of .stop(queue)", 1, x);
				}
				$x.dequeue(queue);
				test.assertEquals(".join(queue) should not fire anymore after .dequeue(queue)", 1, x);
				window.setTimeout(function(){
					test.assertEquals(".join(queue) should not have fired anymore", 1, x);
					$x.stop(queue);
					test.assertEquals(".join(queue) should not have fired anymore after .stop(queue)", 1, x);
					$x.dequeue(queue);
					test.assertEquals(".join(queue) should not have fired anymore after .dequeue(queue)", 1, x);
					test.done();
				}, 100);
			}, 100);
		},
		
		".join(queue,callback) +…+ .stop(queue,true) + .dequeue(queue)" : function($, test) {
			var x = 0;
			var queue = 'myFX';
			var callback = function(){ x++; test.check(); };
			var $x = test.element($('<div>').add('<p>'));
			$x.join(queue,callback);
			$x.delay(10000,queue);
			window.setTimeout(function(){
				test.assertEquals("empty named queues should wait until .dequeue()", 0, x);
				$x.stop(queue,true);
				test.assertEquals(".join(queue) should not fire on .stop(queue,true)", 0, x);
				$x.dequeue(queue);
				if (compareVersion($().jquery,'1.7.0') < 0) {
					test.assertEquals(".join(queue) should fire after .dequeue(queue)", 1, x--);
				} else {
					test.assertEquals(".join(queue) should not fire anymore after .dequeue(queue)", 0, x);
				}
				window.setTimeout(function(){
					test.assertEquals(".join(queue) should not have fired anymore", 0, x);
					$x.stop(queue,true);
					test.assertEquals(".join(queue) should not have fired anymore after .stop(queue,true)", 0, x);
					$x.dequeue(queue);
					test.assertEquals(".join(queue) should not have fired anymore after .dequeue(queue)", 0, x);
					test.done();
				}, 100);
			}, 100);
		},
		
		".join(queue) +…+ .then(callback) + .stop(queue) + .dequeue(queue)" : function($, test) {
			var x = 0;
			var queue = 'myFX';
			var callback = function(){ x++; test.check(); };
			var $x = test.element($('<div>').add('<p>'));
			var TIC = $x.join(queue);
			$x.delay(10000,queue);
			window.setTimeout(function(){
				TIC.then(callback);
				test.assertEquals("empty named queues should wait until .dequeue()", 0, x);
				$x.stop(queue);
				if (compareVersion($().jquery,'1.7.0') < 0) {
					test.assertEquals(".join(queue) should not fire on .stop(queue)", 0, x);
				} else {
					test.assertEquals(".join(queue) must fire because of .stop(queue)", 1, x);
				}
				$x.dequeue(queue);
				test.assertEquals(".join(queue) should not fire anymore after .dequeue(queue)", 1, x);
				window.setTimeout(function(){
					test.assertEquals(".join(queue) should not have fired anymore", 1, x);
					$x.stop(queue);
					test.assertEquals(".join(queue) should not have fired anymore after .stop(queue)", 1, x);
					$x.dequeue(queue);
					test.assertEquals(".join(queue) should not have fired anymore after .dequeue(queue)", 1, x);
					test.done();
				}, 100);
			}, 100);
		},
		
		".join(queue) +…+ .then(callback) + .stop(queue,true) + .dequeue(queue)" : function($, test) {
			var x = 0;
			var queue = 'myFX';
			var callback = function(){ x++; test.check(); };
			var $x = test.element($('<div>').add('<p>'));
			var TIC = $x.join(queue);
			$x.delay(10000,queue);
			window.setTimeout(function(){
				TIC.then(callback);
				test.assertEquals("empty named queues should wait until .dequeue()", 0, x);
				$x.stop(queue,true);
				test.assertEquals(".join(queue) should not fire on .stop(queue,true)", 0, x);
				$x.dequeue(queue);
				if (compareVersion($().jquery,'1.7.0') < 0) {
					test.assertEquals(".join(queue) should fire after .dequeue(queue)", 1, x--);
				} else {
					test.assertEquals(".join(queue) should not fire anymore after .dequeue(queue)", 0, x);
				}
				window.setTimeout(function(){
					test.assertEquals(".join(queue) should not have fired anymore", 0, x);
					$x.stop(queue,true);
					test.assertEquals(".join(queue) should not have fired anymore after .stop(queue,true)", 0, x);
					$x.dequeue(queue);
					test.assertEquals(".join(queue) should not have fired anymore after .dequeue(queue)", 0, x);
					test.done();
				}, 100);
			}, 100);
		},
		
		".join(queue) +…+ .stop(queue) + .then(callback) + .dequeue(queue)" : function($, test) {
			var x = 0;
			var queue = 'myFX';
			var callback = function(){ x++; test.check(); };
			var $x = test.element($('<div>').add('<p>'));
			var TIC = $x.join(queue);
			$x.delay(10000,queue);
			window.setTimeout(function(){
				test.assertEquals("empty named queues should wait until .dequeue()", 0, x);
				$x.stop(queue);
				test.assertEquals("TIC must wait until .then()", 0, x);
				TIC.then(callback);
				if (compareVersion($().jquery,'1.7.0') < 0) {
					test.assertEquals(".join(queue) should not fire on .stop(queue)", 0, x);
				} else {
					test.assertEquals(".join(queue) must fire because of .stop(queue)", 1, x);
				}
				$x.dequeue(queue);
				test.assertEquals(".join(queue) should not fire anymore after .dequeue(queue)", 1, x);
				window.setTimeout(function(){
					test.assertEquals(".join(queue) should not have fired anymore", 1, x);
					$x.stop(queue);
					test.assertEquals(".join(queue) should not have fired anymore after .stop(queue)", 1, x);
					$x.dequeue(queue);
					test.assertEquals(".join(queue) should not have fired anymore after .dequeue(queue)", 1, x);
					test.done();
				}, 100);
			}, 100);
		},
		
		".join(queue) +…+ .stop(queue,true) + .then(callback) + .dequeue(queue)" : function($, test) {
			var x = 0;
			var queue = 'myFX';
			var callback = function(){ x++; test.check(); };
			var $x = test.element($('<div>').add('<p>'));
			var TIC = $x.join(queue);
			$x.delay(10000,queue);
			window.setTimeout(function(){
				test.assertEquals("empty named queues should wait until .dequeue()", 0, x);
				$x.stop(queue,true);
				test.assertEquals("TIC must wait until .then()", 0, x);
				TIC.then(callback);
				test.assertEquals(".join(queue) should not fire on .stop(queue,true)", 0, x);
				$x.dequeue(queue);
				if (compareVersion($().jquery,'1.7.0') < 0) {
					test.assertEquals(".join(queue) should fire after .dequeue(queue)", 1, x--);
				} else {
					test.assertEquals(".join(queue) should not fire anymore after .dequeue(queue)", 0, x);
				}
				window.setTimeout(function(){
					test.assertEquals(".join(queue) should not have fired anymore", 0, x);
					$x.stop(queue,true);
					test.assertEquals(".join(queue) should not have fired anymore after .stop(queue,true)", 0, x);
					$x.dequeue(queue);
					test.assertEquals(".join(queue) should not have fired anymore after .dequeue(queue)", 0, x);
					test.done();
				}, 100);
			}, 100);
		},
		
		".join(queue,callback) +…+ .unwait() + .dequeue(queue)" : function($, test) {
			var x = 0;
			var queue = 'myFX';
			var callback = function(){ x++; test.check(); };
			var $x = test.element($('<div>').add('<p>'));
			$x.join(queue, callback);
			$x.delay(10000,queue);
			window.setTimeout(function(){
				test.assertEquals("empty named queues should wait until .dequeue()", 0, x);
				$x.unwait(queue);
				test.assertEquals(".join(queue) must not fire on .unwait(queue)", 0, x);
				$x.dequeue(queue);
				test.assertEquals(".join(queue) should fire after .dequeue()", 1, x);
				$x.dequeue(queue);
				test.assertEquals(".join(queue) should not fire anymore after .dequeue(queue)", 1, x);
				window.setTimeout(function(){
					test.assertEquals(".join(queue) should not have fired anymore", 1, x);
					$x.unwait(queue);
					test.assertEquals(".join(queue) should not have fired anymore after .unwait(queue)", 1, x);
					$x.dequeue(queue);
					test.assertEquals(".join(queue) should not have fired anymore after .dequeue(queue)", 1, x);
					test.done();
				}, 100);
			}, 100);
		},
		
		".join(queue) +…+ .then(callback) + .unwait() + .dequeue(queue)" : function($, test) {
			var x = 0;
			var queue = 'myFX';
			var callback = function(){ x++; test.check(); };
			var $x = test.element($('<div>').add('<p>'));
			var TIC = $x.join(queue);
			$x.delay(10000,queue);
			window.setTimeout(function(){
				TIC.then(callback);
				test.assertEquals("empty named queues should wait until .dequeue()", 0, x);
				$x.unwait(queue);
				test.assertEquals(".join(queue) must not fire on .unwait(queue)", 0, x);
				$x.dequeue(queue);
				test.assertEquals(".join(queue) should fire after .dequeue()", 1, x);
				$x.dequeue(queue);
				test.assertEquals(".join(queue) should not fire anymore after .dequeue(queue)", 1, x);
				window.setTimeout(function(){
					test.assertEquals(".join(queue) should not have fired anymore", 1, x);
					$x.unwait(queue);
					test.assertEquals(".join(queue) should not have fired anymore after .unwait(queue)", 1, x);
					$x.dequeue(queue);
					test.assertEquals(".join(queue) should not have fired anymore after .dequeue(queue)", 1, x);
					test.done();
				}, 100);
			}, 100);
		},
		
		".join(queue) +…+ .unwait() + .then(callback) + .dequeue(queue)" : function($, test) {
			var x = 0;
			var queue = 'myFX';
			var callback = function(){ x++; test.check(); };
			var $x = test.element($('<div>').add('<p>'));
			var TIC = $x.join(queue);
			$x.delay(10000,queue);
			window.setTimeout(function(){
				test.assertEquals("empty named queues should wait until .dequeue()", 0, x);
				$x.unwait(queue);
				test.assertEquals("TIC must wait until .then()", 0, x);
				TIC.then(callback);
				test.assertEquals(".join(queue) must not fire on .unwait(queue)", 0, x);
				$x.dequeue(queue);
				test.assertEquals(".join(queue) should fire after .dequeue()", 1, x);
				$x.dequeue(queue);
				test.assertEquals(".join(queue) should not fire anymore after .dequeue(queue)", 1, x);
				window.setTimeout(function(){
					test.assertEquals(".join(queue) should not have fired anymore", 1, x);
					$x.unwait(queue);
					test.assertEquals(".join(queue) should not have fired anymore after .unwait(queue)", 1, x);
					$x.dequeue(queue);
					test.assertEquals(".join(queue) should not have fired anymore after .dequeue(queue)", 1, x);
					test.done();
				}, 100);
			}, 100);
		},
		
		".join(queue,callback) +…+ .unrepeat() + .dequeue(queue)" : function($, test) {
			var x = 0;
			var queue = 'myFX';
			var callback = function(){ x++; test.check(); };
			var $x = test.element($('<div>').add('<p>'));
			$x.join(queue, callback);
			$x.delay(10000,queue);
			window.setTimeout(function(){
				test.assertEquals("empty named queues should wait until .dequeue()", 0, x);
				$x.unrepeat(queue);
				test.assertEquals(".join(queue) must not fire on .unrepeat(queue)", 0, x);
				$x.dequeue(queue);
				test.assertEquals(".join(queue) should fire after .dequeue()", 1, x);
				$x.dequeue(queue);
				test.assertEquals(".join(queue) should not fire anymore after .dequeue(queue)", 1, x);
				window.setTimeout(function(){
					test.assertEquals(".join(queue) should not have fired anymore", 1, x);
					$x.unrepeat(queue);
					test.assertEquals(".join(queue) should not have fired anymore after .unrepeat(queue)", 1, x);
					$x.dequeue(queue);
					test.assertEquals(".join(queue) should not have fired anymore after .dequeue(queue)", 1, x);
					test.done();
				}, 100);
			}, 100);
		},
		
		".join(queue) +…+ .then(callback) + .unrepeat() + .dequeue(queue)" : function($, test) {
			var x = 0;
			var queue = 'myFX';
			var callback = function(){ x++; test.check(); };
			var $x = test.element($('<div>').add('<p>'));
			var TIC = $x.join(queue);
			$x.delay(10000,queue);
			window.setTimeout(function(){
				TIC.then(callback);
				test.assertEquals("empty named queues should wait until .dequeue()", 0, x);
				$x.unrepeat(queue);
				test.assertEquals(".join(queue) must not fire on .unrepeat(queue)", 0, x);
				$x.dequeue(queue);
				test.assertEquals(".join(queue) should fire after .dequeue()", 1, x);
				$x.dequeue(queue);
				test.assertEquals(".join(queue) should not fire anymore after .dequeue(queue)", 1, x);
				window.setTimeout(function(){
					test.assertEquals(".join(queue) should not have fired anymore", 1, x);
					$x.unrepeat(queue);
					test.assertEquals(".join(queue) should not have fired anymore after .unrepeat(queue)", 1, x);
					$x.dequeue(queue);
					test.assertEquals(".join(queue) should not have fired anymore after .dequeue(queue)", 1, x);
					test.done();
				}, 100);
			}, 100);
		},
		
		".join(queue) +…+ .unrepeat() + .then(callback) + .dequeue(queue)" : function($, test) {
			var x = 0;
			var queue = 'myFX';
			var callback = function(){ x++; test.check(); };
			var $x = test.element($('<div>').add('<p>'));
			var TIC = $x.join(queue);
			$x.delay(10000,queue);
			window.setTimeout(function(){
				test.assertEquals("empty named queues should wait until .dequeue()", 0, x);
				$x.unrepeat(queue);
				test.assertEquals("TIC must wait until .then()", 0, x);
				TIC.then(callback);
				test.assertEquals(".join(queue) must not fire on .unrepeat(queue)", 0, x);
				$x.dequeue(queue);
				test.assertEquals(".join(queue) should fire after .dequeue()", 1, x);
				$x.dequeue(queue);
				test.assertEquals(".join(queue) should not fire anymore after .dequeue(queue)", 1, x);
				window.setTimeout(function(){
					test.assertEquals(".join(queue) should not have fired anymore", 1, x);
					$x.unrepeat(queue);
					test.assertEquals(".join(queue) should not have fired anymore after .unrepeat(queue)", 1, x);
					$x.dequeue(queue);
					test.assertEquals(".join(queue) should not have fired anymore after .dequeue(queue)", 1, x);
					test.done();
				}, 100);
			}, 100);
		},
		
		".join(queue)._": function($, test) {
			var $x = test.element($('<div>').add('<p>'));
			var TIC = $x.join('myQueue');
			$x.delay(10000);
			var _ = TIC._;
			test.assertNotEquals("tic must be new object", $x, TIC);
			test.assertEquals("underscore must return original object", $x, _);
			test.done();
		},

	},
		
	"joining empty named queue deferred with .promise()": {
		
		_version: ['1.6'],
		
		".join(queue,true,callback) …" : function($, test) {
			var queue = 'myFX';
			var x = 0;
			var callback = function(){ x++; test.check(); };
			var $x = test.element($('<div>').add('<p>'));
			$x.join(queue,true,callback);
			$x.delay(10000,queue);
			window.setTimeout(function(){
				test.assertEquals("instant .join(queue,true) should have fired", 1, x);
				$x.dequeue();
				test.assertEquals("instant .join(queue,true) should fire after .dequeue()", 1, x);
				window.setTimeout(function(){
					test.assertEquals(".join(queue,true) should not have fired anymore", 1, x);
					$x.dequeue();
					test.assertEquals(".join(queue,true) should not have fired anymore after .dequeue()", 1, x);
					test.done();
				}, 100);
			}, 100);
		},
		
		".join(queue,true) +…+ .then(callback)" : function($, test) {
			var queue = 'myFX';
			var x = 0;
			var callback = function(){ x++; test.check(); };
			var $x = test.element($('<div>').add('<p>'));
			var TIC = $x.join(queue,true);
			$x.delay(10000,queue);
			window.setTimeout(function(){
				test.assertEquals("TIC must not fire before .then()", 0, x);
				TIC.then(callback);
				test.assertEquals("instant .join(queue,true) should fire after .then()", 1, x);
				$x.dequeue();
				test.assertEquals("instant .join(queue,true) should not fire anymore after .dequeue()", 1, x);
				window.setTimeout(function(){
					test.assertEquals(".join(queue,true) should not have fired anymore", 1, x);
					$x.dequeue();
					test.assertEquals(".join(queue,true) should not have fired anymore after .dequeue()", 1, x);
					test.done();
				}, 100);
			}, 100);
		},
		
		".join(queue,true,callback) +…+ .stop()" : function($, test) {
			var queue = 'myFX';
			var x = 0;
			var callback = function(){ x++; test.check(); };
			var $x = test.element($('<div>').add('<p>'));
			$x.join(queue,true,callback);
			$x.delay(10000,queue);
			window.setTimeout(function(){
				test.assertEquals("instant .join(queue,true) should fire", 1, x);
				$x.stop();
				test.assertEquals("instant .join(queue,true) should not fire anymore after .stop()", 1, x);
				$x.dequeue();
				test.assertEquals("instant .join(queue,true) should not fire anymore after .dequeue()", 1, x);
				window.setTimeout(function(){
					test.assertEquals(".join(queue,true) should not have fired anymore", 1, x);
					$x.dequeue();
					test.assertEquals(".join(queue,true) should not have fired anymore after .dequeue()", 1, x);
					test.done();
				}, 100);
			}, 100);
		},
		
		".join(queue,true,callback) +…+ .stop()" : function($, test) {
			var queue = 'myFX';
			var x = 0;
			var callback = function(){ x++; test.check(); };
			var $x = test.element($('<div>').add('<p>'));
			$x.join(queue,true,callback);
			$x.delay(10000,queue);
			window.setTimeout(function(){
				test.assertEquals("instant .join(queue,true) should fire", 1, x);
				$x.stop();
				test.assertEquals("instant .join(queue,true) should not fire anymore after .stop()", 1, x);
				$x.dequeue();
				test.assertEquals("instant .join(queue,true) should not fire anymore after .dequeue()", 1, x);
				window.setTimeout(function(){
					test.assertEquals(".join(queue,true) should not have fired anymore", 1, x);
					$x.dequeue();
					test.assertEquals(".join(queue,true) should not have fired anymore after .dequeue()", 1, x);
					test.done();
				}, 100);
			}, 100);
		},
		
		".join(queue,true) +…+ .then(callback) + .stop()" : function($, test) {
			var queue = 'myFX';
			var x = 0;
			var callback = function(){ x++; test.check(); };
			var $x = test.element($('<div>').add('<p>'));
			var TIC = $x.join(queue,true);
			$x.delay(10000,queue);
			window.setTimeout(function(){
				test.assertEquals("TIC must not fire before .then()", 0, x);
				TIC.then(callback);
				test.assertEquals("instant .join(queue,true) should fire after .then()", 1, x);
				$x.stop();
				test.assertEquals("instant .join(queue,true) should not fire anymore after .stop()", 1, x);
				$x.dequeue();
				test.assertEquals("instant .join(queue,true) should not fire anymore after .dequeue()", 1, x);
				window.setTimeout(function(){
					test.assertEquals(".join(queue,true) should not have fired anymore", 1, x);
					$x.dequeue();
					test.assertEquals(".join(queue,true) should not have fired anymore after .dequeue()", 1, x);
					test.done();
				}, 100);
			}, 100);
		},
		
		".join(queue,true) +…+ .then(callback) + .stop(true)" : function($, test) {
			var queue = 'myFX';
			var x = 0;
			var callback = function(){ x++; test.check(); };
			var $x = test.element($('<div>').add('<p>'));
			var TIC = $x.join(queue,true);
			$x.delay(10000,queue);
			window.setTimeout(function(){
				test.assertEquals("TIC must not fire before .then()", 0, x);
				TIC.then(callback);
				test.assertEquals("instant .join(queue,true) should fire after .then()", 1, x);
				$x.stop(true);
				test.assertEquals("instant .join(queue,true) should not fire anymore after .stop(true)", 1, x);
				$x.dequeue();
				test.assertEquals("instant .join(queue,true) should not fire anymore after .dequeue()", 1, x);
				window.setTimeout(function(){
					test.assertEquals(".join(queue,true) should not have fired anymore", 1, x);
					$x.dequeue();
					test.assertEquals(".join(queue,true) should not have fired anymore after .dequeue()", 1, x);
					test.done();
				}, 100);
			}, 100);
		},
		
		".join(queue,true) +…+ .stop() + .then(callback)" : function($, test) {
			var queue = 'myFX';
			var x = 0;
			var callback = function(){ x++; test.check(); };
			var $x = test.element($('<div>').add('<p>'));
			var TIC = $x.join(queue,true);
			$x.delay(10000,queue);
			window.setTimeout(function(){
				test.assertEquals("TIC must not fire before .then()", 0, x);
				$x.stop();
				test.assertEquals("TIC must not fire after .stop() before .then()", 0, x);
				TIC.then(callback);
				test.assertEquals("instant .join(queue,true) should fire after .then(), because .stop() was too late", 1, x);
				$x.dequeue();
				test.assertEquals("instant .join(queue,true) should not fire anymore after .dequeue()", 1, x);
				window.setTimeout(function(){
					test.assertEquals(".join(queue,true) should not have fired anymore", 1, x);
					$x.dequeue();
					test.assertEquals(".join(queue,true) should not have fired anymore after .dequeue()", 1, x);
					test.done();
				}, 100);
			}, 100);
		},
		
		".join(queue,true) +…+ .stop(true) + .then(callback)" : function($, test) {
			var queue = 'myFX';
			var x = 0;
			var callback = function(){ x++; test.check(); };
			var $x = test.element($('<div>').add('<p>'));
			var TIC = $x.join(queue,true);
			$x.delay(10000,queue);
			window.setTimeout(function(){
				test.assertEquals("TIC must not fire before .then()", 0, x);
				$x.stop(true);
				test.assertEquals("TIC must not fire after .stop(true) before .then()", 0, x);
				TIC.then(callback);
				test.assertEquals("instant .join(queue,true) should fire after .then(), because .stop(true) was too late", 1, x);
				$x.dequeue();
				test.assertEquals("instant .join(queue,true) should not fire anymore after .dequeue()", 1, x);
				window.setTimeout(function(){
					test.assertEquals(".join(queue,true) should not have fired anymore", 1, x);
					$x.dequeue();
					test.assertEquals(".join(queue,true) should not have fired anymore after .dequeue()", 1, x);
					test.done();
				}, 100);
			}, 100);
		},
		
		".join(queue,true) +…+ .unwait() + .then(callback)" : function($, test) {
			var queue = 'myFX';
			var x = 0;
			var callback = function(){ x++; test.check(); };
			var $x = test.element($('<div>').add('<p>'));
			var TIC = $x.join(queue,true);
			$x.delay(10000,queue);
			window.setTimeout(function(){
				test.assertEquals("TIC must not fire before .then()", 0, x);
				$x.unwait();
				test.assertEquals("TIC must not fire after .unwait() before .then()", 0, x);
				TIC.then(callback);
				test.assertEquals("instant .join(queue,true) should fire after .then(), because .unwait() should be ignored", 1, x);
				$x.dequeue();
				test.assertEquals("instant .join(queue,true) should not fire anymore after .dequeue()", 1, x);
				window.setTimeout(function(){
					test.assertEquals(".join(queue,true) should not have fired anymore", 1, x);
					$x.dequeue();
					test.assertEquals(".join(queue,true) should not have fired anymore after .dequeue()", 1, x);
					test.done();
				}, 100);
			}, 100);
		},
		
		".join(queue,true) +…+ .unrepeat() + .then(callback)" : function($, test) {
			var queue = 'myFX';
			var x = 0;
			var callback = function(){ x++; test.check(); };
			var $x = test.element($('<div>').add('<p>'));
			var TIC = $x.join(queue,true);
			$x.delay(10000,queue);
			window.setTimeout(function(){
				test.assertEquals("TIC must not fire before .then()", 0, x);
				$x.unrepeat();
				test.assertEquals("TIC must not fire after .unwait() before .then()", 0, x);
				TIC.then(callback);
				test.assertEquals("instant .join(queue,true) should fire after .then(), because .unwait() should be ignored", 1, x);
				$x.dequeue();
				test.assertEquals("instant .join(queue,true) should not fire anymore after .dequeue()", 1, x);
				window.setTimeout(function(){
					test.assertEquals(".join(queue,true) should not have fired anymore", 1, x);
					$x.dequeue();
					test.assertEquals(".join(queue,true) should not have fired anymore after .dequeue()", 1, x);
					test.done();
				}, 100);
			}, 100);
		},
		
	},
	
	"joining ongoing named queue": {
		
		".delay(timeout,queue).join(queue,callback)" : function($, test) {
			var x = 0;
			var queue = 'myFX';
			var timeout = 100;
			var callback = function(){ x++; test.check(); };
			var $x = test.element($('<div>').add('<p>'));
			$x.delay(timeout,queue).join(queue,callback);
			$x.delay(10000,queue);
			test.assertEquals("active queue should wait", 0, x);
			$x.dequeue(queue);
			test.assertEquals("active queue should still wait", 0, x);
			window.setTimeout(function(){
				test.assertEquals("active queue should wait until delay is over", 0, x);
				window.setTimeout(function(){
					test.assertEquals(".join(queue) must have fired after delay is over", 1, x);
					$x.dequeue(queue);
					test.assertEquals(".join(queue) should not fire anymore after .dequeue(queue)", 1, x);
					window.setTimeout(function(){
						test.assertEquals(".join(queue) should not have fired anymore", 1, x);
						$x.dequeue(queue);
						test.assertEquals(".join(queue) should not have fired anymore after .dequeue(queue)", 1, x);
						test.done();
					}, 100);
				}, timeout);
			}, timeout / 2);
		},
		
		".delay(timeout,queue).join(queue).then(callback)" : function($, test) {
			var x = 0;
			var queue = 'myFX';
			var timeout = 100;
			var callback = function(){ x++; test.check(); };
			var $x = test.element($('<div>').add('<p>'));
			$x.delay(timeout,queue).join(queue).then(callback);
			$x.delay(10000,queue);
			test.assertEquals("active queue should wait", 0, x);
			$x.dequeue(queue);
			test.assertEquals("active queue should still wait", 0, x);
			window.setTimeout(function(){
				test.assertEquals("active queue should wait until delay is over", 0, x);
				window.setTimeout(function(){
					test.assertEquals(".join(queue) must have fired after delay is over", 1, x);
					$x.dequeue(queue);
					test.assertEquals(".join(queue) should not fire anymore after .dequeue(queue)", 1, x);
					window.setTimeout(function(){
						test.assertEquals(".join(queue) should not have fired anymore", 1, x);
						$x.dequeue(queue);
						test.assertEquals(".join(queue) should not have fired anymore after .dequeue(queue)", 1, x);
						test.done();
					}, 100);
				}, timeout);
			}, timeout / 2);
		},

		".delay(timeout,queue).join(queue,callback) + .stop(queue)" : function($, test) {
			var x = 0;
			var queue = 'myFX';
			var timeout = 100;
			var callback = function(){ x++; test.check(); };
			var $x = test.element($('<div>').add('<p>'));
			$x.delay(timeout,queue).join(queue,callback);
			$x.delay(10000,queue);
			test.assertEquals("active queue should wait", 0, x);
			$x.dequeue(queue);
			test.assertEquals("active queue should still wait", 0, x);
			window.setTimeout(function(){
				test.assertEquals("active queue should wait until delay is over", 0, x);
				$x.stop(queue);
				if (compareVersion($().jquery,'1.7.0') < 0) {
					test.assertEquals(".join(queue) should not fire on .stop(queue)", 0, x);
				} else {
					test.assertEquals(".join(queue) should fire after .stop(queue)", 1, x);
				}
				$x.dequeue(queue);
				test.assertEquals(".join(queue) should not fire again after .dequeue(queue)", 1, x);
				window.setTimeout(function(){
					test.assertEquals(".join(queue) must not have fired again", 1, x);
					$x.dequeue(queue);
					test.assertEquals(".join(queue) should not fire again after .dequeue(queue)", 1, x);
					window.setTimeout(function(){
						test.assertEquals(".join(queue) should not have fired anymore", 1, x);
						$x.dequeue(queue);
						test.assertEquals(".join(queue) should not have fired anymore after .dequeue(queue)", 1, x);
						test.done();
					}, 100);
				}, timeout);
			}, timeout / 2);
		},
		
		".delay(timeout,queue).join(queue,callback) + .stop(queue,true)" : function($, test) {
			var x = 0;
			var queue = 'myFX';
			var timeout = 100;
			var callback = function(){ x++; test.check(); };
			var $x = test.element($('<div>').add('<p>'));
			$x.delay(timeout,queue).join(queue,callback);
			$x.delay(10000,queue);
			test.assertEquals("active queue should wait", 0, x);
			$x.dequeue(queue);
			test.assertEquals("active queue should still wait", 0, x);
			window.setTimeout(function(){
				test.assertEquals("active queue should wait until delay is over", 0, x);
				$x.stop(queue,true);
				test.assertEquals(".join(queue) should not fire after .stop(queue,true)", 0, x);
				window.setTimeout(function(){
					if (compareVersion($().jquery,'1.7.0') < 0) {
						test.assertEquals(".join(queue) should have fired after delay is over", 1, x--);
					} else {
						test.assertEquals(".join(queue) must not have fired after delay is over, because of .stop(queue,true)", 0, x);
					}
					$x.dequeue(queue);
					test.assertEquals(".join(queue) should not fire again after .dequeue(queue)", 0, x);
					window.setTimeout(function(){
						test.assertEquals(".join(queue) should not have fired anymore", 0, x);
						$x.dequeue(queue);
						test.assertEquals(".join(queue) should not have fired anymore after .dequeue(queue)", 0, x);
						test.done();
					}, 100);
				}, timeout);
			}, timeout / 2);
		},
		
		".delay(timeout,queue).join(queue).then(callback) + .stop(queue)" : function($, test) {
			var x = 0;
			var queue = 'myFX';
			var timeout = 100;
			var callback = function(){ x++; test.check(); };
			var $x = test.element($('<div>').add('<p>'));
			$x.delay(timeout,queue).join(queue).then(callback);
			$x.delay(10000,queue);
			test.assertEquals("active queue should wait", 0, x);
			$x.dequeue(queue);
			test.assertEquals("active queue should still wait", 0, x);
			window.setTimeout(function(){
				test.assertEquals("active queue should wait until delay is over", 0, x);
				$x.stop(queue);
				if (compareVersion($().jquery,'1.7.0') < 0) {
					test.assertEquals(".join(queue) should not fire on .stop(queue)", 0, x);
				} else {
					test.assertEquals(".join(queue) should fire after .stop(queue)", 1, x);
				}
				window.setTimeout(function(){
					test.assertEquals(".join(queue) must not have fired again", 1, x);
					$x.dequeue(queue);
					test.assertEquals(".join(queue) should not fire again after .dequeue(queue)", 1, x);
					window.setTimeout(function(){
						test.assertEquals(".join(queue) should not have fired anymore", 1, x);
						$x.dequeue(queue);
						test.assertEquals(".join(queue) should not have fired anymore after .dequeue(queue)", 1, x);
						test.done();
					}, 100);
				}, timeout);
			}, timeout / 2);
		},
		
		".delay(timeout,queue).join(queue).then(callback) + .stop(queue,true)" : function($, test) {
			var x = 0;
			var queue = 'myFX';
			var timeout = 100;
			var callback = function(){ x++; test.check(); };
			var $x = test.element($('<div>').add('<p>'));
			$x.delay(timeout,queue).join(queue).then(callback);
			$x.delay(10000,queue);
			test.assertEquals("active queue should wait", 0, x);
			$x.dequeue(queue);
			test.assertEquals("active queue should still wait", 0, x);
			window.setTimeout(function(){
				test.assertEquals("active queue should wait until delay is over", 0, x);
				$x.stop(queue,true);
				test.assertEquals(".join(queue) should not fire after .stop(queue,true)", 0, x);
				window.setTimeout(function(){
					if (compareVersion($().jquery,'1.7.0') < 0) {
						test.assertEquals(".join(queue) should have fired after delay is over", 1, x--);
					} else {
						test.assertEquals(".join(queue) must not have fired after delay is over, because of .stop(queue,true)", 0, x);
					}
					$x.dequeue(queue);
					test.assertEquals(".join(queue) should not fire again after .dequeue(queue)", 0, x);
					window.setTimeout(function(){
						test.assertEquals(".join(queue) should not have fired anymore", 0, x);
						$x.dequeue(queue);
						test.assertEquals(".join(queue) should not have fired anymore after .dequeue(queue)", 0, x);
						test.done();
					}, 100);
				}, timeout);
			}, timeout / 2);
		},
		
		".delay(timeout,queue).join(queue) + .stop(queue) + .then(callback)" : function($, test) {
			var x = 0;
			var queue = 'myFX';
			var timeout = 100;
			var callback = function(){ x++; test.check(); };
			var $x = test.element($('<div>').add('<p>'));
			var TIC = $x.delay(timeout,queue).join(queue);
			$x.delay(10000,queue);
			test.assertEquals("active queue should wait", 0, x);
			$x.dequeue(queue);
			test.assertEquals("active queue should still wait", 0, x);
			window.setTimeout(function(){
				test.assertEquals("active queue should wait until delay is over", 0, x);
				$x.stop(queue);
				test.assertEquals("TIC must wait until .then()", 0, x);
				TIC.then(callback);
				if (compareVersion($().jquery,'1.7.0') < 0) {
					test.assertEquals(".join(queue) should not fire after .stop(queue)", 0, x);
				} else {
					test.assertEquals(".join(queue) should fire after .stop(queue)", 1, x);
				}
				window.setTimeout(function(){
					test.assertEquals(".join(queue) must not have fired again", 1, x);
					$x.dequeue(queue);
					test.assertEquals(".join(queue) should not fire again after .dequeue(queue)", 1, x);
					window.setTimeout(function(){
						test.assertEquals(".join(queue) should not have fired anymore", 1, x);
						$x.dequeue(queue);
						test.assertEquals(".join(queue) should not have fired anymore after .dequeue(queue)", 1, x);
						test.done();
					}, 100);
				}, timeout);
			}, timeout / 2);
		},
		
		".delay(timeout,queue).join(queue) + .stop(queue,true) + .then(callback)" : function($, test) {
			var x = 0;
			var queue = 'myFX';
			var timeout = 100;
			var callback = function(){ x++; test.check(); };
			var $x = test.element($('<div>').add('<p>'));
			var TIC = $x.delay(timeout,queue).join(queue);
			$x.delay(10000,queue);
			test.assertEquals("active queue should wait", 0, x);
			$x.dequeue(queue);
			test.assertEquals("active queue should still wait", 0, x);
			window.setTimeout(function(){
				test.assertEquals("active queue should wait until delay is over", 0, x);
				$x.stop(queue,true);
				test.assertEquals("TIC must wait until .then()", 0, x);
				TIC.then(callback);
				test.assertEquals(".join(queue) must not have fired after delay is over, because of .stop(queue,true)", 0, x);
				window.setTimeout(function(){
					if (compareVersion($().jquery,'1.7.0') < 0) {
						test.assertEquals(".join(queue) should have fired after delay is over", 1, x--);
					} else {
						test.assertEquals(".join(queue) must not have fired again", 0, x);
					}
					$x.dequeue(queue);
					test.assertEquals(".join(queue) should not fire again after .dequeue(queue)", 0, x);
					window.setTimeout(function(){
						test.assertEquals(".join(queue) should not have fired anymore", 0, x);
						$x.dequeue(queue);
						test.assertEquals(".join(queue) should not have fired anymore after .dequeue(queue)", 0, x);
						test.done();
					}, 100);
				}, timeout);
			}, timeout / 2);
		},
		
		".delay(timeout,queue).join(queue,callback) + .unwait()" : function($, test) {
			var x = 0;
			var queue = 'myFX';
			var timeout = 100;
			var callback = function(){ x++; test.check(); };
			var $x = test.element($('<div>').add('<p>'));
			$x.delay(timeout,queue).join(queue,callback);
			$x.delay(10000,queue);
			test.assertEquals("active queue should wait", 0, x);
			$x.dequeue(queue);
			test.assertEquals("active queue should still wait", 0, x);
			window.setTimeout(function(){
				test.assertEquals("active queue should wait until delay is over", 0, x);
				$x.unwait();
				test.assertEquals(".join(queue) should not fire in case of .unwait()", 0, x);
				window.setTimeout(function(){
					test.assertEquals(".join(queue) must have fired after delay is over", 1, x);
					$x.dequeue(queue);
					test.assertEquals(".join(queue) should not fire anymore after .dequeue(queue)", 1, x);
					window.setTimeout(function(){
						test.assertEquals(".join(queue) should not have fired anymore", 1, x);
						$x.dequeue(queue);
						test.assertEquals(".join(queue) should not have fired anymore after .dequeue(queue)", 1, x);
						test.done();
					}, 100);
				}, timeout);
			}, timeout / 2);
		},
		
		".delay(timeout,queue).join(queue).then(callback) + .unwait()" : function($, test) {
			var x = 0;
			var queue = 'myFX';
			var timeout = 100;
			var callback = function(){ x++; test.check(); };
			var $x = test.element($('<div>').add('<p>'));
			$x.delay(timeout,queue).join(queue).then(callback);
			$x.delay(10000,queue);
			test.assertEquals("active queue should wait", 0, x);
			$x.dequeue(queue);
			test.assertEquals("active queue should still wait", 0, x);
			window.setTimeout(function(){
				test.assertEquals("active queue should wait until delay is over", 0, x);
				$x.unwait();
				test.assertEquals(".join(queue) should not fire in case of .unwait()", 0, x);
				window.setTimeout(function(){
					test.assertEquals(".join(queue) must have fired after delay is over", 1, x);
					$x.dequeue(queue);
					test.assertEquals(".join(queue) should not fire anymore after .dequeue(queue)", 1, x);
					window.setTimeout(function(){
						test.assertEquals(".join(queue) should not have fired anymore", 1, x);
						$x.dequeue(queue);
						test.assertEquals(".join(queue) should not have fired anymore after .dequeue(queue)", 1, x);
						test.done();
					}, 100);
				}, timeout);
			}, timeout / 2);
		},
		
		".delay(timeout,queue).join(queue) + .unwait() + .then(callback)" : function($, test) {
			var x = 0;
			var queue = 'myFX';
			var timeout = 100;
			var callback = function(){ x++; test.check(); };
			var $x = test.element($('<div>').add('<p>'));
			var TIC = $x.delay(timeout,queue).join(queue);
			$x.delay(10000,queue);
			test.assertEquals("active queue should wait", 0, x);
			$x.dequeue(queue);
			test.assertEquals("active queue should still wait", 0, x);
			window.setTimeout(function(){
				test.assertEquals("active queue should wait until delay is over", 0, x);
				$x.unwait();
				test.assertEquals("TIC has to wait until .then()", 0, x);
				TIC.then(callback);
				test.assertEquals(".join(queue) should not fire in case of .unwait()", 0, x);
				window.setTimeout(function(){
					test.assertEquals(".join(queue) must have fired after delay is over", 1, x);
					$x.dequeue(queue);
					test.assertEquals(".join(queue) should not fire anymore after .dequeue(queue)", 1, x);
					window.setTimeout(function(){
						test.assertEquals(".join(queue) should not have fired anymore", 1, x);
						$x.dequeue(queue);
						test.assertEquals(".join(queue) should not have fired anymore after .dequeue(queue)", 1, x);
						test.done();
					}, 100);
				}, timeout);
			}, timeout / 2);
		},
		
		".delay(timeout,queue).join(queue,callback) + .unrepeat()" : function($, test) {
			var x = 0;
			var queue = 'myFX';
			var timeout = 100;
			var callback = function(){ x++; test.check(); };
			var $x = test.element($('<div>').add('<p>'));
			$x.delay(timeout,queue).join(queue,callback);
			$x.delay(10000,queue);
			test.assertEquals("active queue should wait", 0, x);
			$x.dequeue(queue);
			test.assertEquals("active queue should still wait", 0, x);
			window.setTimeout(function(){
				test.assertEquals("active queue should wait until delay is over", 0, x);
				$x.unrepeat();
				test.assertEquals(".join(queue) should not fire in case of .unrepeat()", 0, x);
				window.setTimeout(function(){
					test.assertEquals(".join(queue) must have fired after delay is over", 1, x);
					$x.dequeue(queue);
					test.assertEquals(".join(queue) should not fire anymore after .dequeue(queue)", 1, x);
					window.setTimeout(function(){
						test.assertEquals(".join(queue) should not have fired anymore", 1, x);
						$x.dequeue(queue);
						test.assertEquals(".join(queue) should not have fired anymore after .dequeue(queue)", 1, x);
						test.done();
					}, 100);
				}, timeout);
			}, timeout / 2);
		},
		
		".delay(timeout,queue).join(queue).then(callback) + .unrepeat()" : function($, test) {
			var x = 0;
			var queue = 'myFX';
			var timeout = 100;
			var callback = function(){ x++; test.check(); };
			var $x = test.element($('<div>').add('<p>'));
			$x.delay(timeout,queue).join(queue).then(callback);
			$x.delay(10000,queue);
			test.assertEquals("active queue should wait", 0, x);
			$x.dequeue(queue);
			test.assertEquals("active queue should still wait", 0, x);
			window.setTimeout(function(){
				test.assertEquals("active queue should wait until delay is over", 0, x);
				$x.unrepeat();
				test.assertEquals(".join(queue) should not fire in case of .unrepeat()", 0, x);
				window.setTimeout(function(){
					test.assertEquals(".join(queue) must have fired after delay is over", 1, x);
					$x.dequeue(queue);
					test.assertEquals(".join(queue) should not fire anymore after .dequeue(queue)", 1, x);
					window.setTimeout(function(){
						test.assertEquals(".join(queue) should not have fired anymore", 1, x);
						$x.dequeue(queue);
						test.assertEquals(".join(queue) should not have fired anymore after .dequeue(queue)", 1, x);
						test.done();
					}, 100);
				}, timeout);
			}, timeout / 2);
		},
		
		".delay(timeout,queue).join(queue) + .unrepeat() + .then(callback)" : function($, test) {
			var x = 0;
			var queue = 'myFX';
			var timeout = 100;
			var callback = function(){ x++; test.check(); };
			var $x = test.element($('<div>').add('<p>'));
			var TIC = $x.delay(timeout,queue).join(queue);
			$x.delay(10000,queue);
			test.assertEquals("active queue should wait", 0, x);
			$x.dequeue(queue);
			test.assertEquals("active queue should still wait", 0, x);
			window.setTimeout(function(){
				test.assertEquals("active queue should wait until delay is over", 0, x);
				$x.unrepeat();
				test.assertEquals("TIC has to wait until .then()", 0, x);
				TIC.then(callback);
				test.assertEquals(".join(queue) should not fire in case of .unrepeat()", 0, x);
				window.setTimeout(function(){
					test.assertEquals(".join(queue) must have fired after delay is over", 1, x);
					$x.dequeue(queue);
					test.assertEquals(".join(queue) should not fire anymore after .dequeue(queue)", 1, x);
					window.setTimeout(function(){
						test.assertEquals(".join(queue) should not have fired anymore", 1, x);
						$x.dequeue(queue);
						test.assertEquals(".join(queue) should not have fired anymore after .dequeue(queue)", 1, x);
						test.done();
					}, 100);
				}, timeout);
			}, timeout / 2);
		},

	},

	"joining ongoing named queue with .promise()": {
		
		_version: ['1.6'],
		
		".delay(timeout,queue).join(queue,true,callback)" : function($, test) {
			var x = 0;
			var queue = 'myFX';
			var timeout = 100;
			var callback = function(){ x++; test.check(); };
			var $x = test.element($('<div>').add('<p>'));
			$x.delay(timeout,queue).join(queue,true,callback);
			$x.delay(10000,queue);
			test.assertEquals("active queue should wait", 0, x);
			$x.dequeue(queue);
			test.assertEquals("active queue should still wait", 0, x);
			window.setTimeout(function(){
				test.assertEquals("active queue should wait until delay is over", 0, x);
				window.setTimeout(function(){
					test.assertEquals(".join(queue,true) must not have fired after first delay is over", (compareVersion($().jquery,'1.8.0') <= 0) ? 1 : 0, x);
					$x.dequeue(queue);
					test.assertEquals(".join(queue,true) should fire after .dequeue(queue)", 1, x);
					window.setTimeout(function(){
						test.assertEquals(".join(queue,true) should not have fired anymore", 1, x);
						$x.dequeue(queue);
						test.assertEquals(".join(queue,true) should not have fired anymore after .dequeue(queue)", 1, x);
						test.done();
					}, 100);
				}, timeout);
			}, timeout / 2);
		},
		
		".delay(timeout,queue).join(queue,true).then(callback)" : function($, test) {
			var x = 0;
			var queue = 'myFX';
			var timeout = 100;
			var callback = function(){ x++; test.check(); };
			var $x = test.element($('<div>').add('<p>'));
			$x.delay(timeout,queue).join(queue,true).then(callback);
			$x.delay(10000,queue);
			test.assertEquals("active queue should wait", 0, x);
			$x.dequeue(queue);
			test.assertEquals("active queue should still wait", 0, x);
			window.setTimeout(function(){
				test.assertEquals("active queue should wait until delay is over", 0, x);
				window.setTimeout(function(){
					test.assertEquals(".join(queue,true) must not have fired after first delay is over", (compareVersion($().jquery,'1.8.0') <= 0) ? 1 : 0, x);
					$x.dequeue(queue);
					test.assertEquals(".join(queue,true) should fire after .dequeue(queue)", 1, x);
					window.setTimeout(function(){
						test.assertEquals(".join(queue,true) should not have fired anymore", 1, x);
						$x.dequeue(queue);
						test.assertEquals(".join(queue,true) should not have fired anymore after .dequeue(queue)", 1, x);
						test.done();
					}, 100);
				}, timeout);
			}, timeout / 2);
		},

		".delay(timeout,queue).join(queue,true,callback) + .stop(queue)" : function($, test) {
			var x = 0;
			var queue = 'myFX';
			var timeout = 100;
			var callback = function(){ x++; test.check(); };
			var $x = test.element($('<div>').add('<p>'));
			$x.delay(timeout,queue).join(queue,true,callback);
			$x.delay(10000,queue);
			test.assertEquals("active queue should wait", 0, x);
			$x.dequeue(queue);
			test.assertEquals("active queue should still wait", 0, x);
			window.setTimeout(function(){
				test.assertEquals("active queue should wait until delay is over", 0, x);
				$x.stop(queue);
				test.assertEquals(".join(queue,true) should not fire on .stop(queue)", (compareVersion($().jquery,'1.8.0') != 0) ? 0 : 1, x);
				$x.dequeue(queue);
				test.assertEquals(".join(queue,true) should fire after .dequeue(queue)", (compareVersion($().jquery,'1.7.99') <= 0) ? 0 : 1, x);
				window.setTimeout(function(){
					test.assertEquals(".join(queue,true) must not have fired again", 1, x);
					$x.dequeue(queue);
					test.assertEquals(".join(queue,true) should not fire again after .dequeue(queue)", 1, x);
					window.setTimeout(function(){
						test.assertEquals(".join(queue,true) should not have fired anymore", 1, x);
						$x.dequeue(queue);
						test.assertEquals(".join(queue,true) should not have fired anymore after .dequeue(queue)", 1, x);
						test.done();
					}, 100);
				}, timeout);
			}, timeout / 2);
		},
		
		
		".delay(timeout,queue).join(queue,true,callback) + .stop(queue,true)" : function($, test) {
			var x = 0;
			var queue = 'myFX';
			var timeout = 100;
			var callback = function(){ x++; test.check(); };
			var $x = test.element($('<div>').add('<p>'));
			$x.delay(timeout,queue).join(queue,true,callback);
			$x.delay(10000,queue);
			test.assertEquals("active queue should wait", 0, x);
			$x.dequeue(queue);
			test.assertEquals("active queue should still wait", 0, x);
			window.setTimeout(function(){
				test.assertEquals("active queue should wait until delay is over", 0, x);
				$x.stop(queue,true);
				test.assertEquals(".join(queue,true) should fire after .stop(queue,true)", (compareVersion($().jquery,'1.7.99') <= 0) ? 0 : 1, x);
				window.setTimeout(function(){
					test.assertEquals(".join(queue,true) should not have fired anymore", 1, x);
					$x.dequeue(queue);
					test.assertEquals(".join(queue,true) should not fire again after .dequeue(queue)", 1, x);
					window.setTimeout(function(){
						test.assertEquals(".join(queue,true) should not have fired anymore", 1, x);
						$x.dequeue(queue);
						test.assertEquals(".join(queue,true) should not have fired anymore after .dequeue(queue)", 1, x);
						test.done();
					}, 100);
				}, timeout);
			}, timeout / 2);
		},
		
		".delay(timeout,queue).join(queue,true).then(callback) + .stop(queue)" : function($, test) {
			var x = 0;
			var queue = 'myFX';
			var timeout = 100;
			var callback = function(){ x++; test.check(); };
			var $x = test.element($('<div>').add('<p>'));
			$x.delay(timeout,queue).join(queue,true).then(callback);
			$x.delay(10000,queue);
			test.assertEquals("active queue should wait", 0, x);
			$x.dequeue(queue);
			test.assertEquals("active queue should still wait", 0, x);
			window.setTimeout(function(){
				test.assertEquals("active queue should wait until delay is over", 0, x);
				$x.stop(queue);
				test.assertEquals(".join(queue,true) should not fire on .stop(queue)", (compareVersion($().jquery,'1.8.0') != 0) ? 0 : 1, x);
				window.setTimeout(function(){
					test.assertEquals(".join(queue,true) must not have fired yet", (compareVersion($().jquery,'1.8.0') <= 0) ? 1 : 0, x);
					$x.dequeue(queue);
					test.assertEquals(".join(queue,true) should fire after .dequeue(queue)", 1, x);
					window.setTimeout(function(){
						test.assertEquals(".join(queue,true) should not have fired anymore", 1, x);
						$x.dequeue(queue);
						test.assertEquals(".join(queue,true) should not have fired anymore after .dequeue(queue)", 1, x);
						test.done();
					}, 100);
				}, timeout);
			}, timeout / 2);
		},
		
		".delay(timeout,queue).join(queue,true).then(callback) + .stop(queue,true)" : function($, test) {
			var x = 0;
			var queue = 'myFX';
			var timeout = 100;
			var callback = function(){ x++; test.check(); };
			var $x = test.element($('<div>').add('<p>'));
			$x.delay(timeout,queue).join(queue,true).then(callback);
			$x.delay(10000,queue);
			test.assertEquals("active queue should wait", 0, x);
			$x.dequeue(queue);
			test.assertEquals("active queue should still wait", 0, x);
			window.setTimeout(function(){
				test.assertEquals("active queue should wait until delay is over", 0, x);
				$x.stop(queue,true);
				test.assertEquals(".join(queue,true) should not fire after .stop(queue,true)", (compareVersion($().jquery,'1.7.99') <= 0) ? 0 : 1, x);
				window.setTimeout(function(){
					test.assertEquals(".join(queue,true) should have fired again", 1, x);
					$x.dequeue(queue);
					test.assertEquals(".join(queue,true) should not fire again after .dequeue(queue)", 1, x);
					window.setTimeout(function(){
						test.assertEquals(".join(queue,true) should not have fired anymore", 1, x);
						$x.dequeue(queue);
						test.assertEquals(".join(queue,true) should not have fired anymore after .dequeue(queue)", 1, x);
						test.done();
					}, 100);
				}, timeout);
			}, timeout / 2);
		},
		
		".delay(timeout,queue).join(queue,true) + .stop(queue) + .then(callback)" : function($, test) {
			var x = 0;
			var queue = 'myFX';
			var timeout = 100;
			var callback = function(){ x++; test.check(); };
			var $x = test.element($('<div>').add('<p>'));
			var TIC = $x.delay(timeout,queue).join(queue,true);
			$x.delay(10000,queue);
			test.assertEquals("active queue should wait", 0, x);
			$x.dequeue(queue);
			test.assertEquals("active queue should still wait", 0, x);
			window.setTimeout(function(){
				test.assertEquals("active queue should wait until delay is over", 0, x);
				$x.stop(queue);
				test.assertEquals("TIC must wait until .then()", 0, x);
				TIC.then(callback);
				test.assertEquals(".join(queue,true) should not fire after .stop(queue)", (compareVersion($().jquery,'1.8.0') != 0) ? 0 : 1, x);
				window.setTimeout(function(){
					test.assertEquals(".join(queue,true) must not have fired yet", (compareVersion($().jquery,'1.8.0') <= 0) ? 1 : 0, x);
					$x.dequeue(queue);
					test.assertEquals(".join(queue,true) should fire after .dequeue(queue)", 1, x);
					window.setTimeout(function(){
						test.assertEquals(".join(queue,true) should not have fired anymore", 1, x);
						$x.dequeue(queue);
						test.assertEquals(".join(queue,true) should not have fired anymore after .dequeue(queue)", 1, x);
						test.done();
					}, 100);
				}, timeout);
			}, timeout / 2);
		},
		
		".delay(timeout,queue).join(queue,true) + .stop(queue,true) + .then(callback)" : function($, test) {
			var x = 0;
			var queue = 'myFX';
			var timeout = 100;
			var callback = function(){ x++; test.check(); };
			var $x = test.element($('<div>').add('<p>'));
			var TIC = $x.delay(timeout,queue).join(queue,true);
			$x.delay(10000,queue);
			test.assertEquals("active queue should wait", 0, x);
			$x.dequeue(queue);
			test.assertEquals("active queue should still wait", 0, x);
			window.setTimeout(function(){
				test.assertEquals("active queue should wait until delay is over", 0, x);
				$x.stop(queue,true);
				test.assertEquals("TIC must wait until .then()", 0, x);
				TIC.then(callback);
				test.assertEquals(".join(queue,true) must have fired after .stop(queue,true)", (compareVersion($().jquery,'1.7.99') <= 0) ? 0 : 1, x);
				window.setTimeout(function(){
					test.assertEquals(".join(queue,true) should not have fired again", 1, x);
					$x.dequeue(queue);
					test.assertEquals(".join(queue,true) should not fire again after .dequeue(queue)", 1, x);
					window.setTimeout(function(){
						test.assertEquals(".join(queue,true) should not have fired anymore", 1, x);
						$x.dequeue(queue);
						test.assertEquals(".join(queue,true) should not have fired anymore after .dequeue(queue)", 1, x);
						test.done();
					}, 100);
				}, timeout);
			}, timeout / 2);
		},
		
		".delay(timeout,queue).join(queue,true,callback) + .unwait()" : function($, test) {
			var x = 0;
			var queue = 'myFX';
			var timeout = 100;
			var callback = function(){ x++; test.check(); };
			var $x = test.element($('<div>').add('<p>'));
			$x.delay(timeout,queue).join(queue,true,callback);
			$x.delay(10000,queue);
			test.assertEquals("active queue should wait", 0, x);
			$x.dequeue(queue);
			test.assertEquals("active queue should still wait", 0, x);
			window.setTimeout(function(){
				test.assertEquals("active queue should wait until delay is over", 0, x);
				$x.unwait();
				test.assertEquals(".join(queue,true) should not fire in case of .unwait()", 0, x);
				window.setTimeout(function(){
					test.assertEquals(".join(queue,true) must not have fired after first delay is over", (compareVersion($().jquery,'1.8.0') <= 0) ? 1 : 0, x);
					$x.dequeue(queue);
					test.assertEquals(".join(queue,true) should fire after .dequeue(queue)", 1, x);
					window.setTimeout(function(){
						test.assertEquals(".join(queue,true) should not have fired anymore", 1, x);
						$x.dequeue(queue);
						test.assertEquals(".join(queue,true) should not have fired anymore after .dequeue(queue)", 1, x);
						test.done();
					}, 100);
				}, timeout);
			}, timeout / 2);
		},
		
		".delay(timeout,queue).join(queue,true).then(callback) + .unwait()" : function($, test) {
			var x = 0;
			var queue = 'myFX';
			var timeout = 100;
			var callback = function(){ x++; test.check(); };
			var $x = test.element($('<div>').add('<p>'));
			$x.delay(timeout,queue).join(queue,true).then(callback);
			$x.delay(10000,queue);
			test.assertEquals("active queue should wait", 0, x);
			$x.dequeue(queue);
			test.assertEquals("active queue should still wait", 0, x);
			window.setTimeout(function(){
				test.assertEquals("active queue should wait until delay is over", 0, x);
				$x.unwait();
				test.assertEquals(".join(queue,true) should not fire in case of .unwait()", 0, x);
				window.setTimeout(function(){
					test.assertEquals(".join(queue,true) must not have fired after first delay is over", (compareVersion($().jquery,'1.8.0') <= 0) ? 1 : 0, x);
					$x.dequeue(queue);
					test.assertEquals(".join(queue,true) should fire after .dequeue(queue)", 1, x);
					window.setTimeout(function(){
						test.assertEquals(".join(queue,true) should not have fired anymore", 1, x);
						$x.dequeue(queue);
						test.assertEquals(".join(queue,true) should not have fired anymore after .dequeue(queue)", 1, x);
						test.done();
					}, 100);
				}, timeout);
			}, timeout / 2);
		},
		
		".delay(timeout,queue).join(queue,true) + .unwait() + .then(callback)" : function($, test) {
			var x = 0;
			var queue = 'myFX';
			var timeout = 100;
			var callback = function(){ x++; test.check(); };
			var $x = test.element($('<div>').add('<p>'));
			var TIC = $x.delay(timeout,queue).join(queue,true);
			$x.delay(10000,queue);
			test.assertEquals("active queue should wait", 0, x);
			$x.dequeue(queue);
			test.assertEquals("active queue should still wait", 0, x);
			window.setTimeout(function(){
				test.assertEquals("active queue should wait until delay is over", 0, x);
				$x.unwait();
				test.assertEquals("TIC has to wait until .then()", 0, x);
				TIC.then(callback);
				test.assertEquals(".join(queue,true) should not fire in case of .unwait()", 0, x);
				window.setTimeout(function(){
					test.assertEquals(".join(queue,true) must not have fired after first delay is over", (compareVersion($().jquery,'1.8.0') <= 0) ? 1 : 0, x);
					$x.dequeue(queue);
					test.assertEquals(".join(queue,true) should fire after .dequeue(queue)", 1, x);
					window.setTimeout(function(){
						test.assertEquals(".join(queue,true) should not have fired anymore", 1, x);
						$x.dequeue(queue);
						test.assertEquals(".join(queue,true) should not have fired anymore after .dequeue(queue)", 1, x);
						test.done();
					}, 100);
				}, timeout);
			}, timeout / 2);
		},
		
		".delay(timeout,queue).join(queue,true,callback) + .unrepeat()" : function($, test) {
			var x = 0;
			var queue = 'myFX';
			var timeout = 100;
			var callback = function(){ x++; test.check(); };
			var $x = test.element($('<div>').add('<p>'));
			$x.delay(timeout,queue).join(queue,true,callback);
			$x.delay(10000,queue);
			test.assertEquals("active queue should wait", 0, x);
			$x.dequeue(queue);
			test.assertEquals("active queue should still wait", 0, x);
			window.setTimeout(function(){
				test.assertEquals("active queue should wait until delay is over", 0, x);
				$x.unrepeat();
				test.assertEquals(".join(queue,true) should not fire in case of .unrepeat()", 0, x);
				window.setTimeout(function(){
					test.assertEquals(".join(queue,true) must not have fired after first delay is over", (compareVersion($().jquery,'1.8.0') <= 0) ? 1 : 0, x);
					$x.dequeue(queue);
					test.assertEquals(".join(queue,true) should fire after .dequeue(queue)", 1, x);
					window.setTimeout(function(){
						test.assertEquals(".join(queue,true) should not have fired anymore", 1, x);
						$x.dequeue(queue);
						test.assertEquals(".join(queue,true) should not have fired anymore after .dequeue(queue)", 1, x);
						test.done();
					}, 100);
				}, timeout);
			}, timeout / 2);
		},
		
		".delay(timeout,queue).join(queue,true).then(callback) + .unrepeat()" : function($, test) {
			var x = 0;
			var queue = 'myFX';
			var timeout = 100;
			var callback = function(){ x++; test.check(); };
			var $x = test.element($('<div>').add('<p>'));
			$x.delay(timeout,queue).join(queue,true).then(callback);
			$x.delay(10000,queue);
			test.assertEquals("active queue should wait", 0, x);
			$x.dequeue(queue);
			test.assertEquals("active queue should still wait", 0, x);
			window.setTimeout(function(){
				test.assertEquals("active queue should wait until delay is over", 0, x);
				$x.unrepeat();
				test.assertEquals(".join(queue,true) should not fire in case of .unrepeat()", 0, x);
				window.setTimeout(function(){
					test.assertEquals(".join(queue,true) must not have fired after first delay is over", (compareVersion($().jquery,'1.8.0') <= 0) ? 1 : 0, x);
					$x.dequeue(queue);
					test.assertEquals(".join(queue,true) should fire after .dequeue(queue)", 1, x);
					window.setTimeout(function(){
						test.assertEquals(".join(queue,true) should not have fired anymore", 1, x);
						$x.dequeue(queue);
						test.assertEquals(".join(queue,true) should not have fired anymore after .dequeue(queue)", 1, x);
						test.done();
					}, 100);
				}, timeout);
			}, timeout / 2);
		},
		
		".delay(timeout,queue).join(queue,true) + .unrepeat() + .then(callback)" : function($, test) {
			var x = 0;
			var queue = 'myFX';
			var timeout = 100;
			var callback = function(){ x++; test.check(); };
			var $x = test.element($('<div>').add('<p>'));
			var TIC = $x.delay(timeout,queue).join(queue,true);
			$x.delay(10000,queue);
			test.assertEquals("active queue should wait", 0, x);
			$x.dequeue(queue);
			test.assertEquals("active queue should still wait", 0, x);
			window.setTimeout(function(){
				test.assertEquals("active queue should wait until delay is over", 0, x);
				$x.unrepeat();
				test.assertEquals("TIC has to wait until .then()", 0, x);
				TIC.then(callback);
				test.assertEquals(".join(queue,true) should not fire in case of .unrepeat()", 0, x);
				window.setTimeout(function(){
					test.assertEquals(".join(queue,true) must not have fired after first delay is over", (compareVersion($().jquery,'1.8.0') <= 0) ? 1 : 0, x);
					$x.dequeue(queue);
					test.assertEquals(".join(queue,true) should fire after .dequeue(queue)", 1, x);
					window.setTimeout(function(){
						test.assertEquals(".join(queue,true) should not have fired anymore", 1, x);
						$x.dequeue(queue);
						test.assertEquals(".join(queue,true) should not have fired anymore after .dequeue(queue)", 1, x);
						test.done();
					}, 100);
				}, timeout);
			}, timeout / 2);
		},

	},
	
	"access original context from deferred chain": {
		
		"$(some).fadeIn().join().doThisLater()._.doThatNow()": function($,test){
			var $x = test.element($('<div>').add('<p>')).hide();
			$x.fadeIn().join().text('later')._.text('now');
			test.assertEquals("immediate action must have happened already", 'nownow', $x.text());
			$x.join(function(){
				test.assertEquals("later action must have happened after animation", 'laterlater', $x.text());
				test.done();
			});
		},

		"$(some).join(queue).doThisLater()._.doThatNow()": function($,test){
			var $x = test.element($('<div>').add('<p>')).hide();
			$x.join('Q').text('later')._.text('now');
			test.assertEquals("immediate action must have happened already", 'nownow', $x.text());
			$x.join('Q', function(){
				test.assertEquals("later action must have happened after animation", 'laterlater', $x.text());
				test.done();
			});
			$x.dequeue('Q');
		},

		"$(some).fadeIn().join(true).doThisLater()._.doThatNow()|1.6": function($,test){
			var $x = test.element($('<div>').add('<p>')).hide();
			$x.fadeIn().join(true).text('later')._.text('now');
			test.assertEquals("immediate action must have happened already", 'nownow', $x.text());
			$x.join(true,function(){
				test.assertEquals("later action must have happened after animation", 'laterlater', $x.text());
				test.done();
			});
		},
		
		"$(some).join(queue,true).doThisLater()._.doThatNow()|1.6": function($,test){
			var $x = test.element($('<div>').add('<p>')).hide().delay(100,'Q');
			$x.join('Q',true).text('later')._.text('now');
			test.assertEquals("immediate action must have happened already", 'nownow', $x.text());
			$x.join('Q', true, function(){
				test.assertEquals("later action must have happened after animation", 'laterlater', $x.text());
				test.done();
			});
			$x.dequeue('Q');
		},

	},
};