"use strict";

import Ember from "ember";

export default Ember.Component.extend({
  tagName: '',

  statusHumanize: function() {
    var status = this.get('visit.status');
    if (status === 'visited') {
      return 'Visited';
    } else if (status === 'not_visited') {
      return 'Not Visited';
    } else if (status === 'other') {
      return 'Other';
    }
  }.property('visit.status')
});
