// Dissected from http://ember.zone/ember-application-initializers/ on Oct 22, 2014

Ember.Application.initializer({
  name: 'currentUser',

  initialize: function(container, application) {

    // Wait until all of the following promises are resolved
    application.deferReadiness();

    container.lookup('store:main').find('user', 'current_user').then( function(user) {
      // Register the `user:current` namespace
      container.register('user:current', user, {instantiate: false, singleton: true});

      // Inject the namespace into controllers and routes
      container.injection('route', 'currentUser', 'user:current');
      container.injection('controller', 'currentUser', 'user:current');

      // Continue the Application boot process, allowing other Initializers to run
      application.advanceReadiness();
    });

  }
});
