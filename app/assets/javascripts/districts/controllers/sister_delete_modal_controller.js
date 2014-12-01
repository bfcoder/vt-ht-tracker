VtTracker.SisterDeleteModalController = Ember.ObjectController.extend({

  modalTitle: 'Delete?',

  actions: {
    save: function() {
      var _self = this;
      var sister = _self.get('model');
      sister.destroyRecord();
    }
  }
});
