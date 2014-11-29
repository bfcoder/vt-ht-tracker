VtTracker.SisterModalController = Ember.ObjectController.extend({
  needs: ['district', 'districtSistersIndex'],

  modalTitle: function() {
    if (this.get('isNew')) {
      return 'New Sister';
    } else {
      return 'Edit Sister';
    }
  }.property('isNew'),

  actions: {
    save: function() {
      var _self = this;
      var isNew = _self.get('model.isNew');
      var district = _self.get('model.district');
      _self.get('model').save().then(function() {
        if (isNew) {
          _self.set('controllers.districtSistersIndex.newSister', _self.store.createRecord('sister', {
            district: district
          }));
        }
      });
    }
  }
});
