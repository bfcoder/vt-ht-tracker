VtTracker.District = DS.Model.extend({
  // Associations
  sisters: DS.hasMany('sister', { async: true }),
  households: DS.hasMany('household', { async: true }),

  // Attributes
  name: DS.attr('string'),

  percentVisited: function() {
    var visits = {
      previous_month: 0,
      current_month: 0,
      number_sisters: 0,
      number_households: 0
    };

    this.get('sisters').forEach(function(sister) {
      if (!sister.get('isNew')) {
        var sisterNumVisited = sister.get('numberVisited');
        visits.previous_month += sisterNumVisited.previous_month;
        visits.current_month += sisterNumVisited.current_month;
        visits.number_sisters += 1;
      }
    });

    this.get('households').forEach(function(household) {
      if (!household.get('isNew')) {
        var householdNumVisited = household.get('numberVisited');
        visits.previous_month += householdNumVisited.previous_month;
        visits.current_month += householdNumVisited.current_month;
        visits.number_households += 1;
      }
    });

    return visits;
  }.property('sisters.@each.numberVisited', 'households.@each.numberVisited'),

  sistersLoaded: function() {
    var allLoaded = this.get('sisters').every(function(sister) {
      return sister.get('isloaded');
    });
    return allLoaded;
  }.observes('sisters.@each.visitsLoaded', 'sisters.@each', 'isloaded'),

  householdsLoaded: function() {
    var allLoaded = this.get('households').every(function(household) {
      return household.get('isloaded');
    });
    return allLoaded;
  }.observes('households.@each.visitsLoaded', 'households.@each', 'isloaded')
});
