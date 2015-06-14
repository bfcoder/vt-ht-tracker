VtTracker.DistrictHouseholdsIndexController = Ember.ObjectController.extend({
  householdsSorting: ['name'],
  sortedHouseholds: Ember.computed.sort('households', 'householdsSorting'),
  newHousehold: null
});
