    function DB() { }
	
//Delete a DB entry
	DB.prototype.del = function(key) {
		appAPI.db.remove(key);
	};
	
//Drop a DB
	DB.prototype.drop = function() {
		appAPI.db.removeAll();
	};
	
//Check to see if a particular key exists in the DB
	DB.prototype.exists = function(key) {
		var keys = appAPI.db.getKeys();
		
		for(var i = 0; i < keys.length; ++i) {
			if (keys[i] == key) return true;
		}
		
		return false;
	};
	
//Check if a DB value has expired
	DB.prototype.expired = function(key) {
		return !DB.prototype.exists(key);
	};
	
//Insert a DB entry
    DB.prototype.insert = function(key, value, expiration) {
		appAPI.db.set(key, value, expiration);
	};
    
//Select a database entry
    DB.prototype.select = function(key) {
        return appAPI.db.get(key);
    }
	
//Update a DB entry
	DB.prototype.update = function(key, value, expiration) {
		DB.prototype.del(key);
		DB.prototype.insert(key, value, expiration);	
	};
	
//Update an etnry expiration time
    DB.prototype.updateExpiration = function(key, expiration) {
		appAPI.db.updateExpiration(key, expiration);
	};
	
//Hold an object of common expiration times
	DB.prototype.expiration = {
	//Now
		NOW       : appAPI.time.now(),
		
	//Seconds
		SECOND_1  : appAPI.time.secondsFromNow(1),
		SECOND_2  : appAPI.time.secondsFromNow(2),
		SECOND_3  : appAPI.time.secondsFromNow(3),
		SECOND_4  : appAPI.time.secondsFromNow(4),
		SECOND_5  : appAPI.time.secondsFromNow(5),
		SECOND_10 : appAPI.time.secondsFromNow(10),
		SECOND_15 : appAPI.time.secondsFromNow(15),
		SECOND_20 : appAPI.time.secondsFromNow(20),
		SECOND_25 : appAPI.time.secondsFromNow(25),
		SECOND_30 : appAPI.time.secondsFromNow(30),
		SECOND_35 : appAPI.time.secondsFromNow(35),
		SECOND_40 : appAPI.time.secondsFromNow(40),
		SECOND_45 : appAPI.time.secondsFromNow(45),
		SECOND_50 : appAPI.time.secondsFromNow(50),
		SECOND_55 : appAPI.time.secondsFromNow(55),
		SECOND_60 : appAPI.time.secondsFromNow(60),
		
	//Minutes
		MINUTE_1  : appAPI.time.minutesFromNow(1),
		MINUTE_2  : appAPI.time.minutesFromNow(2),
		MINUTE_3  : appAPI.time.minutesFromNow(3),
		MINUTE_4  : appAPI.time.minutesFromNow(4),
		MINUTE_5  : appAPI.time.minutesFromNow(5),
		MINUTE_10 : appAPI.time.minutesFromNow(10),
		MINUTE_15 : appAPI.time.minutesFromNow(15),
		MINUTE_20 : appAPI.time.minutesFromNow(20),
		MINUTE_25 : appAPI.time.minutesFromNow(25),
		MINUTE_30 : appAPI.time.minutesFromNow(30),
		MINUTE_35 : appAPI.time.minutesFromNow(35),
		MINUTE_40 : appAPI.time.minutesFromNow(40),
		MINUTE_45 : appAPI.time.minutesFromNow(45),
		MINUTE_50 : appAPI.time.minutesFromNow(50),
		MINUTE_55 : appAPI.time.minutesFromNow(55),
		MINUTE_60 : appAPI.time.minutesFromNow(60),
		
	//Hours
		HOUR_1    : appAPI.time.hoursFromNow(1),
		HOUR_2    : appAPI.time.hoursFromNow(2),
		HOUR_3    : appAPI.time.hoursFromNow(3),
		HOUR_4    : appAPI.time.hoursFromNow(4),
		HOUR_5    : appAPI.time.hoursFromNow(5),
		HOUR_6    : appAPI.time.hoursFromNow(6),
		HOUR_10   : appAPI.time.hoursFromNow(10),
		HOUR_12   : appAPI.time.hoursFromNow(12),
		HOUR_15   : appAPI.time.hoursFromNow(15),
		HOUR_18   : appAPI.time.hoursFromNow(18),
		HOUR_20   : appAPI.time.hoursFromNow(20),
		HOUR_24   : appAPI.time.hoursFromNow(24),
		
	//Days
		DAY_1     : appAPI.time.daysFromNow(1),
		DAY_2     : appAPI.time.daysFromNow(2),
		DAY_3     : appAPI.time.daysFromNow(3),
		DAY_4     : appAPI.time.daysFromNow(4),
		DAY_5     : appAPI.time.daysFromNow(5),
		DAY_6     : appAPI.time.daysFromNow(6),
		DAY_7     : appAPI.time.daysFromNow(7),
		DAY_14    : appAPI.time.daysFromNow(14),
		DAY_21    : appAPI.time.daysFromNow(21),
		DAY_28    : appAPI.time.daysFromNow(28),
		DAY_29    : appAPI.time.daysFromNow(29),
		DAY_30    : appAPI.time.daysFromNow(30),
		DAY_31    : appAPI.time.daysFromNow(31),
		
	//Years
		YEAR_1    : appAPI.time.yearsFromNow(1),
		YEAR_2    : appAPI.time.yearsFromNow(2),
		YEAR_3    : appAPI.time.yearsFromNow(3),
		YEAR_4    : appAPI.time.yearsFromNow(4),
		YEAR_5    : appAPI.time.yearsFromNow(5)
	};