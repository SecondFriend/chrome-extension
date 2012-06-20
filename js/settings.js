define(function(){

	"use strict";
	
	var Settings = {};
	
	Settings.NAME	= 'SecondFriend'; // No fancy chars.
Settings.PUBNUB = {
    publish_key   : 'pub-91077960-1dd7-4875-83c4-c8fd5c634bee',
    subscribe_key : 'sub-786b929e-bab1-11e1-b880-a3fb466a40d5',
    origin        : 'pubsub.pubnub.com',
    ssl           : true
  };

	return Settings;

});
