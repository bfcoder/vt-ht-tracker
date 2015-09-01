"use strict";

import Ember from "ember";

export default Ember.Controller.extend({
  modalTitle: function() {
    if (this.get('isNew')) {
      return 'New District';
    } else {
      return 'Edit District';
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
