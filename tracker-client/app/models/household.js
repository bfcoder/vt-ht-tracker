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
  name: DS.attr('string'),
  teachers: DS.attr('string'),
  fullName: Ember.computed.alias('name'),
  fullNameReversed: Ember.computed.alias('name'),

  // Properties
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
  }.property('filteredVisits.[].status'),

  filteredVisits: function() {
    // Only get the previous and current month visits
    var previous_month_year = this.get('previousMonthYear');
    var current_month_year = this.get('currentMonthYear');
    var visits = this.get('visits').filter(function(visit) {
      var visit_month_year = moment(visit.get('month')).format('MMMM YYYY');
      return (visit_month_year === previous_month_year) || (visit_month_year === current_month_year);
    });
    return visits;
  }.property('visits.[]')

});
