"use strict";

import DS         from "ember-data";
import Ember      from "ember";
import moment     from "moment";

export default DS.Model.extend({
  // Associations
  sister: DS.belongsTo('sister', { async: true }),
  household: DS.belongsTo('household', { async: true }),
  histories: DS.hasMany('history', { async: true }),

  // Attributes
  month: DS.attr('string'),
  status: DS.attr('string'),
  notes: DS.attr('string'),

  // Properties
  monthFormatted: function() {
    var month = this.get('month');
    if (Ember.isEmpty(month)) {
      return "LOADING...";
    } else {
      return moment(month).format("MMMM YYYY");
    }
  }.property('month')
});
