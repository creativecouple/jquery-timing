var suite = {
		
	_version: ['1.4.0'],
		
	"joining empty default queue instantly": {
		
		".join(callback)" : function($, test) {
			var x = 0;
			var callback = function(){ x++; test.check(); };
			var $x = $('<div>');
			var TIC = $x.join(callback);
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
			var $x = $('<div>');
			var TIC = $x.join();
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
			var $x = $('<div>');
			var TIC = $x.join(callback);
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
			var $x = $('<div>');
			var TIC = $x.join(callback);
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
			var $x = $('<div>');
			var TIC = $x.join();
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
			var $x = $('<div>');
			var TIC = $x.join();
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
			var $x = $('<div>');
			var TIC = $x.join();
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
			var $x = $('<div>');
			var TIC = $x.join();
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
			var $x = $('<div>');
			var TIC = $x.join();
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
			var $x = $('<div>');
			var TIC = $x.join();
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
			var $x = $('<div>').add('<span>').add('<p>');
			test.assertEquals("not enough objects", 3, $x.size());
			var TIC = $x.join(callback);
			test.assertEquals("join should fire once for multiple objects", 1, x);
			test.assertEquals("instant .join() should return original jQuery object", $x, TIC);
			test.done();
		},
		
		".stop().join()._": function($, test) {
			var $x = $('<div>');
			var TIC = $x.stop().join();
			var _ = TIC._;
			test.assertEquals("tic must be same object because of instant invocation", $x, TIC);
			test.assertEquals("underscore must return original object", $x, _);
			test.done();
		},
	},

	"joining empty default queue deferred": {
		
		".join(callback) …" : function($, test) {
			var x = 0;
			var callback = function(){ x++; test.check(); };
			var $x = $('<div>');
			$x.join(callback);
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
			var $x = $('<div>');
			var TIC = $x.join();
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
			var $x = $('<div>');
			$x.join(callback);
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
		
		".join(callback) +…+ .stop(true)" : function($, test) {
			var x = 0;
			var callback = function(){ x++; test.check(); };
			var $x = $('<div>');
			$x.join(callback);
			window.setTimeout(function(){
				test.assertEquals("instant .join() should fire", 1, x);
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
		
		".join() +…+ .then(callback) + .stop()" : function($, test) {
			var x = 0;
			var callback = function(){ x++; test.check(); };
			var $x = $('<div>');
			var TIC = $x.join();
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
			var $x = $('<div>');
			var TIC = $x.join();
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
			var $x = $('<div>');
			var TIC = $x.join();
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
			var $x = $('<div>');
			var TIC = $x.join();
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
			var $x = $('<div>');
			var TIC = $x.join();
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
			var $x = $('<div>');
			var TIC = $x.join();
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
		
		"$('.multiple').join() deferred": function($, test) {
			var x = 0;
			var callback = function(){ x++; test.check(); };
			var $x = $('<div>').add('<span>').add('<p>');
			var timeout = 100;
			$x.eq(0).delay(timeout);
			$x.eq(2).delay(timeout*2);
			$x.join(callback);
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
		}
		
	},

	"joining ongoing default queue": {
		
		".delay(timeout).join(callback)" : function($, test) {
			var x = 0;
			var timeout = 100;
			var callback = function(){ x++; test.check(); };
			var $x = $('<div>');
			$x.delay(timeout).join(callback);
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
			var $x = $('<div>');
			$x.delay(timeout).join().then(callback);
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
			var $x = $('<div>');
			$x.delay(timeout).join(callback);
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
			var $x = $('<div>');
			$x.delay(timeout).join(callback);
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
			var $x = $('<div>');
			$x.delay(timeout).join().then(callback);
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
			var $x = $('<div>');
			$x.delay(timeout).join().then(callback);
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
			var $x = $('<div>');
			var TIC = $x.delay(timeout).join();
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
			var $x = $('<div>');
			var TIC = $x.delay(timeout).join();
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
			var $x = $('<div>');
			$x.delay(timeout).join(callback);
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
			var $x = $('<div>');
			$x.delay(timeout).join().then(callback);
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
			var $x = $('<div>');
			var TIC = $x.delay(timeout).join();
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
			var $x = $('<div>');
			$x.delay(timeout).join(callback);
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
			var $x = $('<div>');
			$x.delay(timeout).join().then(callback);
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
			var $x = $('<div>');
			var TIC = $x.delay(timeout).join();
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
		
		".delay(timeout).join()._": function($, test) {

			var $x = $('<div>');
			var TIC = $x.delay(100).join();
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
			var $x = $('<div>');
			var TIC = $x.join(queue, callback);
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
			var $x = $('<div>');
			var TIC = $x.join(queue).then(callback);
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
			var $x = $('<div>');
			var TIC = $x.join(queue);
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
			var $x = $('<div>');
			var TIC = $x.join(queue,callback);
			test.assertEquals("empty named queues should wait until .dequeue()", 0, x);
			test.assertNotEquals(".join(queue) should return TIC placeholder", $x, TIC);
			$x.stop(queue);
			if ($().jquery < '1.7.0') {
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
			var $x = $('<div>');
			var TIC = $x.join(queue,callback);
			test.assertEquals("empty named queues should wait until .dequeue()", 0, x);
			test.assertNotEquals(".join(queue) should return TIC placeholder", $x, TIC);
			$x.stop(queue,true);
			test.assertEquals(".join(queue) should not fire on .stop(queue,true)", 0, x);
			$x.dequeue(queue);
			if ($().jquery < '1.7.0') {
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
			var $x = $('<div>');
			var TIC = $x.join(queue).then(callback);
			test.assertEquals("empty named queues should wait until .dequeue()", 0, x);
			test.assertNotEquals(".join(queue) should return TIC placeholder", $x, TIC);
			$x.stop(queue);
			if ($().jquery < '1.7.0') {
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
			var $x = $('<div>');
			var TIC = $x.join(queue).then(callback);
			test.assertEquals("empty named queues should wait until .dequeue()", 0, x);
			test.assertNotEquals(".join(queue) should return TIC placeholder", $x, TIC);
			$x.stop(queue,true);
			test.assertEquals(".join(queue) should not fire on .stop(queue,true)", 0, x);
			$x.dequeue(queue);
			if ($().jquery < '1.7.0') {
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
			var $x = $('<div>');
			var TIC = $x.join(queue);
			test.assertEquals("empty named queues should wait until .dequeue()", 0, x);
			test.assertNotEquals(".join(queue) should return TIC placeholder", $x, TIC);
			$x.stop(queue);
			test.assertEquals("TIC must wait until .then()", 0, x);
			TIC.then(callback);
			if ($().jquery < '1.7.0') {
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
			var $x = $('<div>');
			var TIC = $x.join(queue);
			test.assertEquals("empty named queues should wait until .dequeue()", 0, x);
			test.assertNotEquals(".join(queue) should return TIC placeholder", $x, TIC);
			$x.stop(queue,true);
			test.assertEquals("TIC must wait until .then()", 0, x);
			TIC.then(callback);
			test.assertEquals(".join(queue) should not fire on .stop(queue,true)", 0, x);
			$x.dequeue(queue);
			if ($().jquery < '1.7.0') {
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
			var $x = $('<div>');
			var TIC = $x.join(queue, callback);
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
			var $x = $('<div>');
			var TIC = $x.join(queue).then(callback);
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
			var $x = $('<div>');
			var TIC = $x.join(queue);
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
			var $x = $('<div>');
			var TIC = $x.join(queue, callback);
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
			var $x = $('<div>');
			var TIC = $x.join(queue).then(callback);
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
			var $x = $('<div>');
			var TIC = $x.join(queue);
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
		}
		
	},
		
	"joining empty named queue deferred": {

		".join(queue,callback) +…+ .dequeue(queue)" : function($, test) {
			var x = 0;
			var queue = 'myFX';
			var callback = function(){ x++; test.check(); };
			var $x = $('<div>');
			$x.join(queue, callback);
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
			var $x = $('<div>');
			var TIC = $x.join(queue);
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
			var $x = $('<div>');
			var TIC = $x.join(queue);
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
			var $x = $('<div>');
			$x.join(queue,callback);
			window.setTimeout(function(){
				test.assertEquals("empty named queues should wait until .dequeue()", 0, x);
				$x.stop(queue);
				if ($().jquery < '1.7.0') {
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
			var $x = $('<div>');
			$x.join(queue,callback);
			window.setTimeout(function(){
				test.assertEquals("empty named queues should wait until .dequeue()", 0, x);
				$x.stop(queue,true);
				test.assertEquals(".join(queue) should not fire on .stop(queue,true)", 0, x);
				$x.dequeue(queue);
				if ($().jquery < '1.7.0') {
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
			var $x = $('<div>');
			var TIC = $x.join(queue);
			window.setTimeout(function(){
				TIC.then(callback);
				test.assertEquals("empty named queues should wait until .dequeue()", 0, x);
				$x.stop(queue);
				if ($().jquery < '1.7.0') {
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
			var $x = $('<div>');
			var TIC = $x.join(queue);
			window.setTimeout(function(){
				TIC.then(callback);
				test.assertEquals("empty named queues should wait until .dequeue()", 0, x);
				$x.stop(queue,true);
				test.assertEquals(".join(queue) should not fire on .stop(queue,true)", 0, x);
				$x.dequeue(queue);
				if ($().jquery < '1.7.0') {
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
			var $x = $('<div>');
			var TIC = $x.join(queue);
			window.setTimeout(function(){
				test.assertEquals("empty named queues should wait until .dequeue()", 0, x);
				$x.stop(queue);
				test.assertEquals("TIC must wait until .then()", 0, x);
				TIC.then(callback);
				if ($().jquery < '1.7.0') {
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
			var $x = $('<div>');
			var TIC = $x.join(queue);
			window.setTimeout(function(){
				test.assertEquals("empty named queues should wait until .dequeue()", 0, x);
				$x.stop(queue,true);
				test.assertEquals("TIC must wait until .then()", 0, x);
				TIC.then(callback);
				test.assertEquals(".join(queue) should not fire on .stop(queue,true)", 0, x);
				$x.dequeue(queue);
				if ($().jquery < '1.7.0') {
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
			var $x = $('<div>');
			$x.join(queue, callback);
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
			var $x = $('<div>');
			var TIC = $x.join(queue);
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
			var $x = $('<div>');
			var TIC = $x.join(queue);
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
			var $x = $('<div>');
			$x.join(queue, callback);
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
			var $x = $('<div>');
			var TIC = $x.join(queue);
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
			var $x = $('<div>');
			var TIC = $x.join(queue);
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
			var $x = $('<div>');
			var TIC = $x.join('myQueue');
			var _ = TIC._;
			test.assertNotEquals("tic must be new object", $x, TIC);
			test.assertEquals("underscore must return original object", $x, _);
			test.done();
		},

	},
		
	"joining ongoing named queue": {
		
		".delay(timeout,queue).join(queue,callback)" : function($, test) {
			var x = 0;
			var queue='myFX';
			var timeout = 100;
			var callback = function(){ x++; test.check(); };
			var $x = $('<div>');
			$x.delay(timeout,queue).join(queue,callback);
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
			var queue='myFX';
			var timeout = 100;
			var callback = function(){ x++; test.check(); };
			var $x = $('<div>');
			$x.delay(timeout,queue).join(queue).then(callback);
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
			var queue='myFX';
			var timeout = 100;
			var callback = function(){ x++; test.check(); };
			var $x = $('<div>');
			$x.delay(timeout,queue).join(queue,callback);
			test.assertEquals("active queue should wait", 0, x);
			$x.dequeue(queue);
			test.assertEquals("active queue should still wait", 0, x);
			window.setTimeout(function(){
				test.assertEquals("active queue should wait until delay is over", 0, x);
				$x.stop(queue);
				if ($().jquery < '1.7.0') {
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
			var queue='myFX';
			var timeout = 100;
			var callback = function(){ x++; test.check(); };
			var $x = $('<div>');
			$x.delay(timeout,queue).join(queue,callback);
			test.assertEquals("active queue should wait", 0, x);
			$x.dequeue(queue);
			test.assertEquals("active queue should still wait", 0, x);
			window.setTimeout(function(){
				test.assertEquals("active queue should wait until delay is over", 0, x);
				$x.stop(queue,true);
				test.assertEquals(".join(queue) should not fire after .stop(queue,true)", 0, x);
				window.setTimeout(function(){
					if ($().jquery < '1.7.0') {
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
			var queue='myFX';
			var timeout = 100;
			var callback = function(){ x++; test.check(); };
			var $x = $('<div>');
			$x.delay(timeout,queue).join(queue).then(callback);
			test.assertEquals("active queue should wait", 0, x);
			$x.dequeue(queue);
			test.assertEquals("active queue should still wait", 0, x);
			window.setTimeout(function(){
				test.assertEquals("active queue should wait until delay is over", 0, x);
				$x.stop(queue);
				if ($().jquery < '1.7.0') {
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
			var queue='myFX';
			var timeout = 100;
			var callback = function(){ x++; test.check(); };
			var $x = $('<div>');
			$x.delay(timeout,queue).join(queue).then(callback);
			test.assertEquals("active queue should wait", 0, x);
			$x.dequeue(queue);
			test.assertEquals("active queue should still wait", 0, x);
			window.setTimeout(function(){
				test.assertEquals("active queue should wait until delay is over", 0, x);
				$x.stop(queue,true);
				test.assertEquals(".join(queue) should not fire after .stop(queue,true)", 0, x);
				window.setTimeout(function(){
					if ($().jquery < '1.7.0') {
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
			var queue='myFX';
			var timeout = 100;
			var callback = function(){ x++; test.check(); };
			var $x = $('<div>');
			var TIC = $x.delay(timeout,queue).join(queue);
			test.assertEquals("active queue should wait", 0, x);
			$x.dequeue(queue);
			test.assertEquals("active queue should still wait", 0, x);
			window.setTimeout(function(){
				test.assertEquals("active queue should wait until delay is over", 0, x);
				$x.stop(queue);
				test.assertEquals("TIC must wait until .then()", 0, x);
				TIC.then(callback);
				if ($().jquery < '1.7.0') {
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
			var queue='myFX';
			var timeout = 100;
			var callback = function(){ x++; test.check(); };
			var $x = $('<div>');
			var TIC = $x.delay(timeout,queue).join(queue);
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
					if ($().jquery < '1.7.0') {
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
			var queue='myFX';
			var timeout = 100;
			var callback = function(){ x++; test.check(); };
			var $x = $('<div>');
			$x.delay(timeout,queue).join(queue,callback);
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
			var queue='myFX';
			var timeout = 100;
			var callback = function(){ x++; test.check(); };
			var $x = $('<div>');
			$x.delay(timeout,queue).join(queue).then(callback);
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
			var queue='myFX';
			var timeout = 100;
			var callback = function(){ x++; test.check(); };
			var $x = $('<div>');
			var TIC = $x.delay(timeout,queue).join(queue);
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
			var queue='myFX';
			var timeout = 100;
			var callback = function(){ x++; test.check(); };
			var $x = $('<div>');
			$x.delay(timeout,queue).join(queue,callback);
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
			var queue='myFX';
			var timeout = 100;
			var callback = function(){ x++; test.check(); };
			var $x = $('<div>');
			$x.delay(timeout,queue).join(queue).then(callback);
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
			var queue='myFX';
			var timeout = 100;
			var callback = function(){ x++; test.check(); };
			var $x = $('<div>');
			var TIC = $x.delay(timeout,queue).join(queue);
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

	}

};