var suite = {
		
		_version: '1.2.4',
		
		"binding single event - classical style": {
		
			".one(event,handler) + .unbind(event)": function($, test) {
				var $x = $('<div>');
				var ev = 'myEvent';
				var x=0;
				function handler(){
					x++;
				}
				var $bind = $x.one(ev, handler);
				test.assertEquals("classical bind must return original jQuery object", $x, $bind);
				test.assertEquals("event not yet triggered", 0, x);
				$x.unbind(ev);
				test.assertEquals("event must not trigger on .unbind", 0, x);
				$x.trigger(ev);
				test.assertEquals("because of .unbind trigger must not happen", 0, x);
				$x.trigger(ev);
				test.assertEquals("still no trigger expected", 0, x);
				test.done();
			},

			".one(event,handler) + .unbind(event,handler)": function($, test) {
				var $x = $('<div>');
				var ev = 'myEvent';
				var x=0;
				function handler(){
					x++;
				}
				var $bind = $x.one(ev, handler);
				test.assertEquals("classical bind must return original jQuery object", $x, $bind);
				test.assertEquals("event not yet triggered", 0, x);
				$x.unbind(ev,handler);
				test.assertEquals("event must not trigger on .unbind", 0, x);
				$x.trigger(ev);
				test.assertEquals("because of .unbind trigger must not happen", 0, x);
				$x.trigger(ev);
				test.assertEquals("still no trigger expected", 0, x);
				test.done();
			},

			".one(event,handler) + .unbind(event,otherHandler)": function($, test) {
				var $x = $('<div>');
				var ev = 'myEvent';
				var x=0;
				function handler(){
					x++;
				}
				var $bind = $x.one(ev, handler);
				test.assertEquals("classical bind must return original jQuery object", $x, $bind);
				test.assertEquals("event not yet triggered", 0, x);
				$x.unbind(ev, function(){x++;});
				test.assertEquals("event must not trigger on .unbind", 0, x);
				$x.trigger(ev);
				test.assertEquals("because of unbinding other handler trigger must happen", 1, x);
				$x.trigger(ev);
				test.assertEquals(".one only triggers once", 1, x);
				$x.trigger(ev);
				test.assertEquals("still no trigger expected", 1, x);
				test.done();
			},

			".one(event,handler) + .trigger(event) + .unbind(event)": function($, test) {
				var $x = $('<div>');
				var ev = 'myEvent';
				var x=0;
				function handler(){
					x++;
				}
				var $bind = $x.one(ev, handler);
				test.assertEquals("classical bind must return original jQuery object", $x, $bind);
				test.assertEquals("event not yet triggered", 0, x);
				$x.trigger(ev);
				test.assertEquals("first trigger should fire", 1, x);
				$x.unbind(ev);
				test.assertEquals("event must not trigger on .unbind", 1, x);
				$x.trigger(ev);
				test.assertEquals(".one only triggers once", 1, x);
				$x.trigger(ev);
				test.assertEquals("still no trigger expected", 1, x);
				test.done();
			},

			".one(event,handler) + .trigger(event) + .unbind(event,handler)": function($, test) {
				var $x = $('<div>');
				var ev = 'myEvent';
				var x=0;
				function handler(){
					x++;
				}
				var $bind = $x.one(ev, handler);
				test.assertEquals("classical bind must return original jQuery object", $x, $bind);
				test.assertEquals("event not yet triggered", 0, x);
				$x.trigger(ev);
				test.assertEquals("first trigger should fire", 1, x);
				$x.unbind(ev, handler);
				test.assertEquals("event must not trigger on .unbind", 1, x);
				$x.trigger(ev);
				test.assertEquals(".one only triggers once", 1, x);
				$x.trigger(ev);
				test.assertEquals("still no trigger expected", 1, x);
				test.done();
			},
			
			".one(event,handler) + .trigger(event) + .unbind(event,otherHandler)": function($, test) {
				var $x = $('<div>');
				var ev = 'myEvent';
				var x=0;
				function handler(){
					x++;
				}
				var $bind = $x.one(ev, handler);
				test.assertEquals("classical bind must return original jQuery object", $x, $bind);
				test.assertEquals("event not yet triggered", 0, x);
				$x.trigger(ev);
				test.assertEquals("first trigger should fire", 1, x);
				$x.unbind(ev, function(){x++;});
				test.assertEquals("event must not trigger on .unbind", 1, x);
				$x.trigger(ev);
				test.assertEquals(".one only triggers once", 1, x);
				$x.trigger(ev);
				test.assertEquals("still no trigger expected", 1, x);
				test.done();
			},

		},

		"binding multiple events - classical style": {
			
			".one({ev1:h1, e2:h2}) + .unbind(ev1)|1.4": function($, test) {
				var $x = $('<div>');
				var x=0, y=0;
				function handler1(){
					x++;
				}
				function handler2(){
					y++;
				}
				var $bind = $x.one({ev1:handler1, ev2:handler2});
				test.assertEquals("classical bind must return original jQuery object", $x, $bind);
				test.assertEquals("ev1 not yet triggered", 0, x);
				test.assertEquals("ev2 not yet triggered", 0, y);
				$x.unbind('ev1');
				test.assertEquals("ev1 must not trigger on .unbind", 0, x);
				test.assertEquals("ev2 must not trigger on .unbind", 0, x);
				$x.trigger('ev1');
				test.assertEquals("because of .unbind trigger must not happen", 0, x);
				$x.trigger('ev2');
				test.assertEquals("ev2 should be triggered separately", 1, y);
				$x.trigger('ev1');
				test.assertEquals("ev1 still not expected to trigger", 0, x);
				$x.trigger('ev2');
				test.assertEquals("ev2 should not triggered again - only once", 1, y);
				test.done();
			},

			".one({ev1:h1, e2:h2}) + .unbind(ev1,h1)|1.4": function($, test) {
				var $x = $('<div>');
				var x=0, y=0;
				function handler1(){
					x++;
				}
				function handler2(){
					y++;
				}
				var $bind = $x.one({ev1:handler1, ev2:handler2});
				test.assertEquals("classical bind must return original jQuery object", $x, $bind);
				test.assertEquals("ev1 not yet triggered", 0, x);
				test.assertEquals("ev2 not yet triggered", 0, y);
				$x.unbind('ev1',handler1);
				test.assertEquals("ev1 must not trigger on .unbind", 0, x);
				test.assertEquals("ev2 must not trigger on .unbind", 0, x);
				$x.trigger('ev1');
				test.assertEquals("because of .unbind trigger must not happen", 0, x);
				$x.trigger('ev2');
				test.assertEquals("ev2 should be triggered separately", 1, y);
				$x.trigger('ev1');
				test.assertEquals("ev1 still not expected to trigger", 0, x);
				$x.trigger('ev2');
				test.assertEquals("ev2 should not triggered again - only once", 1, y);
				test.done();
			},

			".one('ev1 ev2',handler) + .unbind(ev2)": function($, test) {
				var $x = $('<div>');
				var x=0;
				function handler(){
					x++;
				}
				var $bind = $x.one('ev1 ev2',handler);
				test.assertEquals("classical bind must return original jQuery object", $x, $bind);
				test.assertEquals("ev1 not yet triggered", 0, x);
				test.assertEquals("ev2 not yet triggered", 0, x);
				$x.unbind('ev2');
				test.assertEquals("ev1 must not trigger on .unbind", 0, x);
				test.assertEquals("ev2 must not trigger on .unbind", 0, x);
				$x.trigger('ev1');
				test.assertEquals("ev1 should be triggered", 1, x);
				$x.trigger('ev2');
				test.assertEquals("because of .unbind trigger must not happen", 1, x);
				$x.trigger('ev1');
				test.assertEquals("ev1 should not trigger again - only once", 1, x);
				$x.trigger('ev2');
				test.assertEquals("ev2 still not expected to trigger", 1, x);
				test.done();
			},

			".one('ev1 ev2',handler) + .unbind(ev2,handler)": function($, test) {
				var $x = $('<div>');
				var x=0;
				function handler(){
					x++;
				}
				var $bind = $x.one('ev1 ev2',handler);
				test.assertEquals("classical bind must return original jQuery object", $x, $bind);
				test.assertEquals("ev1 not yet triggered", 0, x);
				test.assertEquals("ev2 not yet triggered", 0, x);
				$x.unbind('ev2',handler);
				test.assertEquals("ev1 must not trigger on .unbind", 0, x);
				test.assertEquals("ev2 must not trigger on .unbind", 0, x);
				$x.trigger('ev1');
				test.assertEquals("ev1 should be triggered", 1, x);
				$x.trigger('ev2');
				test.assertEquals("because of .unbind trigger must not happen", 1, x);
				$x.trigger('ev1');
				test.assertEquals("ev1 should not trigger again - only once", 1, x);
				$x.trigger('ev2');
				test.assertEquals("ev2 still not expected to trigger", 1, x);
				test.done();
			},
			
		},

		"binding single event - timed invocation chain style": {
			
			".one(event).doSomething() + .trigger(event)": function($, test) {
				var $x = $('<div>');
				var ev = 'myEvent';
				var x=0;
				function handler(){
					x++;
					test.assertEquals("context object must be original", $x.get(0), this.get(0));
				}
				var $bind = $x.one(ev).then(handler);
				test.assertNotEquals("timed bind must return placeholder object", $x, $bind);
				test.assertEquals("event not yet triggered", 0, x);
				$x.trigger(ev);
				test.assertEquals("trigger should fire", 1, x);
				$x.trigger(ev);
				test.assertEquals("trigger should fire only once", 1, x);
				test.done();
			},

			".one(event).doSomething() + .trigger(event)": function($, test) {
				var $x = $('<div>');
				var ev = 'myEvent';
				var x=0;
				function handler(){
					x++;
					test.assertEquals("context object must be original", $x.get(0), this.get(0));
				}
				var $bind = $x.one(ev).then(handler);
				test.assertNotEquals("timed bind must return placeholder object", $x, $bind);
				test.assertEquals("event not yet triggered", 0, x);
				$x.unbind(ev).trigger(ev);
				test.assertEquals("trigger should not fire because of .unbind()", 0, x);
				test.done();
			},

			".one(event,$).doSomething() + .trigger(event)": function($, test) {
				var $x = $('<div>');
				var ev = 'myEvent';
				var x=0;
				function handler(){
					x++;
					test.assertEquals("context object must be original", $x.get(0), this.get(0));
				}
				var $bind = $x.one(ev,$).then(handler);
				test.assertNotEquals("timed bind must return placeholder object", $x, $bind);
				test.assertEquals("event not yet triggered", 0, x);
				$x.trigger(ev);
				test.assertEquals("trigger should fire", 1, x);
				$x.unbind(ev);
				test.assertEquals("event must not trigger on .unbind", 1, x);
				$x.trigger(ev);
				test.assertEquals("because of .unbind trigger must not happen again", 1, x);
				test.done();
			},

			".one(event).doSomething()._": function($, test) {
				var $x = $('<div>');
				var $bind = $x.one('myEvent',$).text('test');
				test.assertNotEquals("timed bind must return placeholder object", $x, $bind);
				var $y = $bind._;
				test.assertEquals("underscore must provide original object", $x, $y);
				test.done();
			},

		},

		"binding multiple events - timed invocation chain style": {
			
			".one('ev1 ev2').doSomething() + .trigger(ev1)": function($, test) {
				var $x = $('<div>');
				var x=0;
				function handler(){
					x++;
				}
				var $bind = $x.one('ev1 ev2').then(handler);
				test.assertNotEquals("timed bind must return placeholder object", $x, $bind);
				test.assertEquals("ev1 not yet triggered", 0, x);
				test.assertEquals("ev2 not yet triggered", 0, x);
				$x.unbind('ev2');
				test.assertEquals("ev1 must not trigger on .unbind", 0, x);
				test.assertEquals("ev2 must not trigger on .unbind", 0, x);
				$x.trigger('ev1');
				test.assertEquals("ev1 should be triggered", 1, x);
				$x.trigger('ev2');
				test.assertEquals("because of .unbind trigger must not happen", 1, x);
				$x.trigger('ev1');
				test.assertEquals("ev1 should not trigger again - only once", 1, x);
				$x.trigger('ev2');
				test.assertEquals("ev2 still not expected to trigger", 1, x);
				test.done();
			},

			".one('ev1 ev2',$).doSomething() + .trigger(ev1)": function($, test) {
				var $x = $('<div>');
				var x=0;
				function handler(){
					x++;
				}
				var $bind = $x.one('ev1 ev2',$).then(handler);
				test.assertNotEquals("timed bind must return placeholder object", $x, $bind);
				test.assertEquals("ev1 not yet triggered", 0, x);
				test.assertEquals("ev2 not yet triggered", 0, x);
				$x.unbind('ev2');
				test.assertEquals("ev1 must not trigger on .unbind", 0, x);
				test.assertEquals("ev2 must not trigger on .unbind", 0, x);
				$x.trigger('ev1');
				test.assertEquals("ev1 should be triggered", 1, x);
				$x.trigger('ev2');
				test.assertEquals("because of .unbind trigger must not happen", 1, x);
				$x.trigger('ev1');
				test.assertEquals("ev1 should not trigger again - only once", 1, x);
				$x.trigger('ev2');
				test.assertEquals("ev2 still not expected to trigger", 1, x);
				test.done();
			},

			".one('ev1 ev2').doSomething()._": function($, test) {
				var $x = $('<div>');
				var $bind = $x.one('ev1 ev2',$).text('test');
				test.assertNotEquals("timed bind must return placeholder object", $x, $bind);
				var $y = $bind._;
				test.assertEquals("underscore must provide original object", $x, $y);
				test.done();
			},

		},
		
};