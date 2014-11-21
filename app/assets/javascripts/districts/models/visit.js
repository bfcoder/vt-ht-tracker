VtTracker.Visit = DS.Model.extend({
  // Associations
  sister: DS.belongsTo('sister', { async: true }),

  // Attributes
  month: DS.attr('date'),
  status: DS.attr('string')
});
