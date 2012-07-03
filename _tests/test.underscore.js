suite = {
		
		"deferred usage": {
		
			".wait(event)._": function($, test) {
				var $x = $('<div>');
				var TIC = $x.wait('myEvent');
				test.assertNotEquals("tic must be new object", $x, TIC);
				var _ = TIC._;
				test.assertEquals("underscore must return original object", $x, _);
				test.done();
			},

			".repeat(event)._": function($, test) {
				var $x = $('<div>');
				var TIC = $x.repeat('myEvent');
				var _ = TIC._;
				test.assertNotEquals("tic must be new object", $x, TIC);
				test.assertEquals("underscore must return original object", $x, _);
				test.done();
			},

			".delay(timeout).join()._": function($, test) {
				test.version('1.4.');

				var $x = $('<div>');
				var TIC = $x.delay(100).join();
				var _ = TIC._;
				test.assertNotEquals("tic must be new object", $x, TIC);
				test.assertEquals("underscore must return original object", $x, _);
				test.done();
			},

		},

		"instant usage": {
			
			".repeat().until(1)._": function($, test) {
				var $x = $('<div>');
				var TIC = $x.repeat().until(1);
				var _ = TIC._;
				test.assertEquals("tic must be same object because of instant invocation", $x, TIC);
				test.assertEquals("underscore must return original object", $x, _);
				test.done();
			},

			".stop().join()._": function($, test) {
				test.version('1.4.');
				
				var $x = $('<div>');
				var TIC = $x.stop().join();
				var _ = TIC._;
				test.assertEquals("tic must be same object because of instant invocation", $x, TIC);
				test.assertEquals("underscore must return original object", $x, _);
				test.done();
			},

		},
	
};