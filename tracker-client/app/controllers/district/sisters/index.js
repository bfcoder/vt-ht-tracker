"use strict";

import Ember from "ember";

export default Ember.Controller.extend({
  sistersSorting: ['teachers', 'lastName', 'firstName'],
  sortedSisters: Ember.computed.sort('model.sisters', 'sistersSorting'),

  actions: {
    createNewSister: function() {
      var newSister = this.store.createRecord('sister', {
        district: this.get('model')
      });
      this.send('showModal', 'sister-modal', newSister);
    }
  }
});
