VtTracker.DistrictHouseholdsRoute = Ember.Route.extend({
  model: function(){
    return this.modelFor('district');
  }
});
