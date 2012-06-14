suite = {
		
		"simple usage": null,
		
		"$$() -> x": function($, test) {
			var X=$.$$();
			test.assertEquals('callback variable X should be initialized with zero', 0, X);
			test.assertEquals('callback variable read-only property X.$ should be initialized with zero', 0, X.$());
			for (var i=10; i>0; i--) {
				X(i);
				test.assertEquals('callback variable X should look like its value', i, X);
				test.assertEquals('callback variable read-only property X.$ should look like its value', i, X.$());
			}
			test.done();
		},

		"string calculation": null,
		
		"$$('x*x') -> x^2": function($, test) {
			var X=$.$$('x*x');
			for (var i=10; i>0; i--) {
				X(i);
				test.assertEquals('callback variable X should have right value', i*i, X);
				test.assertEquals('callback variable read-only property X.$ should have right value', i*i, X.$());
			}
			test.done();
		},

		"$$('x%3') -> x % 3": function($, test) {
			var X=$.$$('x%3');
			for (var i=10; i>0; i--) {
				X(i);
				test.assertEquals('callback variable X should have right value', i%3, X);
				test.assertEquals('callback variable read-only property X.$ should have right value', i%3, X.$());
			}
			test.done();
		},

		"derived variables": null,

		"$$().mod(3) -> x % 3": function($, test) {			
			var X=$.$$().mod(3);
			for (var i=10; i>0; i--) {
				X(i);
				test.assertEquals('callback variable X should have right value', i%3, X);
				test.assertEquals('callback variable read-only property X.$ should have right value', i%3, X.$());
			}
			test.done();
		},

		"$$().plus(1) -> x + 1": function($, test) {			
			var X=$.$$().plus(1);
			for (var i=10; i>0; i--) {
				X(i);
				test.assertEquals('callback variable X should have right value', i+1, X);
				test.assertEquals('callback variable read-only property X.$ should have right value', i+1, X.$());
			}
			test.done();
		},

		"$$().neg() -> -x": function($, test) {			
			var X=$.$$().neg();
			for (var i=10; i>0; i--) {
				X(i);
				test.assertEquals('callback variable X should have right value', -i, X);
				test.assertEquals('callback variable read-only property X.$ should have right value', -i, X.$());
			}
			test.done();
		},

		"$$().plus(2).neg() -> -x-2": function($, test) {			
			var X=$.$$().plus(2).neg();
			for (var i=10; i>0; i--) {
				X(i);
				test.assertEquals('callback variable X should have right value', -i-2, X);
				test.assertEquals('callback variable read-only property X.$ should have right value', -i-2, X.$());
			}
			test.done();
		},
 
		"$$().plus(1).$$() -> x+1": function($, test) {			
			var X=$.$$().plus(1).$$();
			for (var i=10; i>0; i--) {
				X(i);
				test.assertEquals('callback variable X should have right value', i+1, X);
				test.assertEquals('callback variable read-only property X.$ should have right value', i+1, X.$());
			}
			test.done();
		},

		"$$('x+5',$$()) -> x+5": function($, test) {			
			var X=$.$$('x+5',$.$$());
			for (var i=10; i>0; i--) {
				X(i);
				test.assertEquals('callback variable X should have right value', i+5, X);
				test.assertEquals('callback variable read-only property X.$ should have right value', i+5, X.$());
			}
			test.done();
		},

		"$$('x*2',$$('x+1')) -> 2*x+2": function($, test) {			
			var X=$.$$('x*2',$.$$('x+1'));
			for (var i=10; i>0; i--) {
				X(i);
				test.assertEquals('callback variable X should have right value', 2*i+2, X);
				test.assertEquals('callback variable read-only property X.$ should have right value', 2*i+2, X.$());
			}
			test.done();
		},
		
		"$$('x*2').$$('x+1') -> 2*x+1": function($, test) {			
			var X=$.$$('x*2').$$('x+1');
			for (var i=10; i>0; i--) {
				X(i);
				test.assertEquals('callback variable X should have right value', 2*i+1, X);
				test.assertEquals('callback variable read-only property X.$ should have right value', 2*i+1, X.$());
			}
			test.done();
		},
		
		"combine variables": null,

		"$$().mod($$()) -> x % y": function($, test) {			
			var Y=$.$$(), X=$.$$().mod(Y);
			for (var i=10; i>0; i--) {
				for (var j=10; j>0; j--) {
					X(i);
					Y(j);
					test.assertEquals('callback variable X should have right value', i%j, X);
					test.assertEquals('callback variable read-only property X.$ should have right value', i%j, X.$());
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
					test.assertEquals('callback variable X should have right value', i+j, X);
					test.assertEquals('callback variable read-only property X.$ should have right value', i+j, X.$());
				}
			}
			test.done();
		},
		
		"self-counting variables": null,

		"$$('x++') -> 0,1,2,3,…": function($, test) {			
			var X=$.$$('x++');
			for (var i=0; i<10; i+=2) {
				test.assertEquals('callback variable X should have right value', i, X);
				test.assertEquals('callback variable read-only property X.$ should have right value', i+1, X.$());
			}
			test.done();
		},

		"$$('++x') -> 1,2,3,4,…": function($, test) {			
			var X=$.$$('++x');
			for (var i=1; i<10; i+=2) {
				test.assertEquals('callback variable X should have right value', i, X);
				test.assertEquals('callback variable read-only property X.$ should have right value', i+1, X.$());
			}
			test.done();
		},

		"$$('x*=2') -> 2,4,8,16,…": function($, test) {			
			var X=$.$$('x*=2');
			test.assertEquals('callback variable X should have right initial value', 0, X);
			test.assertEquals('callback variable read-only property X.$ should have right initial value', 0, X.$());
			X(1);
			for (var i=2; i<1000; i+=3*i) {
				test.assertEquals('callback variable X should have right value', i, X);
				test.assertEquals('callback variable read-only property X.$ should have right value', 2*i, X.$());
			}
			test.done();
		},
		
		"callback parameter": null,

		"$$(callback)": function($, test) {
			var z=0;
			function callback(x){
				z++;
				return z+x;
			}
			var X=$.$$(callback);
			test.assertEquals('callback should not have been called yet', 0, z);
			test.assertEquals('callback variable X should have right initial value', 1, X);
			test.assertEquals('callback variable read-only property X.$ should have right initial value', 2, X.$());
			test.assertEquals('callback should have been called twice', 2, z);
			X(10);
			test.assertEquals('callback should not have been called on value setting', 2, z);
			for (var i=2; i<10; i++) {
				test.assertEquals('callback variable X should have right value', 2*i+9, X);
				test.assertEquals('callback variable read-only property X.$ should have right value', 2*i+10, X.$());
			}
			test.done();
		},
		
		"$$().a,b,c,d,e,f,…": function($, test) {
			var X=$.$$('x*2');
			var characters = 'abcdefghij';
			var values = [19,18,17,16,15,14,13,12,11,10];
			for (var i=0; i<10; i++) {
				X(0);
				X[characters[i]].apply(this,values);
				test.assertEquals('callback variable X should have right value', 2*values[i], X);
				test.assertEquals('callback variable read-only property X.$ should have right value', 2*values[i], X.$());
			}
			test.done();
		},
		
		"$$()[0,1,2,3,…]": function($, test) {
			var X=$.$$('x*2');
			var values = [19,18,17,16,15,14,13,12,11,10];
			for (var i=0; i<10; i++) {
				X(0);
				X[i].apply(this,values);
				test.assertEquals('callback variable X should have right value', 2*values[i], X);
				test.assertEquals('callback variable read-only property X.$ should have right value', 2*values[i], X.$());
			}
			test.done();
		},
	
		"applications of callback variables": null,
		
		"$('.many').text($$('x++')) -> '0','1','2','3',…": function($, test) {
			var $x = $('<div>').add('<span>').add('<p>');
			test.assertEquals("not enough objects", 3, $x.size());
			$x.text($.$$('x++'));
			for (var i=0; i<3; i++) {
				test.assertEquals('element should have right text: '+i, i, $x.eq(i).text());
			}
			test.done();
		},
		
		"$('.many').addClass($$('\"t\"+(x++)')) -> .t0,.t1,.t2,.t3,…": function($, test) {
			var $x = $('<div>').add('<span>').add('<p>');
			test.assertEquals("not enough objects", 3, $x.size());
			$x.addClass($.$$('"t"+(x++)'));
			for (var i=0; i<3; i++) {
				test.assertTrue('element should have right class: t'+i, $x.eq(i).hasClass('t'+i));
				console.log($x.eq(i));
			}
			test.done();
		},
		
};