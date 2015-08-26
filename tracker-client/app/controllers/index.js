"use strict";

import Ember from "ember";

export default Ember.Controller.extend({
  districtsSorting: ['name'],
  sortedDistricts: Ember.computed.sort('model', 'districtsSorting'),

  newDistrict: null
});
