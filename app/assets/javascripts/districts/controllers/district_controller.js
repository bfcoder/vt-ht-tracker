VtTracker.DistrictController = Ember.ObjectController.extend({
  isSaving: false,

  sistersSorting: ['lastName'],
  sortedSisters: Ember.computed.sort('sisters', 'sistersSorting'),

  showSaveNotice: function() {
    return this.get('isSaving');
  }.property('isSaving'),

  enableSaveNotice: function() {
    this.set('isSaving', true);
  },

  disableSaveNotice: function() {
    this.set('isSaving', false);
  },

  actions: {
    saveVisits: function() {
      var _self = this;
      _self.get('sisters').forEach(function(sister) {
        sister.get('visits').forEach(function(visit) {
          // If the status has chaged, then save that visit.
          if (visit.get('isDirty')) {
            return visit.save().then(function() {
              _self.enableSaveNotice();
              Ember.run.debounce(_self, _self.disableSaveNotice, 2000);
            });
          }
        });
      });
    }
  }
});
