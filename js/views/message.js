define([

  'underscore',
  'backbone',
  'jquery'

], function( _, Backbone, jQuery ){

  var view = Backbone.View.extend({
    'tagName' : 'li',
    'className' : 'ui-li ui-body-c ui-li-static',
    'events'  : {},
    'template': _.template($('#tpl-chat-message').html()),

    'initialize': function(){
      _.bindAll(this, 'render');
      //this.model.view = this;
    },


    'render' : function(){
      $( this.el ).html( this.template(this.model.toJSON()) ).addClass( this.model.get('type') );

      return this.el;
    }


  });
  return view;

});
