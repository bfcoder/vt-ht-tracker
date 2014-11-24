VtTracker.Sister = DS.Model.extend({
  // Associations
  visits: DS.hasMany('visit', { async: true }),
  district: DS.belongsTo('district', { async: true }),

  // Attributes
  firstName: DS.attr('string'),
  lastName: DS.attr('string'),

  // Properties
  fullName: function(){
    var firstName = this.get('firstName');
    var lastName = this.get('lastName');
    if (!Ember.isEmpty(firstName) && !Ember.isEmpty(lastName)) {
      return firstName + " " + lastName;
    } else if (!Ember.isEmpty(lastName)) {
      return lastName;
    } else if (!Ember.isEmpty(firstName)) {
      return firstName;
    } else {
      return "";
    }
  }.property('firstName', 'lastName')
});
