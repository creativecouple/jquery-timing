tests[".live() functionality"] = {
		
		_version: ['1.3','1.8.0'],
		
		"binding single event - classical style": {
		
			".live(event,handler) + .die(event)": function($, test) {
				var clazz = "c" + test.guid();
				$('<div>').addClass(clazz).appendTo('body');
				var $x = test.element('div.'+clazz);
				var ev = 'myEvent';
				var x=0;
				function handler(){
					x++;
				}
				var $live = $x.live(ev, handler);
				test.assertEquals("classical bind must return original jQuery object", $x, $live);
				test.assertEquals("event not yet triggered", 0, x);
				$x.die(ev);
				test.assertEquals("event must not trigger on .die", 0, x);
				$x.trigger(ev);
				test.assertEquals("because of .die trigger must not happen", 0, x);
				$x.trigger(ev);
				test.assertEquals("still no trigger expected", 0, x);

				$('div.'+clazz).remove();
				test.done();
			},

			".live(event,handler) + .die(event,handler)": function($, test) {
				var clazz = "c" + test.guid();
				$('<div>').addClass(clazz).appendTo('body');
				var $x = test.element('div.'+clazz);
				var ev = 'myEvent';
				var x=0;
				function handler(){
					x++;
				}
				var $live = $x.live(ev, handler);
				test.assertEquals("classical bind must return original jQuery object", $x, $live);
				test.assertEquals("event not yet triggered", 0, x);
				$x.die(ev,handler);
				test.assertEquals("event must not trigger on .die", 0, x);
				$x.trigger(ev);
				test.assertEquals("because of .die trigger must not happen", 0, x);
				$x.trigger(ev);
				test.assertEquals("still no trigger expected", 0, x);

				$('div.'+clazz).remove();
				test.done();
			},

			".live(event,handler) + .die(event,otherHandler)": function($, test) {
				var clazz = "c" + test.guid();
				$('<div>').addClass(clazz).appendTo('body');
				var $x = test.element('div.'+clazz);
				var ev = 'myEvent';
				var x=0;
				function handler(){
					x++;
				}
				var $live = $x.live(ev, handler);
				test.assertEquals("classical bind must return original jQuery object", $x, $live);
				test.assertEquals("event not yet triggered", 0, x);
				$x.die(ev, function(){x++;});
				test.assertEquals("event must not trigger on .die", 0, x);
				$x.trigger(ev);
				test.assertEquals("because of unbinding other handler trigger must happen", 1, x);
				$x.trigger(ev);
				test.assertEquals("still trigger expected", 2, x);

				$('div.'+clazz).remove();
				test.done();
			},

			".live(event,handler) + .trigger(event) + .die(event)": function($, test) {
				var clazz = "c" + test.guid();
				$('<div>').addClass(clazz).appendTo('body');
				var $x = test.element('div.'+clazz);
				var ev = 'myEvent';
				var x=0;
				function handler(){
					x++;
				}
				var $live = $x.live(ev, handler);
				test.assertEquals("classical bind must return original jQuery object", $x, $live);
				test.assertEquals("event not yet triggered", 0, x);
				$x.trigger(ev);
				test.assertEquals("first trigger should fire", 1, x);
				$x.die(ev);
				test.assertEquals("event must not trigger on .die", 1, x);
				$x.trigger(ev);
				test.assertEquals("because of .die trigger must not happen", 1, x);
				$x.trigger(ev);
				test.assertEquals("still no trigger expected", 1, x);

				$('div.'+clazz).remove();
				test.done();
			},

			".live(event,handler) + .trigger(event) + .die(event,handler)": function($, test) {
				var clazz = "c" + test.guid();
				$('<div>').addClass(clazz).appendTo('body');
				var $x = test.element('div.'+clazz);
				var ev = 'myEvent';
				var x=0;
				function handler(){
					x++;
				}
				var $live = $x.live(ev, handler);
				test.assertEquals("classical bind must return original jQuery object", $x, $live);
				test.assertEquals("event not yet triggered", 0, x);
				$x.trigger(ev);
				test.assertEquals("first trigger should fire", 1, x);
				$x.die(ev, handler);
				test.assertEquals("event must not trigger on .die", 1, x);
				$x.trigger(ev);
				test.assertEquals("because of .die trigger must not happen", 1, x);
				$x.trigger(ev);
				test.assertEquals("still no trigger expected", 1, x);

				$('div.'+clazz).remove();
				test.done();
			},
			
			".live(event,handler) + .trigger(event) + .die(event,otherHandler)": function($, test) {
				var clazz = "c" + test.guid();
				$('<div>').addClass(clazz).appendTo('body');
				var $x = test.element('div.'+clazz);
				var ev = 'myEvent';
				var x=0;
				function handler(){
					x++;
				}
				var $live = $x.live(ev, handler);
				test.assertEquals("classical bind must return original jQuery object", $x, $live);
				test.assertEquals("event not yet triggered", 0, x);
				$x.trigger(ev);
				test.assertEquals("first trigger should fire", 1, x);
				$x.die(ev, function(){x++;});
				test.assertEquals("event must not trigger on .die", 1, x);
				$x.trigger(ev);
				test.assertEquals("because of unbinding other handler trigger must happen", 2, x);
				$x.trigger(ev);
				test.assertEquals("still trigger expected", 3, x);

				$('div.'+clazz).remove();
				test.done();
			},

		},

		"binding single event with data - classical style": {
			
			_version: ['1.4.0'],
			
			".live(event,data,handler) + .die(event)": function($, test) {
				var clazz = "c" + test.guid();
				$('<div>').addClass(clazz).appendTo('body');
				var $x = test.element('div.'+clazz);
				var ev = 'myEvent';
				var x=0;
				function handler(event){
					x++;
					test.assertEquals("event data must be passed", true, event.data.prop);
				}
				var $live = $x.live(ev, {prop: true}, handler);
				test.assertEquals("classical bind must return original jQuery object", $x, $live);
				test.assertEquals("event not yet triggered", 0, x);
				$x.die(ev);
				test.assertEquals("event must not trigger on .die", 0, x);
				$x.trigger(ev);
				test.assertEquals("because of .die trigger must not happen", 0, x);
				$x.trigger(ev);
				test.assertEquals("still no trigger expected", 0, x);

				$('div.'+clazz).remove();
				test.done();
			},

			".live(event,data,handler) + .die(event,handler)": function($, test) {
				var clazz = "c" + test.guid();
				$('<div>').addClass(clazz).appendTo('body');
				var $x = test.element('div.'+clazz);
				var ev = 'myEvent';
				var x=0;
				function handler(event){
					x++;
					test.assertEquals("event data must be passed", true, event.data.prop);
				}
				var $live = $x.live(ev, {prop: true}, handler);
				test.assertEquals("classical bind must return original jQuery object", $x, $live);
				test.assertEquals("event not yet triggered", 0, x);
				$x.die(ev,handler);
				test.assertEquals("event must not trigger on .die", 0, x);
				$x.trigger(ev);
				test.assertEquals("because of .die trigger must not happen", 0, x);
				$x.trigger(ev);
				test.assertEquals("still no trigger expected", 0, x);

				$('div.'+clazz).remove();
				test.done();
			},

			".live(event,data,handler) + .trigger(event) + .die(event,otherHandler)": function($, test) {
				var clazz = "c" + test.guid();
				$('<div>').addClass(clazz).appendTo('body');
				var $x = test.element('div.'+clazz);
				var ev = 'myEvent';
				var x=0;
				function handler(event){
					x++;
					test.assertEquals("event data must be passed", true, event.data.prop);
				}
				var $live = $x.live(ev, {prop: true}, handler);
				test.assertEquals("classical bind must return original jQuery object", $x, $live);
				test.assertEquals("event not yet triggered", 0, x);
				$x.trigger(ev);
				test.assertEquals("first trigger should fire", 1, x);
				$x.die(ev, function(){x++;});
				test.assertEquals("event must not trigger on .die", 1, x);
				$x.trigger(ev);
				test.assertEquals("because of unbinding other handler trigger must happen", 2, x);
				$x.trigger(ev);
				test.assertEquals("still trigger expected", 3, x);

				$('div.'+clazz).remove();
				test.done();
			},

			".live(event,data,handler) + .trigger(event) + .die(event,handler)": function($, test) {
				var clazz = "c" + test.guid();
				$('<div>').addClass(clazz).appendTo('body');
				var $x = test.element('div.'+clazz);
				var ev = 'myEvent';
				var x=0;
				function handler(event){
					x++;
					test.assertEquals("event data must be passed", true, event.data.prop);
				}
				var $live = $x.live(ev, {prop: true}, handler);
				test.assertEquals("classical bind must return original jQuery object", $x, $live);
				test.assertEquals("event not yet triggered", 0, x);
				$x.trigger(ev);
				test.assertEquals("first trigger should fire", 1, x);
				$x.die(ev, handler);
				test.assertEquals("event must not trigger on .die", 1, x);
				$x.trigger(ev);
				test.assertEquals("because of .die trigger must not happen", 1, x);
				$x.trigger(ev);
				test.assertEquals("still no trigger expected", 1, x);

				$('div.'+clazz).remove();
				test.done();
			},
			
			".live(event,data,handler) + .trigger(event) + .die(event)": function($, test) {
				var clazz = "c" + test.guid();
				$('<div>').addClass(clazz).appendTo('body');
				var $x = test.element('div.'+clazz);
				var ev = 'myEvent';
				var x=0;
				function handler(event){
					x++;
					test.assertEquals("event data must be passed", true, event.data.prop);
				}
				var $live = $x.live(ev, {prop: true}, handler);
				test.assertEquals("classical bind must return original jQuery object", $x, $live);
				test.assertEquals("event not yet triggered", 0, x);
				$x.trigger(ev);
				test.assertEquals("first trigger should fire", 1, x);
				$x.die(ev);
				test.assertEquals("event must not trigger on .die", 1, x);
				$x.trigger(ev);
				test.assertEquals("because of .die trigger must not happen", 1, x);
				$x.trigger(ev);
				test.assertEquals("still no trigger expected", 1, x);

				$('div.'+clazz).remove();
				test.done();
			},

			".live(event,data,handler) + .die(event,otherHandler)": function($, test) {
				var clazz = "c" + test.guid();
				$('<div>').addClass(clazz).appendTo('body');
				var $x = test.element('div.'+clazz);
				var ev = 'myEvent';
				var x=0;
				function handler(event){
					x++;
					test.assertEquals("event data must be passed", true, event.data.prop);
				}
				var $live = $x.live(ev, {prop: true}, handler);
				test.assertEquals("classical bind must return original jQuery object", $x, $live);
				test.assertEquals("event not yet triggered", 0, x);
				$x.die(ev, function(){x++;});
				test.assertEquals("event must not trigger on .die", 0, x);
				$x.trigger(ev);
				test.assertEquals("because of unbinding other handler trigger must happen", 1, x);
				$x.trigger(ev);
				test.assertEquals("still trigger expected", 2, x);

				$('div.'+clazz).remove();
				test.done();
			},

		},

		"binding multiple events - classical style": {
			
			_version: ['1.4.3'],
			
			".live({ev1:h1, e2:h2}) + .die(ev1)": function($, test) {
				var clazz = "c" + test.guid();
				$('<div>').addClass(clazz).appendTo('body');
				var $x = test.element('div.'+clazz);
				var x=0, y=0;
				function handler1(){
					x++;
				}
				function handler2(){
					y++;
				}
				var $live = $x.live({ev1:handler1, ev2:handler2});
				test.assertEquals("classical bind must return original jQuery object", $x, $live);
				test.assertEquals("ev1 not yet triggered", 0, x);
				test.assertEquals("ev2 not yet triggered", 0, y);
				$x.die('ev1');
				test.assertEquals("ev1 must not trigger on .die", 0, x);
				test.assertEquals("ev2 must not trigger on .die", 0, x);
				$x.trigger('ev1');
				test.assertEquals("because of .die trigger must not happen", 0, x);
				$x.trigger('ev2');
				test.assertEquals("ev2 should be triggered separately", 1, y);
				$x.trigger('ev1');
				test.assertEquals("ev1 still not expected to trigger", 0, x);
				$x.trigger('ev2');
				test.assertEquals("ev2 should be triggered again", 2, y);

				$('div.'+clazz).remove();
				test.done();
			},

			".live({ev1:h1, e2:h2},data) + .die(ev1)": function($, test) {
				var clazz = "c" + test.guid();
				$('<div>').addClass(clazz).appendTo('body');
				var $x = test.element('div.'+clazz);
				var x=0, y=0;
				function handler1(event){
					x++;
					test.assertEquals("event data must be passed", true, event.data.prop);
				}
				function handler2(event){
					y++;
					test.assertEquals("event data must be passed", true, event.data.prop);
				}
				var $live = $x.live({ev1:handler1, ev2:handler2}, {prop: true});
				test.assertEquals("classical bind must return original jQuery object", $x, $live);
				test.assertEquals("ev1 not yet triggered", 0, x);
				test.assertEquals("ev2 not yet triggered", 0, y);
				$x.die('ev1');
				test.assertEquals("ev1 must not trigger on .die", 0, x);
				test.assertEquals("ev2 must not trigger on .die", 0, x);
				$x.trigger('ev1');
				test.assertEquals("because of .die trigger must not happen", 0, x);
				$x.trigger('ev2');
				test.assertEquals("ev2 should be triggered separately", 1, y);
				$x.trigger('ev1');
				test.assertEquals("ev1 still not expected to trigger", 0, x);
				$x.trigger('ev2');
				test.assertEquals("ev2 should be triggered again", 2, y);

				$('div.'+clazz).remove();
				test.done();
			},

			".live('ev1 ev2',handler) + .die(ev2)": function($, test) {
				var clazz = "c" + test.guid();
				$('<div>').addClass(clazz).appendTo('body');
				var $x = test.element('div.'+clazz);
				var x=0;
				var $live = $x.live('ev1 ev2', function(){ x++; });
				test.assertEquals("classical bind must return original jQuery object", $x, $live);
				test.assertEquals("ev1 not yet triggered", 0, x);
				test.assertEquals("ev2 not yet triggered", 0, x);
				$x.die('ev2');
				test.assertEquals("ev1 must not trigger on .die", 0, x);
				test.assertEquals("ev2 must not trigger on .die", 0, x);
				$x.trigger('ev1');
				test.assertEquals("ev1 should be triggered", 1, x);
				$x.trigger('ev2');
				test.assertEquals("because of .die trigger must not happen", 1, x);
				$x.trigger('ev1');
				test.assertEquals("ev1 should be triggered again", 2, x);
				$x.trigger('ev2');
				test.assertEquals("ev2 still not expected to trigger", 2, x);

				$('div.'+clazz).remove();
				test.done();
			},

			".live('ev1 ev2',data,handler) + .die(ev2)": function($, test) {
				var clazz = "c" + test.guid();
				$('<div>').addClass(clazz).appendTo('body');
				var $x = test.element('div.'+clazz);
				var x=0;
				function handler(event){
					x++;
					test.assertEquals("event data must be passed", true, event.data.prop);
				}
				var $live = $x.live('ev1 ev2', {prop: true}, handler);
				test.assertEquals("classical bind must return original jQuery object", $x, $live);
				test.assertEquals("ev1 not yet triggered", 0, x);
				test.assertEquals("ev2 not yet triggered", 0, x);
				$x.die('ev2');
				test.assertEquals("ev1 must not trigger on .die", 0, x);
				test.assertEquals("ev2 must not trigger on .die", 0, x);
				$x.trigger('ev1');
				test.assertEquals("ev1 should be triggered", 1, x);
				$x.trigger('ev2');
				test.assertEquals("because of .die trigger must not happen", 1, x);
				$x.trigger('ev1');
				test.assertEquals("ev1 should be triggered again", 2, x);
				$x.trigger('ev2');
				test.assertEquals("ev2 still not expected to trigger", 2, x);

				$('div.'+clazz).remove();
				test.done();
			},
			
		},

		"binding single event - timed invocation chain style": {
			
			".live(event).doSomething() + .trigger(event)": function($, test) {
				var clazz = "c" + test.guid();
				$('<div>').addClass(clazz).appendTo('body');
				var $x = test.element('div.'+clazz);
				var ev = 'myEvent';
				var x=0;
				function handler(){
					x++;
					test.assertEquals("context object must be original", $x.get(0), this.get(0));
				}
				var $live = $x.live(ev).then(handler);
				test.assertNotEquals("timed bind must return placeholder object", $x, $live);
				test.assertEquals("event not yet triggered", 0, x);
				$x.trigger(ev);
				test.assertEquals("trigger should fire", 1, x);
				$x.die(ev);
				test.assertEquals("event must not trigger on .die", 1, x);
				$x.trigger(ev);
				test.assertEquals("because of .die trigger must not happen again", 1, x);

				$('div.'+clazz).remove();
				test.done();
			},

			".live(event,$).doSomething() + .trigger(event)": function($, test) {
				var clazz = "c" + test.guid();
				$('<div>').addClass(clazz).appendTo('body');
				var $x = test.element('div.'+clazz);
				var ev = 'myEvent';
				var x=0;
				function handler(){
					x++;
					test.assertEquals("context object must be original", $x.get(0), this.get(0));
				}
				var $live = $x.live(ev,$).then(handler);
				test.assertNotEquals("timed bind must return placeholder object", $x, $live);
				test.assertEquals("event not yet triggered", 0, x);
				$x.trigger(ev);
				test.assertEquals("trigger should fire", 1, x);
				$x.die(ev);
				test.assertEquals("event must not trigger on .die", 1, x);
				$x.trigger(ev);
				test.assertEquals("because of .die trigger must not happen again", 1, x);

				$('div.'+clazz).remove();
				test.done();
			},

			".live(event).doSomething()._": function($, test) {
				var clazz = "c" + test.guid();
				$('<div>').addClass(clazz).appendTo('body');
				var $x = test.element('div.'+clazz);
				var $live = $x.live('myEvent',$).text('test');
				test.assertNotEquals("timed bind must return placeholder object", $x, $live);
				var $y = $live._;
				test.assertEquals("underscore must provide original object", $x, $y);

				$('div.'+clazz).remove();
				test.done();
			},

		},

		"binding multiple events - timed invocation chain style": {
			
			_version: ['1.4.3'],
			
			".live('ev1 ev2').doSomething() + .trigger(ev1)": function($, test) {
				var clazz = "c" + test.guid();
				$('<div>').addClass(clazz).appendTo('body');
				var $x = test.element('div.'+clazz);
				var x=0;
				function handler(){
					x++;
				}
				var $live = $x.live('ev1 ev2').then(handler);
				test.assertNotEquals("timed bind must return placeholder object", $x, $live);
				test.assertEquals("ev1 not yet triggered", 0, x);
				test.assertEquals("ev2 not yet triggered", 0, x);
				$x.die('ev2');
				test.assertEquals("ev1 must not trigger on .die", 0, x);
				test.assertEquals("ev2 must not trigger on .die", 0, x);
				$x.trigger('ev1');
				test.assertEquals("ev1 should be triggered", 1, x);
				$x.trigger('ev2');
				test.assertEquals("because of .die trigger must not happen", 1, x);
				$x.trigger('ev1');
				test.assertEquals("ev1 should be triggered again", 2, x);
				$x.trigger('ev2');
				test.assertEquals("ev2 still not expected to trigger", 2, x);

				$('div.'+clazz).remove();
				test.done();
			},

			".live('ev1 ev2',$).doSomething() + .trigger(ev1)": function($, test) {
				var clazz = "c" + test.guid();
				$('<div>').addClass(clazz).appendTo('body');
				var $x = test.element('div.'+clazz);
				var x=0;
				function handler(){
					x++;
				}
				var $live = $x.live('ev1 ev2',$).then(handler);
				test.assertNotEquals("timed bind must return placeholder object", $x, $live);
				test.assertEquals("ev1 not yet triggered", 0, x);
				test.assertEquals("ev2 not yet triggered", 0, x);
				$x.die('ev2');
				test.assertEquals("ev1 must not trigger on .die", 0, x);
				test.assertEquals("ev2 must not trigger on .die", 0, x);
				$x.trigger('ev1');
				test.assertEquals("ev1 should be triggered", 1, x);
				$x.trigger('ev2');
				test.assertEquals("because of .die trigger must not happen", 1, x);
				$x.trigger('ev1');
				test.assertEquals("ev1 should be triggered again", 2, x);
				$x.trigger('ev2');
				test.assertEquals("ev2 still not expected to trigger", 2, x);

				$('div.'+clazz).remove();
				test.done();
			},

			".live('ev1 ev2').doSomething()._": function($, test) {
				var clazz = "c" + test.guid();
				$('<div>').addClass(clazz).appendTo('body');
				var $x = test.element('div.'+clazz);
				var $live = $x.live('ev1 ev2',$).text('test');
				test.assertNotEquals("timed bind must return placeholder object", $x, $live);
				var $y = $live._;
				test.assertEquals("underscore must provide original object", $x, $y);

				$('div.'+clazz).remove();
				test.done();
			},

		},
		
};