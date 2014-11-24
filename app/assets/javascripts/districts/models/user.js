VtTracker.User = DS.Model.extend({
  // Attributes
  roles: DS.attr(),

  // Properties
  isAdmin: function(){
    return this.hasRole('admin');
  }.property('roles.@each'),

  hasRole: function(role_name){
    var roles = this.get('roles');
    if(!Ember.isEmpty(roles)){
      return roles.any(function(role){
        return role === role_name;
      });
    }
    return false;
  }
});
