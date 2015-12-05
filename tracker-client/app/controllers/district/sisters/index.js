"use strict";

import Ember from "ember";

export default Ember.Controller.extend({
  sistersSorting: ['teachers', 'lastName', 'firstName'],

  activeSisters: Ember.computed.filter('model.sisters.@each.status', function(sister) {
    return sister.get('status');
  }),
  deactiveSisters: Ember.computed.filter('model.sisters.@each.status', function(sister) {
    return !sister.get('status');
  }),

  sortedActiveSisters: Ember.computed.sort('activeSisters.@each.status', 'sistersSorting'),
  sortedDeactiveSisters: Ember.computed.sort('deactiveSisters.@each.status', 'sistersSorting'),

  actions: {
    createNewSister: function() {
      var newSister = this.store.createRecord('sister', {
        district: this.get('model')
      });
      this.send('showModal', 'sister-modal', newSister);
    },

    disableSister: function(sister) {
      sister.set('status', false);
      sister.save();
    },

    enableSister: function(sister) {
      sister.set('status', true);
      sister.save();
    }
  }
});
