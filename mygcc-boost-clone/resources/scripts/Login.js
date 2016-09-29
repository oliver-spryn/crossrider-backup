(function($) {
    $.fn.Login = function() {
        $.fn.Login.trigger = $(this);
        
        $.fn.Login.trigger.click(function() {
            var container = $('<section class="boost-login"/>').appendTo('form#MAINFORM');
            var HTML = '<section class="form">';
            HTML += '<input id="userName" name="userName" placeholder="Student ID" type="text">';
            HTML += '<input id="password" name="password" placeholder="Password" type="password">';
            HTML += '<a href="javascript:__doPostBack(\'lnkForgot\',\'\')" onclick="preventDefaultEvent(event, ValidateLoginUserName());" id="lnkForgot">Forgot password</a>';
            HTML += '<button class="boost" id="btnLogin" name="btnLogin">Cancel</button>';
            HTML += '<button class="boost blue" id="btnLogin" name="btnLogin">Sign In</button>';
            HTML += '</section>';
            
            container.append(HTML);
        });
    };
})(jQuery);