"use strict";

import Ember from "ember";

export default Ember.Controller.extend({
  householdsSorting: ['teachers', 'name'],
  sortedHouseholds: Ember.computed.sort('model.households', 'householdsSorting'),

  actions: {
    createNewHousehold: function() {
      var newHousehold = this.store.createRecord('household', {
        district: this.get('model')
      });
      this.send('showModal', 'household-modal', newHousehold);
    }
  }
});
