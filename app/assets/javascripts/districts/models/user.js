VtTracker.User = DS.Model.extend({
  // Attributes
  roles: DS.attr(),

  // Properties
  isAdmin: function(){
    return this.hasRole('admin');
  }.property('roles.@each'),

  isPresidency: function(){
    return this.hasRole('presidency');
  }.property('roles.@each'),

  isTeachingCoordinator: function(){
    return this.hasRole('teaching_coordinator');
  }.property('roles.@each'),

  isDistrictLeader: function(){
    return this.hasRole('district_leader');
  }.property('roles.@each'),

  isVisitingTeacher: function(){
    return this.hasRole('visiting_teacher');
  }.property('roles.@each'),

  isPrivileged: function(){
    return this.get('isAdmin') || this.get('isPresidency') || this.get('isTeachingCoordinator');
  }.property('isAdmin', 'isPresidency', 'isTeachingCoordinator', 'isDistrictLeader'),

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
