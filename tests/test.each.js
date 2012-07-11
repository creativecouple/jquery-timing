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
				window.setTimeot(function(){
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
	
			".repeat(event).each().then(callback)": function($, test) {
				var $x = $('<div>').add('<p>').add('<span>');
				var x=0;
				var callback = function(i){
					test.assertEquals("wrong order of elements?", x, i);
					x++;
					test.assertEquals("wrong context?", 1, this.size());
					test.assertEquals("wrong context element?", $x[i], this[0]);
				};
				var tic = $x.repeat(event).each().then(callback).until(false);				
				test.assertNotEquals("tic object must not be original", $x, tic);
				test.assertEquals("callback must wait for event", 0, x);
				test.assertEquals("callback must be triggered for each element", 3, x);
				test.done();
			},
	
		},
		
		"instant .each()..all()": {
			
			".each().text().all()": function($, test){
				
			},
			
			".each().attr('class').toUpperCase().all()": function($, test){
				
			},
			
			".each().next().all().end()": function($, test){
				
			},
			
		},
		
		"deferred .each()..all()": {
			
			".wait(timeout).each().text().all() + … + .get()": function($, test){
				
			},
			
			".wait(event).each().attr('class').toUpperCase().all() + .trigger(event) + .get()": function($, test){
				
			},
			
			".delay(timeout).join().each().next().all() + … + .end()": function($, test){
				
			},
			
		},
		
		"nested each-loops with interim states": {
			
			".each().children().each().wait(event).all().parent().all()": function($, test) {
				
			},
			
		},
		
};