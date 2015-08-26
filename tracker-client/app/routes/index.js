"use strict";

import Ember from "ember";

export default Ember.Route.extend({
  model: function() {
    return this.modelFor('application');
  },

  setupController: function(controller, district) {
    this._super(controller, district);

    controller.set('newDistrict', this.store.createRecord('district'));
  }
});
