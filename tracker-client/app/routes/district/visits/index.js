"use strict";
/*global _ GLOBAL_SETTINGS*/

import Ember from "ember";
// import _     from "lodash";

export default Ember.Route.extend({
  queryParams: {
    month: {
      refreshModel: true
    }
  },

  model: function(params) {
    return this.store.query('visit', _.extend({district: this.modelFor('district').get('id'), setting: GLOBAL_SETTINGS.mode}, params));
  },

  setupController: function(controller, model) {
    this._super(controller, model.toArray());
    controller.set('message', this.store.findRecord('setting', GLOBAL_SETTINGS.id));
  }
});
