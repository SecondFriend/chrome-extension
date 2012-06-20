/*
  name: Chat Client
  path: js/views/chatclient.js
  desc: The chat client.
*/

define([

    'underscore',
    'backbone',
    'jquery',
    'views/message',
    'collections/messages'

    ], function ( _, Backbone, jQuery, MessageView, MessageCollection ) {

      "use strict";

      var view = Backbone.View.extend({

        'id'      : 'ChatClient',
        'tagName'   : 'div'   ,
        'events'    : {

          'keypress #input' : 'handleKeypress'

        }   ,
        'template'    : _.template($('#tpl-chat-history').html()),

        'initialize'  : function () {

          // This and that…
          var root = this;
          _.bindAll( this, 'messageAdd', 'messageAddAll' );

          // Set up storage for chat history
          App.ChatHistory = new MessageCollection();

          App.ChatHistory.bind('add'    , root.messageAdd   );
          App.ChatHistory.bind('reset'  , root.messageAddAll  );
          App.ChatHistory.bind('remove' , root.messageRemove  );

          // Listen to PUBNUB and do something like
          /* App.ChatHistory.add({
             'message' : event.srcElement.value 
             }); */

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

            // Send to PUBNUB
            App.ChatHistory.add({
              'message' : event.srcElement.value 
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
