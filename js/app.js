define([

  'settings'    ,
  'underscore'  ,
  'jquery'    ,
  'backbone'    ,
  'router'    ,
  'localStorage',

], function ( Settings, _, jQuery, Backbone, Router ) {

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

      // Initialize and start routing.
      root.Router   = new Router();
      Backbone.history.start();

    }

  });


});
