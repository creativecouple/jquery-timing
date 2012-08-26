tests[".then() functionality"] = {
		
		"static usage": {
			
			"$.then(first).then(second)" : function($,test) {
				var x=0;
				$.then(function(){
					test.assertEquals("wrong thread group", '', this.text());
					test.assertEquals("wrong callback order", 0, x);
					x++;
				}).then(function(){
					test.assertEquals("wrong thread group", '', this.text());
					test.assertEquals("wrong callback order", 1, x);
					test.done();
				});
			},

			"$.then().then(callback)" : function($,test) {
				var x=0;
				$.then().then(function(){
					test.assertEquals("wrong thread group", '', this.text());
					test.assertEquals("wrong callback order", 0, x);
					x++;
				}).then(function(){
					test.assertEquals("wrong thread group", '', this.text());
					test.assertEquals("wrong callback order", 1, x);
					test.done();
				});
			},

			"$.then(callback,ignored)" : function($,test) {
				var x=0;
				$.then(function(){
					test.assertEquals("wrong thread group", '', this.text());
					test.assertEquals("wrong callback order", 0, x);
					x++;
				}, function(){
					test.fail("must not call second parameter in instant .then()");
				}).then(function(){
					test.assertEquals("wrong thread group", '', this.text());
					test.assertEquals("wrong callback order", 1, x);
					test.done();
				}, function(){
					test.fail("must not call second parameter in instant .then()");
				});
			},

			"$.then(threadGroup,first).then(second)" : function($,test) {
				var x=0;
				$.then("group", function(){
					test.assertEquals("wrong thread group", 'group', this.text());
					test.assertEquals("wrong callback order", 0, x);
					x++;
				}).then(function(){
					test.assertEquals("wrong thread group", 'group', this.text());
					test.assertEquals("wrong callback order", 1, x);
					test.done();
				});
			},

			"$.then(threadGroup).then(callback)" : function($,test) {
				var x=0;
				$.then("group").then(function(){
					test.assertEquals("wrong thread group", 'group', this.text());
					test.assertEquals("wrong callback order", 0, x);
					x++;
				}).then(function(){
					test.assertEquals("wrong thread group", 'group', this.text());
					test.assertEquals("wrong callback order", 1, x);
					test.done();
				});
			},

			"$.then(threadGroup,callback,ignored)" : function($,test) {
				var x=0;
				$.then("group", function(){
					test.assertEquals("wrong thread group", 'group', this.text());
					test.assertEquals("wrong callback order", 0, x);
					x++;
				}, function(){
					test.fail("must not call second parameter in instant .then()");
				}).then(function(){
					test.assertEquals("wrong thread group", 'group', this.text());
					test.assertEquals("wrong callback order", 1, x);
					test.done();
				}, function(){
					test.fail("must not call second parameter in instant .then()");
				});
			},

		},

		"instant usage": {
			
			"$('#single').then(first).then(second)" : function($,test) {				
				var x=0;
				$('<div>').then(function(){
					test.assertEquals("wrong callback order", 0, x);
					x++;
				}).then(function(){
					test.assertEquals("wrong callback order", 1, x);
					test.done();
				});
			},

			"$('#single').then().then(callback)" : function($,test) {
				var x=0;
				$('<div>').then().then(function(){
					test.assertEquals("wrong callback order", 0, x);
					x++;
				}).then(function(){
					test.assertEquals("wrong callback order", 1, x);
					test.done();
				});
			},

			"$('#single').then(callback,ignored)" : function($,test) {
				var x=0;
				$('<div>').then(function(){
					test.assertEquals("wrong callback order", 0, x);
					x++;
				}, function(){
					test.fail("must not call second parameter in instant .then()");
				}).then(function(){
					test.assertEquals("wrong callback order", 1, x);
					test.done();
				}, function(){
					test.fail("must not call second parameter in instant .then()");
				});
			},

			"$('.many').then(first).then(second)" : function($,test) {				
				var x=0;
				$('<div>').add('<p>').add('<span>').then(function(){
					test.assertEquals("wrong callback order", 0, x);
					x++;
				}).then(function(){
					test.assertEquals("wrong callback order", 1, x);
					test.done();
				});
			},

			"$('.many').then().then(callback)" : function($,test) {
				var x=0;
				$('<div>').add('<p>').add('<span>').then().then(function(){
					test.assertEquals("wrong callback order", 0, x);
					x++;
				}).then(function(){
					test.assertEquals("wrong callback order", 1, x);
					test.done();
				});
			},

			"$('.many').then(callback,ignored)" : function($,test) {
				var x=0;
				$('<div>').add('<p>').add('<span>').then(function(){
					test.assertEquals("wrong callback order", 0, x);
					x++;
				}, function(){
					test.fail("must not call second parameter in instant .then()");
				}).then(function(){
					test.assertEquals("wrong callback order", 1, x);
					test.done();
				}, function(){
					test.fail("must not call second parameter in instant .then()");
				});
			},

		},

		"deferred usage": {
			
			".wait().then(callback)" : function($,test) {				
				var x=0;
				var $x = test.element('<div>');
				$x.wait(null,function(){
					test.assertEquals("wrong callback order", 0, x);
					x++;
				}).then(function(){
					test.assertEquals("wrong callback order", 1, x);
					test.done();
				});
				test.assertEquals("callback must defer", 0, x);
			},

			".wait(event).then(callback)" : function($,test) {
				var x=0;
				var $x = test.element('<div>');
				$x.wait('myEvent', function(){
					test.assertEquals("wrong callback order", 0, x);
					x++;
				}).then(function(){
					test.assertEquals("wrong callback order", 1, x);
					x++;
				});
				test.assertEquals("callback must defer", 0, x);
				$x.trigger('myEvent');
				test.assertEquals("wrong callback order", 2, x);
				test.done();
			},

			".on(event).then(callback)|1.7" : function($,test) {
				var x=0;
				var $x = test.element('<div>');
				$x.on('myEvent').then(function(){
					test.assertEquals("wrong callback order", 0, x);
					x++;
				}).then(function(){
					test.assertEquals("wrong callback order", 1, x);
					x++;
				});
				test.assertEquals("callback must defer", 0, x);
				$x.trigger('myEvent');
				test.assertEquals("wrong callback order", 2, x);
				test.done();
			},

			".one(event).then(callback)" : function($,test) {
				var x=0;
				var $x = test.element('<div>');
				$x.one('myEvent').then(function(){
					test.assertEquals("wrong callback order", 0, x);
					x++;
				}).then(function(){
					test.assertEquals("wrong callback order", 1, x);
					x++;
				});
				test.assertEquals("callback must defer", 0, x);
				$x.trigger('myEvent');
				test.assertEquals("wrong callback order", 2, x);
				test.done();
			},

			".bind(event).then(callback)||1.8" : function($,test) {
				var x=0;
				var $x = test.element('<div>');
				$x.bind('myEvent').then(function(){
					test.assertEquals("wrong callback order", 0, x);
					x++;
				}).then(function(){
					test.assertEquals("wrong callback order", 1, x);
					x++;
				});
				test.assertEquals("callback must defer", 0, x);
				$x.trigger('myEvent');
				test.assertEquals("wrong callback order", 2, x);
				test.done();
			},

			".slideToggle($).then(callback)|1.4" : function($,test) {
				var x=0;
				var $x = test.element('<div>');
				$x.slideToggle($).then(function(){
					test.assertEquals("wrong callback order", 0, x);
					x++;
				}).then(function(){
					test.assertEquals("wrong callback order", 1, x);
					x++;
				});
				test.assertEquals("callback must defer", 0, x);
				$x.join(function(){window.setTimeout(function(){
					test.assertEquals("wrong callback order", 2, x);
					test.done();
				},10);});
			},

		},
		
		"looped usage": {
			
			".repeat().then(callback).until(count)": function($,test) {
				var x=0;
				$.repeat().then(function(i){
					test.assertEquals("iteration counter mismatch", i, x);
					x++;
				}).until(10)
				.then(function(){
					test.assertEquals("wrong number of function calls", 10, x);
					test.done();
				});
			},
			
			".repeat(interval).then(callback).until(count)": function($,test) {
				var x=0;
				$.repeat(40).then(function(i){
					test.assertEquals("iteration counter mismatch", i, x);
					x++;
				}).until(10)
				.then(function(){
					test.assertEquals("wrong number of function calls", 10, x);
					test.done();
				});
			},
			
			".repeat(callback).one(event).then(callback)": function($,test) {
				var x=0;
				$.repeat().one('myEvent').then(function(i){
					test.assertEquals("iteration counter mismatch", i, x);
					x++;
				}).until(10)
				._
				.repeat().trigger('myEvent').until(10)
				.then(function(){
					test.assertEquals("wrong number of function calls", 10, x);
					test.done();
				});
			},
			
			".repeat().then(first,second,third,others)": function($,test) {
				var x=0;
				$.repeat().then(function(i){
					test.assertEquals("iteration counter mismatch", 0, i);
					test.assertEquals("iteration counter mismatch", x, i);
					x++;
				}, function(i){
					test.assertEquals("iteration counter mismatch", 1, i);
					test.assertEquals("iteration counter mismatch", x, i);
					x+=2;
				}, function(i){
					test.assertEquals("iteration counter mismatch", 2, i);
					test.assertEquals("iteration counter mismatch", x-1, i);
					x+=3;
				}, function(i){
					test.assertEquals("iteration counter mismatch", (x+6)/4, i);
					x+=4;
				}).until(10)
				.then(function(){
					test.assertEquals("wrong number of function calls", 34, x);
					test.done();
				});
			},
			
			".repeat().then(first,true)": function($,test) {
				var x=0;
				$.repeat().then(function(i){
					test.assertEquals("iteration counter mismatch", 0, i);
					test.assertEquals("iteration counter mismatch", x, i);
					x++;
				}, true).until(10)
				.then(function(){
					test.assertEquals("wrong number of function calls", 1, x);
					test.done();
				});
			},
			
			".on(event).then(first,second,third,others)|1.7": function($,test) {
				var x=0;
				$('<div>').on('myEvent').then(function(evt){
					test.assertEquals("must get event parameter", this[0], evt.target);
					x++;
				}, function(evt){
					test.assertEquals("must get event parameter", this[0], evt.target);
					x*=2;
				}, function(evt){
					test.assertEquals("must get event parameter", this[0], evt.target);
					x-=3;
				}, function(evt){
					test.assertEquals("must get event parameter", this[0], evt.target);
					x*=2;
				})
				._
				.repeat().trigger('myEvent').until(10)
				.then(function(){
					test.assertEquals("wrong number of function calls", -128, x);
					test.done();
				});
			},
			
			".on(event).then(first,true)|1.7": function($,test) {
				var x=0;
				$('<div>').on('myEvent').then(function(evt){
					test.assertEquals("must get event parameter", this[0], evt.target);
					x++;
				}, true)
				._
				.repeat().trigger('myEvent').until(10)
				.then(function(){
					test.assertEquals("wrong number of function calls", 1, x);
					test.done();
				});
			},
			
			".bind(event).then(first,second,third,others)||1.8": function($,test) {
				var x=0;
				$('<div>').bind('myEvent').then(function(evt){
					test.assertEquals("must get event parameter", this[0], evt.target);
					x++;
				}, function(evt){
					test.assertEquals("must get event parameter", this[0], evt.target);
					x*=2;
				}, function(evt){
					test.assertEquals("must get event parameter", this[0], evt.target);
					x-=3;
				}, function(evt){
					test.assertEquals("must get event parameter", this[0], evt.target);
					x*=2;
				})
				._
				.repeat().trigger('myEvent').until(10)
				.then(function(){
					test.assertEquals("wrong number of function calls", -128, x);
					test.done();
				});
			},
			
			".bind(event).then(first,true)||1.8": function($,test) {
				var x=0;
				$('<div>').bind('myEvent').then(function(evt){
					test.assertEquals("must get event parameter", this[0], evt.target);
					x++;
				}, true)
				._
				.repeat().trigger('myEvent').until(10)
				.then(function(){
					test.assertEquals("wrong number of function calls", 1, x);
					test.done();
				});
			},
			
		},
};