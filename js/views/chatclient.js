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
          
          
          
         // var pubnub = new PUBNUB(Settings.PUBNUB);

          // Listen to PUBNUB and do something like
          /*pubnub.subscribe({
            channel  : 'my_channel',
            callback : function(message) {
              App.ChatHistory.add({
                'message' : message
              });
            },
            connect  : function() { // CONNECTION ESTABLISHED.
              App.ChatHistory.add({
                'message' : "Successfully connected."
              });
            },
            disconnect : function() { // LOST CONNECTION.
              App.ChatHistory.add({
                'message' : "Connection Lost." +
                             "Will auto-reconnect when Online."
              });
            },
            reconnect  : function() { // CONNECTION RESTORED.
              App.ChatHistory.add({
                'message' : "Successfully reconnected!"
              });
            }
          });*/

          // Fetch history from localstorage
          setTimeout(function(){
            App.ChatHistory.fetch()
          }, 1);
        },

        'uninitialize' : function(){},

        'render': function () {
          // Append html to view element.
          $( this.el ).html( this.template({
            'heading' : 'LOADING'
          }) );

          return this.el;
        },

        'handleKeypress' : function( event ){

          if( event && event.keyCode === 13 ){

                App.ChatHistory.add({
                  'message' : response
                });

            // Send to PUBNUB
           /* PUBNUB.publish({
              channel  : "hello_world",
              message  : "Hi.",
              callback : function(response) {
                App.ChatHistory.add({
                  'message' : response
                });
             }
            })*/
          }

        },

        'messageAdd' : function( model ){

          model.save();

          // Render the model
          var view = new MessageView({'model':model});
          $('ul', '#' + this.id ).append( view.render() );
          $('body').prop({ scrollTop: $('body').prop("scrollHeight") });


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
