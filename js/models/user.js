define([

  'backbone',
  'localStorage'

], function (Backbone) {

  "use strict";

  return Backbone.Model.extend({

    localStorage: new Store("User"),
    defaults: {
      'nickname': '',
      'firstname': '',
      'lastname': '',
      'email': '',
      'phone': '',
      'address': '',
    },

    initialize: function () {
      this.fetch();
    }

  });

});
