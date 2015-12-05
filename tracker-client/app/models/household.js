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
  name: DS.attr('string'),
  teachers: DS.attr('string'),
  fullName: Ember.computed.alias('name'),
  fullNameReversed: Ember.computed.alias('name'),
  status: DS.attr('boolean', { defaultValue: true }),

  // Properties
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
