VtTracker.HouseholdDeleteModalController = Ember.ObjectController.extend({

  modalTitle: 'Delete?',

  actions: {
    save: function() {
      var _self = this;
      var household = _self.get('model');
      household.destroyRecord();
    }
  }
});
