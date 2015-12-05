"use strict";
/*global GLOBAL_SETTINGS*/

import Ember from "ember";
import CommonDate from "../../../mixins/common-date";

export default Ember.Controller.extend(CommonDate, {
  districtController: Ember.inject.controller('district'),

  district: Ember.computed.alias('districtController.model'),

  isSaving: false,
  message: null,

  hasPresidencyMessage: Ember.computed('message.presidencyMessage', function() {
    return Ember.isPresent(this.get('message.presidencyMessage'));
  }),

  sistersSorting: ['lastName', 'firstName'],
  activeSisters: Ember.computed.filter('district.sisters.@each.status', function(sister) {
    return sister.get('status');
  }),
  sortedSisters: Ember.computed.sort('activeSisters.@each.status', 'sistersSorting'),

  householdsSorting: ['name'],
  activeHouseholds: Ember.computed.filter('district.households.@each.status', function(household) {
    return household.get('status');
  }),
  sortedHouseholds: Ember.computed.sort('activeHouseholds.@each.status', 'householdsSorting'),

  sortedPeople: function() {
    if (GLOBAL_SETTINGS.mode === 'visiting_teaching') {
      return this.get('sortedSisters');
    } else if (GLOBAL_SETTINGS.mode === 'home_teaching') {
      return this.get('sortedHouseholds');
    }
  }.property('sortedSisters', 'sortedHouseholds'),

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
