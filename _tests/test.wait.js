suite = {
		
		"waiting short": null,
			
		".wait(callback)" : function($, test) {
				var x = 0;
				var callback = function(){ x++; test.check(); };
				var TIC = $.wait(callback);
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
			var $x = $('<div>');
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
			var $x = $('<div>');
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
			var $x = $('<div>');
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
			var $x = $('<div>');
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
			var $x = $('<div>');
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
		
		"waiting for timeout": null,

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
			var $x = $('<div>');
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
			var $x = $('<div>');
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
			var $x = $('<div>');
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
			var $x = $('<div>');
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
		
		"waiting for deferred event": null,

		".wait(event,callback) +…+ .trigger(event)" : function($, test) {
			var event = 'myEvent';
			var x = 0;
			var callback = function(){ x++; test.check(); };
			var $x = $('<div>');
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
			var $x = $('<div>');
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
			var $x = $('<div>');
			var TIC = $x.wait(event);
			test.assertEquals(".wait() should defer", 0, x);
			window.setTimeout(function(){
				$x.trigger(event);
				test.assertEquals(".wait() should have not fired before TIC knows to do so", 0, x);
				var $y = TIC.then(callback);
				test.assertEquals(".wait() should have fired after telling TIC", 1, x);
				test.assertEquals("instant .then() should return original object", $x, $y);
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
			var $x = $('<div>');
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
			var $x = $('<div>');
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
			var $x = $('<div>');
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
			var $x = $('<div>');
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
			var $x = $('<div>');
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
			var $x = $('<div>');
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
		
		"waiting for instant event": null,

		".wait(event,callback) + .trigger(event)" : function($, test) {
			var event = 'myEvent';
			var x = 0;
			var callback = function(){ x++; test.check(); };
			var $x = $('<div>');
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
			var $x = $('<div>');
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
			var $x = $('<div>');
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
			var $x = $('<div>');
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
			var $x = $('<div>');
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
			var $x = $('<div>');
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
			var $x = $('<div>');
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
			var $x = $('<div>');
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
			var $x = $('<div>');
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
		},
		
		"accessing interim states": null,
		
		"tic=$('.some').wait().next() + $(tic)": function($, test){
			var $x = $('<div><p>1</p><p>2</p><p>3</p></div>').children(':first');
			var tic = $x.wait().next();
			test.assertNotEquals("waiting tic is not the same as original object", $x, tic);
			var $t = $(tic);
			test.assertEquals("tic should currently hold one element", 1, $t.size());
			test.assertEquals("tic should currently stay on first child", "1", $t.text());
			window.setTimeout(function(){
				test.assertEquals("after wait tic should stay on second child", "2", $(tic).text());
				var $y = tic.next();
				test.assertEquals("after second next tic should stay on third child", "3", $(tic).text());
				test.assertNotEquals("instant call to .next() should return original object instead of tic", tic, $y);
				test.done();
			}, 1);
		}
		
};