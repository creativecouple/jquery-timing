tests[".wait() functionality"] = {
		
		"waiting short": {
			
			".wait(callback)" : function($, test) {
				var x = 0;
				var callback = function(){ x++; test.check(); };
				$.wait(callback);
				test.assertEquals(".wait() should defer", 0, x);
				window.setTimeout(function(){
					test.assertEquals(".wait() should have fired after short waiting", 1, x);
					window.setTimeout(function(){
						test.assertEquals(".wait() should not fire anymore", 1, x);
						test.done();
					}, 100);
				}, 1);
			},
				
			".wait().then(callback)" : function($, test) {
				var x = 0;
				var callback = function(){ x++; test.check(); };
				$.wait().then(callback);
				test.assertEquals(".wait() should defer", 0, x);
				window.setTimeout(function(){
					test.assertEquals(".wait() should have fired after short waiting", 1, x);
					window.setTimeout(function(){
						test.assertEquals(".wait() should not fire anymore", 1, x);
						test.done();
					}, 100);
				}, 1);
			},
			
			".wait() +…+ .then(callback)" : function($, test) {
				var x = 0;
				var callback = function(){ x++; test.check(); };
				var $x = test.element('<div>');
				var TIC = $x.wait();
				test.assertEquals(".wait() should defer", 0, x);
				window.setTimeout(function(){				
					test.assertEquals("TIC should wait until .then()", 0, x);
					var $y = TIC.then(callback);
					test.assertEquals(".wait() should have fired after short waiting", 1, x);
					test.assertEquals("instant .then() should return original jQuery object", $x, $y);
					window.setTimeout(function(){
						test.assertEquals(".wait() should not fire anymore", 1, x);
						test.done();
					}, 100);
				}, 1);
			},
			
			".wait(callback) + .unwait()" : function($, test) {
				var x = 0;
				var callback = function(){ x++; test.check(); };
				var $x = test.element('<div>');
				$x.wait(callback);
				test.assertEquals(".wait() should defer", 0, x);
				$x.unwait();
				window.setTimeout(function(){
					test.assertEquals(".wait() should have been interrupted by .unwait()", 0, x);
					window.setTimeout(function(){
						test.assertEquals(".wait() should not fire anymore", 0, x);
						test.done();
					}, 100);
				}, 1);
			},
			
			".wait().then(callback) + .unwait()" : function($, test) {
				var x = 0;
				var callback = function(){ x++; test.check(); };
				var $x = test.element('<div>');
				$x.wait().then(callback);
				test.assertEquals(".wait() should defer", 0, x);
				$x.unwait();
				window.setTimeout(function(){
					test.assertEquals(".wait() should have been interrupted by .unwait()", 0, x);
					window.setTimeout(function(){
						test.assertEquals(".wait() should not fire anymore", 0, x);
						test.done();
					}, 100);
				}, 1);
			},
			
			".wait(callback) + .unrepeat()" : function($, test) {
				var x = 0;
				var callback = function(){ x++; test.check(); };
				var $x = test.element('<div>');
				$x.wait(callback);
				test.assertEquals(".wait() should defer", 0, x);
				$x.unrepeat();
				window.setTimeout(function(){
					test.assertEquals(".wait() should not have been interrupted by .unrepeat()", 1, x);
					window.setTimeout(function(){
						test.assertEquals(".wait() should not fire anymore", 1, x);
						test.done();
					}, 100);
				}, 1);
			},
			
			".wait().then(callback) + .unrepeat()" : function($, test) {
				var x = 0;
				var callback = function(){ x++; test.check(); };
				var $x = test.element('<div>');
				$x.wait().then(callback);
				test.assertEquals(".wait() should defer", 0, x);
				$x.unrepeat();
				window.setTimeout(function(){
					test.assertEquals(".wait() should not have been interrupted by .unrepeat()", 1, x);
					window.setTimeout(function(){
						test.assertEquals(".wait() should not fire anymore", 1, x);
						test.done();
					}, 100);
				}, 1);
			},
			
			".wait()._": function($, test) {
				var $x = test.element('<div>');
				var TIC = $x.wait();
				test.assertNotEquals("tic must be new object", $x, TIC);
				var _ = TIC._;
				test.assertEquals("underscore must return original object", $x, _);
				test.done();
			},

		},
		
		"waiting for timeout": {

			".wait(timeout,callback)" : function($, test) {
				var timeout = 100;
				var x = 0;
				var callback = function(){ x++; test.check(); };
				$.wait(timeout, callback);
				test.assertEquals(".wait() should defer", 0, x);
				window.setTimeout(function(){
					test.assertEquals(".wait() should have fired after short waiting", 1, x);
					window.setTimeout(function(){
						test.assertEquals(".wait() should not fire anymore", 1, x);
						test.done();
					}, timeout+1);
				}, timeout+1);
			},
			
			".wait(timeout).then(callback)" : function($, test) {
				var timeout = 100;
				var x = 0;
				var callback = function(){ x++; test.check(); };
				$.wait(timeout).then(callback);
				test.assertEquals(".wait() should defer", 0, x);
				window.setTimeout(function(){
					test.assertEquals(".wait() should have fired after short waiting", 1, x);
					window.setTimeout(function(){
						test.assertEquals(".wait() should not fire anymore", 1, x);
						test.done();
					}, timeout+1);
				}, timeout+1);
			},
			
			".wait(timeout,callback) + .unwait()" : function($, test) {
				var timeout = 100;
				var x = 0;
				var callback = function(){ x++; test.check(); };
				var $x = test.element('<div>');
				$x.wait(timeout, callback);
				test.assertEquals(".wait() should defer", 0, x);
				$x.unwait();
				window.setTimeout(function(){
					test.assertEquals(".wait() should have been interrupted by .unwait()", 0, x);
					window.setTimeout(function(){
						test.assertEquals(".wait() should not fire anymore", 0, x);
						test.done();
					}, timeout+1);
				}, timeout+1);
			},
		
			".wait(timeout).then(callback) + .unwait()" : function($, test) {
				var timeout = 100;
				var x = 0;
				var callback = function(){ x++; test.check(); };
				var $x = test.element('<div>');
				$x.wait(timeout).then(callback);
				test.assertEquals(".wait() should defer", 0, x);
				$x.unwait();
				window.setTimeout(function(){
					test.assertEquals(".wait() should have been interrupted by .unwait()", 0, x);
					window.setTimeout(function(){
						test.assertEquals(".wait() should not fire anymore", 0, x);
						test.done();
					}, timeout+1);
				}, timeout+1);
			},
			
			".wait(timeout,callback) + .unrepeat()" : function($, test) {
				var timeout = 100;
				var x = 0;
				var callback = function(){ x++; test.check(); };
				var $x = test.element('<div>');
				$x.wait(timeout, callback);
				test.assertEquals(".wait() should defer", 0, x);
				$x.unrepeat();
				window.setTimeout(function(){
					test.assertEquals(".wait() should not have been interrupted by .unrepeat()", 1, x);
					test.done();
					window.setTimeout(function(){
						test.assertEquals(".wait() should not fire anymore", 1, x);
						test.done();
					}, timeout+1);
				}, timeout+1);
			},
		
			".wait(timeout).then(callback) + .unrepeat()" : function($, test) {
				var timeout = 100;
				var x = 0;
				var callback = function(){ x++; test.check(); };
				var $x = test.element('<div>');
				$x.wait(timeout).then(callback);
				test.assertEquals(".wait() should defer", 0, x);
				$x.unrepeat();
				window.setTimeout(function(){
					test.assertEquals(".wait() should not have been interrupted by .unrepeat(),", 1, x);
					test.done();
					window.setTimeout(function(){
						test.assertEquals(".wait() should not fire anymore", 1, x);
						test.done();
					}, timeout+1);
				}, timeout+1);
			},
			
			".wait(timeout)._": function($, test) {
				var $x = test.element('<div>');
				var TIC = $x.wait(100);
				test.assertNotEquals("tic must be new object", $x, TIC);
				var _ = TIC._;
				test.assertEquals("underscore must return original object", $x, _);
				test.done();
			},

		},
		
		"waiting for deferred event": {

			".wait(event,callback) +…+ .trigger(event)" : function($, test) {
				var event = 'myEvent';
				var x = 0;
				var callback = function(){ x++; test.check(); };
				var $x = test.element('<div>');
				$x.wait(event, callback);
				test.assertEquals(".wait() should defer", 0, x);
				window.setTimeout(function(){
					$x.trigger(event);
					test.assertEquals(".wait() should have fired after triggering the event", 1, x);
					$x.trigger(event);
					test.assertEquals(".wait() should not fire anymore", 1, x);
					window.setTimeout(function(){
						$x.trigger(event);
						test.assertEquals(".wait() should not have fired anymore", 1, x);
						test.done();
					}, 100);
				}, 100);
			},
			
			".wait(event).then(callback) +…+ .trigger(event)" : function($, test) {
				var event = 'myEvent';
				var x = 0;
				var callback = function(){ x++; test.check(); };
				var $x = test.element('<div>');
				$x.wait(event).then(callback);
				test.assertEquals(".wait() should defer", 0, x);
				window.setTimeout(function(){
					$x.trigger(event);
					test.assertEquals(".wait() should have fired after triggering the event", 1, x);
					$x.trigger(event);
					test.assertEquals(".wait() should not fire anymore", 1, x);
					window.setTimeout(function(){
						$x.trigger(event);
						test.assertEquals(".wait() should not have fired anymore", 1, x);
						test.done();
					}, 100);
				}, 100);
			},
			
			".wait(event) +…+ .trigger(event) + .then(callback)" : function($, test) {
				var event = 'myEvent';
				var x = 0;
				var callback = function(){ x++; test.check(); };
				var $x = test.element('<div>');
				var TIC = $x.wait(event);
				test.assertEquals(".wait() should defer", 0, x);
				window.setTimeout(function(){
					$x.trigger(event);
					test.assertEquals(".wait() should have not fired before TIC knows to do so", 0, x);
					var $y = TIC.then(callback);
					test.assertEquals(".wait() should have fired after telling TIC", 1, x);
					test.assertNotEquals("instant .then() should not return TIC object", TIC, $y);
					test.assertEquals("instant .then() should return jQuery object", 1, $y.size());
					$x.trigger(event);
					test.assertEquals(".wait() should not fire anymore", 1, x);
					window.setTimeout(function(){
						$x.trigger(event);
						test.assertEquals(".wait() should not have fired anymore", 1, x);
						test.done();
					}, 100);
				}, 100);
			},
			
			".wait(event,callback) +…+ .unwait() + .trigger(event)" : function($, test) {
				var event = 'myEvent';
				var x = 0;
				var callback = function(){ x++; test.check(); };
				var $x = test.element('<div>');
				$x.wait(event, callback);
				test.assertEquals(".wait() should defer", 0, x);
				window.setTimeout(function(){
					$x.unwait();
					test.assertEquals(".wait() should not have fired before triggering the event", 0, x);
					$x.trigger(event);
					test.assertEquals(".wait() should have been interrupted by .unwait()", 0, x);
					$x.trigger(event);
					test.assertEquals(".wait() should not fire anymore", 0, x);
					window.setTimeout(function(){
						$x.trigger(event);
						test.assertEquals(".wait() should not have fired anymore", 0, x);
						test.done();
					}, 100);
				}, 100);
			},
			
			".wait(event).then(callback) +…+ .unwait() + .trigger(event)" : function($, test) {
				var event = 'myEvent';
				var x = 0;
				var callback = function(){ x++; test.check(); };
				var $x = test.element('<div>');
				$x.wait(event).then(callback);
				test.assertEquals(".wait() should defer", 0, x);
				window.setTimeout(function(){
					$x.unwait();
					test.assertEquals(".wait() should not have fired before triggering the event", 0, x);
					$x.trigger(event);
					test.assertEquals(".wait() should have been interrupted by .unwait()", 0, x);
					$x.trigger(event);
					test.assertEquals(".wait() should not fire anymore", 0, x);
					window.setTimeout(function(){
						$x.trigger(event);
						test.assertEquals(".wait() should not have fired anymore", 0, x);
						test.done();
					}, 100);
				}, 100);
			},
			
			".wait(event) +…+ .unwait() + .trigger(event) + .then(callback)" : function($, test) {
				var event = 'myEvent';
				var x = 0;
				var callback = function(){ x++; test.check(); };
				var $x = test.element('<div>');
				var TIC = $x.wait(event);
				test.assertEquals(".wait() should defer", 0, x);
				window.setTimeout(function(){
					$x.unwait();
					test.assertEquals(".wait() should not have fired before triggering the event", 0, x);
					$x.trigger(event);
					test.assertEquals(".wait() should have not fired before TIC knows to do so", 0, x);
					TIC.then(callback);
					test.assertEquals(".wait() should have not fired after telling TIC because of .unwait()", 0, x);
					$x.trigger(event);
					test.assertEquals(".wait() should not fire anymore", 0, x);
					window.setTimeout(function(){
						$x.trigger(event);
						test.assertEquals(".wait() should not have fired anymore", 0, x);
						test.done();
					}, 100);
				}, 100);
			},
	
			".wait(event,callback) +…+ .unrepeat() + .trigger(event)" : function($, test) {
				var event = 'myEvent';
				var x = 0;
				var callback = function(){ x++; test.check(); };
				var $x = test.element('<div>');
				$x.wait(event, callback);
				test.assertEquals(".wait() should defer", 0, x);
				window.setTimeout(function(){
					$x.unrepeat();
					test.assertEquals(".wait() should not have fired before triggering the event", 0, x);
					$x.trigger(event);
					test.assertEquals(".wait() should not have been interrupted by .unrepeat()", 1, x);
					$x.trigger(event);
					test.assertEquals(".wait() should not fire anymore", 1, x);
					window.setTimeout(function(){
						$x.trigger(event);
						test.assertEquals(".wait() should not have fired anymore", 1, x);
						test.done();
					}, 100);
				}, 100);
			},
			
			".wait(event).then(callback) +…+ .unrepeat() + .trigger(event)" : function($, test) {
				var event = 'myEvent';
				var x = 0;
				var callback = function(){ x++; test.check(); };
				var $x = test.element('<div>');
				$x.wait(event).then(callback);
				test.assertEquals(".wait() should defer", 0, x);
				window.setTimeout(function(){
					$x.unrepeat();
					test.assertEquals(".wait() should not have fired before triggering the event", 0, x);
					$x.trigger(event);
					test.assertEquals(".wait() should not have been interrupted by .unrepeat()", 1, x);
					$x.trigger(event);
					test.assertEquals(".wait() should not fire anymore", 1, x);
					window.setTimeout(function(){
						$x.trigger(event);
						test.assertEquals(".wait() should not have fired anymore", 1, x);
						test.done();
					}, 100);
				}, 100);
			},
			
			".wait(event) +…+ .unrepeat() + .trigger(event) + .then(callback)" : function($, test) {
				var event = 'myEvent';
				var x = 0;
				var callback = function(){ x++; test.check(); };
				var $x = test.element('<div>');
				var TIC = $x.wait(event);
				test.assertEquals(".wait() should defer", 0, x);
				window.setTimeout(function(){
					$x.unrepeat();
					test.assertEquals(".wait() should not have fired before triggering the event", 0, x);
					$x.trigger(event);
					test.assertEquals(".wait() should have not fired before TIC knows to do so", 0, x);
					TIC.then(callback);
					test.assertEquals(".wait() should have fired after telling TIC because it ignores .unrepeat()", 1, x);
					$x.trigger(event);
					test.assertEquals(".wait() should not fire anymore", 1, x);
					window.setTimeout(function(){
						$x.trigger(event);
						test.assertEquals(".wait() should not have fired anymore", 1, x);
						test.done();
					}, 100);
				}, 100);
			},
			
			".wait(event)._": function($, test) {
				var $x = test.element('<div>');
				var TIC = $x.wait('myEvent');
				test.assertNotEquals("tic must be new object", $x, TIC);
				var _ = TIC._;
				test.assertEquals("underscore must return original object", $x, _);
				test.done();
			},

		},
		
		"waiting for instant event": {

			".wait(event,callback) + .trigger(event)" : function($, test) {
				var event = 'myEvent';
				var x = 0;
				var callback = function(){ x++; test.check(); };
				var $x = test.element('<div>');
				$x.wait(event, callback);
				test.assertEquals(".wait() should defer", 0, x);
				$x.trigger(event);
				test.assertEquals(".wait() should have fired after triggering the event", 1, x);
				$x.trigger(event);
				test.assertEquals(".wait() should not fire anymore", 1, x);
				window.setTimeout(function(){
					$x.trigger(event);
					test.assertEquals(".wait() should not have fired anymore", 1, x);
					test.done();
				}, 100);
			},
			
			".wait(event).then(callback) + .trigger(event)" : function($, test) {
				var event = 'myEvent';
				var x = 0;
				var callback = function(){ x++; test.check(); };
				var $x = test.element('<div>');
				$x.wait(event).then(callback);
				test.assertEquals(".wait() should defer", 0, x);
				$x.trigger(event);
				test.assertEquals(".wait() should have fired after triggering the event", 1, x);
				$x.trigger(event);
				test.assertEquals(".wait() should not fire anymore", 1, x);
				window.setTimeout(function(){
					$x.trigger(event);
					test.assertEquals(".wait() should not have fired anymore", 1, x);
					test.done();
				}, 100);
			},
			
			".wait(event) + .trigger(event) + .then(callback)" : function($, test) {
				var event = 'myEvent';
				var x = 0;
				var callback = function(){ x++; test.check(); };
				var $x = test.element('<div>');
				var TIC = $x.wait(event);
				test.assertEquals(".wait() should defer", 0, x);
				$x.trigger(event);
				test.assertEquals(".wait() should have not fired before TIC knows to do so", 0, x);
				TIC.then(callback);
				test.assertEquals(".wait() should have fired after telling TIC", 1, x);
				$x.trigger(event);
				test.assertEquals(".wait() should not fire anymore", 1, x);
				window.setTimeout(function(){
					$x.trigger(event);
					test.assertEquals(".wait() should not have fired anymore", 1, x);
					test.done();
				}, 100);
			},
			
			".wait(event,callback) + .unwait() + .trigger(event)" : function($, test) {
				var event = 'myEvent';
				var x = 0;
				var callback = function(){ x++; test.check(); };
				var $x = test.element('<div>');
				$x.wait(event, callback);
				test.assertEquals(".wait() should defer", 0, x);
				$x.unwait();
				test.assertEquals(".wait() should not have fired before triggering the event", 0, x);
				$x.trigger(event);
				test.assertEquals(".wait() should have been interrupted by .unwait()", 0, x);
				$x.trigger(event);
				test.assertEquals(".wait() should not fire anymore", 0, x);
				window.setTimeout(function(){
					$x.trigger(event);
					test.assertEquals(".wait() should not have fired anymore", 0, x);
					test.done();
				}, 100);
			},
			
			".wait(event).then(callback) + .unwait() + .trigger(event)" : function($, test) {
				var event = 'myEvent';
				var x = 0;
				var callback = function(){ x++; test.check(); };
				var $x = test.element('<div>');
				$x.wait(event).then(callback);
				test.assertEquals(".wait() should defer", 0, x);
				$x.unwait();
				test.assertEquals(".wait() should not have fired before triggering the event", 0, x);
				$x.trigger(event);
				test.assertEquals(".wait() should have been interrupted by .unwait()", 0, x);
				$x.trigger(event);
				test.assertEquals(".wait() should not fire anymore", 0, x);
				window.setTimeout(function(){
					$x.trigger(event);
					test.assertEquals(".wait() should not have fired anymore", 0, x);
					test.done();
				}, 100);
			},
			
			".wait(event) + .unwait() + .trigger(event) + .then(callback)" : function($, test) {
				var event = 'myEvent';
				var x = 0;
				var callback = function(){ x++; test.check(); };
				var $x = test.element('<div>');
				var TIC = $x.wait(event);
				test.assertEquals(".wait() should defer", 0, x);
				$x.unwait();
				test.assertEquals(".wait() should not have fired before triggering the event", 0, x);
				$x.trigger(event);
				test.assertEquals(".wait() should have not fired before TIC knows to do so", 0, x);
				TIC.then(callback);
				test.assertEquals(".wait() should have not fired after telling TIC because of .unwait()", 0, x);
				$x.trigger(event);
				test.assertEquals(".wait() should not fire anymore", 0, x);
				window.setTimeout(function(){
					$x.trigger(event);
					test.assertEquals(".wait() should not have fired anymore", 0, x);
					test.done();
				}, 100);
			},
	
			".wait(event,callback) + .unrepeat() + .trigger(event)" : function($, test) {
				var event = 'myEvent';
				var x = 0;
				var callback = function(){ x++; test.check(); };
				var $x = test.element('<div>');
				$x.wait(event, callback);
				test.assertEquals(".wait() should defer", 0, x);
				$x.unrepeat();
				test.assertEquals(".wait() should not have fired before triggering the event", 0, x);
				$x.trigger(event);
				test.assertEquals(".wait() should not have been interrupted by .unrepeat()", 1, x);
				$x.trigger(event);
				test.assertEquals(".wait() should not fire anymore", 1, x);
				window.setTimeout(function(){
					$x.trigger(event);
					test.assertEquals(".wait() should not have fired anymore", 1, x);
					test.done();
				}, 100);
			},
			
			".wait(event).then(callback) + .unrepeat() + .trigger(event)" : function($, test) {
				var event = 'myEvent';
				var x = 0;
				var callback = function(){ x++; test.check(); };
				var $x = test.element('<div>');
				$x.wait(event).then(callback);
				test.assertEquals(".wait() should defer", 0, x);
				$x.unrepeat();
				test.assertEquals(".wait() should not have fired before triggering the event", 0, x);
				$x.trigger(event);
				test.assertEquals(".wait() should not have been interrupted by .unrepeat()", 1, x);
				$x.trigger(event);
				test.assertEquals(".wait() should not fire anymore", 1, x);
				window.setTimeout(function(){
					$x.trigger(event);
					test.assertEquals(".wait() should not have fired anymore", 1, x);
					test.done();
				}, 100);
			},
			
			".wait(event) + .unrepeat() + .trigger(event) + .then(callback)" : function($, test) {
				var event = 'myEvent';
				var x = 0;
				var callback = function(){ x++; test.check(); };
				var $x = test.element('<div>');
				var TIC = $x.wait(event);
				test.assertEquals(".wait() should defer", 0, x);
				$x.unrepeat();
				test.assertEquals(".wait() should not have fired before triggering the event", 0, x);
				$x.trigger(event);
				test.assertEquals(".wait() should have not fired before TIC knows to do so", 0, x);
				TIC.then(callback);
				test.assertEquals(".wait() should have fired after telling TIC because it ignores .unrepeat()", 1, x);
				$x.trigger(event);
				test.assertEquals(".wait() should not fire anymore", 1, x);
				window.setTimeout(function(){
					$x.trigger(event);
					test.assertEquals(".wait() should not have fired anymore", 1, x);
					test.done();
				}, 100);
			}
			
		},
		
		"waiting for jQuery.Deferred": {
			
			_version : ['1.5'],

			".wait(deferred,callback) +…+ deferred.resolve()" : function($, test) {
				var deferred = new $.Deferred();
				var x = 0;
				var callback = function(){ x++; test.check(); };
				var $x = test.element('<div>');
				$x.wait(deferred, callback);
				test.assertEquals(".wait() should defer", 0, x);
				window.setTimeout(function(){
					deferred.resolve();
					test.assertEquals(".wait() should have fired after resolving the deferred", 1, x);
					deferred.resolve();
					test.assertEquals(".wait() should not fire anymore", 1, x);
					window.setTimeout(function(){
						deferred.resolve();
						test.assertEquals(".wait() should not have fired anymore", 1, x);
						test.done();
					}, 100);
				}, 100);
			},
			
			".wait(deferred).then(callback) +…+ deferred.resolve()" : function($, test) {
				var deferred = new $.Deferred();
				var x = 0;
				var callback = function(){ x++; test.check(); };
				var $x = test.element('<div>');
				$x.wait(deferred).then(callback);
				test.assertEquals(".wait() should defer", 0, x);
				window.setTimeout(function(){
					deferred.resolve();
					test.assertEquals(".wait() should have fired after resolving the deferred", 1, x);
					deferred.resolve();
					test.assertEquals(".wait() should not fire anymore", 1, x);
					window.setTimeout(function(){
						deferred.resolve();
						test.assertEquals(".wait() should not have fired anymore", 1, x);
						test.done();
					}, 100);
				}, 100);
			},
			
			".wait(deferred) +…+ deferred.resolve() + .then(callback)" : function($, test) {
				var deferred = new $.Deferred();
				var x = 0;
				var callback = function(){ x++; test.check(); };
				var $x = test.element('<div>');
				var TIC = $x.wait(deferred);
				test.assertEquals(".wait() should defer", 0, x);
				window.setTimeout(function(){
					deferred.resolve();
					test.assertEquals(".wait() should have not fired before TIC knows to do so", 0, x);
					var $y = TIC.then(callback);
					test.assertEquals(".wait() should have fired after telling TIC", 1, x);
					test.assertNotEquals("instant .then() should not return TIC object", TIC, $y);
					test.assertEquals("instant .then() should return jQuery object", 1, $y.size());
					deferred.resolve();
					test.assertEquals(".wait() should not fire anymore", 1, x);
					window.setTimeout(function(){
						deferred.resolve();
						test.assertEquals(".wait() should not have fired anymore", 1, x);
						test.done();
					}, 100);
				}, 100);
			},
			
			".wait(deferred,callback) +…+ .unwait() + deferred.resolve()" : function($, test) {
				var deferred = new $.Deferred();
				var x = 0;
				var callback = function(){ x++; test.check(); };
				var $x = test.element('<div>');
				$x.wait(deferred, callback);
				test.assertEquals(".wait() should defer", 0, x);
				window.setTimeout(function(){
					$x.unwait();
					test.assertEquals(".wait() should not have fired before resolving the deferred", 0, x);
					deferred.resolve();
					test.assertEquals(".wait() should have been interrupted by .unwait()", 0, x);
					deferred.resolve();
					test.assertEquals(".wait() should not fire anymore", 0, x);
					window.setTimeout(function(){
						deferred.resolve();
						test.assertEquals(".wait() should not have fired anymore", 0, x);
						test.done();
					}, 100);
				}, 100);
			},
			
			".wait(deferred).then(callback) +…+ .unwait() + deferred.resolve()" : function($, test) {
				var deferred = new $.Deferred();
				var x = 0;
				var callback = function(){ x++; test.check(); };
				var $x = test.element('<div>');
				$x.wait(deferred).then(callback);
				test.assertEquals(".wait() should defer", 0, x);
				window.setTimeout(function(){
					$x.unwait();
					test.assertEquals(".wait() should not have fired before resolving the deferred", 0, x);
					deferred.resolve();
					test.assertEquals(".wait() should have been interrupted by .unwait()", 0, x);
					deferred.resolve();
					test.assertEquals(".wait() should not fire anymore", 0, x);
					window.setTimeout(function(){
						deferred.resolve();
						test.assertEquals(".wait() should not have fired anymore", 0, x);
						test.done();
					}, 100);
				}, 100);
			},
			
			".wait(deferred) +…+ .unwait() + deferred.resolve() + .then(callback)" : function($, test) {
				var deferred = new $.Deferred();
				var x = 0;
				var callback = function(){ x++; test.check(); };
				var $x = test.element('<div>');
				var TIC = $x.wait(deferred);
				test.assertEquals(".wait() should defer", 0, x);
				window.setTimeout(function(){
					$x.unwait();
					test.assertEquals(".wait() should not have fired before resolving the deferred", 0, x);
					deferred.resolve();
					test.assertEquals(".wait() should have not fired before TIC knows to do so", 0, x);
					TIC.then(callback);
					test.assertEquals(".wait() should have not fired after telling TIC because of .unwait()", 0, x);
					deferred.resolve();
					test.assertEquals(".wait() should not fire anymore", 0, x);
					window.setTimeout(function(){
						deferred.resolve();
						test.assertEquals(".wait() should not have fired anymore", 0, x);
						test.done();
					}, 100);
				}, 100);
			},
	
			".wait(deferred,callback) +…+ .unrepeat() + deferred.resolve()" : function($, test) {
				var deferred = new $.Deferred();
				var x = 0;
				var callback = function(){ x++; test.check(); };
				var $x = test.element('<div>');
				$x.wait(deferred, callback);
				test.assertEquals(".wait() should defer", 0, x);
				window.setTimeout(function(){
					$x.unrepeat();
					test.assertEquals(".wait() should not have fired before resolving the deferred", 0, x);
					deferred.resolve();
					test.assertEquals(".wait() should not have been interrupted by .unrepeat()", 1, x);
					deferred.resolve();
					test.assertEquals(".wait() should not fire anymore", 1, x);
					window.setTimeout(function(){
						deferred.resolve();
						test.assertEquals(".wait() should not have fired anymore", 1, x);
						test.done();
					}, 100);
				}, 100);
			},
			
			".wait(deferred).then(callback) +…+ .unrepeat() + deferred.resolve()" : function($, test) {
				var deferred = new $.Deferred();
				var x = 0;
				var callback = function(){ x++; test.check(); };
				var $x = test.element('<div>');
				$x.wait(deferred).then(callback);
				test.assertEquals(".wait() should defer", 0, x);
				window.setTimeout(function(){
					$x.unrepeat();
					test.assertEquals(".wait() should not have fired before resolving the deferred", 0, x);
					deferred.resolve();
					test.assertEquals(".wait() should not have been interrupted by .unrepeat()", 1, x);
					deferred.resolve();
					test.assertEquals(".wait() should not fire anymore", 1, x);
					window.setTimeout(function(){
						deferred.resolve();
						test.assertEquals(".wait() should not have fired anymore", 1, x);
						test.done();
					}, 100);
				}, 100);
			},
			
			".wait(deferred) +…+ .unrepeat() + deferred.resolve() + .then(callback)" : function($, test) {
				var deferred = new $.Deferred();
				var x = 0;
				var callback = function(){ x++; test.check(); };
				var $x = test.element('<div>');
				var TIC = $x.wait(deferred);
				test.assertEquals(".wait() should defer", 0, x);
				window.setTimeout(function(){
					$x.unrepeat();
					test.assertEquals(".wait() should not have fired before resolving the deferred", 0, x);
					deferred.resolve();
					test.assertEquals(".wait() should have not fired before TIC knows to do so", 0, x);
					TIC.then(callback);
					test.assertEquals(".wait() should have fired after telling TIC because it ignores .unrepeat()", 1, x);
					deferred.resolve();
					test.assertEquals(".wait() should not fire anymore", 1, x);
					window.setTimeout(function(){
						deferred.resolve();
						test.assertEquals(".wait() should not have fired anymore", 1, x);
						test.done();
					}, 100);
				}, 100);
			},
			
			".wait(deferred)._": function($, test) {
				var $x = test.element('<div>');
				var TIC = $x.wait(new $.Deferred());
				test.assertNotEquals("tic must be new object", $x, TIC);
				var _ = TIC._;
				test.assertEquals("underscore must return original object", $x, _);
				test.done();
			},

		},
		
		"waiting for instant deferred": {
			
			_version : ['1.5'],

			".wait(deferred,callback) + deferred.resolve()" : function($, test) {
				var deferred = new $.Deferred();
				var x = 0;
				var callback = function(){ x++; test.check(); };
				var $x = test.element('<div>');
				$x.wait(deferred, callback);
				test.assertEquals(".wait() should defer", 0, x);
				deferred.resolve();
				test.assertEquals(".wait() should have fired after resolving the deferred", 1, x);
				deferred.resolve();
				test.assertEquals(".wait() should not fire anymore", 1, x);
				window.setTimeout(function(){
					deferred.resolve();
					test.assertEquals(".wait() should not have fired anymore", 1, x);
					test.done();
				}, 100);
			},
			
			".wait(deferred).then(callback) + deferred.resolve()" : function($, test) {
				var deferred = new $.Deferred();
				var x = 0;
				var callback = function(){ x++; test.check(); };
				var $x = test.element('<div>');
				$x.wait(deferred).then(callback);
				test.assertEquals(".wait() should defer", 0, x);
				deferred.resolve();
				test.assertEquals(".wait() should have fired after resolving the deferred", 1, x);
				deferred.resolve();
				test.assertEquals(".wait() should not fire anymore", 1, x);
				window.setTimeout(function(){
					deferred.resolve();
					test.assertEquals(".wait() should not have fired anymore", 1, x);
					test.done();
				}, 100);
			},
			
			".wait(deferred) + deferred.resolve() + .then(callback)" : function($, test) {
				var deferred = new $.Deferred();
				var x = 0;
				var callback = function(){ x++; test.check(); };
				var $x = test.element('<div>');
				var TIC = $x.wait(deferred);
				test.assertEquals(".wait() should defer", 0, x);
				deferred.resolve();
				test.assertEquals(".wait() should have not fired before TIC knows to do so", 0, x);
				TIC.then(callback);
				test.assertEquals(".wait() should have fired after telling TIC", 1, x);
				deferred.resolve();
				test.assertEquals(".wait() should not fire anymore", 1, x);
				window.setTimeout(function(){
					deferred.resolve();
					test.assertEquals(".wait() should not have fired anymore", 1, x);
					test.done();
				}, 100);
			},
			
			".wait(deferred,callback) + .unwait() + deferred.resolve()" : function($, test) {
				var deferred = new $.Deferred();
				var x = 0;
				var callback = function(){ x++; test.check(); };
				var $x = test.element('<div>');
				$x.wait(deferred, callback);
				test.assertEquals(".wait() should defer", 0, x);
				$x.unwait();
				test.assertEquals(".wait() should not have fired before resolving the deferred", 0, x);
				deferred.resolve();
				test.assertEquals(".wait() should have been interrupted by .unwait()", 0, x);
				deferred.resolve();
				test.assertEquals(".wait() should not fire anymore", 0, x);
				window.setTimeout(function(){
					deferred.resolve();
					test.assertEquals(".wait() should not have fired anymore", 0, x);
					test.done();
				}, 100);
			},
			
			".wait(deferred).then(callback) + .unwait() + deferred.resolve()" : function($, test) {
				var deferred = new $.Deferred();
				var x = 0;
				var callback = function(){ x++; test.check(); };
				var $x = test.element('<div>');
				$x.wait(deferred).then(callback);
				test.assertEquals(".wait() should defer", 0, x);
				$x.unwait();
				test.assertEquals(".wait() should not have fired before resolving the deferred", 0, x);
				deferred.resolve();
				test.assertEquals(".wait() should have been interrupted by .unwait()", 0, x);
				deferred.resolve();
				test.assertEquals(".wait() should not fire anymore", 0, x);
				window.setTimeout(function(){
					deferred.resolve();
					test.assertEquals(".wait() should not have fired anymore", 0, x);
					test.done();
				}, 100);
			},
			
			".wait(deferred) + .unwait() + deferred.resolve() + .then(callback)" : function($, test) {
				var deferred = new $.Deferred();
				var x = 0;
				var callback = function(){ x++; test.check(); };
				var $x = test.element('<div>');
				var TIC = $x.wait(deferred);
				test.assertEquals(".wait() should defer", 0, x);
				$x.unwait();
				test.assertEquals(".wait() should not have fired before resolving the deferred", 0, x);
				deferred.resolve();
				test.assertEquals(".wait() should have not fired before TIC knows to do so", 0, x);
				TIC.then(callback);
				test.assertEquals(".wait() should have not fired after telling TIC because of .unwait()", 0, x);
				deferred.resolve();
				test.assertEquals(".wait() should not fire anymore", 0, x);
				window.setTimeout(function(){
					deferred.resolve();
					test.assertEquals(".wait() should not have fired anymore", 0, x);
					test.done();
				}, 100);
			},
	
			".wait(deferred,callback) + .unrepeat() + deferred.resolve()" : function($, test) {
				var deferred = new $.Deferred();
				var x = 0;
				var callback = function(){ x++; test.check(); };
				var $x = test.element('<div>');
				$x.wait(deferred, callback);
				test.assertEquals(".wait() should defer", 0, x);
				$x.unrepeat();
				test.assertEquals(".wait() should not have fired before resolving the deferred", 0, x);
				deferred.resolve();
				test.assertEquals(".wait() should not have been interrupted by .unrepeat()", 1, x);
				deferred.resolve();
				test.assertEquals(".wait() should not fire anymore", 1, x);
				window.setTimeout(function(){
					deferred.resolve();
					test.assertEquals(".wait() should not have fired anymore", 1, x);
					test.done();
				}, 100);
			},
			
			".wait(deferred).then(callback) + .unrepeat() + deferred.resolve()" : function($, test) {
				var deferred = new $.Deferred();
				var x = 0;
				var callback = function(){ x++; test.check(); };
				var $x = test.element('<div>');
				$x.wait(deferred).then(callback);
				test.assertEquals(".wait() should defer", 0, x);
				$x.unrepeat();
				test.assertEquals(".wait() should not have fired before resolving the deferred", 0, x);
				deferred.resolve();
				test.assertEquals(".wait() should not have been interrupted by .unrepeat()", 1, x);
				deferred.resolve();
				test.assertEquals(".wait() should not fire anymore", 1, x);
				window.setTimeout(function(){
					deferred.resolve();
					test.assertEquals(".wait() should not have fired anymore", 1, x);
					test.done();
				}, 100);
			},
			
			".wait(deferred) + .unrepeat() + deferred.resolve() + .then(callback)" : function($, test) {
				var deferred = new $.Deferred();
				var x = 0;
				var callback = function(){ x++; test.check(); };
				var $x = test.element('<div>');
				var TIC = $x.wait(deferred);
				test.assertEquals(".wait() should defer", 0, x);
				$x.unrepeat();
				test.assertEquals(".wait() should not have fired before resolving the deferred", 0, x);
				deferred.resolve();
				test.assertEquals(".wait() should have not fired before TIC knows to do so", 0, x);
				TIC.then(callback);
				test.assertEquals(".wait() should have fired after telling TIC because it ignores .unrepeat()", 1, x);
				deferred.resolve();
				test.assertEquals(".wait() should not fire anymore", 1, x);
				window.setTimeout(function(){
					deferred.resolve();
					test.assertEquals(".wait() should not have fired anymore", 1, x);
					test.done();
				}, 100);
			}
			
		},
		
		"access original context from deferred chain": {
			
			"$(some).wait().doThisLater()._.doThatNow()": function($,test){
				$x = test.element('<div>');
				$x.wait().text('later')._.text('now');
				test.assertEquals("immediate action must have happened already", 'now', $x.text());
				window.setTimeout(function(){
					test.assertEquals("later action must have happened after timeout", 'later', $x.text());
					test.done();
				}, 100);
			},
			
			"$(some).wait(event).doThisLater()._.doThatNow()": function($,test){
				$x = test.element('<div>');
				$x.wait('evt').text('later')._.text('now');
				test.assertEquals("immediate action must have happened already", 'now', $x.text());
				$x.trigger('evt');
				test.assertEquals("later action must have happened after trigger", 'later', $x.text());
				test.done();
			},
			
			"$(some).wait(timeout).doThisLater()._.doThatNow()": function($,test){
				$x = test.element('<div>');
				$x.wait(10).text('later')._.text('now');
				test.assertEquals("immediate action must have happened already", 'now', $x.text());
				window.setTimeout(function(){
					test.assertEquals("later action must have happened after trigger", 'later', $x.text());
					test.done();
				}, 100);
			},
			
		},

		"access interim snapshots": {
		
			"tic=$('.some').wait().next() + $(tic)": function($, test){
				var $x = test.element('<div><p>1</p><p>2</p><p>3</p></div>').children(':first');
				var tic = $x.wait().next();
				test.assertNotEquals("waiting tic is not the same as original object", $x, tic);
				var $t = test.element(tic);
				test.assertEquals("tic should currently hold one element", 1, $t.size());
				test.assertEquals("tic should currently stay on first child", "1", $t.text());
				window.setTimeout(function(){
					test.assertEquals("after wait tic should stay on second child", "2", $(tic).text());
					var $y = tic.next();
					test.assertEquals("after second next tic should stay on third child", "3", $(tic).text());
					test.assertNotEquals("instant call to .next() should return original object instead of tic", tic, $y);
					test.done();
				}, 1);
			},
			
			"$('.multiple').wait(event) + $('#single').trigger(event)": function($, test){
				var $x = test.element('<div><p>1</p><p>2</p><p>3</p></div>').children();
				var event = 'myEvent';
				var tic = $x.wait(event);
				test.assertNotEquals("waiting tic is not the same as original object", $x, tic);
				test.assertEquals("tic should wait for all elements", 3, $(tic).size());
				$x.eq(1).trigger(event);
				test.assertEquals("tic should stay on all elements", '123', $(tic).text());
				var $y = tic.then();
				test.assertEquals("after event same context is used", '123', $y.text());
				test.done();
			},
			
			"tic=$('.some').wait(timeout).next() + $(tic)": function($, test){
				var $x = test.element('<div><p>1</p><p>2</p><p>3</p></div>').children(':first');
				var tic = $x.wait(10).next();
				test.assertNotEquals("waiting tic is not the same as original object", $x, tic);
				var $t = test.element(tic);
				test.assertEquals("tic should currently hold one element", 1, $t.size());
				test.assertEquals("tic should currently stay on first child", "1", $t.text());
				window.setTimeout(function(){
					test.assertEquals("after wait tic should stay on second child", "2", $(tic).text());
					var $y = tic.next();
					test.assertEquals("after second next tic should stay on third child", "3", $(tic).text());
					test.assertNotEquals("instant call to .next() should return original object instead of tic", tic, $y);
					test.done();
				}, 11);
			},
			
			"$('.multiple').wait(event) + $('#single').unwait()": function($, test){
				var $x = test.element('<div><p>1</p><p>2</p><p>3</p></div>').children();
				var event = 'myEvent';
				var x=0;
				var callback = function(){ x++; test.check(); };
				var tic = $x.wait(event).then(callback);
				test.assertEquals("tic should wait for all elements", '123', $(tic).text());			
				$x.eq(2).trigger(event);
				test.assertEquals("wait fired once", 1, x);
				test.assertEquals("tic should stay on all elements", '123', $(tic).text());
				
				tic = $x.wait(event).then(callback);
				$x.eq(0).unwait().trigger(event);
				test.assertEquals("wait still waiting for next event", 1, x);
				test.assertEquals("tic should wait for remaining elements", '23', $(tic).text());
				
				$x.eq(1).trigger(event);
				test.assertEquals("wait fired again", 2, x);
				test.assertEquals("tic should wait again for all remaining elements", '23', $(tic).text());
				
				tic.then(function(){
					test.done();
				});
				test.fail('tic should go on');
			}
			
		}
		
};