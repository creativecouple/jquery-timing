var suite = {
		
		"instant each-loop": {
		
			".each($).then(callback)": function($, test) {
				var $x = $('<div>').add('<p>').add('<span>');
				var x=0;
				var callback = function(i){
					test.assertEquals("wrong order of elements?", x, i);
					x++;
					test.assertEquals("wrong context?", 1, this.size());
					test.assertEquals("wrong context element?", $x[i], this[0]);
				};
				var tic = $x.each($).then(callback);				
				test.assertNotEquals("tic object must not be original", $x, tic);
				test.assertEquals("callback must be triggered for each element", 3, x);
				test.done();
			},
	
			".each().then(callback)": function($, test) {
				var $x = $('<div>').add('<p>').add('<span>');
				var x=0;
				var callback = function(i){
					test.assertEquals("wrong order of elements?", x, i);
					x++;
					test.assertEquals("wrong context?", 1, this.size());
					test.assertEquals("wrong context element?", $x[i], this[0]);
				};
				var tic = $x.each().then(callback);				
				test.assertNotEquals("tic object must not be original", $x, tic);
				test.assertEquals("callback must be triggered for each element", 3, x);
				test.done();
			},
	
			".each().text().all().get()": function($, test){
				var $x = $('<div>foo</div>').add('<p>bar</p>').add('<span>Foo<em>Bar</em></span>');
				test.assertEquals("jQuery's .text() method going wrong??", 'foobarFooBar', $x.text());
				var tic = $x.each().text();
				test.assertNotEquals("each-loop must return TIC object", $x, tic);
				var $y = tic.all();
				test.assertNotEquals("instant .all() must return some jQuery object", tic, $y);
				var array = $y.get();
				test.assertTrue(".get() must return some Array", array instanceof Array);
				test.assertEquals("array has wrong content", 'foo::bar::FooBar', array.join('::'));
				test.done();
			},
			
			".each().attr('class').toUpperCase().all()": function($, test){
				var $x = $('<div class="foo">').add('<p class="bar">').add('<span class="Fooo"><em class="Bar"/></span>');
				test.assertEquals("jQuery's .attr() should only find first one", 'foo', $x.attr('class'));
				var tic = $x.each().attr('class');
				test.assertNotEquals("each-loop must return TIC object", $x, tic);
				test.assertEquals("snapshot has wrong content", 'foo::bar::Fooo', $(tic).get().join('::'));
				var $y = tic.toUpperCase().all();
				test.assertNotEquals("instant .all() must return some jQuery object", tic, $y);
				test.assertEquals("result has wrong content", 'FOO::BAR::FOOO', $y.get().join('::'));
				test.done();
			},
			
			".each().next().all().end()": function($, test){
				
			},
			
		},

		"instant each-loop with delay": {
		
			".each().wait(timeout,callback)": function($, test) {
				var $x = $('<div>').add('<p>').add('<span>');
				var x=0;
				var callback = function(i){
					test.assertEquals("wrong order of elements?", x, i);
					x++;
					test.assertEquals("wrong context?", 1, this.size());
					test.assertEquals("wrong context element?", $x[i], this[0]);
				};
				var tic = $x.each().wait(0,callback);				
				test.assertNotEquals("tic object must not be original", $x, tic);
				test.assertEquals("callback must wait for timeout", 0, x);
				window.setTimeout(function(){
					test.assertEquals("callback must be triggered for each element after timeout", 3, x);
					x=0;
					var tic2 = tic.then(callback);
					test.assertEquals("tic object still must not be original", tic, tic2);
					test.assertEquals("callback must be triggered for each element", 3, x);
					test.done();
				}, 10);
			},
	
			".each().wait(event).then(callback)": function($, test) {
				var $x = $('<div>').add('<p>').add('<span>');
				var x=0;
				var callback = function(i){
					test.assertEquals("wrong order of elements?", x, i);
					x++;
					test.assertEquals("wrong context?", 1, this.size());
					test.assertEquals("wrong context element?", $x[i], this[0]);
				};
				var tic = $x.each().wait('click').then(callback);				
				test.assertNotEquals("tic object must not be original", $x, tic);
				test.assertEquals("callback must wait for event", 0, x);
				$x.eq(0).click();
				test.assertEquals("callback must be triggered for first element only", 1, x);
				$x.eq(1).click();
				test.assertEquals("callback must be triggered for second element only", 2, x);
				$x.eq(2).click();
				test.assertEquals("callback must be triggered for third element only", 3, x);
				test.done();
			},
	
		},
		
		"deferred each-loop": {

			".wait(timeout).each($).then(callback)": function($, test) {
				var $x = $('<div>').add('<p>').add('<span>');
				var x=0;
				var callback = function(i){
					test.assertEquals("wrong order of elements?", x, i);
					x++;
					test.assertEquals("wrong context?", 1, this.size());
					test.assertEquals("wrong context element?", $x[i], this[0]);
				};
				var tic = $x.wait(0).each($).then(callback);				
				test.assertNotEquals("tic object must not be original", $x, tic);
				test.assertEquals("callback must wait for timeout", 0, x);
				window.setTimeout(function(){
					test.assertEquals("callback must be triggered for each element", 3, x);
					test.done();
				}, 10);
			},
	
			".repeat(event).each().then(callback).all()": function($, test) {
				var $x = $('<div>').add('<p>').add('<span>');
				var x=0;
				var event = 'myEvent';
				var callback = function(i){
					test.assertEquals("single element in event-loop expected", 0, i);
					test.assertEquals("wrong context?", 1, this.size());
					test.assertEquals("wrong context element?", $x[x], this[0]);
					x++;
				};
				var tic = $x.repeat(event).each().then(callback).all();				
				test.assertNotEquals("tic object must not be original", $x, tic);
				test.assertEquals("callback must wait for event", 0, x);
				$x.trigger('myEvent');
				test.assertEquals("callback must be triggered for each element", 3, x);
				test.done();
			},
	
			".repeat(event).each().then(callback).until(false)": function($, test) {
				var $x = $('<div>').add('<p>').add('<span>');
				var x=0;
				var event = 'myEvent';
				var callback = function(i){
					test.assertEquals("single element in event-loop expected", 0, i);
					test.assertEquals("wrong context?", 1, this.size());
					test.assertEquals("wrong context element?", $x[x], this[0]);
					x++;
				};
				var tic = $x.repeat(event).each().then(callback).until(false);				
				test.assertNotEquals("tic object must not be original", $x, tic);
				test.assertEquals("callback must wait for event", 0, x);
				$x.trigger('myEvent');
				test.assertEquals("callback must be triggered for each element", 3, x);
				test.done();
			},
	
			".wait(timeout).each().text().all() + … + .get()": function($, test){
				
			},
			
			".wait(event).each().attr('class').toUpperCase().all() + .trigger(event) + .get()": function($, test){
				
			},
			
			".delay(timeout).join().each().next().all() + … + .end()": function($, test){
				
			},
			
		},
		
		"nested each-loops with interim snapshot states": {
			
			".each().each().doSomething().all().all()": function($, test) {
				
			},
			
			".each().children().each().wait(event).all().parent() +…+ .all()": function($, test) {
				
			},
			
			".each().repeat().doSomething().until(count).all()": function($, test) {
				
			},

			".each().children().repeat().wait(timeout) +…+ .until(count) +…+ .all()": function($, test) {
				
			},
			
		},
		
		"inner loops with open endings": {

			".each().repeat(timeout).doSomething().all()": function($, test) {
				
			},

			".each().repeat(timeout).doSomething().until(count)": function($, test) {
				
			},

			".repeat(timeout).each().doSomething().all()": function($, test) {
				
			},

			".repeat(timeout).each().doSomething().until(count)": function($, test) {
				
			},

		},
		
};