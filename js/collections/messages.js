define([

	'backbone',
	'models/message',
	'settings',
	'localStorage'
	
], function (Backbone, model, Settings) {

	"use strict";
	
	var collection = Backbone.Collection.extend({
		'model': model,
		'localStorage': new Store( "Messages")
	});
	
	return collection;
	
});