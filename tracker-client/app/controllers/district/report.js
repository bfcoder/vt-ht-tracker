"use strict";
/*global GLOBAL_SETTINGS*/

import Ember      from "ember";
import CommonDate from "../../mixins/common-date";

export default Ember.Controller.extend(CommonDate, {
  breadCrumb: 'Report',

  sistersSorting: ['lastName', 'firstName'],
  sortedSisters: Ember.computed.sort('model.sisters', 'sistersSorting'),

  householdsSorting: ['name'],
  sortedHouseholds: Ember.computed.sort('model.households', 'householdsSorting'),

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

  percents: function() {
    var num_visited = {
      previous_month_sisters: 0,
      current_month_sisters: 0,
      previous_month_households: 0,
      current_month_households: 0,
      number_sisters: 0,
      number_households: 0
    };

    var district_percent_visited = this.get('model.percentVisited');
    num_visited.previous_month_sisters += district_percent_visited.previous_month_sisters;
    num_visited.current_month_sisters += district_percent_visited.current_month_sisters;
    num_visited.previous_month_households += district_percent_visited.previous_month_households;
    num_visited.current_month_households += district_percent_visited.current_month_households;
    num_visited.number_sisters += district_percent_visited.number_sisters;
    num_visited.number_households += district_percent_visited.number_households;

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
  }.property('model.percentVisited'),

  previousMonthPercentVisited: function() {
    return parseInt(this.get('percents').previous_month * 100, 10);
  }.property('percents'),

  currentMonthPercentVisited: function() {
    return parseInt(this.get('percents').current_month * 100, 10);
  }.property('percents')
});
