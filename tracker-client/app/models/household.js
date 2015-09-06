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
    this.get('visits').forEach(function(visit) {
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
  }.property('visits.[].status')

});
