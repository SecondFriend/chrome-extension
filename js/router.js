define([

	'settings'			,
	'underscore'		,
	'jquery'			,
	'backbone'			,
	'views/main'		,
	'views/login'
	
], function (Settings, _, $, Backbone, MainView, LoginView) {

	"use strict";
	
	var viewHandler = {
		'show' : function( view ){
			
			if( this.currentView && this.currentView.uninitialize ){
				this.currentView.uninitialize();	
			}
			
			this.currentView = new view();
			$( 'body' ).html( this.currentView.render() );
		
		}
		
	};
	
	return Backbone.Router.extend({
	
		routes: {
			'login'		: 'login'		,
			'main'		: 'main'		,
			'*path'  	: 'login'
		},
		
		
		main: function () {
			viewHandler.show( MainView );
		},
		
		login: function () {
			viewHandler.show( LoginView );
		}
		
	});
	
});
