VtTracker.DistrictReportController = Ember.ObjectController.extend(VtTracker.CommonDate, {
  breadCrumb: 'Report',

  sistersSorting: ['lastName'],
  sortedSisters: Ember.computed.sort('sisters', 'sistersSorting'),

  percents: function() {
    var num_visited = {
      previous_month: 0,
      current_month: 0,
      number_sisters: 0
    };

    var district_percent_visited = this.get('model.percentVisited');
    num_visited.previous_month += district_percent_visited.previous_month;
    num_visited.current_month += district_percent_visited.current_month;
    num_visited.number_sisters += district_percent_visited.number_sisters;

    var computed_percent_visited = {
      previous_month: 0,
      current_month: 0
    };

    if (num_visited.number_sisters > 0) {
      computed_percent_visited.previous_month = num_visited.previous_month / num_visited.number_sisters;
      computed_percent_visited.current_month = num_visited.current_month / num_visited.number_sisters;
    }

    return computed_percent_visited;
  }.property('model.percentVisited'),

  previousMonthPercentVisited: function() {
    return parseInt(this.get('percents').previous_month * 100, 10);
  }.property('percents'),

  currentMonthPercentVisited: function() {
    return parseInt(this.get('percents').current_month * 100, 10);
  }.property('percents')
});
