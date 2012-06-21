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

    'id'      : 'Login' ,
    'tagName'   : 'div'   ,
    'events'    : {
      'submit form#login' : 'login',
    }   ,
    'template'    : _.template($('#tpl-login').html()),

    'initialize'  : function () {

        // This and that…
        var root = this;

        _.bindAll( this, 'render' );

    },


    'uninitialize' : function(){
    },


    'render': function () {

      var root = this;

      // Append html to view element.
      $( this.el ).html( this.template(App.toJSON()) );

      return this.el;
    },

    'login' : function(e){
      e.preventDefault();

      // Store nickname in the app
      App.set({'nickname': $('#nickname').val()});
      App.save();

      // Go to main view
      App.Router.navigate('main', true);

    }

  });

});
