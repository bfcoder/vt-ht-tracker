VtTracker.DistrictReportController = Ember.ObjectController.extend(VtTracker.CommonDate, {
  breadCrumb: 'Report',

  sistersSorting: ['lastName'],
  sortedSisters: Ember.computed.sort('sisters', 'sistersSorting')
});
