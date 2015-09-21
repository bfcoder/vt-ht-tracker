"use strict";
/*global GLOBAL_SETTINGS*/

import Ember from "ember";

export default Ember.Controller.extend({
  applicationController: Ember.inject.controller('application'),

  currentRouteName: Ember.computed.alias('applicationController.currentRouteName'),

  peopleLinkPath: function() {
    if (GLOBAL_SETTINGS.mode === 'visiting_teaching') {
      return 'home.sisters.index';
    } else if (GLOBAL_SETTINGS.mode === 'home_teaching') {
      return 'home.households.index';
    }
  }.property(),

  peopleLink: function() {
    if (GLOBAL_SETTINGS.mode === 'visiting_teaching') {
      return 'home.sisters';
    } else if (GLOBAL_SETTINGS.mode === 'home_teaching') {
      return 'home.households';
    }
  }.property(),

  peopleTitle: function() {
    if (GLOBAL_SETTINGS.mode === 'visiting_teaching') {
      return 'All Sisters';
    } else if (GLOBAL_SETTINGS.mode === 'home_teaching') {
      return 'All Households';
    }
  }.property()
});
