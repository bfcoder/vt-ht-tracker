// For more information see: http://emberjs.com/guides/routing/

VtTracker.Router.map(function() {
  this.resource('district', { path: ':district_id' }, function() {
    this.resource('district.sisters', { path: '/sisters' }, function() {});
    this.route('report');
  });
});
