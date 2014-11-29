// http://ember.guru/2014/master-your-modals-in-ember-js

VtTracker.MyModalComponent = Ember.Component.extend({
  actions: {
    ok: function() {
      this.$('.modal').modal('hide');
      this.sendAction('ok');
    }
  },
  show: function() {
    var _self = this;
    _self.$('.modal').modal()
    .on('shown.bs.modal', function() {
      _self.$('[autofocus]').focus();
    })
    .on('hidden.bs.modal', function() {
      _self.sendAction('close');
    });
  }.on('didInsertElement')
});
