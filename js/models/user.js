define([

  'backbone',
  'localStorage'

], function (Backbone) {

  "use strict";

  return Backbone.Model.extend({
      
      
      
    localStorage: new Store("User"),
      'nickname': '',
      'firstname': '',
      'lastname': '',
      'email': '',
      'phone': '',
      'address': '',

    initialize: function () {
      this.fetch();
    }

  });

});
