	function Chapel(callback) {
		var database = new DB();
		Chapel.prototype.request = new RPC(RPC.LOCAL);
		
	//Check the database for a local copy first
		if (database.expired(Chapel.prototype.config.DBAttended)) {
			Chapel.prototype.fetchChapelIFrameURL(function(URL) {
				Chapel.prototype.fetchChapelDetails(URL, function(attended, required) {
					database.insert(Chapel.prototype.config.DBAttended, attended, Chapel.prototype.config.DBExpire);
					database.insert(Chapel.prototype.config.DBRequired, required, Chapel.prototype.config.DBExpire);
                    
                    if (callback && typeof(callback) === 'function') {
                        callback();
                    }
				});
			});
		} else {
			if (callback && typeof(callback) === 'function') {
                callback();
            }
		}
	}
	
//Fetch the chapel details from the dynamic URL
	Chapel.prototype.fetchChapelDetails = function(URL, callback) {
		Chapel.prototype.request.get(URL, null, function(data) {
			var information = $(Chapel.prototype.config.credits, data);
			var attended = information.find(Chapel.prototype.config.attended).text();
			var required = information.find(Chapel.prototype.config.required).text();
			
            if (callback && typeof(callback) === 'function') {
                callback(attended, required);
            }
		});
	};
	
//Get the dynamic URL from the Chapel details page
	Chapel.prototype.fetchChapelIFrameURL = function(callback) {
		Chapel.prototype.request.get(Chapel.prototype.config.baseURL, null, function(data) {
			var iFrame = $(Chapel.prototype.config.frameTarget, data);
			var URL = iFrame.attr('src');
			
            if (callback && typeof(callback) === 'function') {
                callback(URL);
            }
		});
	};
	
	Chapel.prototype.config = {
	//Page parsing configuration
		attended    : 'td:eq(3)',
		baseURL     : 'https://my.gcc.edu/ICS/Student/Default_Page.jnz?portlet=Chapel_Attendance',
		credits     : 'table#grd tr:last-child',
		frameTarget : 'iframe#pg0_V_iframe',
		required    : 'td:eq(1)',
		
	//Database configuration
		DBAttended  : 'CHAPEL_ATTENDED',
		DBExpire    : DB.prototype.expiration.HOUR_6,
		DBRequired  : 'CHAPEL_REQUIRED'
	};