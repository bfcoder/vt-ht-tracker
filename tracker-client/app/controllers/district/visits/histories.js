"use strict";

import Ember from "ember";

export default Ember.Controller.extend({

  historiesSorting: ['createdAt'],
  sortedHistories: Ember.computed.sort('model.histories', 'historiesSorting'),

  person: function() {
    var sister = this.get('model.sister');
    var household = this.get('model.household');
    if (Ember.isPresent(sister)) {
      return sister;
    }
    if (Ember.isPresent(household)) {
      return household;
    }
  }.property('model.sister', 'model.household'),

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
    return this.get('model.monthFormatted');
  }.property('model.monthFormatted')

});
