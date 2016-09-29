    function Assignments(callback) {
    	var database = new DB();
        Assignments.prototype.list = new Array();
		Assignments.prototype.request = new RPC(RPC.LOCAL);
		
	//Check the database for a local copy first
		if (database.expired(Assignments.prototype.config.DBAssignments)) {
            var courseName = "";
            var courseList = $(Assignments.prototype.config.courses);
            var courseURL = "";
            var courseTotal = 0;
            
			if (courseList.length > 0) {
                for(var i = 0; i < courseList.length; ++i) {
                    courseName = courseList.eq(i).text().trim();
                    courseURL = courseList.eq(i).children('a').attr('href') + Assignments.prototype.config.detailURL;
                    
                    Assignments.prototype.fetchList(courseName, courseURL, function(assignmentData) {
                    //Add the fetched items to the master array
                        Assignments.prototype.list.push.apply(Assignments.prototype.list, assignmentData);
                        
                    //Are we done?
                        ++courseTotal;
                        
                    //Sort the assignments with latest on top and cache the results
                        if (courseTotal == courseList.length) {
                            Assignments.prototype.sortAssignments();
                            database.insert(Assignments.prototype.config.DBAssignments, Assignments.prototype.list, Assignments.prototype.config.DBExpire);
                        }
                    });
                }
			}
		} else {
			if (callback && typeof(callback) === 'function') {
                callback();
            }
		}
	}
    
    Assignments.prototype.fetchList = function(course, URL, callback) {
        var assignmentData = new Array();
        course = course.slice(0, 8); //Get the course category and number
        
         Assignments.prototype.request.get(URL, null, function(data) {
        	var table = $(Assignments.prototype.config.assignments, data);
			
        //The assignment table will not exist if no assignments are available for a course
            if (table.length > 0) {
                var rows = table.children('tr');
                
                for(var i = 1; i < rows.length; ++i) { // i == 1, since row 1 is the table header
                    var date = Assignments.prototype.parseDate(rows.eq(i).children(Assignments.prototype.config.due).text().trim());
                    var name = rows.eq(i).children(Assignments.prototype.config.name).text().trim();
                    
                    assignmentData.push({
                        course : course,
                        due    : date,
                        name   : name
                    });
                }
            }
			
            if (callback && typeof(callback) === 'function') {
                callback(assignmentData);
            }
		});
    };
    
    Assignments.prototype.parseDate = function(date) {
    //Parse the input
        var DTParts = date.split(' '); // Input example: Tuesday 4/1, 10:05 AM
        var monthDay = DTParts[1].split('/'); //Split the date
        var time = DTParts[2].split(':'); //Split the time
        var today = new Date();
        
    //Generate the date and time
        var year = today.getFullYear(); //Assume that everything is due this year
        var month = parseInt(monthDay[0]) - 1; //Months in JS are 0-based
        var day = parseInt(monthDay[1].slice(0, -1)); // Remove the trailing comma
        
        var hour = DTParts[3] == 'PM' ? 12 + parseInt(time[0]) : (time[1] == '12' ? 0 : parseInt(time[1])); //To military time
        var minutes = parseInt(time[1]);
        
        return new Date(year, month, day, hour, minutes);
    };
    
    Assignments.prototype.sortAssignments = function() {
        var list = Assignments.prototype.list;
        var length = list.length;
        var swap = null;
        
    //Does this need sorting?
        if (length <= 1) return;
        
    //Bubble sort!
        for(var i = 0; i < length; ++i) {
            for (var j = length - 1; j > i; --j) {
                if (list[j - 1].due.getTime() > list[j].due.getTime()) {
                    swap = list[j];
                    list[j] = list[j - 1];
                    list[j - 1] = swap;
                }
            }
        }
    };
    
	Assignments.prototype.config = {
	//Page parsing configuration
        assignments   : 'table.assignmentGrid tbody',
        courses       : 'dl#myCourses dd ul li',
        detailURL     : 'Coursework.jnz?portlet=Coursework&screen=AssignmentListView&screenType=change',
        due           : 'td:eq(1)',
        name          : 'td:eq(0)',
		
	//Database configuration
		DBAssignments : 'ASSIGNMENTS',
        DBExpire    : DB.prototype.expiration.HOUR_6
	};