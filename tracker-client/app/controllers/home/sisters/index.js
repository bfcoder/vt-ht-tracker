"use strict";

import Ember from "ember";

export default Ember.Controller.extend({
  sistersSorting: ['district.name', 'teachers', 'lastName', 'firstName'],
  sortedSisters: Ember.computed.sort('model', 'sistersSorting'),

  actions: {
    createNewSister: function() {
      var newSister = this.store.createRecord('sister');
      this.send('showModal', 'sister-modal', newSister);
    }
  }
});
