VtTracker.ReportController = Ember.ArrayController.extend(VtTracker.CommonDate, {
  breadCrumb: 'Report',

  districtsSorting: ['name'],
  sortedDistricts: Ember.computed.sort('model', 'districtsSorting'),

  peopleTitle: function() {
    if (GLOBAL_SETTINGS.mode === 'visiting_teaching') {
      return 'Sister';
    } else if (GLOBAL_SETTINGS.mode === 'home_teaching') {
      return 'Household';
    }
  }.property(),

  percents: function() {
    var num_visited = {
      previous_month_sisters: 0,
      current_month_sisters: 0,
      previous_month_households: 0,
      current_month_households: 0,
      number_sisters: 0,
      number_households: 0
    };

    this.get('model').forEach(function(district) {
      if (!district.get('isNew')) {
        var district_percent_visited = district.get('percentVisited');
        num_visited.previous_month_sisters += district_percent_visited.previous_month_sisters;
        num_visited.current_month_sisters += district_percent_visited.current_month_sisters;
        num_visited.previous_month_households += district_percent_visited.previous_month_households;
        num_visited.current_month_households += district_percent_visited.current_month_households;
        num_visited.number_sisters += district_percent_visited.number_sisters;
        num_visited.number_households += district_percent_visited.number_households;
      }
    });

    var computed_percent_visited = {
      previous_month: 0,
      current_month: 0
    };

    if (num_visited.number_sisters > 0 && GLOBAL_SETTINGS.mode === 'visiting_teaching') {
      computed_percent_visited.previous_month = num_visited.previous_month_sisters / num_visited.number_sisters;
      computed_percent_visited.current_month = num_visited.current_month_sisters / num_visited.number_sisters;
    }

    if (num_visited.number_households > 0 && GLOBAL_SETTINGS.mode === 'home_teaching') {
      computed_percent_visited.previous_month = num_visited.previous_month_households / num_visited.number_households;
      computed_percent_visited.current_month = num_visited.current_month_households / num_visited.number_households;
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
