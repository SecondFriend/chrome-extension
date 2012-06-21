define([

  'settings',
  'underscore',
  'jquery',
  'backbone',
  'router',
  'localStorage',

], function ( Settings, _, jQuery, Backbone, Router ) {

  "use strict";

  return Backbone.Model.extend({

    id            : Settings.NAME,
    localStorage  : new Store( Settings.NAME ),
    defaults      : {
      uuid : null,
      nickname: ''
    },

    initialize: function () {
      _.bindAll( this, 'start' );

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
