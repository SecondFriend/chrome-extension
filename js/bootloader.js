requirejs.config({

  // Development cache bust.
  // Remove before deploy.
  urlArgs: "bust=" +  (new Date()).getTime(),

  // Configuration of the RequireJS aliases that will be used.
  paths: {
    underscore    : 'libs/underscore',
    backbone      : 'libs/backbone',
    localStorage  : 'libs/backbone.localStorage',
    jquery        : 'libs/jquery',
    mobile        : 'libs/jquery.mobile',
    json2         : 'libs/json2',
    pubnub        : 'https://pubnub.a.ssl.fastly.net/pubnub-3.1.min',
    settings      : 'settings',
    app           : 'app'
  }


});


// Ignition!
require(['app'], function( App ){
  window.App = new App();
  window.App.start();
});
