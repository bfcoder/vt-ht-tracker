"use strict";
/*global GLOBAL_SETTINGS*/

import Ember from "ember";

export default Ember.Route.extend({
  beforeModel: function(transition) {
    if (!this.get('currentUser.isPrivileged')) {
      transition.abort();
      this.transitionTo('/');
    }
  },

  model: function(){
    if (GLOBAL_SETTINGS.mode === 'visiting_teaching') {
      return this.store.find('sister');
    } else if (GLOBAL_SETTINGS.mode === 'home_teaching') {
      return this.store.find('household');
    }
  }
});
