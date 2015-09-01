"use strict";

import Ember from "ember";

export default Ember.Controller.extend({
  applicationController: Ember.inject.controller('application'),

  districts: Ember.computed.alias('applicationController.model'),

  modalTitle: function() {
    if (this.get('isNew')) {
      return 'New Sister';
    } else {
      return 'Edit Sister';
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
