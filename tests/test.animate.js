tests[".animate() functionality"] = {
		
		_version: ['1.4.0'],
		
		"classical usage of .animate()": {
			
			"$('#single').animate(props).doNow().join().doLater()": function($, test) {
				var $x = $('<div>').text('a').css('position','absolute').appendTo('body');
				test.assertEquals("wrong text", 'a', $x.text());
				var $y = $x.animate({left:100}).text($.X('"b"+x++'));
				test.assertEquals("classical .animate must return original jQuery object", $x, $y);
				$x.join().text($.X('"c"+x++'));
				test.assertEquals("wrong text", 'b0', $x.text());
				$x.join(function(){window.setTimeout(function(){
					test.assertEquals("wrong text", 'c0', $x.text());
					$x.remove();
					test.done();
				},10);});
			},
			
			"$('.many').animate(props,duration).doNow().join().doLater()": function($, test) {
				var $x = $('<div>').add('<p>').text('a').css('position','absolute').appendTo('body');
				test.assertEquals("wrong text", 'aa', $x.text());
				var $y = $x.animate({left:100},200).text($.X('"b"+x++'));
				test.assertEquals("classical .animate must return original jQuery object", $x, $y);
				$x.join().text($.X('"c"+x++'));
				test.assertEquals("wrong text", 'b0b1', $x.text());
				$x.join(function(){window.setTimeout(function(){
					test.assertEquals("wrong text", 'c0c1', $x.text());
					$x.remove();
					test.done();
				},10);});
			},
			
			"$('#single').animate(props,callback).doNow().join().doLater()": function($, test) {
				var c = 0;
				var $x = $('<div>').text('a').css('position','absolute').appendTo('body');
				test.assertEquals("wrong text", 'a', $x.text());
				var $y = $x.animate({left:100},function(){
					c++;
				}).text($.X('"b"+x++'));
				test.assertEquals("classical .animate must return original jQuery object", $x, $y);
				$x.join().text($.X('"c"+x++'));
				test.assertEquals("wrong text", 'b0', $x.text());
				test.assertEquals("wrong counter", 0, c);
				$x.join(function(){window.setTimeout(function(){
					test.assertEquals("wrong text", 'c0', $x.text());
					test.assertEquals("wrong counter", 1, c);
					$x.remove();
					test.done();
				},10);});
			},
			
			"$('.many').animate(props,duration,callback).doNow().join().doLater()": function($, test) {
				var c = 0;
				var $x = $('<div>').add('<p>').text('a').css('position','absolute').appendTo('body');
				test.assertEquals("wrong text", 'aa', $x.text());
				var $y = $x.animate({left:100},200,function(){
					c++;
				}).text($.X('"b"+x++'));
				test.assertEquals("classical .animate must return original jQuery object", $x, $y);
				$x.join().text($.X('"c"+x++'));
				test.assertEquals("wrong text", 'b0b1', $x.text());
				test.assertEquals("wrong counter", 0, c);
				$x.join(function(){window.setTimeout(function(){
					test.assertEquals("wrong text", 'c0c1', $x.text());
					test.assertEquals("wrong counter", 2, c);
					$x.remove();
					test.done();
				},10);});
			},
			
			"$('empty').animate(props,callback) + .join().doNow()": function($, test) {
				var c = 0;
				var $x = $('none');
				$x.animate({left:100},function(){
					c++;
				});
				test.assertEquals("classical .animate must ignore empty sets", 0, c);
				$x.join().then(function(){
					test.done();
				});
				test.fail("empty .join() must return immediately");
			},
			
		},
		
		"classical usage of .fade*()": {
			
			"$('#single').fadeIn().doNow().join().doLater()": function($, test) {
				var $x = $('<div>').text('a').css('position','absolute').appendTo('body').hide();
				test.assertEquals("wrong text", 'a', $x.text());
				var $y = $x.fadeIn().text($.X('"b"+x++'));
				test.assertEquals("classical .animate must return original jQuery object", $x, $y);
				$x.join().text($.X('"c"+x++'));
				test.assertEquals("wrong text", 'b0', $x.text());
				$x.join(function(){window.setTimeout(function(){
					test.assertEquals("wrong text", 'c0', $x.text());
					$x.remove();
					test.done();
				},10);});
			},
			
			"$('.many').fadeIn(duration).doNow().join().doLater()": function($, test) {
				var $x = $('<div>').add('<p>').text('a').css('position','absolute').appendTo('body').hide();
				test.assertEquals("wrong text", 'aa', $x.text());
				var $y = $x.fadeIn(200).text($.X('"b"+x++'));
				test.assertEquals("classical .animate must return original jQuery object", $x, $y);
				$x.join().text($.X('"c"+x++'));
				test.assertEquals("wrong text", 'b0b1', $x.text());
				$x.join(function(){window.setTimeout(function(){
					test.assertEquals("wrong text", 'c0c1', $x.text());
					$x.remove();
					test.done();
				},10);});
			},
			
			"$('#single').fadeIn(callback).doNow().join().doLater()": function($, test) {
				var c = 0;
				var $x = $('<div>').text('a').css('position','absolute').appendTo('body').hide();
				test.assertEquals("wrong text", 'a', $x.text());
				var $y = $x.fadeIn(function(){
					c++;
				}).text($.X('"b"+x++'));
				test.assertEquals("classical .animate must return original jQuery object", $x, $y);
				$x.join().text($.X('"c"+x++'));
				test.assertEquals("wrong text", 'b0', $x.text());
				test.assertEquals("wrong counter", 0, c);
				$x.join(function(){window.setTimeout(function(){
					test.assertEquals("wrong text", 'c0', $x.text());
					test.assertEquals("wrong counter", 1, c);
					$x.remove();
					test.done();
				},10);});
			},
			
			"$('.many').fadeIn(duration,callback).doNow().join().doLater()": function($, test) {
				var c = 0;
				var $x = $('<div>').add('<p>').text('a').css('position','absolute').appendTo('body').hide();
				test.assertEquals("wrong text", 'aa', $x.text());
				var $y = $x.fadeIn(200,function(){
					c++;
				}).text($.X('"b"+x++'));
				test.assertEquals("classical .animate must return original jQuery object", $x, $y);
				$x.join().text($.X('"c"+x++'));
				test.assertEquals("wrong text", 'b0b1', $x.text());
				test.assertEquals("wrong counter", 0, c);
				$x.join(function(){window.setTimeout(function(){
					test.assertEquals("wrong text", 'c0c1', $x.text());
					test.assertEquals("wrong counter", 2, c);
					$x.remove();
					test.done();
				},10);});
			},
			
			"$('#single').fadeOut().doNow().join().doLater()": function($, test) {
				var $x = $('<div>').text('a').css('position','absolute').appendTo('body');
				test.assertEquals("wrong text", 'a', $x.text());
				var $y = $x.fadeOut().text($.X('"b"+x++'));
				test.assertEquals("classical .animate must return original jQuery object", $x, $y);
				$x.join().text($.X('"c"+x++'));
				test.assertEquals("wrong text", 'b0', $x.text());
				$x.join(function(){window.setTimeout(function(){
					test.assertEquals("wrong text", 'c0', $x.text());
					$x.remove();
					test.done();
				},10);});
			},
			
			"$('.many').fadeOut(duration).doNow().join().doLater()": function($, test) {
				var $x = $('<div>').add('<p>').text('a').css('position','absolute').appendTo('body');
				test.assertEquals("wrong text", 'aa', $x.text());
				var $y = $x.fadeOut(200).text($.X('"b"+x++'));
				test.assertEquals("classical .animate must return original jQuery object", $x, $y);
				$x.join().text($.X('"c"+x++'));
				test.assertEquals("wrong text", 'b0b1', $x.text());
				$x.join(function(){window.setTimeout(function(){
					test.assertEquals("wrong text", 'c0c1', $x.text());
					$x.remove();
					test.done();
				},10);});
			},
			
			"$('#single').fadeOut(callback).doNow().join().doLater()": function($, test) {
				var c = 0;
				var $x = $('<div>').text('a').css('position','absolute').appendTo('body');
				test.assertEquals("wrong text", 'a', $x.text());
				var $y = $x.fadeOut(function(){
					c++;
				}).text($.X('"b"+x++'));
				test.assertEquals("classical .animate must return original jQuery object", $x, $y);
				$x.join().text($.X('"c"+x++'));
				test.assertEquals("wrong text", 'b0', $x.text());
				test.assertEquals("wrong counter", 0, c);
				$x.join(function(){window.setTimeout(function(){
					test.assertEquals("wrong text", 'c0', $x.text());
					test.assertEquals("wrong counter", 1, c);
					$x.remove();
					test.done();
				},10);});
			},
			
			"$('.many').fadeOut(duration,callback).doNow().join().doLater()": function($, test) {
				var c = 0;
				var $x = $('<div>').add('<p>').text('a').css('position','absolute').appendTo('body');
				test.assertEquals("wrong text", 'aa', $x.text());
				var $y = $x.fadeOut(200,function(){
					c++;
				}).text($.X('"b"+x++'));
				test.assertEquals("classical .animate must return original jQuery object", $x, $y);
				$x.join().text($.X('"c"+x++'));
				test.assertEquals("wrong text", 'b0b1', $x.text());
				test.assertEquals("wrong counter", 0, c);
				$x.join(function(){window.setTimeout(function(){
					test.assertEquals("wrong text", 'c0c1', $x.text());
					test.assertEquals("wrong counter", 2, c);
					$x.remove();
					test.done();
				},10);});
			},
			
			
			"$('#single').fadeToggle().doNow().join().doLater()|1.4.4": function($, test) {
				var $x = $('<div>').text('a').css('position','absolute').appendTo('body');
				test.assertEquals("wrong text", 'a', $x.text());
				var $y = $x.fadeToggle().text($.X('"b"+x++'));
				test.assertEquals("classical .animate must return original jQuery object", $x, $y);
				$x.join().text($.X('"c"+x++'));
				test.assertEquals("wrong text", 'b0', $x.text());
				$x.join(function(){window.setTimeout(function(){
					test.assertEquals("wrong text", 'c0', $x.text());
					$x.remove();
					test.done();
				},10);});
			},
			
			"$('.many').fadeToggle(duration).doNow().join().doLater()|1.4.4": function($, test) {
				var $x = $('<div>').add('<p>').text('a').css('position','absolute').appendTo('body');
				test.assertEquals("wrong text", 'aa', $x.text());
				var $y = $x.fadeToggle(200).text($.X('"b"+x++'));
				test.assertEquals("classical .animate must return original jQuery object", $x, $y);
				$x.join().text($.X('"c"+x++'));
				test.assertEquals("wrong text", 'b0b1', $x.text());
				$x.join(function(){window.setTimeout(function(){
					test.assertEquals("wrong text", 'c0c1', $x.text());
					$x.remove();
					test.done();
				},10);});
			},
			
			"$('#single').fadeToggle(callback).doNow().join().doLater()|1.4.4": function($, test) {
				var c = 0;
				var $x = $('<div>').text('a').css('position','absolute').appendTo('body');
				test.assertEquals("wrong text", 'a', $x.text());
				var $y = $x.fadeToggle(function(){
					c++;
				}).text($.X('"b"+x++'));
				test.assertEquals("classical .animate must return original jQuery object", $x, $y);
				$x.join().text($.X('"c"+x++'));
				test.assertEquals("wrong text", 'b0', $x.text());
				test.assertEquals("wrong counter", 0, c);
				$x.join(function(){window.setTimeout(function(){
					test.assertEquals("wrong text", 'c0', $x.text());
					test.assertEquals("wrong counter", 1, c);
					$x.remove();
					test.done();
				},10);});
			},
			
			"$('.many').fadeToggle(duration,callback).doNow().join().doLater()|1.4.4": function($, test) {
				var c = 0;
				var $x = $('<div>').add('<p>').text('a').css('position','absolute').appendTo('body');
				test.assertEquals("wrong text", 'aa', $x.text());
				var $y = $x.fadeToggle(200,function(){
					c++;
				}).text($.X('"b"+x++'));
				test.assertEquals("classical .animate must return original jQuery object", $x, $y);
				$x.join().text($.X('"c"+x++'));
				test.assertEquals("wrong text", 'b0b1', $x.text());
				test.assertEquals("wrong counter", 0, c);
				$x.join(function(){window.setTimeout(function(){
					test.assertEquals("wrong text", 'c0c1', $x.text());
					test.assertEquals("wrong counter", 2, c);
					$x.remove();
					test.done();
				},10);});
			},
			
			"$('empty').fadeOut(callback) + .join().doNow()": function($, test) {
				var c = 0;
				var $x = $('none');
				$x.fadeIn().fadeOut(function(){
					c++;
				});
				test.assertEquals("classical .fadeOut must ignore empty sets", 0, c);
				$x.join().then(function(){
					test.done();
				});
				test.fail("empty .join() must return immediately");
			},
			
		},
			
		"classical usage of .slide*()": {
			
			"$('#single').slideUp().doNow().join().doLater()": function($, test) {
				var $x = $('<div>').text('a').css('position','absolute').appendTo('body');
				test.assertEquals("wrong text", 'a', $x.text());
				var $y = $x.slideUp().text($.X('"b"+x++'));
				test.assertEquals("classical .animate must return original jQuery object", $x, $y);
				$x.join().text($.X('"c"+x++'));
				test.assertEquals("wrong text", 'b0', $x.text());
				$x.join(function(){window.setTimeout(function(){
					test.assertEquals("wrong text", 'c0', $x.text());
					$x.remove();
					test.done();
				},10);});
			},
			
			"$('.many').slideUp(duration).doNow().join().doLater()": function($, test) {
				var $x = $('<div>').add('<p>').text('a').css('position','absolute').appendTo('body');
				test.assertEquals("wrong text", 'aa', $x.text());
				var $y = $x.slideUp(200).text($.X('"b"+x++'));
				test.assertEquals("classical .animate must return original jQuery object", $x, $y);
				$x.join().text($.X('"c"+x++'));
				test.assertEquals("wrong text", 'b0b1', $x.text());
				$x.join(function(){window.setTimeout(function(){
					test.assertEquals("wrong text", 'c0c1', $x.text());
					$x.remove();
					test.done();
				},10);});
			},
			
			"$('#single').slideUp(callback).doNow().join().doLater()": function($, test) {
				var c = 0;
				var $x = $('<div>').text('a').css('position','absolute').appendTo('body');
				test.assertEquals("wrong text", 'a', $x.text());
				var $y = $x.slideUp(function(){
					c++;
				}).text($.X('"b"+x++'));
				test.assertEquals("classical .animate must return original jQuery object", $x, $y);
				$x.join().text($.X('"c"+x++'));
				test.assertEquals("wrong text", 'b0', $x.text());
				test.assertEquals("wrong counter", 0, c);
				$x.join(function(){window.setTimeout(function(){
					test.assertEquals("wrong text", 'c0', $x.text());
					test.assertEquals("wrong counter", 1, c);
					$x.remove();
					test.done();
				},10);});
			},
			
			"$('.many').slideUp(duration,callback).doNow().join().doLater()": function($, test) {
				var c = 0;
				var $x = $('<div>').add('<p>').text('a').css('position','absolute').appendTo('body');
				test.assertEquals("wrong text", 'aa', $x.text());
				var $y = $x.slideUp(200,function(){
					c++;
				}).text($.X('"b"+x++'));
				test.assertEquals("classical .animate must return original jQuery object", $x, $y);
				$x.join().text($.X('"c"+x++'));
				test.assertEquals("wrong text", 'b0b1', $x.text());
				test.assertEquals("wrong counter", 0, c);
				$x.join(function(){window.setTimeout(function(){
					test.assertEquals("wrong text", 'c0c1', $x.text());
					test.assertEquals("wrong counter", 2, c);
					$x.remove();
					test.done();
				},10);});
			},
			
			"$('#single').slideDown().doNow().join().doLater()": function($, test) {
				var $x = $('<div>').text('a').css('position','absolute').appendTo('body').hide();
				test.assertEquals("wrong text", 'a', $x.text());
				var $y = $x.slideDown().text($.X('"b"+x++'));
				test.assertEquals("classical .animate must return original jQuery object", $x, $y);
				$x.join().text($.X('"c"+x++'));
				test.assertEquals("wrong text", 'b0', $x.text());
				$x.join(function(){window.setTimeout(function(){
					test.assertEquals("wrong text", 'c0', $x.text());
					$x.remove();
					test.done();
				},10);});
			},
			
			"$('.many').slideDown(duration).doNow().join().doLater()": function($, test) {
				var $x = $('<div>').add('<p>').text('a').css('position','absolute').appendTo('body').hide();
				test.assertEquals("wrong text", 'aa', $x.text());
				var $y = $x.slideDown(200).text($.X('"b"+x++'));
				test.assertEquals("classical .animate must return original jQuery object", $x, $y);
				$x.join().text($.X('"c"+x++'));
				test.assertEquals("wrong text", 'b0b1', $x.text());
				$x.join(function(){window.setTimeout(function(){
					test.assertEquals("wrong text", 'c0c1', $x.text());
					$x.remove();
					test.done();
				},10);});
			},
			
			"$('#single').slideDown(callback).doNow().join().doLater()": function($, test) {
				var c = 0;
				var $x = $('<div>').text('a').css('position','absolute').appendTo('body').hide();
				test.assertEquals("wrong text", 'a', $x.text());
				var $y = $x.slideDown(function(){
					c++;
				}).text($.X('"b"+x++'));
				test.assertEquals("classical .animate must return original jQuery object", $x, $y);
				$x.join().text($.X('"c"+x++'));
				test.assertEquals("wrong text", 'b0', $x.text());
				test.assertEquals("wrong counter", 0, c);
				$x.join(function(){window.setTimeout(function(){
					test.assertEquals("wrong text", 'c0', $x.text());
					test.assertEquals("wrong counter", 1, c);
					$x.remove();
					test.done();
				},10);});
			},
			
			"$('.many').slideDown(duration,callback).doNow().join().doLater()": function($, test) {
				var c = 0;
				var $x = $('<div>').add('<p>').text('a').css('position','absolute').appendTo('body').hide();
				test.assertEquals("wrong text", 'aa', $x.text());
				var $y = $x.slideDown(200,function(){
					c++;
				}).text($.X('"b"+x++'));
				test.assertEquals("classical .animate must return original jQuery object", $x, $y);
				$x.join().text($.X('"c"+x++'));
				test.assertEquals("wrong text", 'b0b1', $x.text());
				test.assertEquals("wrong counter", 0, c);
				$x.join(function(){window.setTimeout(function(){
					test.assertEquals("wrong text", 'c0c1', $x.text());
					test.assertEquals("wrong counter", 2, c);
					$x.remove();
					test.done();
				},10);});
			},
			
			
			"$('#single').slideToggle().doNow().join().doLater()": function($, test) {
				var $x = $('<div>').text('a').css('position','absolute').appendTo('body');
				test.assertEquals("wrong text", 'a', $x.text());
				var $y = $x.slideToggle().text($.X('"b"+x++'));
				test.assertEquals("classical .animate must return original jQuery object", $x, $y);
				$x.join().text($.X('"c"+x++'));
				test.assertEquals("wrong text", 'b0', $x.text());
				$x.join(function(){window.setTimeout(function(){
					test.assertEquals("wrong text", 'c0', $x.text());
					$x.remove();
					test.done();
				},10);});
			},
			
			"$('.many').slideToggle(duration).doNow().join().doLater()": function($, test) {
				var $x = $('<div>').add('<p>').text('a').css('position','absolute').appendTo('body');
				test.assertEquals("wrong text", 'aa', $x.text());
				var $y = $x.slideToggle(200).text($.X('"b"+x++'));
				test.assertEquals("classical .animate must return original jQuery object", $x, $y);
				$x.join().text($.X('"c"+x++'));
				test.assertEquals("wrong text", 'b0b1', $x.text());
				$x.join(function(){window.setTimeout(function(){
					test.assertEquals("wrong text", 'c0c1', $x.text());
					$x.remove();
					test.done();
				},10);});
			},
			
			"$('#single').slideToggle(callback).doNow().join().doLater()": function($, test) {
				var c = 0;
				var $x = $('<div>').text('a').css('position','absolute').appendTo('body');
				test.assertEquals("wrong text", 'a', $x.text());
				var $y = $x.slideToggle(function(){
					c++;
				}).text($.X('"b"+x++'));
				test.assertEquals("classical .animate must return original jQuery object", $x, $y);
				$x.join().text($.X('"c"+x++'));
				test.assertEquals("wrong text", 'b0', $x.text());
				test.assertEquals("wrong counter", 0, c);
				$x.join(function(){window.setTimeout(function(){
					test.assertEquals("wrong text", 'c0', $x.text());
					test.assertEquals("wrong counter", 1, c);
					$x.remove();
					test.done();
				},10);});
			},
			
			"$('.many').slideToggle(duration,callback).doNow().join().doLater()": function($, test) {
				var c = 0;
				var $x = $('<div>').add('<p>').text('a').css('position','absolute').appendTo('body');
				test.assertEquals("wrong text", 'aa', $x.text());
				var $y = $x.slideToggle(200,function(){
					c++;
				}).text($.X('"b"+x++'));
				test.assertEquals("classical .animate must return original jQuery object", $x, $y);
				$x.join().text($.X('"c"+x++'));
				test.assertEquals("wrong text", 'b0b1', $x.text());
				test.assertEquals("wrong counter", 0, c);
				$x.join(function(){window.setTimeout(function(){
					test.assertEquals("wrong text", 'c0c1', $x.text());
					test.assertEquals("wrong counter", 2, c);
					$x.remove();
					test.done();
				},10);});
			},
			
			"$('empty').slideToggle(callback) + .join().doNow()": function($, test) {
				var c = 0;
				var $x = $('none');
				$x.slideToggle(function(){
					c++;
				});
				test.assertEquals("classical .slideToggle must ignore empty sets", 0, c);
				$x.join().then(function(){
					test.done();
				});
				test.fail("empty .join() must return immediately");
			},
			
		},
			
		"timed invocation chain usage of .animate($)": {
			
			"$('.many').animate(props,$).doLater()._.doNow()": function($, test) {
				var c = 0;
				var $x = $('<div>').add('<p>').text('a').css('position','absolute').appendTo('body');
				var tic = $x.animate({left:100},$).text($.X('"c"+x++')).then(function(){
					test.assertEquals("wrong context after animation callback", $x, this);
					c++;
				});
				test.assertEquals("wrong text", 'aa', $x.text());
				test.assertNotEquals("timed .animate($) must return tic object", $x, tic);
				tic._.text($.X('"b"+x++')).join(function(){
					c+=10;
				});
				test.assertEquals("wrong text", 'b0b1', $x.text());
				test.assertEquals("wrong counter", 0, c);
				$x.join(function(){window.setTimeout(function(){
					test.assertEquals("wrong text", 'c0c1', $x.text());
					test.assertEquals("wrong counter", 11, c);
					$x.remove();
					test.done();
				},10);});
			},
			
			"$('#single').animate(props,duration,$).doLater()._.doNow()": function($, test) {
				var c = 0;
				var $x = $('<div>').text('a').css('position','absolute').appendTo('body');
				var tic = $x.animate({left:100},200,$).text($.X('"c"+x++')).then(function(){
					test.assertEquals("wrong context after animation callback", $x, this);
					c++;
				});
				test.assertEquals("wrong text", 'a', $x.text());
				test.assertNotEquals("timed .animate($) must return tic object", $x, tic);
				tic._.text($.X('"b"+x++')).join(function(){
					c+=10;
				});
				test.assertEquals("wrong text", 'b0', $x.text());
				test.assertEquals("wrong counter", 0, c);
				$x.join(function(){window.setTimeout(function(){
					test.assertEquals("wrong text", 'c0', $x.text());
					test.assertEquals("wrong counter", 11, c);
					$x.remove();
					test.done();
				},10);});
			},
			
			".repeat().animate(props,$).until(count).doLater()": function($, test) {
				var c = 0;
				var $x = $('<div>').text('a').css('position','absolute').appendTo('body');
				var tic = $x.repeat().animate({left:100},$).text($.X('"c"+x++')).css({left:0}).until(2).then(function(){
					test.assertEquals("wrong context after animation callback", $x, this);
					c++;
				});
				test.assertEquals("wrong text", 'a', $x.text());
				test.assertNotEquals("timed .animate($) must return tic object", $x, tic);
				tic._.text($.X('"b"+x++')).join(function(){
					c+=10;
				});
				test.assertEquals("wrong text", 'b0', $x.text());
				test.assertEquals("wrong counter", 0, c);
				$x.join(function(){window.setTimeout(function(){
					test.assertEquals("wrong text", 'c0', $x.text());
					test.assertEquals("wrong counter", 10, c);
					$x.join(function(){window.setTimeout(function(){
						test.assertEquals("wrong text", 'c1', $x.text());
						test.assertEquals("wrong counter", 11, c);
						$x.remove();
						test.done();
					},10);});
				},10);});
			},
			
			"$('empty').animate(props,$).doNow() + .join().doNow()": function($, test) {
				var c = 0;
				var $x = $('none');
				$x.animate($).then(function(){
					c++;
				});
				test.assertEquals("timed .animate($) must ignore empty sets", 1, c);
				$x.join().then(function(){
					test.done();
				});
				test.fail("empty .join() must return immediately");
			},
			
		},
		
		"timed invocation chain usage of .fade*($)": {
			
			"$('.many').fadeIn($).doLater()._.doNow()": function($, test) {
				var c = 0;
				var $x = $('<div>').add('<p>').text('a').css('position','absolute').appendTo('body').hide();
				var tic = $x.fadeIn($).text($.X('"c"+x++')).then(function(){
					test.assertEquals("wrong context after animation callback", $x, this);
					c++;
				});
				test.assertEquals("wrong text", 'aa', $x.text());
				test.assertNotEquals("timed .fadeIn($) must return tic object", $x, tic);
				tic._.text($.X('"b"+x++')).join(function(){
					c+=10;
				});
				test.assertEquals("wrong text", 'b0b1', $x.text());
				test.assertEquals("wrong counter", 0, c);
				$x.join(function(){window.setTimeout(function(){
					test.assertEquals("wrong text", 'c0c1', $x.text());
					test.assertEquals("wrong counter", 11, c);
					$x.remove();
					test.done();
				},10);});
			},
			
			"$('#single').fadeIn(duration,$).doLater()._.doNow()": function($, test) {
				var c = 0;
				var $x = $('<div>').text('a').css('position','absolute').appendTo('body').hide();
				var tic = $x.fadeIn(200,$).text($.X('"c"+x++')).then(function(){
					test.assertEquals("wrong context after animation callback", $x, this);
					c++;
				});
				test.assertEquals("wrong text", 'a', $x.text());
				test.assertNotEquals("timed .fadeIn($) must return tic object", $x, tic);
				tic._.text($.X('"b"+x++')).join(function(){
					c+=10;
				});
				test.assertEquals("wrong text", 'b0', $x.text());
				test.assertEquals("wrong counter", 0, c);
				$x.join(function(){window.setTimeout(function(){
					test.assertEquals("wrong text", 'c0', $x.text());
					test.assertEquals("wrong counter", 11, c);
					$x.remove();
					test.done();
				},10);});
			},
			
			".repeat().fadeIn($).until(count).doLater()": function($, test) {
				var c = 0;
				var $x = $('<div>').text('a').css('position','absolute').appendTo('body').hide();
				var tic = $x.repeat().fadeIn($).text($.X('"c"+x++')).hide().until(2).then(function(){
					test.assertEquals("wrong context after animation callback", $x, this);
					c++;
				});
				test.assertEquals("wrong text", 'a', $x.text());
				test.assertNotEquals("timed .fadeIn($) must return tic object", $x, tic);
				tic._.text($.X('"b"+x++')).join(function(){
					c+=10;
				});
				test.assertEquals("wrong text", 'b0', $x.text());
				test.assertEquals("wrong counter", 0, c);
				$x.join(function(){window.setTimeout(function(){
					test.assertEquals("wrong text", 'c0', $x.text());
					test.assertEquals("wrong counter", 10, c);
					$x.join(function(){window.setTimeout(function(){
						test.assertEquals("wrong text", 'c1', $x.text());
						test.assertEquals("wrong counter", 11, c);
						$x.remove();
						test.done();
					},10);});
				},10);});
			},
			
			"$('.many').fadeOut($).doLater()._.doNow()": function($, test) {
				var c = 0;
				var $x = $('<div>').add('<p>').text('a').css('position','absolute').appendTo('body');
				var tic = $x.fadeOut($).text($.X('"c"+x++')).then(function(){
					test.assertEquals("wrong context after animation callback", $x, this);
					c++;
				});
				test.assertEquals("wrong text", 'aa', $x.text());
				test.assertNotEquals("timed .fadeOut($) must return tic object", $x, tic);
				tic._.text($.X('"b"+x++')).join(function(){
					c+=10;
				});
				test.assertEquals("wrong text", 'b0b1', $x.text());
				test.assertEquals("wrong counter", 0, c);
				$x.join(function(){window.setTimeout(function(){
					test.assertEquals("wrong text", 'c0c1', $x.text());
					test.assertEquals("wrong counter", 11, c);
					$x.remove();
					test.done();
				},10);});
			},
			
			"$('#single').fadeOut(duration,$).doLater()._.doNow()": function($, test) {
				var c = 0;
				var $x = $('<div>').text('a').css('position','absolute').appendTo('body');
				var tic = $x.fadeOut(200,$).text($.X('"c"+x++')).then(function(){
					test.assertEquals("wrong context after animation callback", $x, this);
					c++;
				});
				test.assertEquals("wrong text", 'a', $x.text());
				test.assertNotEquals("timed .fadeOut($) must return tic object", $x, tic);
				tic._.text($.X('"b"+x++')).join(function(){
					c+=10;
				});
				test.assertEquals("wrong text", 'b0', $x.text());
				test.assertEquals("wrong counter", 0, c);
				$x.join(function(){window.setTimeout(function(){
					test.assertEquals("wrong text", 'c0', $x.text());
					test.assertEquals("wrong counter", 11, c);
					$x.remove();
					test.done();
				},10);});
			},
			
			".repeat().fadeOut($).until(count).doLater()": function($, test) {
				var c = 0;
				var $x = $('<div>').text('a').css('position','absolute').appendTo('body');
				var tic = $x.repeat().fadeOut(200,$).text($.X('"c"+x++')).show().until(2).then(function(){
					test.assertEquals("wrong context after animation callback", $x, this);
					c++;
				});
				test.assertEquals("wrong text", 'a', $x.text());
				test.assertNotEquals("timed .fadeOut($) must return tic object", $x, tic);
				tic._.text($.X('"b"+x++')).join(function(){
					c+=10;
				});
				test.assertEquals("wrong text", 'b0', $x.text());
				test.assertEquals("wrong counter", 0, c);
				$x.join(function(){window.setTimeout(function(){
					test.assertEquals("wrong text", 'c0', $x.text());
					test.assertEquals("wrong counter", 10, c);
					$x.join(function(){window.setTimeout(function(){
						test.assertEquals("wrong text", 'c1', $x.text());
						test.assertEquals("wrong counter", 11, c);
						$x.remove();
						test.done();
					},10);});
				},10);});
			},
			
			
			"$('.many').fadeToggle($).doLater()._.doNow()|1.4.4": function($, test) {
				var c = 0;
				var $x = $('<div>').add('<p>').text('a').css('position','absolute').appendTo('body');
				var tic = $x.fadeToggle($).text($.X('"c"+x++')).then(function(){
					test.assertEquals("wrong context after animation callback", $x, this);
					c++;
				});
				test.assertEquals("wrong text", 'aa', $x.text());
				test.assertNotEquals("timed .fadeToggle($) must return tic object", $x, tic);
				tic._.text($.X('"b"+x++')).join(function(){
					c+=10;
				});
				test.assertEquals("wrong text", 'b0b1', $x.text());
				test.assertEquals("wrong counter", 0, c);
				$x.join(function(){window.setTimeout(function(){
					test.assertEquals("wrong text", 'c0c1', $x.text());
					test.assertEquals("wrong counter", 11, c);
					$x.remove();
					test.done();
				},10);});
			},
			
			"$('#single').fadeToggle(duration,$).doLater()._.doNow()|1.4.4": function($, test) {
				var c = 0;
				var $x = $('<div>').text('a').css('position','absolute').appendTo('body');
				var tic = $x.fadeToggle(200,$).text($.X('"c"+x++')).then(function(){
					test.assertEquals("wrong context after animation callback", $x, this);
					c++;
				});
				test.assertEquals("wrong text", 'a', $x.text());
				test.assertNotEquals("timed .fadeToggle($) must return tic object", $x, tic);
				tic._.text($.X('"b"+x++')).join(function(){
					c+=10;
				});
				test.assertEquals("wrong text", 'b0', $x.text());
				test.assertEquals("wrong counter", 0, c);
				$x.join(function(){window.setTimeout(function(){
					test.assertEquals("wrong text", 'c0', $x.text());
					test.assertEquals("wrong counter", 11, c);
					$x.remove();
					test.done();
				},10);});
			},
			
			".repeat().fadeToggle($).until(count).doLater()|1.4.4": function($, test) {
				var c = 0;
				var $x = $('<div>').text('a').css('position','absolute').appendTo('body');
				var tic = $x.repeat().fadeToggle(200,$).text($.X('"c"+x++')).show().until(2).then(function(){
					test.assertEquals("wrong context after animation callback", $x, this);
					c++;
				});
				test.assertEquals("wrong text", 'a', $x.text());
				test.assertNotEquals("timed .fadeToggle($) must return tic object", $x, tic);
				tic._.text($.X('"b"+x++')).join(function(){
					c+=10;
				});
				test.assertEquals("wrong text", 'b0', $x.text());
				test.assertEquals("wrong counter", 0, c);
				$x.join(function(){window.setTimeout(function(){
					test.assertEquals("wrong text", 'c0', $x.text());
					test.assertEquals("wrong counter", 10, c);
					$x.join(function(){window.setTimeout(function(){
						test.assertEquals("wrong text", 'c1', $x.text());
						test.assertEquals("wrong counter", 11, c);
						$x.remove();
						test.done();
					},10);});
				},10);});
			},
			
			"$('empty').fadeOut($).doNow() + .join().doNow()": function($, test) {
				var c = 0;
				var $x = $('none');
				$x.fadeIn().fadeOut($).then(function(){
					c++;
				});
				test.assertEquals("timed .fadeOut($) must ignore empty sets", 1, c);
				$x.join().then(function(){
					test.done();
				});
				test.fail("empty .join() must return immediately");
			},
			
		},
		

		"timed invocation chain usage of .slide*($)": {
			
			"$('.many').slideUp($).doLater()._.doNow()": function($, test) {
				var c = 0;
				var $x = $('<div>').add('<p>').text('a').css('position','absolute').appendTo('body');
				var tic = $x.slideUp($).text($.X('"c"+x++')).then(function(){
					test.assertEquals("wrong context after animation callback", $x, this);
					c++;
				});
				test.assertEquals("wrong text", 'aa', $x.text());
				test.assertNotEquals("timed .slideUp($) must return tic object", $x, tic);
				tic._.text($.X('"b"+x++')).join(function(){
					c+=10;
				});
				test.assertEquals("wrong text", 'b0b1', $x.text());
				test.assertEquals("wrong counter", 0, c);
				$x.join(function(){window.setTimeout(function(){
					test.assertEquals("wrong text", 'c0c1', $x.text());
					test.assertEquals("wrong counter", 11, c);
					$x.remove();
					test.done();
				},10);});
			},
			
			"$('#single').slideUp(duration,$).doLater()._.doNow()": function($, test) {
				var c = 0;
				var $x = $('<div>').text('a').css('position','absolute').appendTo('body');
				var tic = $x.slideUp(200,$).text($.X('"c"+x++')).then(function(){
					test.assertEquals("wrong context after animation callback", $x, this);
					c++;
				});
				test.assertEquals("wrong text", 'a', $x.text());
				test.assertNotEquals("timed .slideUp($) must return tic object", $x, tic);
				tic._.text($.X('"b"+x++')).join(function(){
					c+=10;
				});
				test.assertEquals("wrong text", 'b0', $x.text());
				test.assertEquals("wrong counter", 0, c);
				$x.join(function(){window.setTimeout(function(){
					test.assertEquals("wrong text", 'c0', $x.text());
					test.assertEquals("wrong counter", 11, c);
					$x.remove();
					test.done();
				},10);});
			},
			
			".repeat().slideUp($).until(count).doLater()": function($, test) {
				var c = 0;
				var $x = $('<div>').text('a').css('position','absolute').appendTo('body');
				var tic = $x.repeat().slideUp($).text($.X('"c"+x++')).show().until(2).then(function(){
					test.assertEquals("wrong context after animation callback", $x, this);
					c++;
				});
				test.assertEquals("wrong text", 'a', $x.text());
				test.assertNotEquals("timed .slideUp($) must return tic object", $x, tic);
				tic._.text($.X('"b"+x++')).join(function(){
					c+=10;
				});
				test.assertEquals("wrong text", 'b0', $x.text());
				test.assertEquals("wrong counter", 0, c);
				$x.join(function(){window.setTimeout(function(){
					test.assertEquals("wrong text", 'c0', $x.text());
					test.assertEquals("wrong counter", 10, c);
					$x.join(function(){window.setTimeout(function(){
						test.assertEquals("wrong text", 'c1', $x.text());
						test.assertEquals("wrong counter", 11, c);
						$x.remove();
						test.done();
					},10);});
				},10);});
			},
			
			"$('.many').slideDown($).doLater()._.doNow()": function($, test) {
				var c = 0;
				var $x = $('<div>').add('<p>').text('a').css('position','absolute').appendTo('body').hide();
				var tic = $x.slideDown($).text($.X('"c"+x++')).then(function(){
					test.assertEquals("wrong context after animation callback", $x, this);
					c++;
				});
				test.assertEquals("wrong text", 'aa', $x.text());
				test.assertNotEquals("timed .slideDown($) must return tic object", $x, tic);
				tic._.text($.X('"b"+x++')).join(function(){
					c+=10;
				});
				test.assertEquals("wrong text", 'b0b1', $x.text());
				test.assertEquals("wrong counter", 0, c);
				$x.join(function(){window.setTimeout(function(){
					test.assertEquals("wrong text", 'c0c1', $x.text());
					test.assertEquals("wrong counter", 11, c);
					$x.remove();
					test.done();
				},10);});
			},
			
			"$('#single').slideDown(duration,$).doLater()._.doNow()": function($, test) {
				var c = 0;
				var $x = $('<div>').text('a').css('position','absolute').appendTo('body').hide();
				var tic = $x.slideDown(200,$).text($.X('"c"+x++')).then(function(){
					test.assertEquals("wrong context after animation callback", $x, this);
					c++;
				});
				test.assertEquals("wrong text", 'a', $x.text());
				test.assertNotEquals("timed .slideDown($) must return tic object", $x, tic);
				tic._.text($.X('"b"+x++')).join(function(){
					c+=10;
				});
				test.assertEquals("wrong text", 'b0', $x.text());
				test.assertEquals("wrong counter", 0, c);
				$x.join(function(){window.setTimeout(function(){
					test.assertEquals("wrong text", 'c0', $x.text());
					test.assertEquals("wrong counter", 11, c);
					$x.remove();
					test.done();
				},10);});
			},
			
			".repeat().slideDown($).until(count).doLater()": function($, test) {
				var c = 0;
				var $x = $('<div>').text('a').css('position','absolute').appendTo('body').hide();
				var tic = $x.repeat().slideDown(200,$).text($.X('"c"+x++')).hide().until(2).then(function(){
					test.assertEquals("wrong context after animation callback", $x, this);
					c++;
				});
				test.assertEquals("wrong text", 'a', $x.text());
				test.assertNotEquals("timed .slideDown($) must return tic object", $x, tic);
				tic._.text($.X('"b"+x++')).join(function(){
					c+=10;
				});
				test.assertEquals("wrong text", 'b0', $x.text());
				test.assertEquals("wrong counter", 0, c);
				$x.join(function(){window.setTimeout(function(){
					test.assertEquals("wrong text", 'c0', $x.text());
					test.assertEquals("wrong counter", 10, c);
					$x.join(function(){window.setTimeout(function(){
						test.assertEquals("wrong text", 'c1', $x.text());
						test.assertEquals("wrong counter", 11, c);
						$x.remove();
						test.done();
					},10);});
				},10);});
			},
			
			
			"$('.many').slideToggle($).doLater()._.doNow()": function($, test) {
				var c = 0;
				var $x = $('<div>').add('<p>').text('a').css('position','absolute').appendTo('body');
				var tic = $x.slideToggle($).text($.X('"c"+x++')).then(function(){
					test.assertEquals("wrong context after animation callback", $x, this);
					c++;
				});
				test.assertEquals("wrong text", 'aa', $x.text());
				test.assertNotEquals("timed .slideToggle($) must return tic object", $x, tic);
				tic._.text($.X('"b"+x++')).join(function(){
					c+=10;
				});
				test.assertEquals("wrong text", 'b0b1', $x.text());
				test.assertEquals("wrong counter", 0, c);
				$x.join(function(){window.setTimeout(function(){
					test.assertEquals("wrong text", 'c0c1', $x.text());
					test.assertEquals("wrong counter", 11, c);
					$x.remove();
					test.done();
				},10);});
			},
			
			"$('#single').slideToggle(duration,$).doLater()._.doNow()": function($, test) {
				var c = 0;
				var $x = $('<div>').text('a').css('position','absolute').appendTo('body');
				var tic = $x.slideToggle(200,$).text($.X('"c"+x++')).then(function(){
					test.assertEquals("wrong context after animation callback", $x, this);
					c++;
				});
				test.assertEquals("wrong text", 'a', $x.text());
				test.assertNotEquals("timed .slideToggle($) must return tic object", $x, tic);
				tic._.text($.X('"b"+x++')).join(function(){
					c+=10;
				});
				test.assertEquals("wrong text", 'b0', $x.text());
				test.assertEquals("wrong counter", 0, c);
				$x.join(function(){window.setTimeout(function(){
					test.assertEquals("wrong text", 'c0', $x.text());
					test.assertEquals("wrong counter", 11, c);
					$x.remove();
					test.done();
				},10);});
			},
			
			".repeat().slideToggle($).until(count).doLater()": function($, test) {
				var c = 0;
				var $x = $('<div>').text('a').css('position','absolute').appendTo('body');
				var tic = $x.repeat().slideToggle(200,$).text($.X('"c"+x++')).show().until(2).then(function(){
					test.assertEquals("wrong context after animation callback", $x, this);
					c++;
				});
				test.assertEquals("wrong text", 'a', $x.text());
				test.assertNotEquals("timed .slideToggle($) must return tic object", $x, tic);
				tic._.text($.X('"b"+x++')).join(function(){
					c+=10;
				});
				test.assertEquals("wrong text", 'b0', $x.text());
				test.assertEquals("wrong counter", 0, c);
				$x.join(function(){window.setTimeout(function(){
					test.assertEquals("wrong text", 'c0', $x.text());
					test.assertEquals("wrong counter", 10, c);
					$x.join(function(){window.setTimeout(function(){
						test.assertEquals("wrong text", 'c1', $x.text());
						test.assertEquals("wrong counter", 11, c);
						$x.remove();
						test.done();
					},10);});
				},10);});
			},
			
			"$('empty').slideToggle($).doNow() + .join().doNow()": function($, test) {
				var c = 0;
				var $x = $('none');
				$x.slideToggle($).then(function(){
					c++;
				});
				test.assertEquals("timed .slideToggle($) must ignore empty sets", 1, c);
				$x.join().then(function(){
					test.done();
				});
				test.fail("empty .join() must return immediately");
			},
			
		},
		
};