"use strict";

import Ember from "ember";
import DS    from "ember-data";

export default DS.Model.extend({
  // Associations
  sisters: DS.hasMany('sister', { async: true }),
  households: DS.hasMany('household', { async: true }),

  // Attributes
  name: DS.attr('string'),

  selectedMonth: null,

  // Properties
  occupied: function() {
    return this.get('sisters.length') || this.get('households.length');
  }.property('sisters.[]', 'households.[]'),

  activeSisters: Ember.computed.filter('sisters.@each.status', function(sister) {
    return sister.get('status');
  }),

  activeHouseholds: Ember.computed.filter('households.@each.status', function(household) {
    return household.get('status');
  }),

  percentVisited: Ember.computed('selectedMonth', 'activeSisters.@each.numberVisited', 'activeHouseholds.@each.numberVisited', function() {
    var visits = {
      selected_month_sisters: 0,
      selected_month_households: 0,
      number_sisters: 0,
      number_households: 0
    };

    var selectedMonth = this.get('selectedMonth');

    this.get('activeSisters').forEach(function(sister) {
      if (!sister.get('isNew')) {
        sister.set('selectedMonth', selectedMonth);
        visits.selected_month_sisters += sister.get('numberVisited');
        visits.number_sisters += 1;
      }
    });

    this.get('activeHouseholds').forEach(function(household) {
      if (!household.get('isNew')) {
        household.set('selectedMonth', selectedMonth);
        visits.selected_month_households += household.get('numberVisited');
        visits.number_households += 1;
      }
    });

    return visits;
  }),

  sistersLoaded: function() {
    var allLoaded = this.get('sisters').every(function(sister) {
      return sister.get('isloaded');
    });
    return allLoaded;
  }.observes('sisters.@each.visitsLoaded', 'sisters.[]', 'isloaded'),

  householdsLoaded: function() {
    var allLoaded = this.get('households').every(function(household) {
      return household.get('isloaded');
    });
    return allLoaded;
  }.observes('households.@each.visitsLoaded', 'households.[]', 'isloaded')
});
