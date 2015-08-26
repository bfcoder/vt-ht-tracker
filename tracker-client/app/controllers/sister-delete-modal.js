"use strict";

import Ember from "ember";

export default Ember.Controller.extend({
  modalTitle: 'Delete?',

  actions: {
    save: function() {
      var _self = this;
      var sister = _self.get('model');
      sister.destroyRecord();
    }
  }
});
