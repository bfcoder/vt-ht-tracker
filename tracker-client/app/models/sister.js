"use strict";

import DS         from "ember-data";
import Ember      from "ember";
import CommonDate from "../mixins/common-date";
import moment     from "moment";

export default DS.Model.extend(CommonDate, {
  // Associations
  visits: DS.hasMany('visit', { async: true }),
  visitsComplete: DS.hasMany('visit', { async: true }),
  district: DS.belongsTo('district', { async: false }),

  // Attributes
  firstName: DS.attr('string'),
  lastName: DS.attr('string'),
  teachers: DS.attr('string'),

  // Properties

  fullName: function() {
    return [this.get('firstName'), this.get('lastName')].compact().join(' ');
  }.property('firstName', 'lastName'),

  fullNameReversed: function() {
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
  }.property('firstName', 'lastName'),

  numberVisited: function() {
    var _self = this;
    var visits = {
      previous_month: 0,
      current_month: 0
    };
    this.get('filteredVisits').forEach(function(visit) {
      var previous_month = _self.get('previousMonth');
      var current_month = _self.get('currentMonth');
      var visit_month = moment(visit.get('month')).format('MMMM');
      if (visit.get('status') === 'visited') {
        if (previous_month === visit_month) {
          visits.previous_month++;
        } else if (current_month === visit_month) {
          visits.current_month++;
        }
      }
    });
    return visits;
  }.property('visits.@each.status'),

  filteredVisits: function() {
    // Only get the previous and current month visits
    var previous_month_year = this.get('previousMonthYear');
    var current_month_year = this.get('currentMonthYear');
    var visits = this.get('visits').filter(function(visit) {
      var visit_month_year = moment(visit.get('month')).format('MMMM YYYY');
      return (visit_month_year === previous_month_year) || (visit_month_year === current_month_year);
    });
    return visits;
  }.property('visits.@each.month')

});
