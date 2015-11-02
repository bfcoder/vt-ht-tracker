"use strict";

import Ember from "ember";
// import _     from "lodash";

export default Ember.Route.extend({
  queryParams: {
    month: {
      refreshModel: true
    }
  },

  model: function(params) {
    return this.store.query('visit', _.extend({district: this.modelFor('district').get('id')}, params));
  }
});
