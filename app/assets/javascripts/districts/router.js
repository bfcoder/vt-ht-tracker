// For more information see: http://emberjs.com/guides/routing/

VtTracker.Router.map(function() {
  this.resource('district', { path: ':district_id' }, function() {
    this.route('report');
  });
});
