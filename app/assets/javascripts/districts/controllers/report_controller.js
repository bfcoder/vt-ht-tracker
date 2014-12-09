VtTracker.ReportController = Ember.ArrayController.extend({
  breadCrumb: 'Report',

  districtsSorting: ['name'],
  sortedDistricts: Ember.computed.sort('model', 'districtsSorting'),

  previousMonth: function() {
    return moment(new Date()).subtract(1, 'months').format('MMMM');
  }.property(),

  currentMonth: function() {
    return moment(new Date()).format('MMMM');
  }.property()
});
