VtTracker.IndexRoute = Ember.Route.extend({
  model: function() {
    return this.store.find('district');
  },

  setupController: function(controller, district) {
    this._super(controller, district);

    controller.set('newDistrict', this.store.createRecord('district'));
  }
});
