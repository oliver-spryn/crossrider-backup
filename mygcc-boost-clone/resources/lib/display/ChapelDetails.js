    function ChapelDetails() {
		var database = new DB();
	}
	
	ChapelDetails.prototype.config = {
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