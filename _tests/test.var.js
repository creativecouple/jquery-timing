suite = {
		
		"need to define test cases…": null,
		
		"$$() -> x": function($, test) {
			var X=$.$$();
			for (var i=10; i>0; i--) {
				X(i);
				test.assertEquals('deferred variable X should look like its value', i, X);
				test.assertEquals('deferred variable read-only property X.$ should look like its value', i, X.$);
			}
			test.done();
		},

		"$$('x*x') -> x^2": function($, test) {
			var X=$.$$('x*x');
			for (var i=10; i>0; i--) {
				X(i);
				test.assertEquals('deferred variable X should have right value', i*i, X);
				test.assertEquals('deferred variable read-only property X.$ should have right value', i*i, X.$);
			}
			test.done();
		},

		"$$('x%3') -> x % 3": function($, test) {
			var X=$.$$('x%3');
			for (var i=10; i>0; i--) {
				X(i);
				test.assertEquals('deferred variable X should have right value', i%3, X);
				test.assertEquals('deferred variable read-only property X.$ should have right value', i%3, X.$);
			}
			test.done();
		},

		"$$().mod($$()) -> x % y": function($, test) {			
			var Y=$.$$(), X=$.$$().mod(Y);
			for (var i=10; i>0; i--) {
				for (var j=10; j>0; j--) {
					X(i);
					Y(j);
					test.assertEquals('deferred variable X should have right value', i%j, X);
					test.assertEquals('deferred variable read-only property X.$ should have right value', i%j, X.$);
				}
			}
			test.done();
		},

		"$$().plus($$()) -> x + y": function($, test) {			
			var Y=$.$$(), X=$.$$().plus(Y);
			for (var i=10; i>0; i--) {
				for (var j=10; j>0; j--) {
					X(i);
					Y(j);
					test.assertEquals('deferred variable X should have right value', i+j, X);
					test.assertEquals('deferred variable read-only property X.$ should have right value', i+j, X.$);
				}
			}
			test.done();
		},

		"$$().neg() -> -x": function($, test) {			
			var X=$.$$().neg();
			for (var i=10; i>0; i--) {
				X(i);
				test.assertEquals('deferred variable X should have right value', -i, X);
				test.assertEquals('deferred variable read-only property X.$ should have right value', -i, X.$);
			}
			test.done();
		},

};