"use strict";
/*global GLOBAL_SETTINGS*/

import Ember      from "ember";
import CommonDate from "../../mixins/common-date";

export default Ember.Controller.extend(CommonDate, {
  districtController: Ember.inject.controller('district'),

  district: Ember.computed.alias('districtController.model'),

  sistersSorting: ['lastName', 'firstName'],
  sortedSisters: Ember.computed.sort('district.sisters', 'sistersSorting'),

  householdsSorting: ['name'],
  sortedHouseholds: Ember.computed.sort('district.households', 'householdsSorting'),

  peopleTitle: function() {
    if (GLOBAL_SETTINGS.mode === 'visiting_teaching') {
      return 'Sister';
    } else if (GLOBAL_SETTINGS.mode === 'home_teaching') {
      return 'Household';
    }
  }.property(),

  sortedPeople: function() {
    if (GLOBAL_SETTINGS.mode === 'visiting_teaching') {
      return this.get('sortedSisters');
    } else if (GLOBAL_SETTINGS.mode === 'home_teaching') {
      return this.get('sortedHouseholds');
    }
  }.property('sortedSisters', 'sortedHouseholds'),

  percents: Ember.computed('month', 'district.percentVisited', function() {
    var num_visited = {
      selected_month_sisters: 0,
      selected_month_households: 0,
      number_sisters: 0,
      number_households: 0
    };

    var district = this.get('district');
    district.set('selectedMonth', this.get('month'));
    var district_percent_visited = this.get('district.percentVisited');
    num_visited.selected_month_sisters += district_percent_visited.selected_month_sisters;
    num_visited.selected_month_households += district_percent_visited.selected_month_households;
    num_visited.number_sisters += district_percent_visited.number_sisters;
    num_visited.number_households += district_percent_visited.number_households;

    var computed_percent_visited = {
      selectedMonthAverage: 0
    };

    if (num_visited.number_sisters > 0 && GLOBAL_SETTINGS.mode === 'visiting_teaching') {
      computed_percent_visited.selectedMonthAverage = num_visited.selected_month_sisters / num_visited.number_sisters;
    }

    if (num_visited.number_households > 0 && GLOBAL_SETTINGS.mode === 'home_teaching') {
      computed_percent_visited.selectedMonthAverage = num_visited.selected_month_households / num_visited.number_households;
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
