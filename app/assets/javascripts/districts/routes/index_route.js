VtTracker.IndexRoute = Ember.Route.extend({
  model: function() {
    return this.store.find('district');
  }
});
