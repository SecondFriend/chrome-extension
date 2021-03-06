define([

  'underscore',
  'backbone',
  'jquery'

], function( _, Backbone, $ ){

  _.mixin({
    'fmtTime' : function(timetoken) {
      if (!timetoken) return '';
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

      var m = this.model.toJSON();
      if(!m.message) return false;

      $( this.el ).html( this.template( m ) ).addClass( m.message.type );
      console.log( m.message.type );

      return this.el;
    }

  });

  return view;

});
