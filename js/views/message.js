define([

	'underscore',
	'backbone',
	'jquery'
	
], function( _, Backbone, jQuery ){
	
	var view = Backbone.View.extend({
		'tagName'	: 'li',
		'className'	: 'ui-li ui-body-c ui-li-static',
		'events'	: {},
		'template'		:
			
			// This is the template
			'<span class="time">21:07</span><span class="body"><span class="author">You</span><span class="message"><%= message %></span></span>',
			
		'initialize': function(){

    
			_.bindAll(this, 'render');
			//this.model.view = this;
		
		},
	
		
		'render' : function(){	

			var html = _.template( this.template, this.model.toJSON() );	
			$( this.el ).html( html ).addClass( this.model.get('type') );
		
			return this.el;
		
		}
		
		
	});
	
	return view;

});
