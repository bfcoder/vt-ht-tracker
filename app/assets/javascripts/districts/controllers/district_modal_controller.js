VtTracker.DistrictModalController = Ember.ObjectController.extend({
  needs: ['index'],

  modalTitle: function() {
    if (this.get('isNew')) {
      return 'New District';
    } else {
      return 'Edit District';
    }
  }.property('isNew'),

  actions: {
    save: function() {
      var _self = this;
      var isNew = _self.get('model.isNew');
      _self.get('model').save().then(function() {
        if (isNew) {
          _self.set('controllers.index.newDistrict', _self.store.createRecord('district'));
        }
      });
    }
  }
});
