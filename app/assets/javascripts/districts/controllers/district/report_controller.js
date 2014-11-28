VtTracker.DistrictReportController = Ember.ObjectController.extend({
  breadCrumb: 'Report',

  sistersSorting: ['lastName'],
  sortedSisters: Ember.computed.sort('sisters', 'sistersSorting'),

  previousMonth: function() {
    return moment(new Date()).subtract(1, 'months').format('MMMM');
  }.property(),

  currentMonth: function() {
    return moment(new Date()).format('MMMM');
  }.property()
});
