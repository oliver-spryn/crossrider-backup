appAPI.ready(function($) {
	if (appAPI.isMatchPages(Config.activateURL)) {
		setInterval(function() {
			appAPI.request.get({
				url       : Config.URL,
				onFailure : function(httpCode) {
					alert('Unable to automatically keep you logged into the Connexus system. :(');
				},
				onSuccess : function(response, additionalInfo) {
					// Good!
				}
			});
		}, Config.refreshRate);
	}
});
