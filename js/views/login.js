/*
	name:	Login
	path:	js/views/login.js
	desc:	The login view.
*/

define([

	'underscore',
	'backbone',
	'jquery'
	
], function ( _, Backbone, jQuery ) {
	
	"use strict";
	
    var view = Backbone.View.extend({
    	
        'id'			: 'Login'	,
        'tagName'		: 'div'		,
        'events'		: {
	        'click #login' : 'login',
        }		,
        'template'		:
			
			// This is the template
			// Loading state
			'<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>'+
			'<input type="text" />'+
			'<button id="login">Login</button>',
			
        
        'initialize'	: function () {
			
			// This and that…
            var root = this;
        
            _.bindAll( this, 'render' );	

        },
        
        
        'uninitialize' : function(){			
        },
        
        
        'render': function () {
			
			var root = this;
			
			var data = {};
			
			var html = _.template( this.template, data );
		
			// Append html to view element.
			$( this.el ).html( html );
            
			return this.el;
        },
        
        'login' : function(){
	        
	        // Store name to User model
	        
	        // Go to main view
	        App.Router.navigate('main', true);
	        
        }
        
    });

    return view;

});
