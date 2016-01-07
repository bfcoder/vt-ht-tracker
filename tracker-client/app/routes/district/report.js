"use strict";

import Ember from "ember";
/*global GLOBAL_SETTINGS _*/

export default Ember.Route.extend({
  queryParams: {
    month: {
      refreshModel: true
    }
  },

  beforeModel: function(transition) {
    if (!this.get('currentUser.model.isPrivileged')) {
      transition.abort();
      this.transitionTo('/');
    }
  },

  model: function(params) {
    return this.store.query('visit', _.extend({district: this.modelFor('district').get('id'), setting: GLOBAL_SETTINGS.mode}, params));
  }
});
