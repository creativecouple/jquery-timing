var suite = {
		
		"binding click event - classical style": {
		
			".click(handler) + .unbind('click')": function($, test) {
				var $x = $('<div>');
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
		
		"binding other DOM events - classical style": {

			".blur(handler) + .blur() + .unbind('blur')": function($, test) {
				var $x = $('<div>');
				var x=0;
				function handler(){
					x++;
				}
				var $bind = $x.blur(handler);
				test.assertEquals("classical bind must return original jQuery object", $x, $bind);
				test.assertEquals("event not yet triggered", 0, x);
				$x.blur();
				test.assertEquals("first trigger should fire", 1, x);
				$x.unbind('blur');
				test.assertEquals("event must not trigger on .unbind", 1, x);
				$x.blur();
				test.assertEquals("because of .unbind trigger must not happen", 1, x);
				$x.blur();
				test.assertEquals("still no trigger expected", 1, x);
				test.done();
			},

			".focus(handler) + .focus() + .unbind('focus')": function($, test) {
				var $x = $('<div>');
				var x=0;
				function handler(){
					x++;
				}
				var $bind = $x.focus(handler);
				test.assertEquals("classical bind must return original jQuery object", $x, $bind);
				test.assertEquals("event not yet triggered", 0, x);
				$x.focus();
				test.assertEquals("first trigger should fire", 1, x);
				$x.unbind('focus');
				test.assertEquals("event must not trigger on .unbind", 1, x);
				$x.focus();
				test.assertEquals("because of .unbind trigger must not happen", 1, x);
				$x.focus();
				test.assertEquals("still no trigger expected", 1, x);
				test.done();
			},

			".load(handler) + .load() + .unbind('load')|1.2.3": function($, test) {
				var $x = $('<div>');
				var x=0;
				function handler(){
					x++;
				}
				var $bind = $x.load(handler);
				test.assertEquals("classical bind must return original jQuery object", $x, $bind);
				test.assertEquals("event not yet triggered", 0, x);
				$x.load();
				test.assertEquals("first trigger should fire", 1, x);
				$x.unbind('load');
				test.assertEquals("event must not trigger on .unbind", 1, x);
				$x.load();
				test.assertEquals("because of .unbind trigger must not happen", 1, x);
				$x.load();
				test.assertEquals("still no trigger expected", 1, x);
				test.done();
			},

			".resize(handler) + .resize() + .unbind('resize')": function($, test) {
				var $x = $('<div>');
				var x=0;
				function handler(){
					x++;
				}
				var $bind = $x.resize(handler);
				test.assertEquals("classical bind must return original jQuery object", $x, $bind);
				test.assertEquals("event not yet triggered", 0, x);
				$x.resize();
				test.assertEquals("first trigger should fire", 1, x);
				$x.unbind('resize');
				test.assertEquals("event must not trigger on .unbind", 1, x);
				$x.resize();
				test.assertEquals("because of .unbind trigger must not happen", 1, x);
				$x.resize();
				test.assertEquals("still no trigger expected", 1, x);
				test.done();
			},

			".scroll(handler) + .scroll() + .unbind('scroll')": function($, test) {
				var $x = $('<div>');
				var x=0;
				function handler(){
					x++;
				}
				var $bind = $x.scroll(handler);
				test.assertEquals("classical bind must return original jQuery object", $x, $bind);
				test.assertEquals("event not yet triggered", 0, x);
				$x.scroll();
				test.assertEquals("first trigger should fire", 1, x);
				$x.unbind('scroll');
				test.assertEquals("event must not trigger on .unbind", 1, x);
				$x.scroll();
				test.assertEquals("because of .unbind trigger must not happen", 1, x);
				$x.scroll();
				test.assertEquals("still no trigger expected", 1, x);
				test.done();
			},

			".unload(handler) + .unload() + .unbind('unload')|1.2.3": function($, test) {
				var $x = $('<div>');
				var x=0;
				function handler(){
					x++;
				}
				var $bind = $x.unload(handler);
				test.assertEquals("classical bind must return original jQuery object", $x, $bind);
				test.assertEquals("event not yet triggered", 0, x);
				$x.unload();
				test.assertEquals("first trigger should fire", 1, x);
				$x.unbind('unload');
				test.assertEquals("event must not trigger on .unbind", 1, x);
				$x.unload();
				test.assertEquals("because of .unbind trigger must not happen", 1, x);
				$x.unload();
				test.assertEquals("still no trigger expected", 1, x);
				test.done();
			},

			".dblclick(handler) + .dblclick() + .unbind('dblclick')": function($, test) {
				var $x = $('<div>');
				var x=0;
				function handler(){
					x++;
				}
				var $bind = $x.dblclick(handler);
				test.assertEquals("classical bind must return original jQuery object", $x, $bind);
				test.assertEquals("event not yet triggered", 0, x);
				$x.dblclick();
				test.assertEquals("first trigger should fire", 1, x);
				$x.unbind('dblclick');
				test.assertEquals("event must not trigger on .unbind", 1, x);
				$x.dblclick();
				test.assertEquals("because of .unbind trigger must not happen", 1, x);
				$x.dblclick();
				test.assertEquals("still no trigger expected", 1, x);
				test.done();
			},

			".mousedown(handler) + .mousedown() + .unbind('mousedown')": function($, test) {
				var $x = $('<div>');
				var x=0;
				function handler(){
					x++;
				}
				var $bind = $x.mousedown(handler);
				test.assertEquals("classical bind must return original jQuery object", $x, $bind);
				test.assertEquals("event not yet triggered", 0, x);
				$x.mousedown();
				test.assertEquals("first trigger should fire", 1, x);
				$x.unbind('mousedown');
				test.assertEquals("event must not trigger on .unbind", 1, x);
				$x.mousedown();
				test.assertEquals("because of .unbind trigger must not happen", 1, x);
				$x.mousedown();
				test.assertEquals("still no trigger expected", 1, x);
				test.done();
			},

			".mouseup(handler) + .mouseup() + .unbind('mouseup')": function($, test) {
				var $x = $('<div>');
				var x=0;
				function handler(){
					x++;
				}
				var $bind = $x.mouseup(handler);
				test.assertEquals("classical bind must return original jQuery object", $x, $bind);
				test.assertEquals("event not yet triggered", 0, x);
				$x.mouseup();
				test.assertEquals("first trigger should fire", 1, x);
				$x.unbind('mouseup');
				test.assertEquals("event must not trigger on .unbind", 1, x);
				$x.mouseup();
				test.assertEquals("because of .unbind trigger must not happen", 1, x);
				$x.mouseup();
				test.assertEquals("still no trigger expected", 1, x);
				test.done();
			},

			".mousemove(handler) + .mousemove() + .unbind('mousemove')": function($, test) {
				var $x = $('<div>');
				var x=0;
				function handler(){
					x++;
				}
				var $bind = $x.mousemove(handler);
				test.assertEquals("classical bind must return original jQuery object", $x, $bind);
				test.assertEquals("event not yet triggered", 0, x);
				$x.mousemove();
				test.assertEquals("first trigger should fire", 1, x);
				$x.unbind('mousemove');
				test.assertEquals("event must not trigger on .unbind", 1, x);
				$x.mousemove();
				test.assertEquals("because of .unbind trigger must not happen", 1, x);
				$x.mousemove();
				test.assertEquals("still no trigger expected", 1, x);
				test.done();
			},

			".mouseover(handler) + .mouseover() + .unbind('mouseover')": function($, test) {
				var $x = $('<div>');
				var x=0;
				function handler(){
					x++;
				}
				var $bind = $x.mouseover(handler);
				test.assertEquals("classical bind must return original jQuery object", $x, $bind);
				test.assertEquals("event not yet triggered", 0, x);
				$x.mouseover();
				test.assertEquals("first trigger should fire", 1, x);
				$x.unbind('mouseover');
				test.assertEquals("event must not trigger on .unbind", 1, x);
				$x.mouseover();
				test.assertEquals("because of .unbind trigger must not happen", 1, x);
				$x.mouseover();
				test.assertEquals("still no trigger expected", 1, x);
				test.done();
			},

			".mouseout(handler) + .mouseout() + .unbind('mouseout')": function($, test) {
				var $x = $('<div>');
				var x=0;
				function handler(){
					x++;
				}
				var $bind = $x.mouseout(handler);
				test.assertEquals("classical bind must return original jQuery object", $x, $bind);
				test.assertEquals("event not yet triggered", 0, x);
				$x.mouseout();
				test.assertEquals("first trigger should fire", 1, x);
				$x.unbind('mouseout');
				test.assertEquals("event must not trigger on .unbind", 1, x);
				$x.mouseout();
				test.assertEquals("because of .unbind trigger must not happen", 1, x);
				$x.mouseout();
				test.assertEquals("still no trigger expected", 1, x);
				test.done();
			},

			".change(handler) + .change() + .unbind('change')": function($, test) {
				var $x = $('<div>');
				var x=0;
				function handler(){
					x++;
				}
				var $bind = $x.change(handler);
				test.assertEquals("classical bind must return original jQuery object", $x, $bind);
				test.assertEquals("event not yet triggered", 0, x);
				$x.change();
				test.assertEquals("first trigger should fire", 1, x);
				$x.unbind('change');
				test.assertEquals("event must not trigger on .unbind", 1, x);
				$x.change();
				test.assertEquals("because of .unbind trigger must not happen", 1, x);
				$x.change();
				test.assertEquals("still no trigger expected", 1, x);
				test.done();
			},

			".select(handler) + .select() + .unbind('select')": function($, test) {
				var $x = $('<div>');
				var x=0;
				function handler(){
					x++;
				}
				var $bind = $x.select(handler);
				test.assertEquals("classical bind must return original jQuery object", $x, $bind);
				test.assertEquals("event not yet triggered", 0, x);
				$x.select();
				test.assertEquals("first trigger should fire", 1, x);
				$x.unbind('select');
				test.assertEquals("event must not trigger on .unbind", 1, x);
				$x.select();
				test.assertEquals("because of .unbind trigger must not happen", 1, x);
				$x.select();
				test.assertEquals("still no trigger expected", 1, x);
				test.done();
			},

			".submit(handler) + .submit() + .unbind('submit')": function($, test) {
				var $x = $('<div>');
				var x=0;
				function handler(){
					x++;
				}
				var $bind = $x.submit(handler);
				test.assertEquals("classical bind must return original jQuery object", $x, $bind);
				test.assertEquals("event not yet triggered", 0, x);
				$x.submit();
				test.assertEquals("first trigger should fire", 1, x);
				$x.unbind('submit');
				test.assertEquals("event must not trigger on .unbind", 1, x);
				$x.submit();
				test.assertEquals("because of .unbind trigger must not happen", 1, x);
				$x.submit();
				test.assertEquals("still no trigger expected", 1, x);
				test.done();
			},

			".keydown(handler) + .keydown() + .unbind('keydown')": function($, test) {
				var $x = $('<div>');
				var x=0;
				function handler(){
					x++;
				}
				var $bind = $x.keydown(handler);
				test.assertEquals("classical bind must return original jQuery object", $x, $bind);
				test.assertEquals("event not yet triggered", 0, x);
				$x.keydown();
				test.assertEquals("first trigger should fire", 1, x);
				$x.unbind('keydown');
				test.assertEquals("event must not trigger on .unbind", 1, x);
				$x.keydown();
				test.assertEquals("because of .unbind trigger must not happen", 1, x);
				$x.keydown();
				test.assertEquals("still no trigger expected", 1, x);
				test.done();
			},

			".keypress(handler) + .keypress() + .unbind('keypress')": function($, test) {
				var $x = $('<div>');
				var x=0;
				function handler(){
					x++;
				}
				var $bind = $x.keypress(handler);
				test.assertEquals("classical bind must return original jQuery object", $x, $bind);
				test.assertEquals("event not yet triggered", 0, x);
				$x.keypress();
				test.assertEquals("first trigger should fire", 1, x);
				$x.unbind('keypress');
				test.assertEquals("event must not trigger on .unbind", 1, x);
				$x.keypress();
				test.assertEquals("because of .unbind trigger must not happen", 1, x);
				$x.keypress();
				test.assertEquals("still no trigger expected", 1, x);
				test.done();
			},

			".keyup(handler) + .keyup() + .unbind('keyup')": function($, test) {
				var $x = $('<div>');
				var x=0;
				function handler(){
					x++;
				}
				var $bind = $x.keyup(handler);
				test.assertEquals("classical bind must return original jQuery object", $x, $bind);
				test.assertEquals("event not yet triggered", 0, x);
				$x.keyup();
				test.assertEquals("first trigger should fire", 1, x);
				$x.unbind('keyup');
				test.assertEquals("event must not trigger on .unbind", 1, x);
				$x.keyup();
				test.assertEquals("because of .unbind trigger must not happen", 1, x);
				$x.keyup();
				test.assertEquals("still no trigger expected", 1, x);
				test.done();
			},

			".error(handler) + .error() + .unbind('error')": function($, test) {
				var $x = $('<div>');
				var x=0;
				function handler(){
					x++;
				}
				var $bind = $x.error(handler);
				test.assertEquals("classical bind must return original jQuery object", $x, $bind);
				test.assertEquals("event not yet triggered", 0, x);
				$x.error();
				test.assertEquals("first trigger should fire", 1, x);
				$x.unbind('error');
				test.assertEquals("event must not trigger on .unbind", 1, x);
				$x.error();
				test.assertEquals("because of .unbind trigger must not happen", 1, x);
				$x.error();
				test.assertEquals("still no trigger expected", 1, x);
				test.done();
			},

		},

		"binding DOM event - timed invocation chain style": {
			
			".click($).doSomething() + .click()": function($, test) {
				var $x = $('<div>');
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

			".blur($).doSomething() + .blur()": function($, test) {
				var $x = $('<div>');
				var x=0;
				function handler(){
					x++;
					test.assertEquals("context object must be original", $x.get(0), this.get(0));
				}
				var $bind = $x.blur($).then(handler);
				test.assertNotEquals("timed bind must return placeholder object", $x, $bind);
				test.assertEquals("event not yet triggered", 0, x);
				$x.blur();
				test.assertEquals("trigger should fire", 1, x);
				$x.unbind('blur');
				test.assertEquals("event must not trigger on .unbind", 1, x);
				$x.blur();
				test.assertEquals("because of .unbind trigger must not happen again", 1, x);
				test.done();
			},

			".focus($).doSomething() + .focus()": function($, test) {
				var $x = $('<div>');
				var x=0;
				function handler(){
					x++;
					test.assertEquals("context object must be original", $x.get(0), this.get(0));
				}
				var $bind = $x.focus($).then(handler);
				test.assertNotEquals("timed bind must return placeholder object", $x, $bind);
				test.assertEquals("event not yet triggered", 0, x);
				$x.focus();
				test.assertEquals("trigger should fire", 1, x);
				$x.unbind('focus');
				test.assertEquals("event must not trigger on .unbind", 1, x);
				$x.focus();
				test.assertEquals("because of .unbind trigger must not happen again", 1, x);
				test.done();
			},

			".load($).doSomething() + .load()|1.2.3": function($, test) {
				var $x = $('<div>');
				var x=0;
				function handler(){
					x++;
					test.assertEquals("context object must be original", $x.get(0), this.get(0));
				}
				var $bind = $x.load($).then(handler);
				test.assertNotEquals("timed bind must return placeholder object", $x, $bind);
				test.assertEquals("event not yet triggered", 0, x);
				$x.load();
				test.assertEquals("trigger should fire", 1, x);
				$x.unbind('load');
				test.assertEquals("event must not trigger on .unbind", 1, x);
				$x.load();
				test.assertEquals("because of .unbind trigger must not happen again", 1, x);
				test.done();
			},

			".resize($).doSomething() + .resize()": function($, test) {
				var $x = $('<div>');
				var x=0;
				function handler(){
					x++;
					test.assertEquals("context object must be original", $x.get(0), this.get(0));
				}
				var $bind = $x.resize($).then(handler);
				test.assertNotEquals("timed bind must return placeholder object", $x, $bind);
				test.assertEquals("event not yet triggered", 0, x);
				$x.resize();
				test.assertEquals("trigger should fire", 1, x);
				$x.unbind('resize');
				test.assertEquals("event must not trigger on .unbind", 1, x);
				$x.resize();
				test.assertEquals("because of .unbind trigger must not happen again", 1, x);
				test.done();
			},

			".scroll($).doSomething() + .scroll()": function($, test) {
				var $x = $('<div>');
				var x=0;
				function handler(){
					x++;
					test.assertEquals("context object must be original", $x.get(0), this.get(0));
				}
				var $bind = $x.scroll($).then(handler);
				test.assertNotEquals("timed bind must return placeholder object", $x, $bind);
				test.assertEquals("event not yet triggered", 0, x);
				$x.scroll();
				test.assertEquals("trigger should fire", 1, x);
				$x.unbind('scroll');
				test.assertEquals("event must not trigger on .unbind", 1, x);
				$x.scroll();
				test.assertEquals("because of .unbind trigger must not happen again", 1, x);
				test.done();
			},

			".unload($).doSomething() + .unload()|1.2.3": function($, test) {
				var $x = $('<div>');
				var x=0;
				function handler(){
					x++;
					test.assertEquals("context object must be original", $x.get(0), this.get(0));
				}
				var $bind = $x.unload($).then(handler);
				test.assertNotEquals("timed bind must return placeholder object", $x, $bind);
				test.assertEquals("event not yet triggered", 0, x);
				$x.unload();
				test.assertEquals("trigger should fire", 1, x);
				$x.unbind('unload');
				test.assertEquals("event must not trigger on .unbind", 1, x);
				$x.unload();
				test.assertEquals("because of .unbind trigger must not happen again", 1, x);
				test.done();
			},

			".dblclick($).doSomething() + .dblclick()": function($, test) {
				var $x = $('<div>');
				var x=0;
				function handler(){
					x++;
					test.assertEquals("context object must be original", $x.get(0), this.get(0));
				}
				var $bind = $x.dblclick($).then(handler);
				test.assertNotEquals("timed bind must return placeholder object", $x, $bind);
				test.assertEquals("event not yet triggered", 0, x);
				$x.dblclick();
				test.assertEquals("trigger should fire", 1, x);
				$x.unbind('dblclick');
				test.assertEquals("event must not trigger on .unbind", 1, x);
				$x.dblclick();
				test.assertEquals("because of .unbind trigger must not happen again", 1, x);
				test.done();
			},

			".mousedown($).doSomething() + .mousedown()": function($, test) {
				var $x = $('<div>');
				var x=0;
				function handler(){
					x++;
					test.assertEquals("context object must be original", $x.get(0), this.get(0));
				}
				var $bind = $x.mousedown($).then(handler);
				test.assertNotEquals("timed bind must return placeholder object", $x, $bind);
				test.assertEquals("event not yet triggered", 0, x);
				$x.mousedown();
				test.assertEquals("trigger should fire", 1, x);
				$x.unbind('mousedown');
				test.assertEquals("event must not trigger on .unbind", 1, x);
				$x.mousedown();
				test.assertEquals("because of .unbind trigger must not happen again", 1, x);
				test.done();
			},

			".mouseup($).doSomething() + .mouseup()": function($, test) {
				var $x = $('<div>');
				var x=0;
				function handler(){
					x++;
					test.assertEquals("context object must be original", $x.get(0), this.get(0));
				}
				var $bind = $x.mouseup($).then(handler);
				test.assertNotEquals("timed bind must return placeholder object", $x, $bind);
				test.assertEquals("event not yet triggered", 0, x);
				$x.mouseup();
				test.assertEquals("trigger should fire", 1, x);
				$x.unbind('mouseup');
				test.assertEquals("event must not trigger on .unbind", 1, x);
				$x.mouseup();
				test.assertEquals("because of .unbind trigger must not happen again", 1, x);
				test.done();
			},

			".mousemove($).doSomething() + .mousemove()": function($, test) {
				var $x = $('<div>');
				var x=0;
				function handler(){
					x++;
					test.assertEquals("context object must be original", $x.get(0), this.get(0));
				}
				var $bind = $x.mousemove($).then(handler);
				test.assertNotEquals("timed bind must return placeholder object", $x, $bind);
				test.assertEquals("event not yet triggered", 0, x);
				$x.mousemove();
				test.assertEquals("trigger should fire", 1, x);
				$x.unbind('mousemove');
				test.assertEquals("event must not trigger on .unbind", 1, x);
				$x.mousemove();
				test.assertEquals("because of .unbind trigger must not happen again", 1, x);
				test.done();
			},

			".mouseover($).doSomething() + .mouseover()": function($, test) {
				var $x = $('<div>');
				var x=0;
				function handler(){
					x++;
					test.assertEquals("context object must be original", $x.get(0), this.get(0));
				}
				var $bind = $x.mouseover($).then(handler);
				test.assertNotEquals("timed bind must return placeholder object", $x, $bind);
				test.assertEquals("event not yet triggered", 0, x);
				$x.mouseover();
				test.assertEquals("trigger should fire", 1, x);
				$x.unbind('mouseover');
				test.assertEquals("event must not trigger on .unbind", 1, x);
				$x.mouseover();
				test.assertEquals("because of .unbind trigger must not happen again", 1, x);
				test.done();
			},

			".mouseout($).doSomething() + .mouseout()": function($, test) {
				var $x = $('<div>');
				var x=0;
				function handler(){
					x++;
					test.assertEquals("context object must be original", $x.get(0), this.get(0));
				}
				var $bind = $x.mouseout($).then(handler);
				test.assertNotEquals("timed bind must return placeholder object", $x, $bind);
				test.assertEquals("event not yet triggered", 0, x);
				$x.mouseout();
				test.assertEquals("trigger should fire", 1, x);
				$x.unbind('mouseout');
				test.assertEquals("event must not trigger on .unbind", 1, x);
				$x.mouseout();
				test.assertEquals("because of .unbind trigger must not happen again", 1, x);
				test.done();
			},

			".change($).doSomething() + .change()": function($, test) {
				var $x = $('<div>');
				var x=0;
				function handler(){
					x++;
					test.assertEquals("context object must be original", $x.get(0), this.get(0));
				}
				var $bind = $x.change($).then(handler);
				test.assertNotEquals("timed bind must return placeholder object", $x, $bind);
				test.assertEquals("event not yet triggered", 0, x);
				$x.change();
				test.assertEquals("trigger should fire", 1, x);
				$x.unbind('change');
				test.assertEquals("event must not trigger on .unbind", 1, x);
				$x.change();
				test.assertEquals("because of .unbind trigger must not happen again", 1, x);
				test.done();
			},

			".select($).doSomething() + .select()": function($, test) {
				var $x = $('<div>');
				var x=0;
				function handler(){
					x++;
					test.assertEquals("context object must be original", $x.get(0), this.get(0));
				}
				var $bind = $x.select($).then(handler);
				test.assertNotEquals("timed bind must return placeholder object", $x, $bind);
				test.assertEquals("event not yet triggered", 0, x);
				$x.select();
				test.assertEquals("trigger should fire", 1, x);
				$x.unbind('select');
				test.assertEquals("event must not trigger on .unbind", 1, x);
				$x.select();
				test.assertEquals("because of .unbind trigger must not happen again", 1, x);
				test.done();
			},

			".submit($).doSomething() + .submit()": function($, test) {
				var $x = $('<div>');
				var x=0;
				function handler(){
					x++;
					test.assertEquals("context object must be original", $x.get(0), this.get(0));
				}
				var $bind = $x.submit($).then(handler);
				test.assertNotEquals("timed bind must return placeholder object", $x, $bind);
				test.assertEquals("event not yet triggered", 0, x);
				$x.submit();
				test.assertEquals("trigger should fire", 1, x);
				$x.unbind('submit');
				test.assertEquals("event must not trigger on .unbind", 1, x);
				$x.submit();
				test.assertEquals("because of .unbind trigger must not happen again", 1, x);
				test.done();
			},

			".keydown($).doSomething() + .keydown()": function($, test) {
				var $x = $('<div>');
				var x=0;
				function handler(){
					x++;
					test.assertEquals("context object must be original", $x.get(0), this.get(0));
				}
				var $bind = $x.keydown($).then(handler);
				test.assertNotEquals("timed bind must return placeholder object", $x, $bind);
				test.assertEquals("event not yet triggered", 0, x);
				$x.keydown();
				test.assertEquals("trigger should fire", 1, x);
				$x.unbind('keydown');
				test.assertEquals("event must not trigger on .unbind", 1, x);
				$x.keydown();
				test.assertEquals("because of .unbind trigger must not happen again", 1, x);
				test.done();
			},

			".keypress($).doSomething() + .keypress()": function($, test) {
				var $x = $('<div>');
				var x=0;
				function handler(){
					x++;
					test.assertEquals("context object must be original", $x.get(0), this.get(0));
				}
				var $bind = $x.keypress($).then(handler);
				test.assertNotEquals("timed bind must return placeholder object", $x, $bind);
				test.assertEquals("event not yet triggered", 0, x);
				$x.keypress();
				test.assertEquals("trigger should fire", 1, x);
				$x.unbind('keypress');
				test.assertEquals("event must not trigger on .unbind", 1, x);
				$x.keypress();
				test.assertEquals("because of .unbind trigger must not happen again", 1, x);
				test.done();
			},

			".keyup($).doSomething() + .keyup()": function($, test) {
				var $x = $('<div>');
				var x=0;
				function handler(){
					x++;
					test.assertEquals("context object must be original", $x.get(0), this.get(0));
				}
				var $bind = $x.keyup($).then(handler);
				test.assertNotEquals("timed bind must return placeholder object", $x, $bind);
				test.assertEquals("event not yet triggered", 0, x);
				$x.keyup();
				test.assertEquals("trigger should fire", 1, x);
				$x.unbind('keyup');
				test.assertEquals("event must not trigger on .unbind", 1, x);
				$x.keyup();
				test.assertEquals("because of .unbind trigger must not happen again", 1, x);
				test.done();
			},

			".error($).doSomething() + .error()": function($, test) {
				var $x = $('<div>');
				var x=0;
				function handler(){
					x++;
					test.assertEquals("context object must be original", $x.get(0), this.get(0));
				}
				var $bind = $x.error($).then(handler);
				test.assertNotEquals("timed bind must return placeholder object", $x, $bind);
				test.assertEquals("event not yet triggered", 0, x);
				$x.error();
				test.assertEquals("trigger should fire", 1, x);
				$x.unbind('error');
				test.assertEquals("event must not trigger on .unbind", 1, x);
				$x.error();
				test.assertEquals("because of .unbind trigger must not happen again", 1, x);
				test.done();
			},

		},
		
		"access original context": {
			
			"$(some).blur($).doThisLater()._.doThatNow()": function($, test){
				$x = $('<div>');
				$x.blur($).text('later')._.text('now');
				test.assertEquals("immediate action must have happened already", 'now', $x.text());
				$x.blur();
				test.assertEquals("later action must have happened after .blur()", 'later', $x.text());
				test.done();
			},

			"$(some).focus($).doThisLater()._.doThatNow()": function($, test){
				$x = $('<div>');
				$x.focus($).text('later')._.text('now');
				test.assertEquals("immediate action must have happened already", 'now', $x.text());
				$x.focus();
				test.assertEquals("later action must have happened after .focus()", 'later', $x.text());
				test.done();
			},

			"$(some).load($).doThisLater()._.doThatNow()|1.2.3": function($, test){
				$x = $('<div>');
				$x.load($).text('later')._.text('now');
				test.assertEquals("immediate action must have happened already", 'now', $x.text());
				$x.load();
				test.assertEquals("later action must have happened after .load()", 'later', $x.text());
				test.done();
			},

			"$(some).resize($).doThisLater()._.doThatNow()": function($, test){
				$x = $('<div>');
				$x.resize($).text('later')._.text('now');
				test.assertEquals("immediate action must have happened already", 'now', $x.text());
				$x.resize();
				test.assertEquals("later action must have happened after .resize()", 'later', $x.text());
				test.done();
			},

			"$(some).scroll($).doThisLater()._.doThatNow()": function($, test){
				$x = $('<div>');
				$x.scroll($).text('later')._.text('now');
				test.assertEquals("immediate action must have happened already", 'now', $x.text());
				$x.scroll();
				test.assertEquals("later action must have happened after .scroll()", 'later', $x.text());
				test.done();
			},

			"$(some).unload($).doThisLater()._.doThatNow()|1.2.3": function($, test){
				$x = $('<div>');
				$x.unload($).text('later')._.text('now');
				test.assertEquals("immediate action must have happened already", 'now', $x.text());
				$x.unload();
				test.assertEquals("later action must have happened after .unload()", 'later', $x.text());
				test.done();
			},
			
			"$(some).click($).doThisLater()._.doThatNow()": function($, test){
				$x = $('<div>');
				$x.click($).text('later')._.text('now');
				test.assertEquals("immediate action must have happened already", 'now', $x.text());
				$x.click();
				test.assertEquals("later action must have happened after .click()", 'later', $x.text());
				test.done();
			},

			"$(some).dblclick($).doThisLater()._.doThatNow()": function($, test){
				$x = $('<div>');
				$x.dblclick($).text('later')._.text('now');
				test.assertEquals("immediate action must have happened already", 'now', $x.text());
				$x.dblclick();
				test.assertEquals("later action must have happened after .dblclick()", 'later', $x.text());
				test.done();
			},

			"$(some).mousedown($).doThisLater()._.doThatNow()": function($, test){
				$x = $('<div>');
				$x.mousedown($).text('later')._.text('now');
				test.assertEquals("immediate action must have happened already", 'now', $x.text());
				$x.mousedown();
				test.assertEquals("later action must have happened after .mousedown()", 'later', $x.text());
				test.done();
			},

			"$(some).mouseup($).doThisLater()._.doThatNow()": function($, test){
				$x = $('<div>');
				$x.mouseup($).text('later')._.text('now');
				test.assertEquals("immediate action must have happened already", 'now', $x.text());
				$x.mouseup();
				test.assertEquals("later action must have happened after .mouseup()", 'later', $x.text());
				test.done();
			},

			"$(some).mousemove($).doThisLater()._.doThatNow()": function($, test){
				$x = $('<div>');
				$x.mousemove($).text('later')._.text('now');
				test.assertEquals("immediate action must have happened already", 'now', $x.text());
				$x.mousemove();
				test.assertEquals("later action must have happened after .mousemove()", 'later', $x.text());
				test.done();
			},

			"$(some).mouseover($).doThisLater()._.doThatNow()": function($, test){
				$x = $('<div>');
				$x.mouseover($).text('later')._.text('now');
				test.assertEquals("immediate action must have happened already", 'now', $x.text());
				$x.mouseover();
				test.assertEquals("later action must have happened after .mouseover()", 'later', $x.text());
				test.done();
			},

			"$(some).mouseout($).doThisLater()._.doThatNow()": function($, test){
				$x = $('<div>');
				$x.mouseout($).text('later')._.text('now');
				test.assertEquals("immediate action must have happened already", 'now', $x.text());
				$x.mouseout();
				test.assertEquals("later action must have happened after .mouseout()", 'later', $x.text());
				test.done();
			},

			"$(some).change($).doThisLater()._.doThatNow()": function($, test){
				$x = $('<div>');
				$x.change($).text('later')._.text('now');
				test.assertEquals("immediate action must have happened already", 'now', $x.text());
				$x.change();
				test.assertEquals("later action must have happened after .change()", 'later', $x.text());
				test.done();
			},

			"$(some).select($).doThisLater()._.doThatNow()": function($, test){
				$x = $('<div>');
				$x.select($).text('later')._.text('now');
				test.assertEquals("immediate action must have happened already", 'now', $x.text());
				$x.select();
				test.assertEquals("later action must have happened after .select()", 'later', $x.text());
				test.done();
			},

			"$(some).submit($).doThisLater()._.doThatNow()": function($, test){
				$x = $('<div>');
				$x.submit($).text('later')._.text('now');
				test.assertEquals("immediate action must have happened already", 'now', $x.text());
				$x.submit();
				test.assertEquals("later action must have happened after .submit()", 'later', $x.text());
				test.done();
			},

			"$(some).keydown($).doThisLater()._.doThatNow()": function($, test){
				$x = $('<div>');
				$x.keydown($).text('later')._.text('now');
				test.assertEquals("immediate action must have happened already", 'now', $x.text());
				$x.keydown();
				test.assertEquals("later action must have happened after .keydown()", 'later', $x.text());
				test.done();
			},

			"$(some).keypress($).doThisLater()._.doThatNow()": function($, test){
				$x = $('<div>');
				$x.keypress($).text('later')._.text('now');
				test.assertEquals("immediate action must have happened already", 'now', $x.text());
				$x.keypress();
				test.assertEquals("later action must have happened after .keypress()", 'later', $x.text());
				test.done();
			},

			"$(some).keyup($).doThisLater()._.doThatNow()": function($, test){
				$x = $('<div>');
				$x.keyup($).text('later')._.text('now');
				test.assertEquals("immediate action must have happened already", 'now', $x.text());
				$x.keyup();
				test.assertEquals("later action must have happened after .keyup()", 'later', $x.text());
				test.done();
			},

			"$(some).error($).doThisLater()._.doThatNow()": function($, test){
				$x = $('<div>');
				$x.error($).text('later')._.text('now');
				test.assertEquals("immediate action must have happened already", 'now', $x.text());
				$x.error();
				test.assertEquals("later action must have happened after .error()", 'later', $x.text());
				test.done();
			},

		},

};