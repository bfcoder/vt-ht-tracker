"use strict";
/*global GLOBAL_SETTINGS*/

import Ember from "ember";
import CommonDate from "../../mixins/common-date";

export default Ember.Controller.extend(CommonDate, {
  peopleSorting: ['lastName', 'firstName', 'name'],
  sortedPeople: Ember.computed.sort('model', 'peopleSorting'),

  peopleTitle: Ember.computed(function() {
    if (GLOBAL_SETTINGS.mode === 'visiting_teaching') {
      return 'Sister';
    } else if (GLOBAL_SETTINGS.mode === 'home_teaching') {
      return 'Household';
    }
  }),

  percents: Ember.computed('sortedPeople.@each.numberVisited', 'month', function() {
    var num_visited = {
      selectedMonth: 0,
      number_people: 0
    };
    var self = this;

    self.get('sortedPeople').forEach(function(person) {
      if (!person.get('isNew')) {
        person.set('selectedMonth', self.get('month'));
        num_visited.selectedMonth += person.get('numberVisited');
        num_visited.number_people += 1;
      }
    });

    var computed_percent_visited = {
      selectedMonthAverage: 0
    };

    if (num_visited.number_people > 0) {
      computed_percent_visited.selectedMonthAverage = num_visited.selectedMonth / num_visited.number_people;
    }

    return computed_percent_visited;
  }),

  selectedMonthPercentVisited: Ember.computed('percents', function() {
    return parseInt(this.get('percents').selectedMonthAverage * 100, 10);
  }),

  actions: {
    monthChanged: function(month) {
      this.transitionToRoute({ queryParams: { month: month }});
    }
  }
});
