"use strict";

import Ember  from "ember";
import moment from "moment";

export default Ember.Component.extend({
  tagName: '',

  createdAt: function() {
    var createdAt = this.get('history.createdAt');
    if (Ember.isPresent(createdAt)) {
      return moment(createdAt).calendar();
    } else {
      return "Loading";
    }
  }.property('history.createdAt'),

  statusHumanize: function() {
    var status = this.get('history.status');
    if (status === 'visited') {
      return 'Visited';
    } else if (status === 'not_visited') {
      return 'Not Visited';
    } else if (status === 'other') {
      return 'Other';
    }
  }.property('history.status')
});
