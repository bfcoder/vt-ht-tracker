import Ember from 'ember';

// Modified from https://github.com/alexspeller/ember-cli-active-link-wrapper

export default Ember.Component.extend({
  tagName: 'li',
  // childLinkViews: [],
  classNameBindings: ['active'],

  active: Ember.computed('current', function() {
    return this.get('linkPath') === this.get('current');
  })

  // active: Ember.computed('childLinkViews.@each.active', function() {
  //   return Ember.A(this.get('childLinkViews')).isAny('active');
  // }),

  // didRender: function() {
  //   Ember.run.schedule('afterRender', this, function() {
  //     var childLinkElements = this.$('a.ember-view');

  //     var childLinkViews = childLinkElements.toArray().map(view =>
  //       this._viewRegistry[view.id]
  //     );

  //     this.set('childLinkViews', childLinkViews);
  //   });
  // }

});
