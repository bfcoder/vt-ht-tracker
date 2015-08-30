"use strict";

import Ember from "ember";
import $     from "jquery";

export default Ember.Component.extend({
  content: null,
  prompt: null,
  multiple: false,
  maxSelectedOptions: null,
  isRtl: false,
  disableSearchThreshold: null,
  noResultsText: null,
  width: '100%',
  optionValuePath: 'value',
  optionLabelPath: 'name',
  isRelational: false,
  allowSingleDeselect: false,
  action: Ember.K, // action to fire on change

  // readOnly the passed-in `selection` to prohibit
  // leaking changes to it via a 2-way binding
  // this way when an async model is loaded the
  // changes are propagated into the chosen components
  _selection: Ember.computed.readOnly('selection'),

  computedSelection: Ember.computed('_selection', {
    get: function get() {
      var selection = this.get('_selection');
      var self = this;
      if (Ember.isPresent(selection)) {
        if (self.get('multiple') && Array.isArray(selection)) {
          return $.map(selection, function(select) {
            return Ember.get(select, self.get('optionValuePath')) || select;
          });
        } else {
          return Ember.get(selection, self.get('optionValuePath')) || selection;
        }
      } else {
        return null;
      }
    },
    set: function set(key, value) {
      return value;
    }
  }),

  actions: {
    change: function change(selection) {
      var content = this.get('content');

      if (!this.get('multiple') && this.get('isRelational')) {
        selection = content.findBy(this.get('optionValuePath'), selection);
      }

      // Set the selection to the callback
      var changeCallback = this.get('action');
      changeCallback(selection);
    }
  }
});
