VtTracker.DistrictIndexRoute = Ember.Route.extend({
  model: function(){
    return this.modelFor('district');
  }
});
