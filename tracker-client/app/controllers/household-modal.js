"use strict";

import Ember from "ember";

export default Ember.Controller.extend({
  homeController: Ember.inject.controller('home'),

  districts: Ember.computed.alias('homeController.model'),

  modalTitle: function() {
    if (this.get('isNew')) {
      return 'New Household';
    } else {
      return 'Edit Household';
    }
  }.property('isNew'),

  actions: {
    removeModal: function() {
      this.get('model').rollbackAttributes();
      return true;
    },

    save: function() {
      this.get('model').save();
    }
  }
});
