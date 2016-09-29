/**
 * Page & Portlet Caching Manager class
 *
 * This class is used to manage the database which holds all of the titles
 * and URLs to myGCC's pages and portlets. This class will ensure the data-
 * base holds these values for only one day, so that if myGCC portlets are
 * updated, the local database will recieve a copy within one day.
 * 
 * This class works by visiting all of the pages on the navigation bar,
 * parsing the HTML pages, and extracting the titles and URLs located
 * in the header of each portlet.
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
 * The constructor will simply globalizes a references to several variables
 * used throughout this class, such as the navigation bar which will be parsed
 * the name of the local database key, and the array which will hold all of
 * the content this class works to construct. 
 * 
 * @access public
 * @param  string databaseKey The name of the database key where the generated values are (or should be) stored
 * @param  bool   loggedIn    Whether or not the user is logged into myGCC
 * @return void
 * @since  v1.0 Dev
*/

	function Caching_Manager(databaseKey, loggedIn) {
		this.navigator = $('div#boost-navigation div div ul.left');
		this.databaseKey = databaseKey;
		this.pageCache = [];
		this.loggedIn = loggedIn;
	}
	
/**
 * Hold a reference to the unordered list which contains the navigation 
 * links.
 *
 * @access public
 * @type   jQuery
*/

	Caching_Manager.prototype.navigator = '';
	
/**
 * Hold a reference to the database key where the generated values are
 * (or should be) stored.
 *
 * @access public
 * @type   string
*/

	Caching_Manager.prototype.databaseKey = '';
	
/**
 * Hold a reference to the array which will hold all of the content this
 * class works to construct.
 *
 * @access public
 * @type   array<object<string,string,array<object<string,string>>>>
*/

	Caching_Manager.prototype.pageCache = [];
	
/**
 * Hold a reference tas to whether or not the user is logged into myGCC.
 *
 * @access public
 * @type   bool
*/

	Caching_Manager.prototype.loggedIn = false;
	
/**
 * Hold a reference to the function which will be called once caching is
 * complete.
 *
 * @access public
 * @type   string
*/

	Caching_Manager.prototype.callback = null;
	
/**
 * This method publicizes a reference to the function which will be called
 * once caching is complete.
 * 
 * @access public
 * @param  function callback The name of the callback function
 * @return void
 * @since  v1.0 Dev
*/
	
	Caching_Manager.prototype.addCallback = function(callback) {
		this.callback = callback;
	};
	
/**
 * This method will determine whether or not myGCC portlets will need cached
 * and acting accordingly, or otherwise it will fire the caching complete
 * callback.
 * 
 * @access public
 * @return void
 * @since  v1.0 Dev
*/
	
	Caching_Manager.prototype.process = function() {
		if (this.expired() && this.loggedIn) {
			this.cache(); //Calls the callback function on complete
		} else {
			this.callback();
		}
	};
	
/**
 * Whether or not the database has a local copy of the pages and portlets in
 * cache, or if it has expired.
 * 
 * @access public
 * @return bool     Whether or not the database value has expired
 * @since  v1.0 Dev
*/
	
	Caching_Manager.prototype.expired = function() {
		return appAPI.db.get(this.databaseKey) === null ? true : false;
	};
	
/**
 * This method runs a heavy, n^2 time complexity algorithm to cache the 
 * title of each page, its URL, and the title and URLs of all portlets
 * on each page into the local database. These results will be used in
 * two places, in the hover-over tool tip in the boost navigation header,
 * and in the compilation of all pages and portlets in the footer.
 * 
 * The structure of cached object, when fully built, looks like this
 * 
 *     var pageCache = [
 *       '0' : {
 *         'title'    : 'Page 1',
 *         'URL'      : '<page URL here>',
 *         'portlets' : [
 *           '0' : {
 *             'title' : 'Portlet 1',
 *             'URL'   : '<portlet URL here>'
 *           }
 *           
 *           ... Additional portlet data objects here ...
 *         ]
 *       }
 *       
 *       ... Additional page data objects here ...
 *     ];
 * 
 * @access public
 * @return void
 * @since  v1.0 Dev
*/
	
	Caching_Manager.prototype.cache = function() {
		var cmClass = this;
		var successIterator = 0;
		var links = this.navigator.children('li');
		var pageObject = {};    //The object containing infomation for a specific page
		var portletObject = {}; //The object containing information for a spefic portlet
		
		for (var i = 0; i < links.length; ++i) {
		//Empty the object which is used repeadly
			pageObject = {};
			
		//Fill up the pageObject as much as we can be before making a request for more information
			pageObject.title = links.eq(i).text();
			pageObject.URL = links.eq(i).children('a').attr('href');
			pageObject.portlets = [];
			
			$.ajax({
				'data' : {
					'boost-index' : i
				},
				'dataType' : 'html', 
				'type' : 'GET',
				'url' : pageObject.URL,
				'success' : function(data) {
					var HTML = $(data).find('table#PORTLETGRID tbody tr');
					var column1 = HTML.find('td.pColumn1 > div.portlet');
					var col1Len = column1.length;
					
				//td.pColumn2 may or may not exist
					var column2, col2Len;
				
					if (HTML.find('td.pColumn2').length) {
						column2 = HTML.find('td.pColumn2 > div.portlet');
						col2Len = column2.length;
					} else {
						column2 = false;
						col2Len = 0;
					}
					
				// Since this request was made asynchronously, the order in which these requests are returned
				// may not be in the order they were made, so grab the query parameter which was included with
				// the HTTP request indicating the index in the cache to place the fetched data
					var index = cmClass.getParameterByName(this.url, 'boost-index');
					
				/**
				 * This operation will parse the data from the portlets from left to
				 * right, and from top to bottom. In other words, the first portlet
				 * from column one will be parsed, then the first portlet from column
				 * two, then the second portlet from column one will be parsed, and 
				 * the portlet two from column two.
				 * 
				 * This idea of staggering the parsing mechanism will build the cache
				 * of portlets in the order the user was intended to view them on the
				 * old myGCC design, from left to right, top to bottom.
				*/
				
				//Calculate the maximum number of iterations required, since one column may have more portlets
					var max;
				
					if (col2Len) {
						max = col1Len > col2Len ? col1Len : col2Len;
					} else {
						max = col1Len;
					}
					
				// Iterate through all of the portlets
				// Note the use of pageCache[index]. As was mentioned before, since the HTTP request is an
				// asynchronous event, the actual construction of the portlets array for each page pbject
				// occurs after the pageCache object has been created (i.e.: everything outside of the 
				// success callback happens before the callback is called even once)
					var j;
				
					for(j = 0; j < max; ++j) {
					//Cache portlets in from column one, if there are still some uncached portlets
						if (j < col1Len) {
							portletObject = {};
							
							portletObject.title = column1.eq(j).find('div.pHead h3 a').text();
							portletObject.URL = column1.eq(j).find('div.pHead h3 a').attr('href');
							cmClass.pageCache[index].portlets.push(portletObject);
						}
						
					//Cache portlets in from column two, if there are still some uncached portlets
						if (j < col2Len) {
							portletObject = {};
							
							portletObject.title = column2.eq(j).find('div.pHead h3 a').text();
							portletObject.URL = column2.eq(j).find('div.pHead h3 a').attr('href');
							cmClass.pageCache[index].portlets.push(portletObject);
						}
					}
					
				//Cache the data and call the event complete callback if both loops are completed
					if (successIterator == links.length - 1 && j == max) {
						appAPI.db.set(cmClass.databaseKey, cmClass.pageCache, appAPI.time.daysFromNow(1));
						cmClass.callback();
					} else {
						successIterator++;
					}
				}
			});
			
			this.pageCache.push(pageObject);
		}
	};
	
/**
 * This method will parse the given URL and return the value of the 
 * value of the given query string parameter.
 * 
 * @access public
 * @param  string   URL       The URL to parse
 * @param  string   parameter The query string whose value should be returned
 * @return string             The value of the query string parameter from the supplied URL
 * @since  v1.0 Dev
*/
	
	Caching_Manager.prototype.getParameterByName = function(URL, parameter) {
		var query = URL.split('?');
		var URLVars = query[1].split('&');
		
		for (var i = 0; i < URLVars.length; ++i) {
			var paramName = URLVars[i].split('=');
			
			if (paramName[0] == parameter) {
				return paramName[1];
			}
		}
	};