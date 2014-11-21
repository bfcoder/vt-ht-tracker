VtTracker.DistrictRoute = Ember.Route.extend({
  model: function(params){
    return this.store.find('district', params.district_id);
  }
});
