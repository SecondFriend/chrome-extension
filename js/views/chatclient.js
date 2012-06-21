/*
  name: Chat Client
  path: js/views/chatclient.js
  desc: The chat client.
*/

define([

  'underscore',
  'backbone',
  'jquery',
  'settings',
  'views/message',
  'collections/messages',
  'pubnub'

], function ( _, Backbone, jQuery, Settings, MessageView, MessageCollection ) {

  "use strict";

  var view = Backbone.View.extend({

    'id'      : 'ChatClient',
    'tagName' : 'div',
    'events'  : {
      'submit form#chat' : 'messageSubmit',
      'click #button-purge' : 'purgeLocalStorage'
    },
    'template': _.template($('#tpl-chat-history').html()),

    'initialize'  : function () {
      // This and that?
      var root = this;
      _.bindAll( this, 'messageSend', 'messageAdd', 'messageAddAll' );

      // Set up storage for chat history
      App.ChatHistory = new MessageCollection();

      App.ChatHistory.bind('add'    , root.messageAdd   );
      App.ChatHistory.bind('reset'  , root.messageAddAll  );
      App.ChatHistory.bind('remove' , root.messageRemove  );

      root.pubnub = PUBNUB.init(Settings.PUBNUB);

      // Generate uuid if we don't yet have one
      root.pubnub.uuid( function(uuid) {
        if (!App.has("uuid")) {
          console.log("Generated uuid: "+uuid);
          App.set({"uuid": uuid});
          App.save();
        }

        // Subscribe to PUBNUB
        root.pubnub.subscribe({
          channel   : App.get("uuid"),

          callback  : function(message) {
                        console.log("Message received:", message);
                        var type = message.type;

                        switch( type ){
                            case 'status':
                            case 'text':
                                App.ChatHistory.add({'message' : message});
                                break;
                            case 'system':
                                root.handleSystemMessages( message );
                                break;
                        }
                      },

          connect    : function() { // CONNECTION ESTABLISHED.
                         var uuid = App.get("uuid")
                         console.log("Connected to channel " + uuid);
                         jQuery.ajax(Settings.requestURL(uuid, uuid))
                          .done( function() { console.log("Notification of backend successful"); })
                          .fail( function() { console.error("Notification of backend failed"); });

                         // Initiate a chat with a consultant then do this.
                         // Unset loading sate
                         // Set loaded state
                         $('#Chat').removeClass('loading');
                         $('#Chat').addClass('loaded');
                       },

          disconnect : function() { // LOST CONNECTION.
                         console.log("Disconnected from channel " + App.get("uuid"));
                       },

          reconnect  : function() { // CONNECTION RESTORED.
                         console.log("Reconnected to channel " + App.get("uuid"));
                       }
        });

        // Fetch history from localstorage
        setTimeout(function(){
          App.ChatHistory.fetch()
        }, 1);
      });
    },

    'uninitialize' : function(){
    },

    'render': function () {
      // Append html to view element.
      $( this.el ).html( this.template() );

      return this.el;
    },

    'messageSubmit' : function( e ) {
      e.preventDefault();
      this.messageSend('text', $('#chat-input').val());
      $( '#chat-input' ).val('');
    },

    'messageSend' : function( type, payload ) {
      var root = this;
      // Send to PUBNUB
      root.pubnub.time( function(time) {
        var msg = {
          type: type,
          timestamp: time,
          sender: App.get("nickname"),
          payload: payload
        };
        root.pubnub.publish({
          channel  : App.get("uuid"),
          message  : msg,
        });
        console.log("Message sent:", msg);
      });
    },

    'messageAdd' : function( model ){
      model.save();

      // Render the model
      var view = new MessageView({'model':model});
      $('#history', '#' + this.id ).append( view.render() );
    },

    'messageAddAll' : function( data ){
      var root = this;
      _.each( data.models, function( model ){
        root.messageAdd( model );
      });
    },

    'purgeLocalStorage' : function(){
      window.localStorage.clear();
      window.close();
    },

    'handleSystemMessages' : function( message ){
      var action = message.payload.action;

      switch( action ){
        case 'counselor':
          App.Counselor = message.payload;
          App.trigger('new-counselor');

          // Notify the backend about my nickname
          this.messageSend('system', {
            action: 'changenick',
            nickname: App.get("nickname")
          });
          break;
      }
    }
  });
  return view;

});
