tests["$.X() functionality"] = {
		
		"simple usage": {
		
			"$.X() -> x": function($, test) {
				var X=$.X();
				test.assertEquals('callback variable X should be initialized with zero', 0, X);
				test.assertEquals('callback variable read-only property X.$ should be initialized with zero', 0, X.$());
				for (var i=10; i>0; i--) {
					X(i);
					test.assertEquals('callback variable X should look like its value', i, X);
					test.assertEquals('callback variable read-only property X.$ should look like its value', i, X.$());
				}
				test.done();
			}

		},

		"string calculation": {
		
			"$.X('x*x') -> x^2": function($, test) {
				var X=$.X('x*x');
				for (var i=10; i>0; i--) {
					X(i);
					test.assertEquals('callback variable X should have right value', i*i, X);
					test.assertEquals('callback variable read-only property X.$ should have right value', i*i, X.$());
				}
				test.done();
			},
	
			"$.X('x%3') -> x % 3": function($, test) {
				var X=$.X('x%3');
				for (var i=10; i>0; i--) {
					X(i);
					test.assertEquals('callback variable X should have right value', i%3, X);
					test.assertEquals('callback variable read-only property X.$ should have right value', i%3, X.$());
				}
				test.done();
			}
			
		},

		"derived variables": {

			"$.X().mod(3) -> x % 3": function($, test) {			
				var X=$.X().mod(3);
				for (var i=10; i>0; i--) {
					X(i);
					test.assertEquals('callback variable X should have right value', i%3, X);
					test.assertEquals('callback variable read-only property X.$ should have right value', i%3, X.$());
				}
				test.done();
			},
	
			"$.X().add(1) -> x + 1": function($, test) {			
				var X=$.X().add(1);
				for (var i=10; i>0; i--) {
					X(i);
					test.assertEquals('callback variable X should have right value', i+1, X);
					test.assertEquals('callback variable read-only property X.$ should have right value', i+1, X.$());
				}
				test.done();
			},
	
			"$.X().neg() -> -x": function($, test) {			
				var X=$.X().neg();
				for (var i=10; i>0; i--) {
					X(i);
					test.assertEquals('callback variable X should have right value', -i, X);
					test.assertEquals('callback variable read-only property X.$ should have right value', -i, X.$());
				}
				test.done();
			},
	
			"$.X().add(2).neg() -> -x-2": function($, test) {			
				var X=$.X().add(2).neg();
				for (var i=10; i>0; i--) {
					X(i);
					test.assertEquals('callback variable X should have right value', -i-2, X);
					test.assertEquals('callback variable read-only property X.$ should have right value', -i-2, X.$());
				}
				test.done();
			},
	 
			"$.X().add(1).X() -> x+1": function($, test) {			
				var X=$.X().add(1).X();
				for (var i=10; i>0; i--) {
					X(i);
					test.assertEquals('callback variable X should have right value', i+1, X);
					test.assertEquals('callback variable read-only property X.$ should have right value', i+1, X.$());
				}
				test.done();
			},
	
			"$.X('x+5',$.X()) -> x+5": function($, test) {			
				var X=$.X('x+5',$.X());
				for (var i=10; i>0; i--) {
					X(i);
					test.assertEquals('callback variable X should have right value', i+5, X);
					test.assertEquals('callback variable read-only property X.$ should have right value', i+5, X.$());
				}
				test.done();
			},
	
			"$.X('x*2',$.X('x+1')) -> 2*x+2": function($, test) {			
				var X=$.X('x*2',$.X('x+1'));
				for (var i=10; i>0; i--) {
					X(i);
					test.assertEquals('callback variable X should have right value', 2*i+2, X);
					test.assertEquals('callback variable read-only property X.$ should have right value', 2*i+2, X.$());
				}
				test.done();
			},
			
			"$.X('x*2').X('x+1') -> 2*x+1": function($, test) {			
				var X=$.X('x*2').X('x+1');
				for (var i=10; i>0; i--) {
					X(i);
					test.assertEquals('callback variable X should have right value', 2*i+1, X);
					test.assertEquals('callback variable read-only property X.$ should have right value', 2*i+1, X.$());
				}
				test.done();
			}
			
		},
		
		"combine variables": {

			"$.X().mod($.X()) -> x % y": function($, test) {			
				var Y=$.X(), X=$.X().mod(Y);
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
	
			"$.X().add($.X()) -> x + y": function($, test) {			
				var Y=$.X(), X=$.X().add(Y);
				for (var i=10; i>0; i--) {
					for (var j=10; j>0; j--) {
						X(i);
						Y(j);
						test.assertEquals('callback variable X should have right value', i+j, X);
						test.assertEquals('callback variable read-only property X.$ should have right value', i+j, X.$());
					}
				}
				test.done();
			}
			
		},
		
		"self-counting variables": {

			"$.X('x++') -> 0,1,2,3,…": function($, test) {			
				var X=$.X('x++');
				for (var i=0; i<10; i+=2) {
					test.assertEquals('callback variable X should have right value', i, X);
					test.assertEquals('callback variable read-only property X.$ should have right value', i+1, X.$());
				}
				test.done();
			},
	
			"$.X('++x') -> 1,2,3,4,…": function($, test) {			
				var X=$.X('++x');
				for (var i=1; i<10; i+=2) {
					test.assertEquals('callback variable X should have right value', i, X);
					test.assertEquals('callback variable read-only property X.$ should have right value', i+1, X.$());
				}
				test.done();
			},
	
			"$.X('x*=2') -> 2,4,8,16,…": function($, test) {			
				var X=$.X('x*=2');
				test.assertEquals('callback variable X should have right initial value', 0, X);
				test.assertEquals('callback variable read-only property X.$ should have right initial value', 0, X.$());
				X(1);
				for (var i=2; i<1000; i+=3*i) {
					test.assertEquals('callback variable X should have right value', i, X);
					test.assertEquals('callback variable read-only property X.$ should have right value', 2*i, X.$());
				}
				test.done();
			}
			
		},
		
		"callback parameter": {

			"$.X(callback)": function($, test) {
				var z=0;
				function callback(x){
					z++;
					return z+x;
				}
				var X=$.X(callback);
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
			
			"$.X().a,b,c,d,e,f,…": function($, test) {
				var X=$.X('x*2');
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
			
			"$.X()[0,1,2,3,…]": function($, test) {
				var X=$.X('x*2');
				var values = [19,18,17,16,15,14,13,12,11,10];
				for (var i=0; i<10; i++) {
					X(0);
					X[i].apply(this,values);
					test.assertEquals('callback variable X should have right value', 2*values[i], X);
					test.assertEquals('callback variable read-only property X.$ should have right value', 2*values[i], X.$());
				}
				test.done();
			}
			
		},
	
		"applications of self-counting callback variables": {
		
			"$('.many').text($.X('x++')) -> '0','1','2','3',…|1.4": function($, test) {
				var $x = $('<div>').add('<span>').add('<p>');
				test.assertEquals("not enough objects", 3, $x.size());
				$x.text($.X('x++'));
				for (var i=0; i<3; i++) {
					test.assertEquals('element should have right text: '+i, i, $x.eq(i).text());
				}
				test.done();
			},
			
			"$('.many').wait().text($.X('x++')) -> '0','1','2','3',…|1.4": function($, test) {
				var $x = $('<div>').add('<span>').add('<p>');
				test.assertEquals("not enough objects", 3, $x.size());
				$x.wait().text($.X('x++'));
				window.setTimeout(function(){
					for (var i=0; i<3; i++) {
						test.assertEquals('element should have right text: '+i, i, $x.eq(i).text());
					}
					test.done();
				}, 100);
			},
			
			"$('.many').addClass($.X('\"t\"+(x++)')) -> .t0,.t1,.t2,.t3,…|1.4": function($, test) {
				var $x = $('<div>').add('<span>').add('<p>');
				test.assertEquals("not enough objects", 3, $x.size());
				$x.addClass($.X('"t"+(x++)'));
				for (var i=0; i<3; i++) {
					test.assertTrue('element should have right class: t'+i, $x.eq(i).hasClass('t'+i));
				}
				test.done();
			},
			
			"$('.many').wait().addClass($.X('\"t\"+(x++)')) -> .t0,.t1,.t2,.t3,…|1.4": function($, test) {
				var $x = $('<div>').add('<span>').add('<p>');
				test.assertEquals("not enough objects", 3, $x.size());
				$x.wait().addClass($.X('"t"+(x++)'));
				window.setTimeout(function(){
					for (var i=0; i<3; i++) {
						test.assertTrue('element should have right class: t'+i, $x.eq(i).hasClass('t'+i));
					}
					test.done();
				}, 100);
			},
			
			"$('.many').repeat(X).eq(X).doSomething.until()": function($, test) {
				var $x = $('<div>').add('<span>').add('<p>');
				test.assertEquals("not enough objects", 3, $x.size());
				var X = $.X();
				var x=0;
				$x.repeat(X).eq(X).then(function(i){
					if (i<3) {
						test.assertEquals("wrong element chosen", 1, this.size());
					}
					x++;
				}).until();
				test.assertEquals("wrong number of iterations", 4, x);
				test.done();
			}

		}
		
};