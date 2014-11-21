VtTracker.District = DS.Model.extend({
  // Associations
  sisters: DS.hasMany('sister', { async: true }),

  // Attributes
  name: DS.attr('string')
});
