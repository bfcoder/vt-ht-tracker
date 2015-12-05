"use strict";

import Ember  from "ember";
import moment from "moment";

const DAYSINTOMONTH = 7;

export default Ember.Mixin.create({
  queryParams: ['month'],

  month: Ember.computed(function() {
    var date = moment();
    if (date.date() <= DAYSINTOMONTH) {
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

  selectedMonthWord: Ember.computed('month', function() {
    var date = moment(this.get('month'));
    if (date.date() <= DAYSINTOMONTH) {
      date = date.subtract(1, 'month');
    }
    return date.format("MMMM");
  })
});
