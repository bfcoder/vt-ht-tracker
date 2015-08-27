"use strict";

import Ember from "ember";
import DS    from "ember-data";

export default DS.ActiveModelAdapter.extend({
  namespace: "api",

  shouldReloadAll: function() {
    return true;
    // TODO decide if this is what we really want.
    // DEPRECATION: The default behavior of shouldReloadAll will change in
    // Ember Data 2.0 to always return false when there is at least one "transportation-method"
    // record in the store. If you would like to preserve the current behavior
    // please override shouldReloadAll in your adapter:application and return true.
  },

  shouldBackgroundReloadRecord: function(store, snapshot) {
    return true;
    // TODO decide if this is what we really want.
    // DEPRECATION: The default behavior of `shouldBackgroundReloadRecord` will change
    // in Ember Data 2.0 to always return true. If you would like to preserve the
    // current behavior please override `shouldBackgroundReloadRecord` in your
    // adapter:application and return false.
  },

  pathForType: function(modelName) {
    var underscored = Ember.String.underscore(modelName);
    return Ember.String.pluralize(underscored);
  }
});
