VtTracker.ReportController = Ember.ArrayController.extend(VtTracker.CommonDate, {
  breadCrumb: 'Report',

  districtsSorting: ['name'],
  sortedDistricts: Ember.computed.sort('model', 'districtsSorting')
});
