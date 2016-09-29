//"Class" constructor to to specify the request type
    function RPC(type) {
		RPC.prototype.type = type;
	}
	
//Make a GET request
	RPC.prototype.get = function(URL, params, callback) {
	//Use jQuery for local requests
		if (RPC.prototype.type == RPC.LOCAL) {
			$.ajax({
				data     : params,
				dataType : 'html',
				type     : 'GET',
				url      : URL,
                success  : function(data, textStatus) {
                    if (callback && typeof(callback) === 'function') {
                        callback(data, textStatus);
                    }
                }
			});
	//Use the extension library to make a cross-domain request
		} else {
			appAPI.request.get({
				additionalRequestHeaders : params,
				url                      : URL,
                onSuccess                : function(response, additionalInfo) {
                    if (callback && typeof(callback) === 'function') {
                        callback(response, additionalInfo);
                    }
                }
			});
		}
	};
	
//Make a POST request
	RPC.prototype.post = function(URL, params, callback) {
	//Use jQuery for local requests
		if (RPC.prototype.type == RPC.LOCAL) {
			$.ajax({
				data     : params,
				type     : 'POST',
				url      : URL,
                success  : function(data, textStatus) {
                    if (callback && typeof(callback) === 'function') {
                        callback(data, textStatus);
                    }
                }
			});
	//Use the extension library to make a cross-domain request
		} else {
			appAPI.request.get({
				additionalRequestHeaders : params,
                url                      : URL,
                onSuccess                : function(response, additionalInfo) {
                    if (callback && typeof(callback) === 'function') {
                        callback(response, additionalInfo);
                    }
                }
			});
		}
	};
	
//AJAX request type
	RPC.prototype.LOCAL = "local";
	RPC.prototype.X_DOMAIN = "cross domain";