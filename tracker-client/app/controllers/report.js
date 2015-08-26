"use strict";
/*global GLOBAL_SETTINGS*/

import Ember from "ember";
import CommonDate from "../../mixins/common-date";

export default Ember.Controller.extend(CommonDate, {
  breadCrumb: 'Report',

  peopleSorting: ['lastName', 'firstName', 'name'],
  sortedPeople: Ember.computed.sort('model', 'peopleSorting'),

  peopleTitle: function() {
    if (GLOBAL_SETTINGS.mode === 'visiting_teaching') {
      return 'Sister';
    } else if (GLOBAL_SETTINGS.mode === 'home_teaching') {
      return 'Household';
    }
  }.property(),

  percents: function() {
    var num_visited = {
      previous_month: 0,
      current_month: 0,
      number_people: 0
    };

    this.get('sortedPeople').forEach(function(sister) {
      if (!sister.get('isNew')) {
        var sisterNumVisited = sister.get('numberVisited');
        num_visited.previous_month += sisterNumVisited.previous_month;
        num_visited.current_month += sisterNumVisited.current_month;
        num_visited.number_people += 1;
      }
    });

    var computed_percent_visited = {
      previous_month: 0,
      current_month: 0
    };

    if (num_visited.number_people > 0) {
      computed_percent_visited.previous_month = num_visited.previous_month / num_visited.number_people;
      computed_percent_visited.current_month = num_visited.current_month / num_visited.number_people;
    }

    return computed_percent_visited;
  }.property('sortedPeople.[].numberVisited'),

  previousMonthPercentVisited: function() {
    return parseInt(this.get('percents').previous_month * 100, 10);
  }.property('percents'),

  currentMonthPercentVisited: function() {
    return parseInt(this.get('percents').current_month * 100, 10);
  }.property('percents')
});
