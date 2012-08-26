tests[".promise() functionality"] = {
	
	_version: ['1.6'],
		
	"classical instant promise": {
		
		"$('.some').promise()": function($, test) {
			var $x = test.element('<div>');
			$x.promise().then(function(){
				test.done();
			});
			test.fail("promise must be already resolved");
		},

		"$('.some').promise(target)": function($, test) {
			var $x = test.element('<div>');
			var target = {};
			$x.promise(target);
			$.when(target).then(function(){
				test.done();
			});
			test.fail("promise must be already resolved");
		},

		"$('.some').promise(type)": function($, test) {
			var $x = test.element('<div>');
			$x.promise('foo').then(function(){
				test.done();
			});
			test.fail("promise must be already resolved");
		},

		"$('.some').promise(type,target)": function($, test) {
			var $x = test.element('<div>');
			var target = {};
			$x.promise('foo',target);
			$.when(target).then(function(){
				test.done();
			});
			test.fail("promise must be already resolved");
		},

	},

	"classical deferred promise": {
		
		"$('.some').delay(timeout).promise()": function($, test) {
			var $x = test.element('<div>').delay(10);
			var x = 0;
			$x.promise().then(function(){ x++; });			
			test.assertEquals("promise must wait for animation", 0, x);
			window.setTimeout(function(){
				test.assertEquals("promise must have fired", 1, x);
				test.done();
			}, 100);
		},

		"$('.some').delay(timeout).promise(target)": function($, test) {
			var $x = test.element('<div>').delay(10);
			var x = 0;
			var target = {};
			$x.promise(target);
			$.when(target).then(function(){ x++; });
			test.assertEquals("promise must wait for animation", (compareVersion($().jquery,'1.7.1') <= 0) ? 1 : 0, x);
			window.setTimeout(function(){
				test.assertEquals("promise must have fired", 1, x);
				test.done();
			}, 100);
		},

		"$('.some').delay(timeout,type).promise(type)": function($, test) {
			var $x = test.element('<div>').delay(10,'foo').dequeue('foo');
			var x = 0;
			$x.promise('foo').then(function(){ x++; });
			test.assertEquals("promise must wait for animation", (compareVersion($().jquery,'1.8.0') <= 0) ? 1 : 0, x);
			window.setTimeout(function(){
				test.assertEquals("promise must have fired", 1, x);
				test.done();
			}, 100);
		},

		"$('.some').delay(timeout,type).promise(target,type)": function($, test) {
			var $x = test.element('<div>').delay(10,'foo').dequeue('foo');
			var x = 0;
			var target = {};
			$x.promise('foo',target);
			$.when(target).then(function(){ x++; });			
			test.assertEquals("promise must wait for animation", (compareVersion($().jquery,'1.8.0') <= 0) ? 1 : 0, x);
			window.setTimeout(function(){
				test.assertEquals("promise must have fired", 1, x);
				test.done();
			}, 100);
		},

	},

	"instant timing promise": {
		
		"$('.some').wait(event) + trigger(event) + .promise()": function($, test) {
			var tic = test.element('<div>').wait('click');
			$(tic).click();
			tic.promise().then(function(){
				test.done();
			});
			test.fail("promise must be already resolved");
		},

		"$('.some').wait(event) + trigger(event) + .promise(target)": function($, test) {
			var tic = test.element('<div>').wait('click');
			$(tic).click();
			var target = {};
			tic.promise(target);
			$.when(target).then(function(){
				test.done();
			});
			test.fail("promise must be already resolved");
		},

		"$('.some').repeat().until(count).promise()": function($, test) {
			var tic = test.element('<div>').repeat().until(10);
			tic.promise().then(function(){
				test.done();
			});
			test.fail("promise must be already resolved");
		},

		"$('.some').repeat().until(count).promise(target)": function($, test) {
			var tic = test.element('<div>').repeat().until(10);
			var target = {};
			tic.promise(target);
			$.when(target).then(function(){
				test.done();
			});
			test.fail("promise must be already resolved");
		},

	},

	"deferred timing promise": {
		
		"$('.some').wait(timeout).promise()": function($, test) {
			var tic = test.element('<div>').wait(10);
			var x = 0;
			tic.promise().then(function(){ x++; });			
			test.assertEquals("promise must wait for animation", 0, x);
			window.setTimeout(function(){
				test.assertEquals("promise must have fired", 1, x);
				test.done();
			}, 100);
		},

		"$('.some').wait(timeout).promise(true)": function($, test) {
			var tic = test.element('<div>').wait(10);
			var x = 0;
			tic.promise(true).then(function(){ x++; });			
			test.assertEquals("promise must wait for animation", 0, x);
			window.setTimeout(function(){
				test.assertEquals("promise must have fired", 1, x);
				test.done();
			}, 100);
		},

		"$('.some').wait(timeout).promise(target)": function($, test) {
			var tic = test.element('<div>').wait(10);
			var x = 0;
			var target = {};
			tic.promise(target);
			$.when(target).then(function(){ x++; });			
			test.assertEquals("promise must wait for animation", 0, x);
			window.setTimeout(function(){
				test.assertEquals("promise must have fired", 1, x);
				test.done();
			}, 100);
		},

		"$('.some').wait(timeout).delay(timeout).promise()": function($, test) {
			var tic = test.element('<div>').wait(10).delay(110).then(function(){ x++; });
			var x = 0;
			tic.promise().then(function(){ x+=10; });			
			test.assertEquals("promise must wait for animation", 0, x);
			window.setTimeout(function(){
				test.assertEquals("tic must have ended, but promise must still wait for animation", 1, x);
				window.setTimeout(function(){
					test.assertEquals("promise must have fired", 11, x);
					test.done();
				}, 100);
			}, 100);
		},

		"$('.some').wait(timeout).delay(timeout).promise(true)": function($, test) {
			var tic = test.element('<div>').wait(10).delay(110).then(function(){ x++; });
			var x = 0;
			tic.promise(true).then(function(){ x+=10; });			
			test.assertEquals("promise must wait for animation", 0, x);
			window.setTimeout(function(){
				test.assertEquals("tic must have ended, but promise must still wait for animation", 1, x);
				window.setTimeout(function(){
					test.assertEquals("promise must have fired", 11, x);
					test.done();
				}, 100);
			}, 100);
		},

		"$('.some').on(event).promise()": function($, test) {
			var tic = test.element('<div>').click($);
			var x = 0;
			tic.promise().then(function(){ x++; });			
			test.assertEquals("promise must wait for event", 0, x);
			$(tic).click();
			test.assertEquals("promise must have fired", 1, x);
			$(tic).click();
			test.assertEquals("promise must not have fired again", 1, x);
			tic.promise().then(function(){ x++; });			
			test.assertEquals("promise must have fired again instantly", 2, x);
			test.done();
		},

		"$('.some').on(event).promise(true)": function($, test) {
			var tic = test.element('<div>').click($);
			var x = 0;
			tic.promise(true).then(function(){ x++; });			
			test.assertEquals("promise must wait for event", 0, x);
			$(tic).click();
			test.assertEquals("promise must have fired", 1, x);
			$(tic).click();
			test.assertEquals("promise must not have fired again", 1, x);
			tic.promise(true).then(function(){ x++; });			
			test.assertEquals("promise must not have fired again instantly", 1, x);
			$(tic).click();
			test.assertEquals("promise must have fired again now", 2, x);
			test.done();
		},

		"$('.some').on(event).delay(timeout).promise()": function($, test) {
			var tic = test.element('<div>').click($).delay(10);
			var x = 0;
			tic.promise().then(function(){ x++; });			
			test.assertEquals("promise must wait for event", 0, x);
			$(tic).click();
			test.assertEquals("promise must still wait", 0, x);
			window.setTimeout(function(){
				test.assertEquals("promise must have fired", 1, x);
				tic.promise().then(function(){ x++; });			
				test.assertEquals("promise must have fired again instantly", 2, x);
				$(tic).click();
				test.assertEquals("promise must not have fired again", 2, x);
				test.done();
			}, 100);
		},

		"$('.some').on(event).delay(timeout).promise(true)": function($, test) {
			var tic = test.element('<div>').click($).delay(10);
			var x = 0;
			tic.promise(true).then(function(){ x++; });			
			test.assertEquals("promise must wait for event", 0, x);
			$(tic).click();
			test.assertEquals("promise must still wait", 0, x);
			window.setTimeout(function(){
				test.assertEquals("promise must have fired", 1, x);
				$(tic).click();
				test.assertEquals("promise must not have fired again", 1, x);
				tic.promise(true).then(function(){ x++; });			
				test.assertEquals("promise must have to wait again", 1, x);
				window.setTimeout(function(){
					test.assertEquals("promise must still have to wait", 1, x);
					$(tic).click();
					test.assertEquals("promise must not have fired instantly", 1, x);
					window.setTimeout(function(){
						test.assertEquals("promise must have fired again", 2, x);
						test.done();
					}, 100);
				}, 100);
			}, 100);
		},

	},

};