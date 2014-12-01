VtTracker.DistrictDeleteModalController = Ember.ObjectController.extend({

  modalTitle: 'Delete?',

  actions: {
    save: function() {
      var _self = this;
      var district = _self.get('model');
      district.destroyRecord();
    }
  }
});
