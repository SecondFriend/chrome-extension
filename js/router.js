define([

  'settings',
  'underscore',
  'jquery',
  'backbone',
  'views/main'

], function (Settings, _, $, Backbone, MainView) {

  "use strict";

  var viewHandler = {
    'show' : function( view ){

      if( this.currentView && this.currentView.uninitialize ){
        this.currentView.uninitialize();
      }

      this.currentView = new view();
      $('body').html( this.currentView.render() );

    }

  };

  return Backbone.Router.extend({

    routes: {
      'main'    : 'main'    ,
      '*path'   : 'main'
    },

    main: function () {
      viewHandler.show( MainView );
    }

  });

});
