"use strict";

import Ember from "ember";

export default Ember.Controller.extend({
  breadCrumb: Ember.computed.alias('name')
});
