import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.resource('home', { path: 'home' }, function() {
    this.resource('home.sisters', { path: '/sisters' }, function() {});
    this.resource('home.households', { path: '/households' }, function() {});
    this.route('report');
  });
  this.resource('district', { path: 'districts/:district_id' }, function() {
    this.resource('district.visits', { path: '/visits' }, function() {
      this.route('histories', { path: ':person_id/histories' });
    });
    this.resource('district.sisters', { path: '/sisters' }, function() {});
    this.resource('district.households', { path: '/households' }, function() {});
    this.route('report');
  });
});

export default Router;
