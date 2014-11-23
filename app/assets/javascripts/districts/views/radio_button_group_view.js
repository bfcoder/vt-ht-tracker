// Source from: https://github.com/ghempton/ember.js/blob/3dd22576ab941fdf95ead4d043d5148625aa1d05/packages/ember-handlebars/lib/controls/radio_button.js

/**
  @class

  The `Ember.RadioButtonGroup` view class provides a simplfied method for dealing
  with multiple `Ember.RadioButton` instances.

  ## Simple Example

  ```handlebars
  {{#view Ember.RadioButtonGroup name="role" valueBinding="content.role"}}
    {{view RadioButton value="admin"}}
    {{view RadioButton value="owner"}}
    {{view RadioButton value="user"}}
  {{/view}}
  ```

  Note that the radio buttons are declared as `{{view RadioButton ...}}` as opposed
  to `{{view Ember.RadioButton ...}}`. When inside the body of a RadioButtonGroup,
  a `RadioButton` view is provided which automatically picks up the same name and value
  binding as the containing group.

  ## More Complex Example

  ```javascript
  App.person = Ember.Object.create({name: 'Gordon', role: 'admin'})
  App.PersonController = Ember.Controller.extend({
    contentBinding: 'App.person',
    roleOptions: ['admin', 'owner', 'user', 'banned']
  });
  ```

  ```handlebars
  {{#view Ember.RadioButtonGroup name="role" valueBinding="content.role"}}
    {{#each role in controller.roleOptions}}
      <label>
        {{view RadioButton valueBinding="role"}}
        {{role}}
      </label>
    {{/each}}
  {{/view}}
  ```

  The above controller/template combination will render html containing a
  radio input for each item in the `roleOptions` property of the controller.
  Initially, the `admin` option will be checked. If the user selects a different
  radio, the `role` property of the controller's `content` will be updated
  accordingly.

  @extends Ember.View
*/

VtTracker.RadioButtonGroupView = Ember.View.extend({
 classNames: ['ember-radio-button-group'],
  attributeBindings: ['name:data-name'],

  name: Ember.required(),
  value: null,
  disabled: null,

  RadioButton: Ember.computed(function() {
    return VtTracker.RadioButtonView.extend({
      group: this,
      selectedValueBinding: 'group.value',
      nameBinding: 'group.name',
      disabledBinding: 'group.disabled'
    });
  })
});
