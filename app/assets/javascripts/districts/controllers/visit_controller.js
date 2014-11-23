VtTracker.VisitController = Ember.ObjectController.extend({

  actions: {
    clearSelection: function() {
      this.set('status', null);
    }
  }
});
