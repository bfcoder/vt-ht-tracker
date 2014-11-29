VtTracker.DistrictSistersIndexController = Ember.ObjectController.extend({
  sistersSorting: ['lastName'],
  sortedSisters: Ember.computed.sort('sisters', 'sistersSorting'),
  newSister: null
});
