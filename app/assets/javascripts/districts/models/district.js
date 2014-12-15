VtTracker.District = DS.Model.extend({
  // Associations
  sisters: DS.hasMany('sister', { async: true }),

  // Attributes
  name: DS.attr('string'),

  percentVisited: function() {
    var visits = {
      previous_month: 0,
      current_month: 0,
      number_sisters: 0
    };

    this.get('sisters').forEach(function(sister) {
      if (!sister.get('isNew')) {
        var sisterNumVisited = sister.get('numberVisited');
        visits.previous_month += sisterNumVisited.previous_month;
        visits.current_month += sisterNumVisited.current_month;
        visits.number_sisters += 1;
      }
    });

    return visits;
  }.property('sisters.@each.numberVisited'),

  sistersLoaded: function() {
    var allLoaded = this.get('sisters').every(function(sister) {
      return sister.get('isloaded');
    });
    return allLoaded;
  }.observes('sisters.@each.visitsLoaded', 'sisters.@each', 'isloaded')
});
