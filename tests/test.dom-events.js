var suite = {
		
		"binding DOM events - classical style": {
		
			".click(handler) + .unbind('click')": function($, test) {
				var $x = $('<div>');
				var ev = 'myEvent';
				var x=0;
				function handler(){
					x++;
				}
				var $bind = $x.click(handler);
				test.assertEquals("classical bind must return original jQuery object", $x, $bind);
				test.assertEquals("event not yet triggered", 0, x);
				$x.unbind('click');
				test.assertEquals("event must not trigger on .unbind", 0, x);
				$x.click();
				test.assertEquals("because of .unbind trigger must not happen", 0, x);
				$x.click();
				test.assertEquals("still no trigger expected", 0, x);
				test.done();
			},

			".click(data,handler) + .unbind('click')|1.4.3": function($, test) {
				var $x = $('<div>');
				var ev = 'myEvent';
				var x=0;
				function handler(event){
					x++;
					test.assertEquals("event data must be passed", true, event.data.prop);
				}
				var $bind = $x.click({prop: true}, handler);
				test.assertEquals("classical bind must return original jQuery object", $x, $bind);
				test.assertEquals("event not yet triggered", 0, x);
				$x.unbind('click');
				test.assertEquals("event must not trigger on .unbind", 0, x);
				$x.click();
				test.assertEquals("because of .unbind trigger must not happen", 0, x);
				$x.click();
				test.assertEquals("still no trigger expected", 0, x);
				test.done();
			},

			".click(handler) + .unbind('click',handler)": function($, test) {
				var $x = $('<div>');
				var ev = 'myEvent';
				var x=0;
				function handler(){
					x++;
				}
				var $bind = $x.click(handler);
				test.assertEquals("classical bind must return original jQuery object", $x, $bind);
				test.assertEquals("event not yet triggered", 0, x);
				$x.unbind('click',handler);
				test.assertEquals("event must not trigger on .unbind", 0, x);
				$x.click();
				test.assertEquals("because of .unbind trigger must not happen", 0, x);
				$x.click();
				test.assertEquals("still no trigger expected", 0, x);
				test.done();
			},

			".click(data,handler) + .unbind('click',handler)|1.4.3": function($, test) {
				var $x = $('<div>');
				var ev = 'myEvent';
				var x=0;
				function handler(event){
					x++;
					test.assertEquals("event data must be passed", true, event.data.prop);
				}
				var $bind = $x.click({prop: true}, handler);
				test.assertEquals("classical bind must return original jQuery object", $x, $bind);
				test.assertEquals("event not yet triggered", 0, x);
				$x.unbind('click',handler);
				test.assertEquals("event must not trigger on .unbind", 0, x);
				$x.click();
				test.assertEquals("because of .unbind trigger must not happen", 0, x);
				$x.click();
				test.assertEquals("still no trigger expected", 0, x);
				test.done();
			},

			".click(handler) + .unbind('click',otherHandler)": function($, test) {
				var $x = $('<div>');
				var ev = 'myEvent';
				var x=0;
				function handler(){
					x++;
				}
				var $bind = $x.click(handler);
				test.assertEquals("classical bind must return original jQuery object", $x, $bind);
				test.assertEquals("event not yet triggered", 0, x);
				$x.unbind('click', function(){x++;});
				test.assertEquals("event must not trigger on .unbind", 0, x);
				$x.click();
				test.assertEquals("because of unbinding other handler trigger must happen", 1, x);
				$x.click();
				test.assertEquals("still trigger expected", 2, x);
				test.done();
			},

			".click(data,handler) + .unbind('click',otherHandler)|1.4.3": function($, test) {
				var $x = $('<div>');
				var ev = 'myEvent';
				var x=0;
				function handler(event){
					x++;
					test.assertEquals("event data must be passed", true, event.data.prop);
				}
				var $bind = $x.click({prop: true}, handler);
				test.assertEquals("classical bind must return original jQuery object", $x, $bind);
				test.assertEquals("event not yet triggered", 0, x);
				$x.unbind('click', function(){x++;});
				test.assertEquals("event must not trigger on .unbind", 0, x);
				$x.click();
				test.assertEquals("because of unbinding other handler trigger must happen", 1, x);
				$x.click();
				test.assertEquals("still trigger expected", 2, x);
				test.done();
			},

			".click(handler) + .click() + .unbind('click')": function($, test) {
				var $x = $('<div>');
				var ev = 'myEvent';
				var x=0;
				function handler(){
					x++;
				}
				var $bind = $x.click(handler);
				test.assertEquals("classical bind must return original jQuery object", $x, $bind);
				test.assertEquals("event not yet triggered", 0, x);
				$x.click();
				test.assertEquals("first trigger should fire", 1, x);
				$x.unbind('click');
				test.assertEquals("event must not trigger on .unbind", 1, x);
				$x.click();
				test.assertEquals("because of .unbind trigger must not happen", 1, x);
				$x.click();
				test.assertEquals("still no trigger expected", 1, x);
				test.done();
			},

			".click(data,handler) + .click() + .unbind('click')|1.4.3": function($, test) {
				var $x = $('<div>');
				var ev = 'myEvent';
				var x=0;
				function handler(event){
					x++;
					test.assertEquals("event data must be passed", true, event.data.prop);
				}
				var $bind = $x.click({prop: true}, handler);
				test.assertEquals("classical bind must return original jQuery object", $x, $bind);
				test.assertEquals("event not yet triggered", 0, x);
				$x.click();
				test.assertEquals("first trigger should fire", 1, x);
				$x.unbind('click');
				test.assertEquals("event must not trigger on .unbind", 1, x);
				$x.click();
				test.assertEquals("because of .unbind trigger must not happen", 1, x);
				$x.click();
				test.assertEquals("still no trigger expected", 1, x);
				test.done();
			},

			".click(handler) + .click() + .unbind('click',handler)": function($, test) {
				var $x = $('<div>');
				var ev = 'myEvent';
				var x=0;
				function handler(){
					x++;
				}
				var $bind = $x.click(handler);
				test.assertEquals("classical bind must return original jQuery object", $x, $bind);
				test.assertEquals("event not yet triggered", 0, x);
				$x.click();
				test.assertEquals("first trigger should fire", 1, x);
				$x.unbind('click', handler);
				test.assertEquals("event must not trigger on .unbind", 1, x);
				$x.click();
				test.assertEquals("because of .unbind trigger must not happen", 1, x);
				$x.click();
				test.assertEquals("still no trigger expected", 1, x);
				test.done();
			},
			
			".click(data,handler) + .click() + .unbind('click',handler)|1.4.3": function($, test) {
				var $x = $('<div>');
				var ev = 'myEvent';
				var x=0;
				function handler(event){
					x++;
					test.assertEquals("event data must be passed", true, event.data.prop);
				}
				var $bind = $x.click({prop: true}, handler);
				test.assertEquals("classical bind must return original jQuery object", $x, $bind);
				test.assertEquals("event not yet triggered", 0, x);
				$x.click();
				test.assertEquals("first trigger should fire", 1, x);
				$x.unbind('click', handler);
				test.assertEquals("event must not trigger on .unbind", 1, x);
				$x.click();
				test.assertEquals("because of .unbind trigger must not happen", 1, x);
				$x.click();
				test.assertEquals("still no trigger expected", 1, x);
				test.done();
			},
			
			".click(handler) + .click() + .unbind('click',otherHandler)": function($, test) {
				var $x = $('<div>');
				var ev = 'myEvent';
				var x=0;
				function handler(){
					x++;
				}
				var $bind = $x.click(handler);
				test.assertEquals("classical bind must return original jQuery object", $x, $bind);
				test.assertEquals("event not yet triggered", 0, x);
				$x.click();
				test.assertEquals("first trigger should fire", 1, x);
				$x.unbind('click', function(){x++;});
				test.assertEquals("event must not trigger on .unbind", 1, x);
				$x.click();
				test.assertEquals("because of unbinding other handler trigger must happen", 2, x);
				$x.click();
				test.assertEquals("still trigger expected", 3, x);
				test.done();
			},

			".click(data,handler) + .click() + .unbind('click',otherHandler)|1.4.3": function($, test) {
				var $x = $('<div>');
				var ev = 'myEvent';
				var x=0;
				function handler(event){
					x++;
					test.assertEquals("event data must be passed", true, event.data.prop);
				}
				var $bind = $x.click({prop: true}, handler);
				test.assertEquals("classical bind must return original jQuery object", $x, $bind);
				test.assertEquals("event not yet triggered", 0, x);
				$x.click();
				test.assertEquals("first trigger should fire", 1, x);
				$x.unbind('click', function(){x++;});
				test.assertEquals("event must not trigger on .unbind", 1, x);
				$x.click();
				test.assertEquals("because of unbinding other handler trigger must happen", 2, x);
				$x.click();
				test.assertEquals("still trigger expected", 3, x);
				test.done();
			},

		},

		"binding single event - timed invocation chain style": {
			
			".click($).doSomething() + .click()": function($, test) {
				var $x = $('<div>');
				var ev = 'myEvent';
				var x=0;
				function handler(){
					x++;
					test.assertEquals("context object must be original", $x.get(0), this.get(0));
				}
				var $bind = $x.click($).then(handler);
				test.assertNotEquals("timed bind must return placeholder object", $x, $bind);
				test.assertEquals("event not yet triggered", 0, x);
				$x.click();
				test.assertEquals("trigger should fire", 1, x);
				$x.unbind('click');
				test.assertEquals("event must not trigger on .unbind", 1, x);
				$x.click();
				test.assertEquals("because of .unbind trigger must not happen again", 1, x);
				test.done();
			},

			".click($).doSomething()._": function($, test) {
				var $x = $('<div>');
				var $bind = $x.click($).text('test');
				test.assertNotEquals("timed bind must return placeholder object", $x, $bind);
				var $y = $bind._;
				test.assertEquals("underscore must provide original object", $x, $y);
				test.done();
			},

		}
		
};