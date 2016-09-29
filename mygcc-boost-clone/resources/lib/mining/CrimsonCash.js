    function CrimsonCash(callback) {
        var database = new DB();
		CrimsonCash.prototype.request = new RPC(RPC.LOCAL);
		
	//Check the database for a local copy first
		if (database.expired(CrimsonCash.prototype.config.DBCrimsonCash)) {
			CrimsonCash.prototype.fetchCrimsonCashIFrameURL(function(URL) {
				CrimsonCash.prototype.fetchCrimsonCashDetails(URL, function(cash) {
					database.insert(CrimsonCash.prototype.config.DBCrimsonCash, cash, CrimsonCash.prototype.config.DBExpire);
					
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
	CrimsonCash.prototype.fetchCrimsonCashDetails = function(URL, callback) {
		CrimsonCash.prototype.request.get(URL, null, function(data) {
			var regex = /\$[0-9]+\.[0-9]{2,}/g; // Do a regex search, since the HTML is SO BROKEN!!!
            var cash = regex.exec(data);
            cash = cash[0].substring(1); // Remove the dollar sign
            
            if (callback && typeof(callback) === 'function') {
                callback(cash);
            }
		});
	};
	
//Get the dynamic URL from the CrimsonCash details page
	CrimsonCash.prototype.fetchCrimsonCashIFrameURL = function(callback) {
		CrimsonCash.prototype.request.get(CrimsonCash.prototype.config.baseURL, null, function(data) {
			var iFrame = $(CrimsonCash.prototype.config.frameTarget, data);
			var URL = iFrame.attr('src');
		    
            if (callback && typeof(callback) === 'function') {
                callback(URL);
            }
		});
	};
	
	CrimsonCash.prototype.config = {
	//Page parsing configuration
		baseURL       : 'https://my.gcc.edu/ICS/Financial_Info/Default_Page.jnz?portlet=Universal_Portlet',
		frameTarget   : 'iframe#pg0_V_iframe',
		total         : 'form div:eq(2) span:eq(0) b',
		
	//Database configuration
		DBCrimsonCash : 'CRIMSON_CASH',
		DBExpire      : DB.prototype.expiration.HOUR_6
	};