/*
  name: Login
  path: js/views/login.js
  desc: The login view.
*/

define([

  'underscore',
  'backbone',
  'jquery'

], function ( _, Backbone, jQuery ) {

  "use strict";

  return Backbone.View.extend({

    'id'      : 'Counselor',
    'tagName' : 'div',
    'events'  : {},
    'template':

      // This is the template
      // Loading state
        '<img class="thumbnail" src="<%= avatar %>" />'+
        '<div class="info">'+
        '<span class="heading">You are now talking to</span>'+
        '<span class="name"><%= name %></span>',


    'initialize'  : function () {
      // This and that
      var root = this;

      _.bindAll( this, 'render' );

      App.on('new-counselor', function(){
        root.render();
      });
    },


    'uninitialize' : function(){
    },


    'render': function () {
      var root = this;
      var data = {};

      console.log( App.Counselor );

      if( App.Counselor )
        var html = _.template( this.template, App.Counselor );
      else
        var html = _.template( this.template, {'avatar':'','name':''} );

      // Append html to view element.
      $( this.el ).html( html );

      return this.el;
    }

  });

});
