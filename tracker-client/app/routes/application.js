"use strict";

import Ember from "ember";

export default Ember.Route.extend({
  beforeModel(transition) {
    if(transition.targetName === "index") {
      this.transitionTo('home');
    }
  },

  actions: {
    showModal: function(name, model) {
      this.controllerFor(name).set('model', model);
      this.render(name, {
        into: 'application',
        outlet: 'modal'
      });
    },
    removeModal: function() {
      this.disconnectOutlet({
        outlet: 'modal',
        parentView: 'application'
      });
    }
  }
});
