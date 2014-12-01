VtTracker.DistrictSistersIndexRoute = Ember.Route.extend({
  beforeModel: function(transition){
    if (!this.get('currentUser.isPrivileged')){
      transition.abort();
      this.transitionTo('/');
    }
  },

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
