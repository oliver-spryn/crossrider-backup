/************************************************************************************
  This is your background code.
  For more information please visit our wiki site:
  http://docs.crossrider.com/#!/guide/background_scope
*************************************************************************************/


appAPI.ready(function() {
    appAPI.browserAction.setResourceIcon("img/b-icon.png");
    appAPI.browserAction.setTitle("myGCC Boost Settings");
    
    appAPI.browserAction.onClick(function() {
        appAPI.openURL("resource://settings.html", "tab");
    });
});