"use strict";

import Ember from "ember";

export default Ember.Controller.extend({

  historiesSorting: ['createdAt'],
  sortedHistories: Ember.computed.sort('model.histories', 'historiesSorting')

});
