/************************************************************************************
  This is your background code.
  For more information please visit our wiki site:
  http://docs.crossrider.com/#!/guide/background_scope
*************************************************************************************/


appAPI.ready(function($) {
    setInterval(function($) {
		appAPI.request.get({
			url : 'https://my.gcc.edu/ics/',
			onSuccess: function(response, additionalInfo) {
				// Nice try MyGCC, we're still here!!! mwhahahahaha!
			}
		});
    }, 300000);
});

//https://my.gcc.edu/ICS//UI/Services/PortalServices.asmx/session_keep_alive

appAPI.ready(function() {
    appAPI.browserAction.setResourceIcon("images/logo.png");
    appAPI.browserAction.setTitle("myGCC Boost Settings");
    
    appAPI.browserAction.onClick(function() {
        appAPI.openURL({
            resourcePath : 'settings/index.html', 
            where        : 'tab'
        });
    });
});