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
			'<p class="ui-li-aside ui-li-desc"><strong>9:18</strong>AM</p><h3 class="ui-li-heading"></h3><p class="ui-li-desc"><strong>You</strong></p><p><%= message %></p>',
			
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
