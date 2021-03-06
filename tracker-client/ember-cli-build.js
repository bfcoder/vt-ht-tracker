/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    // Add options here
    minifyCSS: {
      enabled: false
    },
    minifyJS: {
      enabled: false
    }
  });

  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.
  app.import('bower_components/moment/moment.js');

  app.import('bower_components/lodash/lodash.js');

  // The css for bootstrap is included in the rails app
  app.import('bower_components/bootstrap/dist/js/bootstrap.js');

  // The css for chosen is included in the rails app
  app.import('bower_components/chosen/chosen.jquery.min.js');

  return app.toTree();
};
