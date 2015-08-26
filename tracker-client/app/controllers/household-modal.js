"use strict";

import Ember from "ember";

export default Ember.Controller.extend({
  needs: ['districtHouseholdsIndex', 'application'],

  districts: Ember.computed.alias('controllers.application.model'),

  modalTitle: function() {
    if (this.get('isNew')) {
      return 'New Household';
    } else {
      return 'Edit Household';
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
          _self.set('controllers.districtHouseholdsIndex.newHousehold', _self.store.createRecord('household', {
            district: district
          }));
        }
      });
    }
  }
});
