"use strict";

import CurrentUser from "../controllers/current-user";

export default {
  name: 'currentUser',

  initialize: function(registry, application) {
    // Register the `user:current` namespace
    application.register("user:current", CurrentUser, { singleton: true });

    // Inject the namespace into controllers and routes
    application.inject('route', 'currentUser', "user:current");
    application.inject('controller', 'currentUser', "user:current");
  }
};
