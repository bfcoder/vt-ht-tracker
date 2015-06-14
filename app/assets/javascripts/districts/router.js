// For more information see: http://emberjs.com/guides/routing/

VtTracker.Router.map(function() {
  this.route('report');
  this.resource('district', { path: ':district_id' }, function() {
    this.resource('district.sisters', { path: '/sisters' }, function() {});
    this.resource('district.households', { path: '/households' }, function() {});
    this.route('report');
  });
});
