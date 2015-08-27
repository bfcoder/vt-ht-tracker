"use strict";

import Ember from "ember";

export default Ember.Component.extend({
  tagName: '',

  actions: {
    clearSelection: function() {
      this.set('visit.status', null);
    }
  }
});
