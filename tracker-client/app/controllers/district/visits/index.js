"use strict";
/*global GLOBAL_SETTINGS*/

import Ember from "ember";
import moment from "moment";

export default Ember.Controller.extend({
  queryParams: ['month'],
  districtController: Ember.inject.controller('district'),

  district: Ember.computed.alias('districtController.model'),

  isSaving: false,

  month: Ember.computed(function() {
    var date = moment();
    if (date.date() <= 3) {
      date = date.subtract(1, 'month');
    }
    return date.format("YYYY-MM-DD"); // Default value for queryParam
  }),

  months: Ember.computed(function() {
    var months = [];
    for (var i = 0; i < 12; i++) {
      var date = moment().subtract(i, 'month');
      months.push({
        id: date.format("YYYY-MM-DD"),
        name: date.format("MMMM YYYY")
      });
    }
    return months;
  }),

  sistersSorting: ['lastName', 'firstName'],
  sortedSisters: Ember.computed.sort('district.sisters', 'sistersSorting'),

  householdsSorting: ['name'],
  sortedHouseholds: Ember.computed.sort('district.households', 'householdsSorting'),

  sortedPeople: function() {
    if (GLOBAL_SETTINGS.mode === 'visiting_teaching') {
      return this.get('sortedSisters');
    } else if (GLOBAL_SETTINGS.mode === 'home_teaching') {
      return this.get('sortedHouseholds');
    }
  }.property('sortedSisters', 'sortedHouseholds'),

  visits: Ember.computed('model', function() {
    return this.get('model').toArray();
  }),

  showSaveNotice: function() {
    return this.get('isSaving');
  }.property('isSaving'),

  enableSaveNotice: function() {
    this.set('isSaving', true);
  },

  disableSaveNotice: function() {
    this.set('isSaving', false);
  },

  actions: {
    monthChanged: function(month) {
      this.transitionToRoute({ queryParams: { month: month }});
    },

    saveVisits: function() {
      var _self = this;
      _self.get('sortedPeople').forEach(function(person) {
        person.get('visits').forEach(function(visit) {
          // If the status has chaged, then save that visit.
          if (visit.get('hasDirtyAttributes')) {
            return visit.save().then(function() {
              _self.enableSaveNotice();
              Ember.run.debounce(_self, _self.disableSaveNotice, 2000);
            });
          }
        });
      });
    }
  }
});
