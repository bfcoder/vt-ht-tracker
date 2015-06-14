VtTracker.Household = DS.Model.extend(VtTracker.CommonDate, {
  // Associations
  visits: DS.hasMany('visit'),
  district: DS.belongsTo('district'),

  // Attributes
  name: DS.attr('string'),

  // Properties
  numberVisited: function() {
    var _self = this;
    var visits = {
      previous_month: 0,
      current_month: 0
    };
    this.get('visits').forEach(function(visit) {
      var previous_month = _self.get('previousMonth');
      var current_month = _self.get('currentMonth');
      var visit_month = moment(visit.get('month')).format('MMMM');
      if (visit.get('status') === 'visited') {
        if (previous_month === visit_month) {
          visits.previous_month++;
        } else if (current_month === visit_month) {
          visits.current_month++;
        }
      }
    });
    return visits;
  }.property('visits.@each.status')

});
