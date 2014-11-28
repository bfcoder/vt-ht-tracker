VtTracker.DistrictReportRoute = Ember.Route.extend({
  model: function(){
    return this.modelFor('district');
  }
});
