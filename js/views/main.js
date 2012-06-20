/*
  name: Chat
  path: js/views/chat.js
  desc: The chat view.
*/

define([

  'underscore',
  'backbone',
  'jquery',
  'views/chatclient'

], function ( _, Backbone, jQuery, ChatClient ) {

  "use strict";

  var view = Backbone.View.extend({

    'id'       : 'Chat',
    'tagName'  : 'div',
    'events'   : {},
    'template' :

      // This is the template
      '<div class="state-loading">'+
      '<span id="loading-message"> <%= loadingMessage %> </span>'+
      '</div>'+
      '<div class="state-loaded">'+
      '<div class="grownup-bio">'+
      '<img id="grownup-photo" src="<%= grownupPhoto %>" />'+
      '<span id="grownup-name"> <%= grownupName %> </span>'+
      '</div>'+
      '<div id="chatClient">'+
      '</div>'+
      '</div>',

    'initialize'  : function () {
      // This and that…
      var root = this;

      _.bindAll( this, 'render' );

      // Set loading sate
      this.$el.addClass('loading');
    },

    'uninitialize' : function(){
    },

    'render': function () {
      var root = this;

      var data = {
        'heading' : 'CHAT',
        'loadingMessage' : 'You are being connected to a secure and anonymous chat. Please wait a moment...',
        'grownupPhoto' : '/fixtures/images/grownup.png',
        'grownupName' : 'Camille Waddington'
      };

      var html = _.template( this.template, data );

      // Append html to view element.
      $( this.el ).html( html );

      // Load and inject chat client.
      var chatClient = new ChatClient();
      $( '#chatClient', this.el ).html( chatClient.render() );

      return this.el;
    }

  });
  return view;

});
