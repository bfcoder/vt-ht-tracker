VtTracker.Sister = DS.Model.extend({
  // Associations
  visits: DS.hasMany('visit', { async: true }),
  district: DS.belongsTo('district', { async: true }),

  // Attributes
  name: DS.attr('string')
});
