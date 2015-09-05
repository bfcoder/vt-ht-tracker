"use strict";

import DS         from "ember-data";
import Ember      from "ember";
import moment     from "moment";

export default DS.Model.extend({
  // Associations
  visit: DS.belongsTo('visit', { async: true }),

  // Attributes
  month: DS.attr('string'),
  status: DS.attr('string'),
  notes: DS.attr('string'),
  createdAt: DS.attr('date'),

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
