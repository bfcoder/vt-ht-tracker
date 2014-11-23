Ember.RadioButton = Ember.View.extend({
  tagName: "input",
  type: "radio",
  attributeBindings: ["name", "type", "value", "checked:checked:", "style"],
  click: function() {
    return this.set("selection", this.$().val());
  },
  checked: (function() {
    return this.get("value") === this.get("selection");
  }).property('value', 'selection')
});





// Source from: https://github.com/ghempton/ember.js/blob/3dd22576ab941fdf95ead4d043d5148625aa1d05/packages/ember-handlebars/lib/controls/radio_button.js

/**
  @class

  The `Ember.RadioButton` view class renders an html radio input, allowing the
  user to select a single value from a list of values.

  Dealing with multiple radio buttons can be simplified by using an
  `Ember.RadioButtonGroup`. See the {@link Ember.RadioButtonGroup} documentation
  for more information.

  @extends Ember.View
*/

VtTracker.RadioButtonView = Ember.View.extend({
  attributeBindings: ["disabled", "type", "name", "value", "checked"],
  classNames: ["ember-radio-button"],

  value: null,
  selectedValue: null,
  disabled: false,
  checked: false,

  tagName: "input",
  type: "radio",

  selectedValueChanged: Ember.observer(function() {
    var selectedValue = Ember.get(this, "selectedValue");
    if(!Ember.isEmpty(selectedValue) && Ember.get(this, "value") === selectedValue) {
      Ember.set(this, "checked", true);
    } else {
      Ember.set(this, "checked", false);
    }
  }, 'selectedValue'),

  checkedChanged: Ember.observer(function() {
    this._updateElementValue();
  }, 'checked'),

  init: function() {
    this._super();
    this.selectedValueChanged();
  },

  change: function() {
    Ember.set(this, 'checked', this.$().prop('checked'));
    Ember.run.once(this, this._updateElementValue);
  },

  _updateElementValue: function() {
    if(!Ember.get(this, 'checked')) return;
    Ember.set(this, 'selectedValue', Ember.get(this, 'value'));
  }
});
