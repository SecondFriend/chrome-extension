define([

  'underscore',
  'backbone',
  'jquery'

], function( _, Backbone, jQuery ){

  var view = Backbone.View.extend({
    'tagName' : 'li',
    'events'  : {},
    'template'    :
      // This is the template
      '<span class="message"><%= message %></span>',

    'initialize': function(){
      _.bindAll(this, 'render');
      this.model.view = this;
    },


    'render' : function(){
      var html = _.template( this.template, this.model.toJSON() );
      $( this.el ).html( html ).addClass( this.model.get('type') );

      return this.el;
    }


  });
  return view;

});
