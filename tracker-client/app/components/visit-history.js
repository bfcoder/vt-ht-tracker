"use strict";

import Ember from "ember";

export default Ember.Component.extend({
  tagName: '',

  historiesSorting: ['createdAt'],
  sortedHistories: Ember.computed.sort('visit.histories', 'historiesSorting'),

  person: function() {
    var sister = this.get('visit.sister');
    var household = this.get('visit.household');
    if (Ember.isPresent(sister)) {
      return sister;
    }
    if (Ember.isPresent(household)) {
      return household;
    }
  }.property('visit.sister', 'visit.household'),

  personName: function() {
    var person = this.get('person');
    if (Ember.isPresent(person)) {
      return person.get('fullName');
    }
  }.property('person'),

  teachers: function() {
    var person = this.get('person');
    if (Ember.isPresent(person)) {
      return person.get('teachers');
    }
  }.property('person'),

  month: function() {
    return this.get('visit.monthFormatted');
  }.property('visit.monthFormatted')

});
