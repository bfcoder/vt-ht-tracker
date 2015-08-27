"use strict";

import Ember from "ember";

export default Ember.Helper.helper(([object, path]) => {
  if (Ember.isPresent(object)) {
    return Ember.get(object, path);
  } else {
    return null;
  }
});
