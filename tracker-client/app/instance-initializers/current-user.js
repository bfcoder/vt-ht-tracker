"use strict";

export default {
  name: 'currentUser',

  initialize: function(instance) {
    return instance.container.lookup('service:store').find('user', 'current_user').then(function(user) {
      var currentUser = instance.container.lookup("user:current");
      currentUser.set('model', user);
    });
  }
};
