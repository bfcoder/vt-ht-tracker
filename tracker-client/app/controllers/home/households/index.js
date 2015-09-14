"use strict";

import Ember from "ember";

export default Ember.Controller.extend({
  householdsSorting: ['district.name', 'teachers', 'name'],
  sortedHouseholds: Ember.computed.sort('model', 'householdsSorting'),

  actions: {
    createNewHousehold: function() {
      var newHousehold = this.store.createRecord('household');
      this.send('showModal', 'household-modal', newHousehold);
    }
  }
});
