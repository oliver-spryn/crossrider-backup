	function Parser(loggedIn) {
		this.loggedIn = loggedIn;
	}

//Grab the text and URLs from the navigation bar
	Parser.prototype.navigation = function() {
		var navigator = $('div#headerTabs ul li');
		var data = {
			'selectedIndex' : 0,
			'text' : [],
			'URL' : []
		};
		
		for (var i = 0; i < navigator.length; i++) {
			data.text.push(navigator.eq(i).text());
			data.URL.push(navigator.eq(i).children('a').attr('href'));
			
			if (navigator.eq(i).hasClass('selected')) {
				data.selectedIndex = i;
			}
		}
		
		return data;
	};
	
//Grab the text and HTML from the breadcrumb
	Parser.prototype.breadcrumb = function() {
		var links = $('div#youAreHere span.crumbs a');
		var data = {
			'text' : [],
			'URL' : []
		};
		
		for (var i = 0; i < links.length; i++) {
			data.text.push(links.eq(i).text());
			data.URL.push(links.eq(i).attr('href'));
		}
		
		return data;
	};
	
//Grab the list of courses
	Parser.prototype.courses = function() {
		var courses = $('dl#myCourses dd ul li');
		var data = {
			'text' : [],
			'URL' : []
		};
		
		for (var i = 0; i < courses.length; i++) {
			data.text.push(courses.eq(i).text());
			data.URL.push(courses.eq(i).children('a').attr('href'));
		}
		
		return data;
	};
	
//Grab the user's Crimson Cash from a remote page
	Parser.prototype.cash = function() {
		if (this.loggedIn) {
		//Since we don't know the URL of the iFrame we need, go to the page that has it
			$.ajax({
				'dataType' : 'html',
				'url' : '//my.gcc.edu/ICS/Financial_Info/',
				'success' : function(data) {
					var frame = $(data).find('iframe#pg5_V_iframe').attr('src');
					
				//Yep, do this AGAIN to get the contents of the iFrame
					$.ajax({
						'dataType' : 'html',
						'url' : frame,
						'success' : function(frameData) {
						//If the fetched HTML was valid, this selector would grab the price
							//var total = $(frameData).find('form#form1 div').eq(2).children('span').eq(0).children('b').text();
							
						//Parse text to get the price
							var text = $(frameData).text().split('current Crimson Cash balance:');
							var unformattedTotal = text[1].replace(/[^\d,]+/g, '');
							
						//Add the decimal and dollar sign back in
							var formattedTotal = '$' + unformattedTotal.substring(0, unformattedTotal.length - 2) + '.';
							formattedTotal += unformattedTotal.substring(unformattedTotal.length - 2, unformattedTotal.length);
							
							return formattedTotal;
						}
					});
				}
			});
		}
	};
	
//Grab the list of URLs on the sidebar
	Parser.prototype.links = function() {
		var links = $('ul#globalLinks li');
		var data = {
			'abbreviation' : [],
			'originalText' : [],
			'URL' : []
		};
		
		for (var i = 0; i < links.length; i++) {
			var abbreviation = links.eq(i).text().substring(0, 2).toLowerCase(); //CSS will uppercase the first letter
			
			data.abbreviation.push(abbreviation);
			data.originalText.push(links.eq(i).text());
			data.URL.push(links.eq(i).children('a').attr('href'));
		}
		
		return data;
	};
	
//Grab the navigation from the sidebar
	Parser.prototype.sidebar = function() {
		var contextLinks = $('ul#contextPages > li');
		var subLinks = $('ul#subContexts > li');
		var data = {
			'text' : [],
			'URL' : []
		};
		
	//Don't include the sidebar if there is just a link to the same page
		if (contextLinks.length + subLinks.length > 1) {
		//Take care of the first menu
			for (var i = 0; i < contextLinks.length; i++) {
				data.text.push(contextLinks.eq(i).children('a').text());
				data.URL.push(contextLinks.eq(i).children('a').attr('href'));
			}
			
		//There may be a second menu we can parse, though it is less likely
			for (var j = 0; j < subLinks.length; j++) {
				data.text.push(subLinks.eq(j).text());
				data.URL.push(subLinks.eq(j).children('a').attr('href'));
			}
		}
		
		return data;
	};