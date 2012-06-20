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
        'tagName'   : 'div'   ,
        'events'    : {

          'keypress #input' : 'handleKeypress'

        }   ,
        'template'    : _.template($('#tpl-chat-history').html()),

        'initialize'  : function () {

          // This and that
          var root = this;
          _.bindAll( this, 'messageAdd', 'messageAddAll' );

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
                            App.ChatHistory.add({
                              'message' : message
                            });
                          },

              connect    : function() { // CONNECTION ESTABLISHED.
                             console.log("Connected to channel " + App.get("uuid"));
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

        'uninitialize' : function(){},

        'render': function () {
          // Append html to view element.
          $( this.el ).html( this.template({
            'heading' : 'LOADING'
          }) );

          return this.el;
        },

        'handleKeypress' : function( event ) {

          if( event && event.keyCode === 13 ) {

            var message = event.srcElement.value
            // Send to PUBNUB
            this.pubnub.publish({
              channel  : App.get("uuid"),
              message  : message,
            });
          }

        },

        'messageAdd' : function( model ){

          model.save();

          // Render the model
          var view = new MessageView({'model':model});
          $('ul', '#' + this.id ).append( view.render() );

        },

        'messageAddAll' : function( data ){

          var root = this;
          _.each( data.models, function( model ){
            root.messageAdd( model );
          });
        }

      });

      return view;

    });