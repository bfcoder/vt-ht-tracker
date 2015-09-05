"use strict";

import Ember from "ember";

export default Ember.Route.extend({
  model: function(params) {
    return this.store.findRecord('visit', params.visit_id);
  }
});
