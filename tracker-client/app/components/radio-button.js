"use strict";

// Source: https://github.com/yapplabs/ember-radio-button
// Converted on 7/29/2015

import Ember from "ember";

export default Ember.Component.extend({
  tagName: '',
  // value - passed in, required, the value for this radio button
  // groupValue - passed in, required, the currently selected value

  // optionally passed in:
  // disabled - boolean
  // required - boolean
  // name - string
  // radioClass - string
  // radioId - string

  joinedClassNames: Ember.computed('classNames', function() {
    var classNames = this.get('classNames');
    if (classNames && classNames.length && classNames.join) {
      return classNames.join(' ');
    }
    return classNames;
  }),

  // is this needed here or just on radio-button-input?
  defaultLayout: null, // ie8 support

  checked: Ember.computed('groupValue', 'value', function(){
    return this.get('groupValue') === this.get('value');
  }).readOnly(),

  actions: {
    changed: function(newValue) {
      this.sendAction('changed', newValue);
    }
  }
});

