"use strict";
/*global GLOBAL_SETTINGS*/

import Ember from "ember";

export default Ember.Controller.extend({
  districtsSorting: ['name'],
  sortedDistricts: Ember.computed.sort('model', 'districtsSorting'),

  peopleLink: function() {
    if (GLOBAL_SETTINGS.mode === 'visiting_teaching') {
      return 'sisters';
    } else if (GLOBAL_SETTINGS.mode === 'home_teaching') {
      return 'households';
    }
  }.property(),

  peopleTitle: function() {
    if (GLOBAL_SETTINGS.mode === 'visiting_teaching') {
      return 'Sisters';
    } else if (GLOBAL_SETTINGS.mode === 'home_teaching') {
      return 'Households';
    }
  }.property(),

  actions: {
    createNewDistrict: function() {
      var newDistrict = this.store.createRecord('district');
      this.send('showModal', 'district-modal', newDistrict);
    }
  }
});
