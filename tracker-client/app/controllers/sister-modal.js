"use strict";

import Ember from "ember";

export default Ember.Controller.extend({
  sistersController: Ember.inject.controller('district/sisters/index'),
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
      this.get('model').rollback();
      return true;
    },

    save: function() {
      var _self = this;
      var isNew = _self.get('model.isNew');
      var district = _self.get('model.district');
      _self.get('model').save().then(function() {
        if (isNew) {
          _self.set('sistersController.newSister', _self.store.createRecord('sister', {
            district: district
          }));
        }
      });
    }
  }
});
