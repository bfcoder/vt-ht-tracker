"use strict";

import Ember from "ember";

export default Ember.Controller.extend({
  visitsSorting: ['month'],
  sortedVisitsComplete: Ember.computed.sort('model.visitsComplete', 'visitsSorting')
});
