VtTracker.Sister = DS.Model.extend({
  // Associations
  visits: DS.hasMany('visit', { async: true }),
  district: DS.belongsTo('district', { async: true }),

  // Attributes
  firstName: DS.attr('string'),
  lastName: DS.attr('string'),

  // Properties
  fullName: function(){
    return this.get('firstName') + " " + this.get('lastName');
  }.property('firstName', 'lastName')
});
