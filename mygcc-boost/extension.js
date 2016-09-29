/**
 * Script to log into MyGCC
 *
 * Becase MyGCC sucks and it doesn't keep your session for more than, like,
 * two seconds before it tells you its going to log you out against your
 * will. Nations will stand strong against MyGCC, but MyGCC shall also
 * remain resolute and its dark powers will not be weakened.
 *
 * Then came along Chris Mallett, Steve Gray, and Oliver Spryn. Together
 * they have an ingenious plan to thwart MyGCC, at least for a little while.
 * Their plan: operation AutohotKey and its assistant Major Program.
 *
 * Hence, the result:
*/

appAPI.ready(function($) {
//Load the configuration file
	appAPI.resources.includeJS('js/Config.js');
	appAPI.resources.includeJS('js/logged-in.js');
	
//Apply this extension only the domain listed in config.js
	if (appAPI.isMatchPages(Config.domain)) {	
	//Include extenstion and Bootscript related scripts
		appAPI.dom.addRemoteCSS(Config.bootstrapCSS);
		appAPI.dom.addRemoteJS(Config.bootstrapJS);
		appAPI.resources.includeCSS('css/main.css');
	//	appAPI.resources.includeJS('js/build.js');
	//	appAPI.resources.includeJS('js/parser.js');
		appAPI.resources.includeJS('js/Navigation_Manager.js');
		appAPI.resources.includeJS('js/Caching_Manager.js');
		
	//Initialize the necessary classes
		var navigation = new Navigation_Manager();
		var cache = new Caching_Manager(Config.portletsDBKey, loggedIn);
		cache.addCallback(function() {
			console.log(appAPI.db.get(Config.portletsDBKey));
		});
		
		cache.process();
		
	//Build the navigation bar		
	//	build.navigation(navigation);
		//build.cash(parse.cash());
		//build.courses(parse.courses());
		//build.login();
		//build.breadcrumb(parse.breadcrumb());
		
	//Rebuild the sidebar
	//	build.sidebar(parse.sidebar());
		
	//Build the footer
	//	build.links(Config.footerLinks);
	//	build.portlets(navigation, Config.portlets);
		
	//Apply pretty Twitter buttons
	//	$(':submit').addClass('btn');
		
	/**
	 * Delete some crap:
	 * 
	 *  - div#masthead is the crimson Grove City header
	 *  - div#welcomeBackBar is the crimson strip where the old login form used to exist
	 *  - div#DivStaffQuickSearch is the container for student/faculty search
	 *  - div#pageTitleButtons is the "Printer Friendly" link at the top-right of each page
	 *  - div#quickLinks is the list of external links on the sidebar 
	*/
	//	$('div#masthead, div#welcomeBackBar, div#DivStaffQuickSearch, div#pageTitleButtons, div#quickLinks').remove();
		
	//	$('body > table').removeAttr('style');
	//	$('div.portlet').removeClass('portlet');
		
	//Remove the background image and padding from the sidebar
	//	$('div#thisContext').css({
	//		'background' : 'none',
	//		'padding' : '0px'
	//	});
		
	//Collapse the two column layout into one
	//	var col1 = $('td.pColumn1');
	//	var col2 = $('td.pColumn2');
		
	//	col1.append(col2.html());
	//	col2.remove();
		
	//Move the page header out of the main body table
	//	var title = $('div#pageTitle');
		
	//	$('table#mainLayout').before('<h2>' + title.text() + '</h2>');
	//	title.remove();
		
	//Modify the login required message
	//	var message = $('span.notFound');
	
	//	if (message.length) {
	//		message.children('p').append(' ');
	//		
	//		var text = message.text();
	//		var newContainer = message.parent().parent();
	//		
	//		newContainer.empty();
	//		newContainer.append('<div class="alert alert-error"><h2>Please Sign In</h2><p>' + text + '</p><br><a class="btn" href="javascript:$(\'.dropdown-toggle\').dropdown(\'toggle\'); return false;">Sign In</a></div>');
	//	}
	}
});
