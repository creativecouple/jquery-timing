tests[".on() functionality"] = {
		
		_version: ['1.7.0'],
		
		"binding single event - classical style": {
		
			".on(event,handler) + .off(event)": function($, test) {
				var $x = test.element('<div>');
				var ev = 'myEvent';
				var x=0;
				function handler(){
					x++;
				}
				var $on = $x.on(ev, handler);
				test.assertEquals("classical bind must return original jQuery object", $x, $on);
				test.assertEquals("event not yet triggered", 0, x);
				$x.off(ev);
				test.assertEquals("event must not trigger on .off", 0, x);
				$x.trigger(ev);
				test.assertEquals("because of .off trigger must not happen", 0, x);
				$x.trigger(ev);
				test.assertEquals("still no trigger expected", 0, x);
				test.done();
			},

			".on(event,data,handler) + .off(event)": function($, test) {
				var $x = test.element('<div>');
				var ev = 'myEvent';
				var x=0;
				function handler(event){
					x++;
					test.assertEquals("event data must be passed", true, event.data.prop);
				}
				var $on = $x.on(ev, {prop: true}, handler);
				test.assertEquals("classical bind must return original jQuery object", $x, $on);
				test.assertEquals("event not yet triggered", 0, x);
				$x.off(ev);
				test.assertEquals("event must not trigger on .off", 0, x);
				$x.trigger(ev);
				test.assertEquals("because of .off trigger must not happen", 0, x);
				$x.trigger(ev);
				test.assertEquals("still no trigger expected", 0, x);
				test.done();
			},

			".on(event,handler) + .off(event,handler)": function($, test) {
				var $x = test.element('<div>');
				var ev = 'myEvent';
				var x=0;
				function handler(){
					x++;
				}
				var $on = $x.on(ev, handler);
				test.assertEquals("classical bind must return original jQuery object", $x, $on);
				test.assertEquals("event not yet triggered", 0, x);
				$x.off(ev,handler);
				test.assertEquals("event must not trigger on .off", 0, x);
				$x.trigger(ev);
				test.assertEquals("because of .off trigger must not happen", 0, x);
				$x.trigger(ev);
				test.assertEquals("still no trigger expected", 0, x);
				test.done();
			},

			".on(event,data,handler) + .off(event,handler)": function($, test) {
				var $x = test.element('<div>');
				var ev = 'myEvent';
				var x=0;
				function handler(event){
					x++;
					test.assertEquals("event data must be passed", true, event.data.prop);
				}
				var $on = $x.on(ev, {prop: true}, handler);
				test.assertEquals("classical bind must return original jQuery object", $x, $on);
				test.assertEquals("event not yet triggered", 0, x);
				$x.off(ev,handler);
				test.assertEquals("event must not trigger on .off", 0, x);
				$x.trigger(ev);
				test.assertEquals("because of .off trigger must not happen", 0, x);
				$x.trigger(ev);
				test.assertEquals("still no trigger expected", 0, x);
				test.done();
			},

			".on(event,handler) + .off(event,otherHandler)": function($, test) {
				var $x = test.element('<div>');
				var ev = 'myEvent';
				var x=0;
				function handler(){
					x++;
				}
				var $on = $x.on(ev, handler);
				test.assertEquals("classical bind must return original jQuery object", $x, $on);
				test.assertEquals("event not yet triggered", 0, x);
				$x.off(ev, function(){x++;});
				test.assertEquals("event must not trigger on .off", 0, x);
				$x.trigger(ev);
				test.assertEquals("because of unbinding other handler trigger must happen", 1, x);
				$x.trigger(ev);
				test.assertEquals("still trigger expected", 2, x);
				test.done();
			},

			".on(event,data,handler) + .off(event,otherHandler)": function($, test) {
				var $x = test.element('<div>');
				var ev = 'myEvent';
				var x=0;
				function handler(event){
					x++;
					test.assertEquals("event data must be passed", true, event.data.prop);
				}
				var $on = $x.on(ev, {prop: true}, handler);
				test.assertEquals("classical bind must return original jQuery object", $x, $on);
				test.assertEquals("event not yet triggered", 0, x);
				$x.off(ev, function(){x++;});
				test.assertEquals("event must not trigger on .off", 0, x);
				$x.trigger(ev);
				test.assertEquals("because of unbinding other handler trigger must happen", 1, x);
				$x.trigger(ev);
				test.assertEquals("still trigger expected", 2, x);
				test.done();
			},

			".on(event,handler) + .trigger(event) + .off(event)": function($, test) {
				var $x = test.element('<div>');
				var ev = 'myEvent';
				var x=0;
				function handler(){
					x++;
				}
				var $on = $x.on(ev, handler);
				test.assertEquals("classical bind must return original jQuery object", $x, $on);
				test.assertEquals("event not yet triggered", 0, x);
				$x.trigger(ev);
				test.assertEquals("first trigger should fire", 1, x);
				$x.off(ev);
				test.assertEquals("event must not trigger on .off", 1, x);
				$x.trigger(ev);
				test.assertEquals("because of .off trigger must not happen", 1, x);
				$x.trigger(ev);
				test.assertEquals("still no trigger expected", 1, x);
				test.done();
			},

			".on(event,data,handler) + .trigger(event) + .off(event)": function($, test) {
				var $x = test.element('<div>');
				var ev = 'myEvent';
				var x=0;
				function handler(event){
					x++;
					test.assertEquals("event data must be passed", true, event.data.prop);
				}
				var $on = $x.on(ev, {prop: true}, handler);
				test.assertEquals("classical bind must return original jQuery object", $x, $on);
				test.assertEquals("event not yet triggered", 0, x);
				$x.trigger(ev);
				test.assertEquals("first trigger should fire", 1, x);
				$x.off(ev);
				test.assertEquals("event must not trigger on .off", 1, x);
				$x.trigger(ev);
				test.assertEquals("because of .off trigger must not happen", 1, x);
				$x.trigger(ev);
				test.assertEquals("still no trigger expected", 1, x);
				test.done();
			},

			".on(event,handler) + .trigger(event) + .off(event,handler)": function($, test) {
				var $x = test.element('<div>');
				var ev = 'myEvent';
				var x=0;
				function handler(){
					x++;
				}
				var $on = $x.on(ev, handler);
				test.assertEquals("classical bind must return original jQuery object", $x, $on);
				test.assertEquals("event not yet triggered", 0, x);
				$x.trigger(ev);
				test.assertEquals("first trigger should fire", 1, x);
				$x.off(ev, handler);
				test.assertEquals("event must not trigger on .off", 1, x);
				$x.trigger(ev);
				test.assertEquals("because of .off trigger must not happen", 1, x);
				$x.trigger(ev);
				test.assertEquals("still no trigger expected", 1, x);
				test.done();
			},
			
			".on(event,data,handler) + .trigger(event) + .off(event,handler)": function($, test) {
				var $x = test.element('<div>');
				var ev = 'myEvent';
				var x=0;
				function handler(event){
					x++;
					test.assertEquals("event data must be passed", true, event.data.prop);
				}
				var $on = $x.on(ev, {prop: true}, handler);
				test.assertEquals("classical bind must return original jQuery object", $x, $on);
				test.assertEquals("event not yet triggered", 0, x);
				$x.trigger(ev);
				test.assertEquals("first trigger should fire", 1, x);
				$x.off(ev, handler);
				test.assertEquals("event must not trigger on .off", 1, x);
				$x.trigger(ev);
				test.assertEquals("because of .off trigger must not happen", 1, x);
				$x.trigger(ev);
				test.assertEquals("still no trigger expected", 1, x);
				test.done();
			},
			
			".on(event,handler) + .trigger(event) + .off(event,otherHandler)": function($, test) {
				var $x = test.element('<div>');
				var ev = 'myEvent';
				var x=0;
				function handler(){
					x++;
				}
				var $on = $x.on(ev, handler);
				test.assertEquals("classical bind must return original jQuery object", $x, $on);
				test.assertEquals("event not yet triggered", 0, x);
				$x.trigger(ev);
				test.assertEquals("first trigger should fire", 1, x);
				$x.off(ev, function(){x++;});
				test.assertEquals("event must not trigger on .off", 1, x);
				$x.trigger(ev);
				test.assertEquals("because of unbinding other handler trigger must happen", 2, x);
				$x.trigger(ev);
				test.assertEquals("still trigger expected", 3, x);
				test.done();
			},

			".on(event,data,handler) + .trigger(event) + .off(event,otherHandler)": function($, test) {
				var $x = test.element('<div>');
				var ev = 'myEvent';
				var x=0;
				function handler(event){
					x++;
					test.assertEquals("event data must be passed", true, event.data.prop);
				}
				var $on = $x.on(ev, {prop: true}, handler);
				test.assertEquals("classical bind must return original jQuery object", $x, $on);
				test.assertEquals("event not yet triggered", 0, x);
				$x.trigger(ev);
				test.assertEquals("first trigger should fire", 1, x);
				$x.off(ev, function(){x++;});
				test.assertEquals("event must not trigger on .off", 1, x);
				$x.trigger(ev);
				test.assertEquals("because of unbinding other handler trigger must happen", 2, x);
				$x.trigger(ev);
				test.assertEquals("still trigger expected", 3, x);
				test.done();
			},

		},

		"binding multiple events - classical style": {
			
			".on({ev1:h1, e2:h2}) + .off(ev1)": function($, test) {
				var $x = test.element('<div>');
				var x=0, y=0;
				function handler1(){
					x++;
				}
				function handler2(){
					y++;
				}
				var $on = $x.on({ev1:handler1, ev2:handler2});
				test.assertEquals("classical bind must return original jQuery object", $x, $on);
				test.assertEquals("ev1 not yet triggered", 0, x);
				test.assertEquals("ev2 not yet triggered", 0, y);
				$x.off('ev1');
				test.assertEquals("ev1 must not trigger on .off", 0, x);
				test.assertEquals("ev2 must not trigger on .off", 0, x);
				$x.trigger('ev1');
				test.assertEquals("because of .off trigger must not happen", 0, x);
				$x.trigger('ev2');
				test.assertEquals("ev2 should be triggered separately", 1, y);
				$x.trigger('ev1');
				test.assertEquals("ev1 still not expected to trigger", 0, x);
				$x.trigger('ev2');
				test.assertEquals("ev2 should be triggered again", 2, y);
				test.done();
			},

			".on({ev1:h1, e2:h2},data) + .off(ev1)": function($, test) {
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
				var $on = $x.on({ev1:handler1, ev2:handler2}, {prop: true});
				test.assertEquals("classical bind must return original jQuery object", $x, $on);
				test.assertEquals("ev1 not yet triggered", 0, x);
				test.assertEquals("ev2 not yet triggered", 0, y);
				$x.off('ev1');
				test.assertEquals("ev1 must not trigger on .off", 0, x);
				test.assertEquals("ev2 must not trigger on .off", 0, x);
				$x.trigger('ev1');
				test.assertEquals("because of .off trigger must not happen", 0, x);
				$x.trigger('ev2');
				test.assertEquals("ev2 should be triggered separately", 1, y);
				$x.trigger('ev1');
				test.assertEquals("ev1 still not expected to trigger", 0, x);
				$x.trigger('ev2');
				test.assertEquals("ev2 should be triggered again", 2, y);
				test.done();
			},

			".on('ev1 ev2',handler) + .off(ev2)": function($, test) {
				var $x = test.element('<div>');
				var x=0;
				var $on = $x.on('ev1 ev2', function(){ x++; });
				test.assertEquals("classical bind must return original jQuery object", $x, $on);
				test.assertEquals("ev1 not yet triggered", 0, x);
				test.assertEquals("ev2 not yet triggered", 0, x);
				$x.off('ev2');
				test.assertEquals("ev1 must not trigger on .off", 0, x);
				test.assertEquals("ev2 must not trigger on .off", 0, x);
				$x.trigger('ev1');
				test.assertEquals("ev1 should be triggered", 1, x);
				$x.trigger('ev2');
				test.assertEquals("because of .off trigger must not happen", 1, x);
				$x.trigger('ev1');
				test.assertEquals("ev1 should be triggered again", 2, x);
				$x.trigger('ev2');
				test.assertEquals("ev2 still not expected to trigger", 2, x);
				test.done();
			},

			".on('ev1 ev2',data,handler) + .off(ev2)": function($, test) {
				var $x = test.element('<div>');
				var x=0;
				function handler(event){
					x++;
					test.assertEquals("event data must be passed", true, event.data.prop);
				}
				var $on = $x.on('ev1 ev2', {prop: true}, handler);
				test.assertEquals("classical bind must return original jQuery object", $x, $on);
				test.assertEquals("ev1 not yet triggered", 0, x);
				test.assertEquals("ev2 not yet triggered", 0, x);
				$x.off('ev2');
				test.assertEquals("ev1 must not trigger on .off", 0, x);
				test.assertEquals("ev2 must not trigger on .off", 0, x);
				$x.trigger('ev1');
				test.assertEquals("ev1 should be triggered", 1, x);
				$x.trigger('ev2');
				test.assertEquals("because of .off trigger must not happen", 1, x);
				$x.trigger('ev1');
				test.assertEquals("ev1 should be triggered again", 2, x);
				$x.trigger('ev2');
				test.assertEquals("ev2 still not expected to trigger", 2, x);
				test.done();
			},
			
		},

		"binding single event - timed invocation chain style": {
			
			".on(event).doSomething() + .trigger(event)": function($, test) {
				var $x = test.element('<div>');
				var ev = 'myEvent';
				var x=0;
				function handler(){
					x++;
					test.assertEquals("context object must be original", $x.get(0), this.get(0));
					test.assertNotEquals("context must not be original", $x, this);
					test.assertEquals("previous context must be original", $x, this.end());
				}
				var $on = $x.on(ev).then(handler);
				test.assertNotEquals("timed bind must return placeholder object", $x, $on);
				test.assertEquals("event not yet triggered", 0, x);
				$x.trigger(ev);
				test.assertEquals("trigger should fire", 1, x);
				$x.off(ev);
				test.assertEquals("event must not trigger on .off", 1, x);
				$x.trigger(ev);
				test.assertEquals("because of .off trigger must not happen again", 1, x);
				test.done();
			},

			".on(event).doSomething() + .trigger(event) + .doSomething() + .trigger(event) + .doSomething()": function($, test) {
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
				var $on = $x.on(ev).then(handler);
				test.assertNotEquals("timed on must return placeholder object", $x, $on);
				test.assertEquals("event not yet triggered", 0, x);
				$x.trigger(ev, ['first']);
				test.assertEquals("handler should fire once", 1, x);
				test.assertEquals("event data wrong", 'first', d);
				$on.then(handler);
				test.assertEquals("handler should fire once again", 2, x); 
				test.assertEquals("event data wrong", 'first', d);
				$x.trigger(ev, ['second']);
				test.assertEquals("handler should fire twice on next trigger", 4, x);
				test.assertEquals("event data wrong", 'second', d);
				$on.then(handler);
				test.assertEquals("handler should fire only once again", 5, x);
				test.assertEquals("event data wrong", 'second', d);
				test.done();
			},

			".on(event,$).doSomething() + .trigger(event)": function($, test) {
				var $x = test.element('<div>');
				var ev = 'myEvent';
				var x=0;
				function handler(){
					x++;
					test.assertEquals("context object must be original", $x.get(0), this.get(0));
				}
				var $on = $x.on(ev,$).then(handler);
				test.assertNotEquals("timed bind must return placeholder object", $x, $on);
				test.assertEquals("event not yet triggered", 0, x);
				$x.trigger(ev);
				test.assertEquals("trigger should fire", 1, x);
				$x.off(ev);
				test.assertEquals("event must not trigger on .off", 1, x);
				$x.trigger(ev);
				test.assertEquals("because of .off trigger must not happen again", 1, x);
				test.done();
			},

			".on(event,$).doSomething() + .trigger(event) + .doSomething() + .trigger(event) + .doSomething()": function($, test) {
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
				var $on = $x.on(ev,$).then(handler);
				test.assertNotEquals("timed on must return placeholder object", $x, $on);
				test.assertEquals("event not yet triggered", 0, x);
				$x.trigger(ev, ['first']);
				test.assertEquals("handler should fire once", 1, x);
				test.assertEquals("event data wrong", 'first', d);
				$on.then(handler);
				test.assertEquals("handler should fire once again", 2, x); 
				test.assertEquals("event data wrong", 'first', d);
				$x.trigger(ev, ['second']);
				test.assertEquals("handler should fire twice on next trigger", 4, x);
				test.assertEquals("event data wrong", 'second', d);
				$on.then(handler);
				test.assertEquals("handler should fire only once again", 5, x);
				test.assertEquals("event data wrong", 'second', d);
				test.done();
			},

			".on(event).doSomething()._": function($, test) {
				var $x = test.element('<div>');
				var $on = $x.on('myEvent',$).text('test');
				test.assertNotEquals("timed bind must return placeholder object", $x, $on);
				var $y = $on._;
				test.assertEquals("underscore must provide original object", $x, $y);
				test.done();
			},

		},

		"binding multiple events - timed invocation chain style": {
			
			".on('ev1 ev2').doSomething() + .trigger(ev1)": function($, test) {
				var $x = test.element('<div>');
				var x=0;
				function handler(){
					x++;
					test.assertNotEquals("context must not be original", $x, this);
					test.assertEquals("previous context must be original", $x, this.end());
				}
				var $on = $x.on('ev1 ev2').then(handler);
				test.assertNotEquals("timed bind must return placeholder object", $x, $on);
				test.assertEquals("ev1 not yet triggered", 0, x);
				test.assertEquals("ev2 not yet triggered", 0, x);
				$x.off('ev2');
				test.assertEquals("ev1 must not trigger on .off", 0, x);
				test.assertEquals("ev2 must not trigger on .off", 0, x);
				$x.trigger('ev1');
				test.assertEquals("ev1 should be triggered", 1, x);
				$x.trigger('ev2');
				test.assertEquals("because of .off trigger must not happen", 1, x);
				$x.trigger('ev1');
				test.assertEquals("ev1 should be triggered again", 2, x);
				$x.trigger('ev2');
				test.assertEquals("ev2 still not expected to trigger", 2, x);
				test.done();
			},

			".on('ev1 ev2',$).doSomething() + .trigger(ev1)": function($, test) {
				var $x = test.element('<div>');
				var x=0;
				function handler(){
					x++;
				}
				var $on = $x.on('ev1 ev2',$).then(handler);
				test.assertNotEquals("timed bind must return placeholder object", $x, $on);
				test.assertEquals("ev1 not yet triggered", 0, x);
				test.assertEquals("ev2 not yet triggered", 0, x);
				$x.off('ev2');
				test.assertEquals("ev1 must not trigger on .off", 0, x);
				test.assertEquals("ev2 must not trigger on .off", 0, x);
				$x.trigger('ev1');
				test.assertEquals("ev1 should be triggered", 1, x);
				$x.trigger('ev2');
				test.assertEquals("because of .off trigger must not happen", 1, x);
				$x.trigger('ev1');
				test.assertEquals("ev1 should be triggered again", 2, x);
				$x.trigger('ev2');
				test.assertEquals("ev2 still not expected to trigger", 2, x);
				test.done();
			},

			".on('ev1 ev2').doSomething()._": function($, test) {
				var $x = test.element('<div>');
				var $on = $x.on('ev1 ev2',$).text('test');
				test.assertNotEquals("timed bind must return placeholder object", $x, $on);
				var $y = $on._;
				test.assertEquals("underscore must provide original object", $x, $y);
				test.done();
			},

		},
		
		"access original context from deferred chain": {
			
			"$(some).on(event).doThisLater()._.doThatNow()": function($,test){
				var $x = test.element('<div>');
				$x.on('evt').text('later')._.text('now');
				test.assertEquals("immediate action must have happened already", 'now', $x.text());
				$x.trigger('evt');
				test.assertEquals("later action must have happened after trigger", 'later', $x.text());
				test.done();
			},

			"$(some).on(event,$).doThisLater()._.doThatNow()": function($,test){
				var $x = test.element('<div>');
				$x.on('evt',$).text('later')._.text('now');
				test.assertEquals("immediate action must have happened already", 'now', $x.text());
				$x.trigger('evt');
				test.assertEquals("later action must have happened after trigger", 'later', $x.text());
				test.done();
			},
		},

};