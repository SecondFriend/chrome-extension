define([

  'underscore',
  'backbone',
  'jquery'

], function( _, Backbone, jQuery ){

  _.mixin({
    'fmtTime' : function(timetoken) {
      var now = new Date(timetoken/10000);
      return now.getHours()+':'+now.getMinutes()+':'+now.getSeconds();
    },
  });

  var view = Backbone.View.extend({
    'tagName' : 'li',
    'className' : 'ui-li ui-body-c ui-li-static',
    'events'  : {},
    'template': _.template($('#tpl-chat-message').html()),

    'initialize': function(){

      _.bindAll(this, 'render');

    },

    'render' : function(){

      if(!this.model.toJSON().message) return false;

      $( this.el ).html( this.template(this.model.toJSON()) ).addClass( this.model.get('type') );

      return this.el;
    }

  });

  return view;

});
