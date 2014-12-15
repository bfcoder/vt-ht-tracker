VtTracker.ReportController = Ember.ArrayController.extend(VtTracker.CommonDate, {
  breadCrumb: 'Report',

  districtsSorting: ['name'],
  sortedDistricts: Ember.computed.sort('model', 'districtsSorting'),

  percents: function() {
    var num_visited = {
      previous_month: 0,
      current_month: 0,
      number_sisters: 0
    };

    this.get('model').forEach(function(district) {
      if (!district.get('isNew')) {
        var district_percent_visited = district.get('percentVisited');
        num_visited.previous_month += district_percent_visited.previous_month;
        num_visited.current_month += district_percent_visited.current_month;
        num_visited.number_sisters += district_percent_visited.number_sisters;
      }
    });

    var computed_percent_visited = {
      previous_month: 0,
      current_month: 0
    };

    if (num_visited.number_sisters > 0) {
      computed_percent_visited.previous_month = num_visited.previous_month / num_visited.number_sisters;
      computed_percent_visited.current_month = num_visited.current_month / num_visited.number_sisters;
    }

    return computed_percent_visited;
  }.property('model.@each.percentVisited'),

  previousMonthPercentVisited: function() {
    return parseInt(this.get('percents').previous_month * 100, 10);
  }.property('percents'),

  currentMonthPercentVisited: function() {
    return parseInt(this.get('percents').current_month * 100, 10);
  }.property('percents')
});
