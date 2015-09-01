"use strict";

// modified from http://jsbin.com/fotuqa/edit?html,js,output
// Allows reading a dynamic property from an object, e.g.:
// {{read-path obj dynamicPropName}}
// If `dynamicPropName` equals "title", outputs the value of `obj.title`.
// In Ember 2.0 there is a native helper called `get` that does this, see: http://emberjs.com/blog/2015/06/12/ember-1-13-0-released.html#toc_get-helper

import Ember from "ember";

export default Ember.Helper.helper(([object, path]) => {
  if (Ember.isPresent(object)) {
    return Ember.get(object, path);
  } else {
    return null;
  }
});
