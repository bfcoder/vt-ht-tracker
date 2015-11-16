"use strict";

import DS         from "ember-data";
import Ember      from "ember";
import moment     from "moment";

export default DS.Model.extend({
  // Associations
  visits: DS.hasMany('visit', { async: true }),
  visitsComplete: DS.hasMany('visit', { async: true }),
  district: DS.belongsTo('district', { async: false }),

  // Attributes
  firstName: DS.attr('string'),
  lastName: DS.attr('string'),
  teachers: DS.attr('string'),

  selectedMonth: null,

  // Properties
  fullName: Ember.computed('firstName', 'lastName', function() {
    return [this.get('firstName'), this.get('lastName')].compact().join(' ');
  }),

  fullNameReversed: Ember.computed('firstName', 'lastName', function() {
    var firstName = this.get('firstName');
    var lastName = this.get('lastName');
    if (!Ember.isEmpty(firstName) && !Ember.isEmpty(lastName)) {
      return lastName + ", " + firstName;
    } else if (!Ember.isEmpty(lastName)) {
      return lastName;
    } else if (!Ember.isEmpty(firstName)) {
      return firstName;
    } else {
      return "";
    }
  }),

  numberVisited: Ember.computed('selectionMonthVisit.status', function() {
    if (this.get('selectionMonthVisit.status') === 'visited') {
      return 1;
    } else {
      return 0;
    }
  }),

  selectionMonthVisit: Ember.computed('visits.@each.month', 'selectedMonth', function() {
    // Only get the selected month visit
    var selectedMonthYear = moment(this.get('selectedMonth'), 'YYYY-MM-DD').format('MMMM YYYY');
    var selectionMonthVisit = this.get('visits').find(function(visit) {
      var visitMonthYear = moment(visit.get('month')).format('MMMM YYYY');
      return visitMonthYear === selectedMonthYear;
    });
    return selectionMonthVisit;
  })

});
