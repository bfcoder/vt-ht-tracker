"use strict";

import Ember from "ember";

export default Ember.Controller.extend({
  statusHumanize: function() {
    var status = this.get('status');
    if (status === 'visited') {
      return 'Visited';
    } else if (status === 'not_visited') {
      return 'Not Visited';
    } else if (status === 'other') {
      return 'Other';
    }
  }.property('status'),

  actions: {
    clearSelection: function() {
      this.set('status', null);
    }
  }
});
