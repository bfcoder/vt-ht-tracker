VtTracker.DistrictController = Ember.ObjectController.extend({
  actions: {
    saveVisits: function() {
      this.get('sisters').forEach(function(sister) {
        sister.get('visits').forEach(function(visit) {
          // If the status has chaged, then save that visit.
          if (visit.get('isDirty')) {
            return visit.save();
          }
        });
      });
    }
  }
});
