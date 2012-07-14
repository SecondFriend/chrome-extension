define(function(){

  "use strict";

  var Settings = {};

  Settings.NAME = 'SecondFriend'; // No fancy chars.
  Settings.PUBNUB = {
    publish_key   : 'pub-91077960-1dd7-4875-83c4-c8fd5c634bee',
    subscribe_key : 'sub-786b929e-bab1-11e1-b880-a3fb466a40d5',
    secret_key    : 'sec-YWNjYmIxZmYtZTVkZS00ZGNlLTk0NWUtYWRhZTk5OGUzN2Y1',
    origin        : 'pubsub.pubnub.com',
    ssl           : true
  };
  Settings.requestURL = function (channel, uuid) {
    return 'https://second-friend.appspot.com/route/create?channel='+channel+'&uuid='+uuid;
  }

  return Settings;

});
