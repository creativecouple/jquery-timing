tests[".bind() functionality"] = {
		
		_version: ['1.0','1.8.0'],
		
		"binding single event - classical style": {
		
			".bind(event,handler) + .unbind(event)": function($, test) {
				var $x = test.element('<div>');
				var ev = 'myEvent';
				var x=0;
				function handler(){
					x++;
				}
				var $bind = $x.bind(ev, handler);
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

			".bind(event,data,handler) + .unbind(event)": function($, test) {
				var $x = test.element('<div>');
				var ev = 'myEvent';
				var x=0;
				function handler(event){
					x++;
					test.assertEquals("event data must be passed", true, event.data.prop);
				}
				var $bind = $x.bind(ev, {prop: true}, handler);
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

			".bind(event,handler) + .unbind(event,handler)": function($, test) {
				var $x = test.element('<div>');
				var ev = 'myEvent';
				var x=0;
				function handler(){
					x++;
				}
				var $bind = $x.bind(ev, handler);
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

			".bind(event,data,handler) + .unbind(event,handler)": function($, test) {
				var $x = test.element('<div>');
				var ev = 'myEvent';
				var x=0;
				function handler(event){
					x++;
					test.assertEquals("event data must be passed", true, event.data.prop);
				}
				var $bind = $x.bind(ev, {prop: true}, handler);
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

			".bind(event,handler) + .unbind(event,otherHandler)": function($, test) {
				var $x = test.element('<div>');
				var ev = 'myEvent';
				var x=0;
				function handler(){
					x++;
				}
				var $bind = $x.bind(ev, handler);
				test.assertEquals("classical bind must return original jQuery object", $x, $bind);
				test.assertEquals("event not yet triggered", 0, x);
				$x.unbind(ev, function(){x++;});
				test.assertEquals("event must not trigger on .unbind", 0, x);
				$x.trigger(ev);
				test.assertEquals("because of unbinding other handler trigger must happen", 1, x);
				$x.trigger(ev);
				test.assertEquals("still trigger expected", 2, x);
				test.done();
			},

			".bind(event,data,handler) + .unbind(event,otherHandler)": function($, test) {
				var $x = test.element('<div>');
				var ev = 'myEvent';
				var x=0;
				function handler(event){
					x++;
					test.assertEquals("event data must be passed", true, event.data.prop);
				}
				var $bind = $x.bind(ev, {prop: true}, handler);
				test.assertEquals("classical bind must return original jQuery object", $x, $bind);
				test.assertEquals("event not yet triggered", 0, x);
				$x.unbind(ev, function(){x++;});
				test.assertEquals("event must not trigger on .unbind", 0, x);
				$x.trigger(ev);
				test.assertEquals("because of unbinding other handler trigger must happen", 1, x);
				$x.trigger(ev);
				test.assertEquals("still trigger expected", 2, x);
				test.done();
			},

			".bind(event,handler) + .trigger(event) + .unbind(event)": function($, test) {
				var $x = test.element('<div>');
				var ev = 'myEvent';
				var x=0;
				function handler(){
					x++;
				}
				var $bind = $x.bind(ev, handler);
				test.assertEquals("classical bind must return original jQuery object", $x, $bind);
				test.assertEquals("event not yet triggered", 0, x);
				$x.trigger(ev);
				test.assertEquals("first trigger should fire", 1, x);
				$x.unbind(ev);
				test.assertEquals("event must not trigger on .unbind", 1, x);
				$x.trigger(ev);
				test.assertEquals("because of .unbind trigger must not happen", 1, x);
				$x.trigger(ev);
				test.assertEquals("still no trigger expected", 1, x);
				test.done();
			},

			".bind(event,data,handler) + .trigger(event) + .unbind(event)": function($, test) {
				var $x = test.element('<div>');
				var ev = 'myEvent';
				var x=0;
				function handler(event){
					x++;
					test.assertEquals("event data must be passed", true, event.data.prop);
				}
				var $bind = $x.bind(ev, {prop: true}, handler);
				test.assertEquals("classical bind must return original jQuery object", $x, $bind);
				test.assertEquals("event not yet triggered", 0, x);
				$x.trigger(ev);
				test.assertEquals("first trigger should fire", 1, x);
				$x.unbind(ev);
				test.assertEquals("event must not trigger on .unbind", 1, x);
				$x.trigger(ev);
				test.assertEquals("because of .unbind trigger must not happen", 1, x);
				$x.trigger(ev);
				test.assertEquals("still no trigger expected", 1, x);
				test.done();
			},

			".bind(event,handler) + .trigger(event) + .unbind(event,handler)": function($, test) {
				var $x = test.element('<div>');
				var ev = 'myEvent';
				var x=0;
				function handler(){
					x++;
				}
				var $bind = $x.bind(ev, handler);
				test.assertEquals("classical bind must return original jQuery object", $x, $bind);
				test.assertEquals("event not yet triggered", 0, x);
				$x.trigger(ev);
				test.assertEquals("first trigger should fire", 1, x);
				$x.unbind(ev, handler);
				test.assertEquals("event must not trigger on .unbind", 1, x);
				$x.trigger(ev);
				test.assertEquals("because of .unbind trigger must not happen", 1, x);
				$x.trigger(ev);
				test.assertEquals("still no trigger expected", 1, x);
				test.done();
			},
			
			".bind(event,data,handler) + .trigger(event) + .unbind(event,handler)": function($, test) {
				var $x = test.element('<div>');
				var ev = 'myEvent';
				var x=0;
				function handler(event){
					x++;
					test.assertEquals("event data must be passed", true, event.data.prop);
				}
				var $bind = $x.bind(ev, {prop: true}, handler);
				test.assertEquals("classical bind must return original jQuery object", $x, $bind);
				test.assertEquals("event not yet triggered", 0, x);
				$x.trigger(ev);
				test.assertEquals("first trigger should fire", 1, x);
				$x.unbind(ev, handler);
				test.assertEquals("event must not trigger on .unbind", 1, x);
				$x.trigger(ev);
				test.assertEquals("because of .unbind trigger must not happen", 1, x);
				$x.trigger(ev);
				test.assertEquals("still no trigger expected", 1, x);
				test.done();
			},
			
			".bind(event,handler) + .trigger(event) + .unbind(event,otherHandler)": function($, test) {
				var $x = test.element('<div>');
				var ev = 'myEvent';
				var x=0;
				function handler(){
					x++;
				}
				var $bind = $x.bind(ev, handler);
				test.assertEquals("classical bind must return original jQuery object", $x, $bind);
				test.assertEquals("event not yet triggered", 0, x);
				$x.trigger(ev);
				test.assertEquals("first trigger should fire", 1, x);
				$x.unbind(ev, function(){x++;});
				test.assertEquals("event must not trigger on .unbind", 1, x);
				$x.trigger(ev);
				test.assertEquals("because of unbinding other handler trigger must happen", 2, x);
				$x.trigger(ev);
				test.assertEquals("still trigger expected", 3, x);
				test.done();
			},

			".bind(event,data,handler) + .trigger(event) + .unbind(event,otherHandler)": function($, test) {
				var $x = test.element('<div>');
				var ev = 'myEvent';
				var x=0;
				function handler(event){
					x++;
					test.assertEquals("event data must be passed", true, event.data.prop);
				}
				var $bind = $x.bind(ev, {prop: true}, handler);
				test.assertEquals("classical bind must return original jQuery object", $x, $bind);
				test.assertEquals("event not yet triggered", 0, x);
				$x.trigger(ev);
				test.assertEquals("first trigger should fire", 1, x);
				$x.unbind(ev, function(){x++;});
				test.assertEquals("event must not trigger on .unbind", 1, x);
				$x.trigger(ev);
				test.assertEquals("because of unbinding other handler trigger must happen", 2, x);
				$x.trigger(ev);
				test.assertEquals("still trigger expected", 3, x);
				test.done();
			},

		},

		"binding multiple events - classical style": {
			
			".bind({ev1:h1, e2:h2}) + .unbind(ev1)|1.4": function($, test) {
				var $x = test.element('<div>');
				var x=0, y=0;
				function handler1(){
					x++;
				}
				function handler2(){
					y++;
				}
				var $bind = $x.bind({ev1:handler1, ev2:handler2});
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
				test.assertEquals("ev2 should be triggered again", 2, y);
				test.done();
			},

			".bind({ev1:h1, e2:h2},data) + .unbind(ev1)|1.7.2": function($, test) {
				var $x = test.element('<div>');
				var x=0, y=0;
				function handler1(event){
					x++;
					test.assertEquals("event data must be passed", true, event.data.prop);
				}
				function handler2(event){
					y++;
					test.assertEquals("event data must be passed", true, event.data.prop);
				}
				var $bind = $x.bind({ev1:handler1, ev2:handler2}, {prop: true});
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
				test.assertEquals("ev2 should be triggered again", 2, y);
				test.done();
			},

			".bind('ev1 ev2',handler) + .unbind(ev2)": function($, test) {
				var $x = test.element('<div>');
				var x=0;
				var $bind = $x.bind('ev1 ev2', function(){ x++; });
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
				test.assertEquals("ev1 should be triggered again", 2, x);
				$x.trigger('ev2');
				test.assertEquals("ev2 still not expected to trigger", 2, x);
				test.done();
			},

			".bind('ev1 ev2',data,handler) + .unbind(ev2)": function($, test) {
				var $x = test.element('<div>');
				var x=0;
				function handler(event){
					x++;
					test.assertEquals("event data must be passed", true, event.data.prop);
				}
				var $bind = $x.bind('ev1 ev2', {prop: true}, handler);
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
				test.assertEquals("ev1 should be triggered again", 2, x);
				$x.trigger('ev2');
				test.assertEquals("ev2 still not expected to trigger", 2, x);
				test.done();
			},
			
		},

		"binding single event - timed invocation chain style": {
			
			".bind(event).doSomething() + .trigger(event)": function($, test) {
				var $x = test.element('<div>');
				var ev = 'myEvent';
				var x=0;
				function handler(){
					x++;
					test.assertEquals("context object must be original", $x.get(0), this.get(0));
					test.assertNotEquals("context must not be original", $x, this);
					test.assertEquals("previous context must be original", $x, this.end());
				}
				var $bind = $x.bind(ev).then(handler);
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

			".bind(event).doSomething() + .trigger(event) + .doSomething() + .trigger(event) + .doSomething()": function($, test) {
				var $x = test.element('<div>');
				var ev = 'myEvent';
				var x=0;
				var d=null;
				function handler(evt){
					test.assertEquals("context object must be original", $x.get(0), this.get(0));
					test.assertNotEquals("triggered event parameter missing", null, evt && evt[0]);
					x++;
					d=evt[0];
				}
				var $bind = $x.bind(ev).then(handler);
				test.assertNotEquals("timed bind must return placeholder object", $x, $bind);
				test.assertEquals("event not yet triggered", 0, x);
				$x.trigger(ev, ['first']);
				test.assertEquals("handler should fire once", 1, x);
				test.assertEquals("event data wrong", 'first', d);
				$bind.then(handler);
				test.assertEquals("handler should fire once again", 2, x); 
				test.assertEquals("event data wrong", 'first', d);
				$x.trigger(ev, ['second']);
				test.assertEquals("handler should fire twice on next trigger", 4, x);
				test.assertEquals("event data wrong", 'second', d);
				$bind.then(handler);
				test.assertEquals("handler should fire only once again", 5, x);
				test.assertEquals("event data wrong", 'second', d);
				test.done();
			},

			".bind(event,$).doSomething() + .trigger(event)": function($, test) {
				var $x = test.element('<div>');
				var ev = 'myEvent';
				var x=0;
				function handler(){
					x++;
					test.assertEquals("context object must be original", $x.get(0), this.get(0));
				}
				var $bind = $x.bind(ev,$).then(handler);
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

			".bind(event,$).doSomething() + .trigger(event) + .doSomething() + .trigger(event) + .doSomething()": function($, test) {
				var $x = test.element('<div>');
				var ev = 'myEvent';
				var x=0;
				var d=null;
				function handler(evt){
					test.assertEquals("context object must be original", $x.get(0), this.get(0));
					test.assertNotEquals("triggered event parameter missing", null, evt && evt[0]);
					x++;
					d=evt[0];
				}
				var $bind = $x.bind(ev,$).then(handler);
				test.assertNotEquals("timed bind must return placeholder object", $x, $bind);
				test.assertEquals("event not yet triggered", 0, x);
				$x.trigger(ev, ['first']);
				test.assertEquals("handler should fire once", 1, x);
				test.assertEquals("event data wrong", 'first', d);
				$bind.then(handler);
				test.assertEquals("handler should fire once again", 2, x); 
				test.assertEquals("event data wrong", 'first', d);
				$x.trigger(ev, ['second']);
				test.assertEquals("handler should fire twice on next trigger", 4, x);
				test.assertEquals("event data wrong", 'second', d);
				$bind.then(handler);
				test.assertEquals("handler should fire only once again", 5, x);
				test.assertEquals("event data wrong", 'second', d);
				test.done();
			},

			".bind(event).doSomething()._": function($, test) {
				var $x = test.element('<div>');
				var $bind = $x.bind('myEvent',$).text('test');
				test.assertNotEquals("timed bind must return placeholder object", $x, $bind);
				var $y = $bind._;
				test.assertEquals("underscore must provide original object", $x, $y);
				test.done();
			},

		},

		"binding multiple events - timed invocation chain style": {
			
			".bind('ev1 ev2').doSomething() + .trigger(ev1)": function($, test) {
				var $x = test.element('<div>');
				var x=0;
				function handler(){
					x++;
					test.assertNotEquals("context must not be original", $x, this);
					test.assertEquals("previous context must be original", $x, this.end());
				}
				var $bind = $x.bind('ev1 ev2').then(handler);
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
				test.assertEquals("ev1 should be triggered again", 2, x);
				$x.trigger('ev2');
				test.assertEquals("ev2 still not expected to trigger", 2, x);
				test.done();
			},

			".bind('ev1 ev2',$).doSomething() + .trigger(ev1)": function($, test) {
				var $x = test.element('<div>');
				var x=0;
				function handler(){
					x++;
				}
				var $bind = $x.bind('ev1 ev2',$).then(handler);
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
				test.assertEquals("ev1 should be triggered again", 2, x);
				$x.trigger('ev2');
				test.assertEquals("ev2 still not expected to trigger", 2, x);
				test.done();
			},

			".bind('ev1 ev2').doSomething()._": function($, test) {
				var $x = test.element('<div>');
				var $bind = $x.bind('ev1 ev2',$).text('test');
				test.assertNotEquals("timed bind must return placeholder object", $x, $bind);
				var $y = $bind._;
				test.assertEquals("underscore must provide original object", $x, $y);
				test.done();
			},

		},
		
		"access original context from deferred chain": {
			
			"$(some).bind(event).doThisLater()._.doThatNow()": function($,test){
				var $x = test.element('<div>');
				$x.bind('evt').text('later')._.text('now');
				test.assertEquals("immediate action must have happened already", 'now', $x.text());
				$x.trigger('evt');
				test.assertEquals("later action must have happened after trigger", 'later', $x.text());
				test.done();
			},
 
			"$(some).bind(event,$).doThisLater()._.doThatNow()": function($,test){
				var $x = test.element('<div>');
				$x.bind('evt',$).text('later')._.text('now');
				test.assertEquals("immediate action must have happened already", 'now', $x.text());
				$x.trigger('evt');
				test.assertEquals("later action must have happened after trigger", 'later', $x.text());
				test.done();
			},

		},

};