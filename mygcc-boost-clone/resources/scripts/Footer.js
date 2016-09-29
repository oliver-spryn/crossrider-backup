(function($) {
    $.Footer = function(config) {
	//Constructor
		$.Footer.body = $('body');
		
	//Bootstrap this plugin
        $.Footer.create(config);
        $.Footer.clean();
	};
    
    $.Footer.clean = function() {
        $('div#foot').remove();                // "Footer"
        $('td#sideBar').remove();              // The sad sidebar
	};
    
    $.Footer.getQuickLinks = function() {
        var links = $('ul#globalLinks li');
        var ret = new Array(links.length);
        
        for(var i = 0; i < links.length; ++i)  {
            var link = new Array(2);
            var item = links.eq(i).children('a');
            
            link[0] = item.attr('href');
            link[1] = item.text();
            
            ret[i] = link;
        }
        
        return ret;
    };
    
    $.Footer.create = function(config) {
        var links = $.Footer.getQuickLinks();
        
        var HTML = '<footer id="bottom">';
        HTML += '<nav>';
        HTML += '<ul class="navigation">';
        
    //Build the list of quick links
        HTML += '<li>';
        HTML += '<ul class="links">';
        
        for(var i = 0; i < links.length; ++i) {
            HTML += '<li><a href="' + links[i][0] + '" target="_blank">' + links[i][1] + '</a></li>';
        }
        
        HTML += '</ul>';
        HTML += '</li>';
        
    //Build the far right column
        HTML += '<li>';
        HTML += '<ul class="promotion">';
        HTML += '<li>';
        
        if (config.showFacebook)
            HTML += '<img src="' + appAPI.resources.getImage('images/social/facebook.png') + '">';
            
        if (config.showTwitter)
            HTML += '<img src="' + appAPI.resources.getImage('images/social/twitter.png') + '">';
            
        if (config.showPinterest)
            HTML += '<img src="' + appAPI.resources.getImage('images/social/pinterest.png') + '">';
            
        if (config.showInstagram)
            HTML += '<img src="' + appAPI.resources.getImage('images/social/instagram.png') + '">';
            
        if (config.showYouTube)
            HTML += '<img src="' + appAPI.resources.getImage('images/social/youtube.png') + '">';
        
        HTML += '</li>';
        HTML += '<li>Phone: ' + config.gccPhone  + '</li>';
        HTML += '<li>' + config.gccAddress  + '</li>';
        HTML += '<li><hr></li>';
        HTML += '</ul>';
        HTML += '</li>';
        HTML += '</ul>';
        HTML += '</nav>';
        
    //Build the super footer!
        HTML += '<ul class="mega-footer">';
        HTML += '<li>Established in ' + config.gccEstablished + '</li>';
        HTML += '<li><img alt="GCC Shield" src="' + config.shieldURL + '"/></li>';
        HTML += '<li>myGCC Boost</li>';
        HTML += '</ul>';
        HTML += '</footer>';
        
        $.Footer.body.append(HTML);
    };
})(jQuery);