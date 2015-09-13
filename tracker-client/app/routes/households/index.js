"use strict";

import Ember from "ember";

export default Ember.Route.extend({
  beforeModel: function(transition) {
    if (!this.get('currentUser.model.isPrivileged')) {
      transition.abort();
      this.transitionTo('/');
    }
  },

  model: function() {
    return this.store.findAll('household');
  }
});
