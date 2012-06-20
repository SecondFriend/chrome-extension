/*
	name:	Loading
	path:	js/views/loading.js
	desc:	The loading view.
*/

define([

	'underscore',
	'backbone',
	'jquery'
	
], function ( _, Backbone, jQuery ) {
	
	"use strict";
	
    var view = Backbone.View.extend({
    	
        'id'			: 'Loading',
        'tagName'		: 'div'		,
        'events'		: {}		,
        'template'		:
			
			// This is the template
        	'<div id="primary">'							+
				'<h1> <%= heading %> <h1>'					+
			'</div>'										,
        
        'initialize'	: function () {
			
			// This and that…
            var root = this;


        },
        
        
        'uninitialize' : function(){			
        },
        
        
        'render': function () {
			
			var data = {
				'heading' : 'LOADING'
			};
			var html = _.template( this.template, data );
		
			// Append html to view element.
			$( this.el ).html( html );
			
			return this.el;
        }
        
    });

    return view;

});