VtTracker.DistrictReportController = Ember.ObjectController.extend({
  breadCrumb: 'Report',

  sistersSorting: ['lastName'],
  sortedSisters: Ember.computed.sort('sisters', 'sistersSorting'),
});
