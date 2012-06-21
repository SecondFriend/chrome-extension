define([

  'settings'    ,
  'underscore'  ,
  'jquery'    ,
  'backbone'    ,
  'router'    ,
  'models/user',
  'localStorage',

], function ( Settings, _, jQuery, Backbone, Router, User ) {

  "use strict";

  return Backbone.Model.extend({

    id            : Settings.NAME,
    localStorage  : new Store( Settings.NAME ),
    defaults      : {
      uuid : null
    },

    initialize: function () {

      // Fetch application settings
      this.fetch();

    },

    start: function(){

      // This, that…
      var root = this;

      // Create a user
      this.User = new User();

      // Initialize and start routing.
      root.Router   = new Router();
      Backbone.history.start();

    }

  });


});
