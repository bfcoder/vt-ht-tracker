"use strict";
/*global GLOBAL_SETTINGS*/

import Ember from "ember";

export default Ember.Controller.extend({
  isSaving: false,

  sistersSorting: ['lastName', 'firstName'],
  sortedSisters: Ember.computed.sort('sisters', 'sistersSorting'),

  householdsSorting: ['name'],
  sortedHouseholds: Ember.computed.sort('households', 'householdsSorting'),

  peopleLink: function() {
    if (GLOBAL_SETTINGS.mode === 'visiting_teaching') {
      return 'district.sisters';
    } else if (GLOBAL_SETTINGS.mode === 'home_teaching') {
      return 'district.households';
    }
  }.property(),

  peopleTitle: function() {
    if (GLOBAL_SETTINGS.mode === 'visiting_teaching') {
      return 'Sisters';
    } else if (GLOBAL_SETTINGS.mode === 'home_teaching') {
      return 'Households';
    }
  }.property(),

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
    saveVisits: function() {
      var _self = this;
      _self.get('sortedPeople').forEach(function(person) {
        person.get('visits').forEach(function(visit) {
          // If the status has chaged, then save that visit.
          if (visit.get('isDirty')) {
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
