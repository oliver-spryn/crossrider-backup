appAPI.ready(function($) {
//Load ONLY the necessary library files
    appAPI.resources.includeJS('scripts/Config.js');
    
	if (appAPI.isMatchPages(Config.activateURL)) {
	//Load bootstrap and the fonts
        appAPI.dom.addRemoteCSS(Config.fontURL);
        appAPI.dom.addRemoteCSS(Config.bootstrapCSS);
        appAPI.resources.includeRemoteJS(Config.bootstrapJS);
        
   //Load the rest of the library
        appAPI.resources.includeCSS('styles/footer.css');
		appAPI.resources.includeCSS('styles/general.css');
		appAPI.resources.includeCSS('styles/header.css');
        appAPI.resources.includeCSS('styles/login.css');
		
        appAPI.resources.includeJS('scripts/Footer.js');
		appAPI.resources.includeJS('scripts/Header.js');
        appAPI.resources.includeJS('scripts/Login.js');
        
    //Load the extension library
        appAPI.resources.includeJS('lib/utils/LoggedIn.js');
		appAPI.resources.includeJS('lib/utils/DB.js');
		appAPI.resources.includeJS('lib/utils/RPC.js');
        appAPI.resources.includeJS('lib/mining/Assignments.js');
		appAPI.resources.includeJS('lib/mining/Chapel.js');
        appAPI.resources.includeJS('lib/mining/CrimsonCash.js');
        
    //Run all the scrapers!!!
        var returned = 0;
		
        if (loggedIn) {
            new Assignments(function() { buildDash(++returned); });
        	new Chapel(function() { buildDash(++returned); });
            new CrimsonCash(function() { buildDash(++returned); });
        }
        
	//Modify the page header and footer
		var header = $.Header(Config);
        var login = $('button.sign-in').Login();
        var footer = $.Footer(Config);
        
    	$('.boost-tooltip').tooltip();
        
    //Collapse the two column layout into one
    	var col1 = $('td.pColumn1');
		var col2 = $('td.pColumn2');
		
		col1.append(col2.html());
		col2.remove();
	}
    
    function buildDash(returned) {
    //Did all the scrapers finish?
        if (returned < 3) return;
        
    //Build the dashboard on the correct page
        if (document.URL == Config.dashURL) {
            appAPI.resources.includeJS('lib/utils/DB.js');
            appAPI.resources.includeRemoteJS('//ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js');
            appAPI.resources.includeRemoteJS('//cdnjs.cloudflare.com/ajax/libs/highcharts/3.0.9/highcharts.js');
            
        //Extract the data for the dashboard
            var DB = new DB();
            var chapelAttended = DB.select('CHAPEL_ATTENDED');
            var chapelRequired = DB.select('CHAPEL_REQUIRED');
            var crimsonCash = DB.select('CRIMSON_CASH');
            var percent = Math.round((parseInt(chapelAttended) / parseInt(chapelRequired)) * 100);
            
        //Start injecting the data
            var targetLocation = $('td.pColumn');
            var HTML = '<div class="portlet">';
            HTML += '<p>Chapels: ' + chapelAttended + '/' + chapelRequired + '</p>';
            HTML += '<p>Crimson cash: $' + crimsonCash + '</p>';
            HTML += '<div id="test"></div>';
            HTML += '</div>';
            
            HTML += '<script>var percent=' + percent + ';$("#test").highcharts({chart:{backgroundColor:null,height:250,spacing:[0,0,0,0],width:250},credits:{enabled:false},exporting:{enabled:false},plotOptions:{pie:{animation:false,borderWidth:0,dataLabels:{enabled:false},states:{hover:{enabled:false}}}},series:[{data:[{color:"#77E38C",y:percent},{color:"#FFFFFF",y:100-percent}],innerSize:"80%",type:"pie"},{data:[{color:"#323A45",y:100}],size:"80%",type:"pie"}],title:{align:"center",text:\'<span style="color: #FFFFFF; font-size: 60px;  vertical-align: top;">\'+percent+\'<span style="color: #AAAAAA; font-size: 24px;">%</span></span>\',verticalAlign:"middle",y:20},tooltip:{enabled:false}});</script>';
            
            targetLocation.prepend(HTML);
        }
    }
});
