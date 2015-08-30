"use strict";

// Modified from https://github.com/green-arrow/ember-cli-chosen

import Ember from "ember";

export default Ember.Component.extend({
  tagName: 'select',
  attributeBindings: ['prompt:data-placeholder', 'multiple'],
  classNameBindings: ['isRtl:chosen-rtl'],
  classNames: ['chosen-select'],
  prompt: null,
  isRtl: false,
  multiple: false,
  disableSearchThreshold: null,
  noResultsText: null,
  maxSelectedOptions: null,
  allowSingleDeselect: null,
  value: null,
  width: '100%',
  selectionDidChange: null,

  _options: function() {
    var options = {};

    if(!Ember.isNone(this.get('disableSearchThreshold'))) { options.disable_search_threshold = this.get('disableSearchThreshold'); }
    if(!Ember.isNone(this.get('noResultsText'))) { options.no_results_text = this.get('noResultsText'); }
    if(!Ember.isNone(this.get('maxSelectedOptions'))) { options.max_selected_options = this.get('maxSelectedOptions'); }
    if(!Ember.isNone(this.get('width'))) { options.width = this.get('width'); }
    if(!Ember.isNone(this.get('allowSingleDeselect'))) { options.allow_single_deselect = this.get('allowSingleDeselect'); }

    if(this.get('multiple')){
      if(!Ember.isNone(this.get('prompt'))) { options.placeholder_text_multiple = this.get('prompt'); }
    } else {
      if(!Ember.isNone(this.get('prompt'))) { options.placeholder_text_single = this.get('prompt'); }
    }

    return options;
  }.property('prompt', 'isRtl', 'multiple', 'disableSearchThreshold',
             'noResultsText', 'maxSelectedOptions', 'width', 'allowSingleDeselect'),

  _setupChosen: function() {
    var _this = this,
      options = _this.get('_options'),
      isMultiple = _this.get('multiple'),
      currentValue = _this.get('value'),
      selectedValue;

    if(isMultiple) {
      currentValue = Ember.makeArray(currentValue);
      _this.set('value', currentValue);
    } else {
      // If we're going from multiple -> single select, make the selected
      // value the first item in the selected value array, if an item exists
      if(Ember.isArray(currentValue) && currentValue.length > 0) {
        currentValue = currentValue[0];
        _this.set('value', currentValue);
      }

      if (currentValue === true) {
        currentValue = "true";
        _this.set('value', currentValue);
      } else if (currentValue === false) {
        currentValue = "false";
        _this.set('value', currentValue);
      }
    }

    _this.$().chosen(options)
    .on('change', function (e, params) {
      var index;

      if(isMultiple) {
        currentValue = _this.get('value');

        if(params.selected) {
          if (currentValue.indexOf(params.selected) === -1) {
            currentValue.pushObject(params.selected);
          }
        } else {
          index = currentValue.indexOf(params.deselected);

          if(index !== -1) {
            currentValue.removeAt(index);
          }
        }

        selectedValue = currentValue;
      } else if (Ember.isPresent(params)) {
        selectedValue = params.selected;
        if (selectedValue === "true") {
          selectedValue = true;
        } else if (selectedValue === "false") {
          selectedValue = false;
        }
      } else {
        selectedValue = null;
      }

      _this.set('value', selectedValue);
      _this.sendAction('selectionDidChange', selectedValue);
    }).on('chosen:maxselected', function(e, chosen) {
      _this.sendAction('chosenMaxSelected', e, chosen);
    });
    _this.$().val(currentValue).trigger("chosen:updated");
  }.observes('_options'),

  didRender: function() {
    this._super();
    this._setupChosen();
    this.$().trigger("chosen:updated");
  }
});
