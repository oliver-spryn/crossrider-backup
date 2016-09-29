//Create the toolbar
	function Build(loggedIn) {
		$('form#MAINFORM').append('<div class="navbar navbar-inverse navbar-fixed-top"><div class="navbar-inner"><div class="container"><ul class="nav left"></ul><ul class="nav pull-right right"></ul></div></div></div>');
		
		this.bar = $('div.navbar div div');
		this.loggedIn = loggedIn;
	}
	
/**
 * Navigation bar
 * ---------------------------------
*/
	
//Build the navigation bar
	Build.prototype.navigation = function(data) {
	//Add the unordered list to contain the navigation
		var navigation = this.bar.children('ul.left');
		
	//Add the menu items to the list
		for (var i = 0; i < data.text.length; i++) {
			if (i == data.selectedIndex) {
				navigation.append('<li class="active"><a href="' + data.URL[i] + '">' + data.text[i] + '</a></li>');
			} else {
				navigation.append('<li><a href="' + data.URL[i] + '">' + data.text[i] + '</a></li>');
			}
		}
		
	//Remove the old navigation bar
		$('div#headerTabs').remove();
	};
	
//Move the courses to the bar at top
	Build.prototype.cash = function(data) {
		if (this.loggedIn) {
		//Build the list container
			this.bar.children('ul.right').append('<li class="dropdown crimson-cash"><a href="#" class="dropdown-toggle" data-toggle="dropdown">$</a><ul class="dropdown-menu"></ul></li>');
			
		//Add the Crimson Cash
			var menu = this.bar.find('ul.pull-right li.crimson-cash ul');
			menu.append('<li>' + data + '</li>');
		}
	};
	
//Move the courses to the bar at top
	Build.prototype.courses = function(data) {
		if (this.loggedIn) {
		//Build the list container
			this.bar.children('ul.right').append('<li class="dropdown myCourses"><a href="#" class="dropdown-toggle" data-toggle="dropdown"><img src="' + appAPI.resources.getImage('img/header/courses.png') + '" /></a><ul class="dropdown-menu"></ul></li>');
			
		//Add the courses
			var courseMenu = this.bar.find('ul.pull-right li.myCourses ul');
			
			if (data.text.length) {
				courseMenu.append('<li class="nav-header">My Courses</li>');
				
				for (var i = 0; i < data.text.length; i++) {
					courseMenu.append('<li><a href="' + data.URL[i] + '">' + data.text[i] + '</a></li>');
				}
			} else {
				courseMenu.append('<li class="nav-header">No Active Courses</li>');
			}
			
		//Add additional course scheduling and details links
			courseMenu.append('<li class="divider"></li>');
			courseMenu.append('<li><a href="//my.gcc.edu/ICS/Academics/Home.jnz?portlet=Student_Schedule">Course Details</a></li>');
			courseMenu.append('<li><a href="//my.gcc.edu/ICS/Academics/Home.jnz?portlet=All_My_Courses">Class Schedules</a></li>');
			courseMenu.append('<li><a href="//my.gcc.edu/ICS/Academics/Home.jnz?portlet=Course_History">Course History</a></li>');
		}
	};
	
//Move the login to the bar at top
	Build.prototype.login = function() {
	//Add a user login dropdown form
		if (!this.loggedIn) {
		//Build the containing menu for the login form			
			this.bar.children('ul.right').append('<li class="dropdown login"><a class="dropdown-toggle" data-toggle="dropdown" href="#">Sign In <b class="caret"></b></a><ul class="dropdown-menu dropdown-form"></ul></li>');
			this.bar.find('ul.right li ul.dropdown-menu').append('<li class="login-dropdown"><div></div></li>');
			
		//Add the login form
			var loginMenu = this.bar.find('ul.right li.login ul');
			var login = loginMenu.find('li div');
			login.append('<label>Student number<input type="text" name="userName" id="userName" value="" /></label>');
			login.append('<label>Password<input type="password" name="password" id="password" /></label>');
			login.append('<input type="submit" name="btnLogin" value="Login" id="btnLogin" />');
			
		//Add the forgot password
			loginMenu.append('<li class="divider"></li>');
			loginMenu.append('<li><a onclick="preventDefault(event, ValidateLoginUserName());" href="javascript:__doPostBack(\'lnkForgot\', \'\')">Forgot Password</a></li>');
			
		//Remove the old login form
			$('span#userLogin').remove();
			
		//Fix input element click problem causing the dropdown menu to close
			$('li.login-dropdown form, li.login-dropdown label, li.login-dropdown input').click(function(e) {
				e.stopPropagation();
			});
	//Add a profile information dropdown
		} else {
		//Remove the middle name
			var name = $('div#userWelcome strong').text();
			var parts = name.split(" ");
			name = "";
			
			for (var i = 0; i < parts.length; i++) {
				if (i != parts.length - 2) {
					name += parts[i] + " ";
				}
			}
			
			name = name.substring(0, name.length - 1);
		
		//Build the containing menu for the profile information
			this.bar.children('ul.right').append('<li class="dropdown profile"><a class="dropdown-toggle" data-toggle="dropdown" href="#">' + name + ' <b class="caret"></b></a><ul class="dropdown-menu dropdown-form"></ul></li>');
		
		//Add the menu items
			var profileMenu = this.bar.find('ul.right li.profile ul');
			profileMenu.append('<li><a href="javascript:__doPostBack(\'welcomeBackBar\', \'accountInfo\')">Edit Profile</a></li>');
			profileMenu.append('<li><a href="javascript:__doPostBack(\'welcomeBackBar\', \'logout\')">Sign Out</a></li>');
		}
	};
	
/**
 * Breadcrumb
 * ---------------------------------
*/
	
//Build the breadcrumb
	Build.prototype.breadcrumb = function(data) {
	//Build the list container
		$('div.navbar').after('<ul class="new-breadcrumb"></ul>');
		var breadcrumb = $('ul.new-breadcrumb');
		
	//Add the breadcrumb items
		breadcrumb.append('<li><a href="//' + Config.domain + '"></a></li>');
	
		for (var i = 0; i < data.text.length; i++) {
			if (i == data.text.length - 1) {
				breadcrumb.append('<li><span>' + data.text[i] + '</span></li>');
			} else {
				breadcrumb.append('<li><a href="' + data.URL[i] + '">' + data.text[i] + '</a></li>');
			}
		}
		
	//Remove the old breadcrumb
		$('div#mainCrumbs').remove();
	};
	
/**
 * Sidebar
 * ---------------------------------
*/
	
//Rebuild the structure of the sidebar links
	Build.prototype.sidebar = function(data) {
		var container = $('div#thisContext');
		
	//Build the sidebar only if it will contain multiple items
		if (data.text.length > 0) {
			container.empty();
			
		//Build the list container
			container.append('<ul class="nav nav-tabs nav-stacked"></ul>');
			
			for (var i = 0; i < data.text.length; i++) {
				container.children('ul').append('<li><a href="' + data.URL[i] + '">' + data.text[i] + '</a></li>');
			}
		} else {
			container.parent().remove();
		}
	};
	
/**
 * Footer
 * ---------------------------------
*/
	
//Add a list of handy links to the bottom of the page, and move the sidebar links here
	Build.prototype.links = function(data) {
	//Create the footer
		$('body').append('<div class="new-footer"></div>');
		
	//Build the menu
		this.footer = $('div.new-footer');
		this.footer.append('<ul class="side-links"></ul>');
		
		var menu = this.footer.children('ul.side-links');
		
		for (var i = 0; i < data.text.length; i++) {
			menu.append('<li><a class="color' + (i + 1) + '" href="'+ data.URL[i] + '" title="'+ data.text[i] + '" target="_blank"><img src="' + appAPI.resources.getImage(data.icon[i]) + '" /></a></li>');
		}
	};
	
//Add a link list of all portlets to the footer
	Build.prototype.portlets = function(navigationMenu, portletData) {
		if (this.loggedIn) {
		//Build the menu
			this.footer.append('<h2>MyGCC Portlets</h2>');
			this.footer.append('<ul class="portlets-compilation"></ul>');
			
			var portlets = this.footer.children('ul.portlets-compilation');
			
		//Look at config.js to see how the array of objects is structured
		//-1 to not include "My Pages"
			for (var i = 0; i < navigationMenu.text.length - 1; i++) {			
				portlets.append('<li><ul></ul></li>');
				
				var currentColumn = portlets.find('li:last ul');
				currentColumn.append('<li><a href="' + navigationMenu.URL[i] + '">' + navigationMenu.text[i] + '</a></li>');
				
				for (var j = 0; j < portletData[i].text.length; j++) {
					currentColumn.append('<li><a href="' + portletData[i].URL[j] + '">' + portletData[i].text[j] + '</a></li>');
				}
			}
		}
	};