(function($) {
	$.Header = function(config) {
	//Constructor
		$.Header.body = $('body');
		$.Header.menu = $('div#headerTabs');
		$.Header.window = $(window);
		
	//Bootstrap this plugin
        $.Header.saveName();
        $.Header.addMaster(config);
        //$.Header.addBanner(config);
        $.Header.clean();
        
    //Lock the navigation to the top of the screen
		$.Header.window.scroll($.Header.lockMenu);
	};
	
	$.Header.clean = function() {
		$('div#masthead').remove();                // GCC banner
        $('div#welcomeBackBar').remove();          // Welcome user bar
		$('div#DivStaffQuickSearch').remove();     // Campus directory
        $('div#errorMessage').remove();            // Error message container
		$('div#TargetedMessage').remove();         // GCC advertisements
        $('div#mainCrumbs').remove();              // Breadcrumbs
        $('div#pageTitle').remove();               // Print button and page title
	};
    
    $.Header.lockMenu = function() {
		if ($.Header.window.scrollTop() > $.Header.menu.position().top) {
			$.Header.menu.addClass('fixed');
		} else {
			$.Header.menu.removeClass('fixed');
		}
    };
    
    $.Header.saveName = function() {
        $.Header.person =  $('div#userWelcome > strong').text();
    };
    
    $.Header.addMaster = function(config) {
        var courses = $.Header.extractCourses();
        
        var HTML = '<header id="boost-header">';
        
    //GCC logo
        HTML += '<a href="' + config.baseURL + '"><img class="logo" src="' + config.logoURL + '"></a>';
        
    //Advertisements
        var adURL = $('div#TargetedMessage img').attr('src');
        
        HTML += '<div class="ad"><img src="' + adURL + '"></div>';
        
    //Account Settings
        HTML += '<div class="account">';
        HTML += '<ul>';
        HTML += '<li>';
        HTML += '<span class="boost-tooltip courses" data-toggle="tooltip" data-placement="bottom" title="Your Courses"></span>';
        HTML += '</li>';
        
        HTML += '<li>';
        HTML += '<span class="alerts boost-tooltip" data-toggle="tooltip" data-placement="bottom" title="Alerts"></span>';
        HTML += '</li>';
        
        HTML += '<li>';
        HTML += '<span class="boost-tooltip refresh" data-toggle="tooltip" data-placement="bottom" title="Reload your Personal Data"></span>';
        HTML += '</li>';
        
        HTML += '<li>';
        HTML += '<span class="avatar boost-tooltip" data-toggle="tooltip" data-placement="bottom" title="Manage your Profile" style="background-image: url(https://my.gcc.edu/icsfileservershare/icsphotos/433322.jpg)"></span>';
        HTML += '</li>';
        HTML += '</ul>';
        HTML += '</div>';
        HTML += "</header>";
        
        //HTML += '<div class="classes">';
        //HTML += '<h2></h2>';
        
        //HTML += '</div>';
        
        
        $.Header.body.prepend(HTML);
        
    //Generate the course Boostrap popover
		$('span.courses').popover({
			html : true,
			content : function() {
				HTML = '<ul class="course-list">';
				
				for(var i = 0; i < courses.length; ++i) {
					HTML += ('<li><a href="' + courses[i][0] + '"><strong>' + courses[i][1] + '</strong><span>' + courses[i][2] + '</span></a></li>');
				}
				
				HTML += '</ul>';
				
				return HTML;
			}
		});
    };
    
    $.Header.addBanner = function(config) {
        var title = $('div#pageTitle h2').text();
        var rand = Math.round(Math.random() * config.banners.length) - 1;
        
        var HTML = '<section id="splash">';
        HTML += '<div class="ad-container" style="background-image: url(\'' + config.banners[rand] + '\')">';
        HTML += '<div class="ad-contents">';
        HTML += '<h2>' + title + '</h2>';
        HTML += '</div>';
        HTML += '</div>';
        HTML += '</section>';
        
        $.Header.body.find('div#headerTabs').after(HTML);
    };
    
    $.Header.extractCourses = function() {
        var courseList = $('dl#myCourses dd ul li');
        var ret = new Array(courseList.length);
        
        for(var i = 0; i < courseList.length; ++i) {
            var course = new Array(3);
            var link = courseList.eq(i).children('a');
            
            course[0] = link.attr('href');
            course[1] = link.text().substr(0, 10);
            course[2] = link.text().substr(13);
            
            ret[i] = course;
        }
        
        return ret;
    };
})(jQuery);