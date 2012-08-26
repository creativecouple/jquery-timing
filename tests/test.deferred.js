tests["Deferred functionality"] = {
		
		_version: ['1.5.0'],
		
		"single defers": {
			
			"$.when($.wait(timeout)).done(callback)" : function($,test) {
				var timeout = 100;
				var tic=$.wait(timeout);
				var x = 0;
				$.when(tic).done(function(){ x++; });
				window.setTimeout(function(){
					test.assertEquals("deferred must not fire too early", 0, x);
					window.setTimeout(function(){
						test.assertEquals("deferred must have fired", 1, x);
						test.done();
					}, timeout);
				},timeout/4);
			},

			"$.when($some.wait(event)).done(callback)" : function($,test) {
				var event = 'myev';
				var $x = test.element('<div>');
				var tic=$x.wait(event);
				var x = 0;
				$.when(tic).done(function(){ x++; });
				test.assertEquals("deferred must not fire too early", 0, x);
				$x.trigger(event);
				test.assertEquals("deferred must have fired", 1, x);
				test.done();
			},
		
		},
		
		"multiple defers": {
				
			"$.when($some.wait(ev1), $other.wait(ev2)).done(callback)" : function($,test) {
				var $x = test.element('<div>');
				var x = 0, foo = 0, bar = 0;
				$.when($x.wait('foo').then(function(){foo++;}), $x.wait('bar').then(function(){bar++;})).done(function(){ x++; });
				test.assertEquals("deferred must not fire too early", 0, x);
				test.assertEquals("foo must wait", 0, foo);
				test.assertEquals("bar must wait", 0, bar);
				$x.trigger('bar');
				test.assertEquals("deferred must still wait for foo", 0, x);
				test.assertEquals("foo must wait", 0, foo);
				test.assertEquals("bar must have fired", 1, bar);
				$x.trigger('foo');
				test.assertEquals("deferred must have fired", 1, x);
				test.assertEquals("foo must have fired", 1, foo);
				test.assertEquals("bar must not change", 1, bar);
				test.done();
			},

		},
		
		"single loops": {
				
			"$.when(tic.repeat()).done(callback) + tic.until(true)" : function($,test) {
				var tic = $.repeat();
				var x = 0;
				$.when(tic).done(function(){ x++; });
				test.assertEquals("deferred must not fire too early", 0, x);
				tic.then();
				test.assertEquals("deferred must still wait", 0, x);
				tic.until(true);
				test.assertEquals("deferred must have fired", 1, x);
				test.done();
			},

			"$.when(tic.each()).done(callback) + tic.all()" : function($,test) {
				var tic = test.element('<div>').each();
				var x = 0;
				$.when(tic).done(function(){ x++; });
				test.assertEquals("deferred must not fire too early", 0, x);
				tic.then();
				test.assertEquals("deferred must still wait", 0, x);
				tic.all();
				test.assertEquals("deferred must have fired", 1, x);
				test.done();
			},

		},

		"event handlers": {
			
			"$.when($some.click($)).done(callback) + $some.click()" : function($,test) {
				var $x = test.element('<div>');
				var tic = $x.click($);
				var x = 0;
				$.when(tic).done(function(){ x++; });
				test.assertEquals("deferred must not fire too early", 0, x);
				$x.click();
				test.assertEquals("deferred must have fired", 1, x);
				$x.click();
				test.assertEquals("deferred must not fire again", 1, x);
				$.when(tic).done(function(){ x++; });
				test.assertEquals("new deferred must fire", 2, x);
				test.done();
			},

			"$.when($some.one(event)).done(callback) + $some.trigger(event)" : function($,test) {
				var $x = test.element('<div>');
				var tic = $x.one('foobar');
				var x = 0;
				$.when(tic).done(function(){ x++; });
				test.assertEquals("deferred must not fire too early", 0, x);
				$x.trigger('foobar');
				test.assertEquals("deferred must have fired", 1, x);
				$x.trigger('foobar');
				test.assertEquals("deferred must not fire again", 1, x);
				$.when(tic).done(function(){ x++; });
				test.assertEquals("new deferred must fire", 2, x);
				test.done();
			},

		},

	};