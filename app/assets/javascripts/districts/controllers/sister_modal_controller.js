VtTracker.SisterModalController = Ember.ObjectController.extend({
  needs: ['district', 'districtSistersIndex'],

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
