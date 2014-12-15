VtTracker.CommonDate = Ember.Mixin.create({
  previousMonth: function() {
    return moment(new Date()).subtract(1, 'months').format('MMMM');
  }.property(),

  currentMonth: function() {
    return moment(new Date()).format('MMMM');
  }.property()
});
