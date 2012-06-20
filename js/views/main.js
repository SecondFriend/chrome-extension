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
			'<div id="loading">'+
			'</div>'+
			
			// Loaded state
			'<div id="loaded">'+
				'<header>'+
				'<img class="thumbnail" src="fixtures/images/grownup.png" />'+
				'<div class="info">'+
				'<span class="heading">You are now talking to</span>'+
				'<span class="name">Camille Waddington</span>'+
				'<ul class="nav">'+
					'<li><span class="button">Profile</span></li>'+
					'<li><span class="button">Call</span></li>'+
				'</ul>'+
				'</div>'+
				
			'</header>'+
				'<div id="chatClient">'+
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
