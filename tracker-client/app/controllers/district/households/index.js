"use strict";

import Ember from "ember";

export default Ember.Controller.extend({
  householdsSorting: ['name'],
  sortedHouseholds: Ember.computed.sort('model.households', 'householdsSorting'),
  newHousehold: null
});
