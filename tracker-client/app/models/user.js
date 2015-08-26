"use strict";

import DS    from "ember-data";
import Ember from "ember";

export default DS.Model.extend({
  // Attributes
  roles: DS.attr(),

  // Properties
  isAdmin: function() {
    return this.hasRole('admin');
  }.property('roles.[]'),

  isPresidency: function() {
    return this.hasRole('presidency');
  }.property('roles.[]'),

  isTeachingCoordinator: function() {
    return this.hasRole('teaching_coordinator');
  }.property('roles.[]'),

  isDistrictLeader: function() {
    return this.hasRole('district_leader');
  }.property('roles.[]'),

  isVisitingTeacher: function() {
    return this.hasRole('visiting_teacher');
  }.property('roles.[]'),

  isPrivileged: function() {
    return this.get('isAdmin') || this.get('isPresidency') || this.get('isTeachingCoordinator');
  }.property('isAdmin', 'isPresidency', 'isTeachingCoordinator', 'isDistrictLeader'),

  hasRole: function(role_name) {
    var roles = this.get('roles');
    if (!Ember.isEmpty(roles)) {
      return roles.any(function(role) {
        return role === role_name;
      });
    }
    return false;
  }
});
