"use strict";

import DS         from "ember-data";
import Ember      from "ember";
import moment     from "moment";

export default DS.Model.extend({
  // Associations
  sister: DS.belongsTo('sister', { async: true, inverse: 'visits' }),
  household: DS.belongsTo('household', { async: true, inverse: 'visits' }),
  histories: DS.hasMany('history', { async: true }),

  // Attributes
  month: DS.attr('string'),
  status: DS.attr('string'),
  notes: DS.attr('string'),

  // Properties
  hasDirtyness: function() {
    if (this.get('hasDirtyAttributes')) {
      window.onbeforeunload = this.confirmOnPageExit;
    } else {
      window.onbeforeunload = null;
    }
  }.observes('month', 'status', 'hasDirtyAttributes'),

  // http://stackoverflow.com/a/1119324/1477165
  confirmOnPageExit: function(e) {
    // If we haven't been passed the event get the window.event
    e = e || window.event;

    var message = 'Visits are not saved. Please save before leaving.';

    // For IE6-8 and Firefox prior to version 4
    if (e) {
      e.returnValue = message;
    }

    // For Chrome, Safari, IE8+ and Opera 12+
    return message;
  },

  monthFormatted: function() {
    var month = this.get('month');
    if (Ember.isEmpty(month)) {
      return "LOADING...";
    } else {
      return moment(month).format("MMMM YYYY");
    }
  }.property('month')
});
