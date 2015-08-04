VtTracker.DistrictSistersIndexController = Ember.ObjectController.extend({
  sistersSorting: ['lastName', 'firstName'],
  sortedSisters: Ember.computed.sort('sisters', 'sistersSorting'),
  newSister: null
});
