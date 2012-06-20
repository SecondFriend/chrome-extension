define([

	'backbone'
	
], function (Backbone) {

	"use strict";
	
	var model = Backbone.Model.extend({
		
		'message'	: '',
		
		'clear': function () {
			this.destroy();
			this.view.remove();
		}
		
	});
	
	return model;
	
});
