VtTracker.DistrictReportRoute = Ember.Route.extend({
  beforeModel: function(transition){
    if (!this.get('currentUser.isPrivileged')){
      transition.abort();
      this.transitionTo('/');
    }
  },

  model: function(){
    return this.modelFor('district');
  }
});
