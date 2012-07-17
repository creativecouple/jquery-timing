var suite = {
		
		_version: ['1.4.2','1.8.0'],
		
		"binding single event - classical style": {
		
			".delegate(selector,event,handler) + .undelegate(selector,event)": function($, test) {
				var $x = $('<div><p>');
				var ev = 'myEvent';
				var x=0;
				function handler(){
					x++;
				}
				var $delegate = $x.delegate('p',ev, handler);
				test.assertEquals("classical bind must return original jQuery object", $x, $delegate);
				test.assertEquals("event not yet triggered", 0, x);
				$x.undelegate('p',ev);
				test.assertEquals("event must not trigger on .undelegate", 0, x);
				$x.find('p').trigger(ev);
				test.assertEquals("because of .undelegate trigger must not happen", 0, x);
				$x.find('p').after('<p>').next().trigger(ev);
				test.assertEquals("still no trigger expected", 0, x);
				test.done();
			},

			".delegate(selector,event,data,handler) + .undelegate(selector,event)": function($, test) {
				var $x = $('<div><p>');
				var ev = 'myEvent';
				var x=0;
				function handler(event){
					x++;
					test.assertEquals("event data must be passed", true, event.data.prop);
				}
				var $delegate = $x.delegate('p',ev, {prop: true}, handler);
				test.assertEquals("classical bind must return original jQuery object", $x, $delegate);
				test.assertEquals("event not yet triggered", 0, x);
				$x.undelegate('p',ev);
				test.assertEquals("event must not trigger on .undelegate", 0, x);
				$x.find('p').trigger(ev);
				test.assertEquals("because of .undelegate trigger must not happen", 0, x);
				$x.find('p').after('<p>').next().trigger(ev);
				test.assertEquals("still no trigger expected", 0, x);
				test.done();
			},

			".delegate(selector,event,handler) + .undelegate(selector,event,handler)": function($, test) {
				var $x = $('<div><p>');
				var ev = 'myEvent';
				var x=0;
				function handler(){
					x++;
				}
				var $delegate = $x.delegate('p',ev, handler);
				test.assertEquals("classical bind must return original jQuery object", $x, $delegate);
				test.assertEquals("event not yet triggered", 0, x);
				$x.undelegate('p',ev,handler);
				test.assertEquals("event must not trigger on .undelegate", 0, x);
				$x.find('p').trigger(ev);
				test.assertEquals("because of .undelegate trigger must not happen", 0, x);
				$x.find('p').after('<p>').next().trigger(ev);
				test.assertEquals("still no trigger expected", 0, x);
				test.done();
			},

			".delegate(selector,event,data,handler) + .undelegate(selector,event,handler)": function($, test) {
				var $x = $('<div><p>');
				var ev = 'myEvent';
				var x=0;
				function handler(event){
					x++;
					test.assertEquals("event data must be passed", true, event.data.prop);
				}
				var $delegate = $x.delegate('p',ev, {prop: true}, handler);
				test.assertEquals("classical bind must return original jQuery object", $x, $delegate);
				test.assertEquals("event not yet triggered", 0, x);
				$x.undelegate('p',ev,handler);
				test.assertEquals("event must not trigger on .undelegate", 0, x);
				$x.find('p').trigger(ev);
				test.assertEquals("because of .undelegate trigger must not happen", 0, x);
				$x.find('p').after('<p>').next().trigger(ev);
				test.assertEquals("still no trigger expected", 0, x);
				test.done();
			},

			".delegate(selector,event,handler) + .undelegate(selector,event,otherHandler)": function($, test) {
				var $x = $('<div><p>');
				var ev = 'myEvent';
				var x=0;
				function handler(){
					x++;
				}
				var $delegate = $x.delegate('p',ev, handler);
				test.assertEquals("classical bind must return original jQuery object", $x, $delegate);
				test.assertEquals("event not yet triggered", 0, x);
				$x.undelegate('p',ev, function(){x++;});
				test.assertEquals("event must not trigger on .undelegate", 0, x);
				$x.find('p').trigger(ev);
				test.assertEquals("because of unbinding other handler trigger must happen", 1, x);
				$x.find('p').after('<p>').next().trigger(ev);
				test.assertEquals("still trigger expected", 2, x);
				test.done();
			},

			".delegate(selector,event,data,handler) + .undelegate(selector,event,otherHandler)": function($, test) {
				var $x = $('<div><p>');
				var ev = 'myEvent';
				var x=0;
				function handler(event){
					x++;
					test.assertEquals("event data must be passed", true, event.data.prop);
				}
				var $delegate = $x.delegate('p',ev, {prop: true}, handler);
				test.assertEquals("classical bind must return original jQuery object", $x, $delegate);
				test.assertEquals("event not yet triggered", 0, x);
				$x.undelegate('p',ev, function(){x++;});
				test.assertEquals("event must not trigger on .undelegate", 0, x);
				$x.find('p').trigger(ev);
				test.assertEquals("because of unbinding other handler trigger must happen", 1, x);
				$x.find('p').after('<p>').next().trigger(ev);
				test.assertEquals("still trigger expected", 2, x);
				test.done();
			},

			".delegate(selector,event,handler) + .trigger(event) + .undelegate(selector,event)": function($, test) {
				var $x = $('<div><p>');
				var ev = 'myEvent';
				var x=0;
				function handler(){
					x++;
				}
				var $delegate = $x.delegate('p',ev, handler);
				test.assertEquals("classical bind must return original jQuery object", $x, $delegate);
				test.assertEquals("event not yet triggered", 0, x);
				$x.find('p').trigger(ev);
				test.assertEquals("first trigger should fire", 1, x);
				$x.undelegate('p',ev);
				test.assertEquals("event must not trigger on .undelegate", 1, x);
				$x.find('p').trigger(ev);
				test.assertEquals("because of .undelegate trigger must not happen", 1, x);
				$x.find('p').after('<p>').next().trigger(ev);
				test.assertEquals("still no trigger expected", 1, x);
				test.done();
			},

			".delegate(selector,event,data,handler) + .trigger(event) + .undelegate(selector,event)": function($, test) {
				var $x = $('<div><p>');
				var ev = 'myEvent';
				var x=0;
				function handler(event){
					x++;
					test.assertEquals("event data must be passed", true, event.data.prop);
				}
				var $delegate = $x.delegate('p',ev, {prop: true}, handler);
				test.assertEquals("classical bind must return original jQuery object", $x, $delegate);
				test.assertEquals("event not yet triggered", 0, x);
				$x.find('p').trigger(ev);
				test.assertEquals("first trigger should fire", 1, x);
				$x.undelegate('p',ev);
				test.assertEquals("event must not trigger on .undelegate", 1, x);
				$x.find('p').trigger(ev);
				test.assertEquals("because of .undelegate trigger must not happen", 1, x);
				$x.find('p').after('<p>').next().trigger(ev);
				test.assertEquals("still no trigger expected", 1, x);
				test.done();
			},

			".delegate(selector,event,handler) + .trigger(event) + .undelegate(selector,event,handler)": function($, test) {
				var $x = $('<div><p>');
				var ev = 'myEvent';
				var x=0;
				function handler(){
					x++;
				}
				var $delegate = $x.delegate('p',ev, handler);
				test.assertEquals("classical bind must return original jQuery object", $x, $delegate);
				test.assertEquals("event not yet triggered", 0, x);
				$x.find('p').trigger(ev);
				test.assertEquals("first trigger should fire", 1, x);
				$x.undelegate('p',ev, handler);
				test.assertEquals("event must not trigger on .undelegate", 1, x);
				$x.find('p').trigger(ev);
				test.assertEquals("because of .undelegate trigger must not happen", 1, x);
				$x.find('p').after('<p>').next().trigger(ev);
				test.assertEquals("still no trigger expected", 1, x);
				test.done();
			},
			
			".delegate(selector,event,data,handler) + .trigger(event) + .undelegate(selector,event,handler)": function($, test) {
				var $x = $('<div><p>');
				var ev = 'myEvent';
				var x=0;
				function handler(event){
					x++;
					test.assertEquals("event data must be passed", true, event.data.prop);
				}
				var $delegate = $x.delegate('p',ev, {prop: true}, handler);
				test.assertEquals("classical bind must return original jQuery object", $x, $delegate);
				test.assertEquals("event not yet triggered", 0, x);
				$x.find('p').trigger(ev);
				test.assertEquals("first trigger should fire", 1, x);
				$x.undelegate('p',ev, handler);
				test.assertEquals("event must not trigger on .undelegate", 1, x);
				$x.find('p').trigger(ev);
				test.assertEquals("because of .undelegate trigger must not happen", 1, x);
				$x.find('p').after('<p>').next().trigger(ev);
				test.assertEquals("still no trigger expected", 1, x);
				test.done();
			},
			
			".delegate(selector,event,handler) + .trigger(event) + .undelegate(selector,event,otherHandler)": function($, test) {
				var $x = $('<div><p>');
				var ev = 'myEvent';
				var x=0;
				function handler(){
					x++;
				}
				var $delegate = $x.delegate('p',ev, handler);
				test.assertEquals("classical bind must return original jQuery object", $x, $delegate);
				test.assertEquals("event not yet triggered", 0, x);
				$x.find('p').trigger(ev);
				test.assertEquals("first trigger should fire", 1, x);
				$x.undelegate('p',ev, function(){x++;});
				test.assertEquals("event must not trigger on .undelegate", 1, x);
				$x.find('p').trigger(ev);
				test.assertEquals("because of unbinding other handler trigger must happen", 2, x);
				$x.find('p').after('<p>').next().trigger(ev);
				test.assertEquals("still trigger expected", 3, x);
				test.done();
			},

			".delegate(selector,event,data,handler) + .trigger(event) + .undelegate(selector,event,otherHandler)": function($, test) {
				var $x = $('<div><p>');
				var ev = 'myEvent';
				var x=0;
				function handler(event){
					x++;
					test.assertEquals("event data must be passed", true, event.data.prop);
				}
				var $delegate = $x.delegate('p',ev, {prop: true}, handler);
				test.assertEquals("classical bind must return original jQuery object", $x, $delegate);
				test.assertEquals("event not yet triggered", 0, x);
				$x.find('p').trigger(ev);
				test.assertEquals("first trigger should fire", 1, x);
				$x.undelegate('p',ev, function(){x++;});
				test.assertEquals("event must not trigger on .undelegate", 1, x);
				$x.find('p').trigger(ev);
				test.assertEquals("because of unbinding other handler trigger must happen", 2, x);
				$x.find('p').after('<p>').next().trigger(ev);
				test.assertEquals("still trigger expected", 3, x);
				test.done();
			},

		},

		"binding multiple events - classical style": {
			
			".delegate(selector,{ev1:h1, e2:h2}) + .undelegate(selector,ev1)": function($, test) {
				var $x = $('<div><p>');
				var x=0, y=0;
				function handler1(){
					x++;
				}
				function handler2(){
					y++;
				}
				var $delegate = $x.delegate('p',{ev1:handler1, ev2:handler2});
				test.assertEquals("classical bind must return original jQuery object", $x, $delegate);
				test.assertEquals("ev1 not yet triggered", 0, x);
				test.assertEquals("ev2 not yet triggered", 0, y);
				$x.undelegate('p','ev1');
				test.assertEquals("ev1 must not trigger on .undelegate", 0, x);
				test.assertEquals("ev2 must not trigger on .undelegate", 0, x);
				$x.find('p').trigger('ev1');
				test.assertEquals("because of .undelegate trigger must not happen", 0, x);
				$x.find('p').trigger('ev2');
				test.assertEquals("ev2 should be triggered separately", 1, y);
				$x.find('p').trigger('ev1');
				test.assertEquals("ev1 still not expected to trigger", 0, x);
				$x.find('p').after('<p>').next().trigger('ev2');
				test.assertEquals("ev2 should be triggered again", 2, y);
				test.done();
			},

			".delegate(selector,{ev1:h1, e2:h2},data) + .undelegate(selector,ev1)": function($, test) {
				var $x = $('<div><p>');
				var x=0, y=0;
				function handler1(event){
					x++;
					test.assertEquals("event data must be passed", true, event.data.prop);
				}
				function handler2(event){
					y++;
					test.assertEquals("event data must be passed", true, event.data.prop);
				}
				var $delegate = $x.delegate('p',{ev1:handler1, ev2:handler2}, {prop: true});
				test.assertEquals("classical bind must return original jQuery object", $x, $delegate);
				test.assertEquals("ev1 not yet triggered", 0, x);
				test.assertEquals("ev2 not yet triggered", 0, y);
				$x.undelegate('p','ev1');
				test.assertEquals("ev1 must not trigger on .undelegate", 0, x);
				test.assertEquals("ev2 must not trigger on .undelegate", 0, x);
				$x.find('p').trigger('ev1');
				test.assertEquals("because of .undelegate trigger must not happen", 0, x);
				$x.find('p').trigger('ev2');
				test.assertEquals("ev2 should be triggered separately", 1, y);
				$x.find('p').trigger('ev1');
				test.assertEquals("ev1 still not expected to trigger", 0, x);
				$x.find('p').after('<p>').next().trigger('ev2');
				test.assertEquals("ev2 should be triggered again", 2, y);
				test.done();
			},

			".delegate(selector,'ev1 ev2',handler) + .undelegate(selector,ev2)": function($, test) {
				var $x = $('<div><p>');
				var x=0;
				var $delegate = $x.delegate('p','ev1 ev2', function(){ x++; });
				test.assertEquals("classical bind must return original jQuery object", $x, $delegate);
				test.assertEquals("ev1 not yet triggered", 0, x);
				test.assertEquals("ev2 not yet triggered", 0, x);
				$x.undelegate('p','ev2');
				test.assertEquals("ev1 must not trigger on .undelegate", 0, x);
				test.assertEquals("ev2 must not trigger on .undelegate", 0, x);
				$x.find('p').trigger('ev1');
				test.assertEquals("ev1 should be triggered", 1, x);
				$x.find('p').trigger('ev2');
				test.assertEquals("because of .undelegate trigger must not happen", 1, x);
				$x.find('p').trigger('ev1');
				test.assertEquals("ev1 should be triggered again", 2, x);
				$x.find('p').after('<p>').next().trigger('ev2');
				test.assertEquals("ev2 still not expected to trigger", 2, x);
				test.done();
			},

			".delegate(selector,'ev1 ev2',data,handler) + .undelegate(selector,ev2)": function($, test) {
				var $x = $('<div><p>');
				var x=0;
				function handler(event){
					x++;
					test.assertEquals("event data must be passed", true, event.data.prop);
				}
				var $delegate = $x.delegate('p','ev1 ev2', {prop: true}, handler);
				test.assertEquals("classical bind must return original jQuery object", $x, $delegate);
				test.assertEquals("ev1 not yet triggered", 0, x);
				test.assertEquals("ev2 not yet triggered", 0, x);
				$x.undelegate('p','ev2');
				test.assertEquals("ev1 must not trigger on .undelegate", 0, x);
				test.assertEquals("ev2 must not trigger on .undelegate", 0, x);
				$x.find('p').trigger('ev1');
				test.assertEquals("ev1 should be triggered", 1, x);
				$x.find('p').trigger('ev2');
				test.assertEquals("because of .undelegate trigger must not happen", 1, x);
				$x.find('p').trigger('ev1');
				test.assertEquals("ev1 should be triggered again", 2, x);
				$x.find('p').after('<p>').next().trigger('ev2');
				test.assertEquals("ev2 still not expected to trigger", 2, x);
				test.done();
			},
			
		},

		"binding single event - timed invocation chain style": {
			
			".delegate(selector,event).doSomething() + .trigger(event)": function($, test) {
				var $x = $('<div><p>');
				var ev = 'myEvent';
				var x=0;
				function handler(){
					x++;
					test.assertEquals("context object must be original", $x.get(0), this.parent().get(0));
				}
				var $delegate = $x.delegate('p',ev).then(handler);
				test.assertNotEquals("timed bind must return placeholder object", $x, $delegate);
				test.assertEquals("event not yet triggered", 0, x);
				$x.find('p').trigger(ev);
				test.assertEquals("trigger should fire", 1, x);
				$x.undelegate('p',ev);
				test.assertEquals("event must not trigger on .undelegate", 1, x);
				$x.find('p').after('<p>').next().trigger(ev);
				test.assertEquals("because of .undelegate trigger must not happen again", 1, x);
				test.done();
			},

			".delegate(selector,event,$).doSomething() + .trigger(event)": function($, test) {
				var $x = $('<div><p>');
				var ev = 'myEvent';
				var x=0;
				function handler(){
					x++;
					test.assertEquals("context object must be original", $x.get(0), this.parent().get(0));
				}
				var $delegate = $x.delegate('p',ev,$).then(handler);
				test.assertNotEquals("timed bind must return placeholder object", $x, $delegate);
				test.assertEquals("event not yet triggered", 0, x);
				$x.find('p').trigger(ev);
				test.assertEquals("trigger should fire", 1, x);
				$x.undelegate('p',ev);
				test.assertEquals("event must not trigger on .undelegate", 1, x);
				$x.find('p').after('<p>').next().trigger(ev);
				test.assertEquals("because of .undelegate trigger must not happen again", 1, x);
				test.done();
			},

			".delegate(selector,event).doSomething()._": function($, test) {
				var $x = $('<div><p>');
				var $delegate = $x.delegate('p','myEvent',$).text('test');
				test.assertNotEquals("timed bind must return placeholder object", $x, $delegate);
				var $y = $delegate._;
				test.assertEquals("underscore must provide original object", $x, $y);
				test.done();
			},

		},

		"binding multiple events - timed invocation chain style": {
			
			".delegate(selector,'ev1 ev2').doSomething() + .trigger(ev1)": function($, test) {
				var $x = $('<div><p>');
				var x=0;
				function handler(){
					x++;
				}
				var $delegate = $x.delegate('p','ev1 ev2').then(handler);
				test.assertNotEquals("timed bind must return placeholder object", $x, $delegate);
				test.assertEquals("ev1 not yet triggered", 0, x);
				test.assertEquals("ev2 not yet triggered", 0, x);
				$x.undelegate('p','ev2');
				test.assertEquals("ev1 must not trigger on .undelegate", 0, x);
				test.assertEquals("ev2 must not trigger on .undelegate", 0, x);
				$x.find('p').trigger('ev1');
				test.assertEquals("ev1 should be triggered", 1, x);
				$x.find('p').trigger('ev2');
				test.assertEquals("because of .undelegate trigger must not happen", 1, x);
				$x.find('p').trigger('ev1');
				test.assertEquals("ev1 should be triggered again", 2, x);
				$x.find('p').after('<p>').next().trigger('ev2');
				test.assertEquals("ev2 still not expected to trigger", 2, x);
				test.done();
			},

			".delegate(selector,'ev1 ev2',$).doSomething() + .trigger(ev1)": function($, test) {
				var $x = $('<div><p>');
				var x=0;
				function handler(){
					x++;
				}
				var $delegate = $x.delegate('p','ev1 ev2',$).then(handler);
				test.assertNotEquals("timed bind must return placeholder object", $x, $delegate);
				test.assertEquals("ev1 not yet triggered", 0, x);
				test.assertEquals("ev2 not yet triggered", 0, x);
				$x.undelegate('p','ev2');
				test.assertEquals("ev1 must not trigger on .undelegate", 0, x);
				test.assertEquals("ev2 must not trigger on .undelegate", 0, x);
				$x.find('p').trigger('ev1');
				test.assertEquals("ev1 should be triggered", 1, x);
				$x.find('p').trigger('ev2');
				test.assertEquals("because of .undelegate trigger must not happen", 1, x);
				$x.find('p').trigger('ev1');
				test.assertEquals("ev1 should be triggered again", 2, x);
				$x.find('p').after('<p>').next().trigger('ev2');
				test.assertEquals("ev2 still not expected to trigger", 2, x);
				test.done();
			},

			".delegate(selector,'ev1 ev2').doSomething()._": function($, test) {
				var $x = $('<div><p>');
				var $delegate = $x.delegate('p','ev1 ev2',$).text('test');
				test.assertNotEquals("timed bind must return placeholder object", $x, $delegate);
				var $y = $delegate._;
				test.assertEquals("underscore must provide original object", $x, $y);
				test.done();
			},

		},
		
};