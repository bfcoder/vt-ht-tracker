VtTracker.DistrictSistersIndexRoute = Ember.Route.extend({
  model: function(){
    return this.modelFor('district');
  },
  setupController: function(controller, district) {
    this._super(controller, district);

    controller.set('newSister', this.store.createRecord('sister', {
      district: district
    }));
  }
});
