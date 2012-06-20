/*
	name:	Chat
	path:	js/views/chat.js
	desc:	The chat view.
*/

define([

	'underscore',
	'backbone',
	'jquery',
	'views/chatclient'
	
], function ( _, Backbone, jQuery, ChatClient ) {
	
	"use strict";
	
    var view = Backbone.View.extend({
    	
        'id'			: 'Chat'	,
        'tagName'		: 'div'		,
        'events'		: {}		,
        'template'		:
			
			// This is the template
			// Loading state
			'<div class="state-loading">'+
				'<span id="loading-message"> <%= loadingMessage %> </span>'+
			'</div>'+
			
			// Loaded state
			'<div class="state-loaded">'+
				'<div data-role="header" data-theme="b" data-position="fixed">' +
					'<h1> <%= grownupName %> </h1>' +
				'</div>'+
				'<div id="chatClient">'+
				'</div>'+
				'<div data-role="footer" class="ui-bar" data-position="fixed">'+
					'<div data-role="controlgroup" data-type="horizontal">'+
						'<a href="index.html" data-role="button">Logout</a>'+
						'<a href="index.html" data-role="button">Logout & purge</a>'+
					'</div>'+
				'</div>'+
			'</div>',
			
        
        'initialize'	: function () {
			
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
				'loadingMessage' : 'Setting up an anonymous chat.',
				'grownupPhoto' : '/fixtures/images/grownup.png',
				'grownupName' : 'Camille Waddington'
			};
			
			var html = _.template( this.template, data );
		
			// Append html to view element.
			$( this.el ).html( html );
			
			// Load and inject chat client.
			var chatClient = new ChatClient();
			$( '#chatClient', this.el ).html( chatClient.render() );
			
			// Initiate a chat with a consultant then do this.
			// Unset loading sate
			// Set loaded state
			//setTimeout(function(){ // Fake loader.
            root.$el.removeClass('loading');
            root.$el.addClass('loaded');
            //}, 2000);
            
			return this.el;
        }
        
    });

    return view;

});