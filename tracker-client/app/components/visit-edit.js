"use strict";
/*global _*/

import Ember  from "ember";

export default Ember.Component.extend({
  tagName: '',

  visit: Ember.computed('visits', 'month', function() {
    return _.find(this.get('visits'), function(visit) {
      return this.get('person.id') === visit.get('sister.id') || this.get('person.id') === visit.get('household.id');
    }.bind(this));
  }),

  actions: {
    clearSelection: function() {
      this.set('visit.status', null);
    }
  }
});
