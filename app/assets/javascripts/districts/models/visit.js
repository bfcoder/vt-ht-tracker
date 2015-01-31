VtTracker.Visit = DS.Model.extend({
  // Associations
  sister: DS.belongsTo('sister'),

  // Attributes
  month: DS.attr('string'),
  status: DS.attr('string'),
  notes: DS.attr('string'),

  // Properties
  monthFormatted: function() {
    var month = this.get('month');
    if (Ember.isEmpty(month)){
      return "LOADING...";
    } else {
      return moment(month).format("MMMM YYYY");
    }
  }.property('month')
});
