VtTracker.IndexController = Ember.ArrayController.extend({
  districtsSorting: ['name'],
  sortedDistricts: Ember.computed.sort('model', 'districtsSorting'),

  newDistrict: null
});
