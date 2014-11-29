VtTracker.DistrictSistersIndexRoute = Ember.Route.extend({
  model: function(){
    return this.modelFor('district');
  },
  setupController: function(controller, district) {
    this._super(controller, district);

    this.set('controller.newSister', this.store.createRecord('sister', {
      district: district
    }));
  }
});
