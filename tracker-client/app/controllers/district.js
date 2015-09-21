"use strict";
/*global GLOBAL_SETTINGS*/

import Ember from "ember";

export default Ember.Controller.extend({
  applicationController: Ember.inject.controller('application'),

  currentRouteName: Ember.computed.alias('applicationController.currentRouteName'),

  peopleLink: function() {
    if (GLOBAL_SETTINGS.mode === 'visiting_teaching') {
      return 'district.sisters';
    } else if (GLOBAL_SETTINGS.mode === 'home_teaching') {
      return 'district.households';
    }
  }.property(),

  peopleTitle: function() {
    if (GLOBAL_SETTINGS.mode === 'visiting_teaching') {
      return 'Sisters';
    } else if (GLOBAL_SETTINGS.mode === 'home_teaching') {
      return 'Households';
    }
  }.property()
});
