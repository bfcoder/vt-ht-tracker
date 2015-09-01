"use strict";

import Ember from "ember";

export default Ember.Controller.extend({
  districtsSorting: ['name'],
  sortedDistricts: Ember.computed.sort('model', 'districtsSorting'),

  actions: {
    createNewDistrict: function() {
      var newDistrict = this.store.createRecord('district');
      this.send('showModal', 'district-modal', newDistrict);
    }
  }
});
