tests[".$() functionality"] = {
		
		"chaining .$()": {
		
			"$(some).$(other)": function($, test) {
				var $x = test.element('<div>');
				var $y = $x.$('<p>');
				test.assertEquals("chained call of $ will leave previous context alone", 1, $x.size());
				test.assertEquals("wrong element selected", 'div', $x[0].nodeName.toLowerCase());
				test.assertEquals("chained call of $ should ignore previous context", 1, $y.size());
				test.assertEquals("wrong element selected", 'p', $y[0].nodeName.toLowerCase());

				test.done();
			},

			"$(some).find(filter).$(other).end().end()": function($, test) {
				var $x = test.element('<div><p>A</p><p>B</p>');
				var $y = $x.find('p');
				var $z = $y.$('<span>');
				test.assertEquals("chained call of $ will leave previous context alone", 1, $x.size());
				test.assertEquals("wrong element selected", 'div', $x[0].nodeName.toLowerCase());
				test.assertEquals("chained call of $ will leave previous context alone", 2, $y.size());
				test.assertEquals("wrong element selected", 'p', $y[0].nodeName.toLowerCase());
				test.assertEquals("chained call of $ should ignore previous context", 1, $z.size());
				test.assertEquals("wrong element selected", 'span', $z[0].nodeName.toLowerCase());

				test.assertEquals(".end() should go back to previous selection", $y, $z.end());
				test.assertEquals(".end().end() should go back to first selection", $x, $z.end().end());
				
				test.done();
			},

		}
		
};