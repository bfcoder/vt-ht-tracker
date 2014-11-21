
//= require handlebars
//= require ember
//= require ember-data
//= require_self
//= require ./vt_tracker

// for more details see: http://emberjs.com/guides/application/
VtTracker = Ember.Application.create({
  //Enable logging by uncommenting:
  LOG_STACKTRACE_ON_DEPRECATION : true,
  LOG_BINDINGS                  : true,
  LOG_TRANSITIONS               : true,
  LOG_TRANSITIONS_INTERNAL      : true,
  LOG_VIEW_LOOKUPS              : true,
  LOG_ACTIVE_GENERATION         : true,

  rootElement: "#EmberStart"
});
