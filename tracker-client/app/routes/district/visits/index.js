"use strict";
/*global GLOBAL_SETTINGS _*/

import Ember from "ember";

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
