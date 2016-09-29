/**
 * Page Navigation Manager class
 *
 * This class will parse and build the navigation bar along the top of each
 * page. The links from the old myGCC nagivation bar will be moved to this
 * one by default. This class will also manage the addition of new jewels
 * which can be added to the right side of the menu.
 *
 * @author    Oliver Spryn
 * @copyright Copyright (c) 2013 and Onwards, ForwardFour Innovations
 * @license   Closed source
 * @package   js
 * @since     v1.0 Dev
*/

/**
 * CONSTRUCTOR
 *
 * The constructor will create the boost navigation menu, publicize references
 * to the link and jewels containers inside of the boost menu, and copy links 
 * from the old menu to the boost menu. 
 * 
 * @access public
 * @return void
 * @since  v1.0 Dev
*/

	function Navigation_Manager() {
	//Build the navigation bar container
		$('form#MAINFORM').append('<div class="navbar navbar-inverse navbar-fixed-top" id="boost-navigation"><div class="navbar-inner"><div class="container"><ul class="nav left"></ul><ul class="nav pull-right right"></ul></div></div></div>');
		this.navigator = $('div#boost-navigation div div ul.left');
		this.jewels = $('div#boost-navigation div div ul.right');
		
	//Populate the navigation bar
		this.copyNavigation();
	}
	
/**
 * Hold a reference to the unordered list which contains the jewels.
 *
 * @access public
 * @type   jQuery
*/

	Navigation_Manager.prototype.jewels = null;
		
/**
 * Hold a reference to the unordered list which contains the navigation 
 * links.
 *
 * @access public
 * @type   jQuery
*/

	Navigation_Manager.prototype.navigator = null;
	
/**
 * This method will parse the URL, text values, and selected item from the 
 * old myGCC navigation bar and copy the data to the newly built navigation
 * bar.
 * 
 * @access public
 * @return void
 * @since  v1.0 Dev
*/
		
	Navigation_Manager.prototype.copyNavigation = function() {
		var oldNavigator = $('div#headerTabs ul li');
		var item;
		
		for (var i = 0; i < oldNavigator.length; i++) {
			item = oldNavigator.eq(i);
			this.addLink(item.text(), item.children('a').attr('href'), item.hasClass('selected'), false);
		}
		
	//Remove the old navigation bar
		$('div#headerTabs').remove();
	};
	
/**
 * This method will add a new link to the boost navigation menu.
 * 
 * @access public
 * @param  string   text     The text value of the link
 * @param  string   URL      The URL of the link
 * @param  bool     selected Whether or not this link should be highlighted as the active URL
 * @param  bool     newTab   Whether or not the link should open in a new tab or window, i.e. target="_blank"
 * @return void
 * @since  v1.0 Dev
*/

	Navigation_Manager.prototype.addLink = function(text, URL, selected, newTab) {
		var active = selected ? ' class="active"' : '';
		var target = newTab ? ' target="_blank"' : '';
		
		this.navigator.append('<li' + active + '><a href="' + URL + '"' + target + '>' + text + '</a></li>');
	};