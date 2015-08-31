"use strict";

import Ember from "ember";

export default Ember.Controller.extend({
  needs: ['index'],

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
      var _self = this;
      var isNew = _self.get('model.isNew');
      _self.get('model').save().then(function() {
        if (isNew) {
          _self.set('controllers.index.newDistrict', _self.store.createRecord('district'));
        }
      });
    }
  }
});
