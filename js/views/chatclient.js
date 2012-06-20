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

        'fmtTime'     : function(timetoken) {
          var now = new Date(timetoken/10000);
          return now.toTimeString();
          //return now.getHours()+':'+now.getMinutes()+':'+now.getSeconds();
        },

        'initialize'  : function () {

          // This and that
          var root = this;
          _.bindAll( this, 'messageAdd', 'messageAddAll', 'fmtTime' );

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

            var root = this;
            // Send to PUBNUB
            root.pubnub.time( function(time) {
              root.pubnub.publish({
                channel  : App.get("uuid"),
                message  : {
                  type: 'text',
                  timestamp: root.fmtTime(time),
                  payload: event.srcElement.value
                },
              });
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
