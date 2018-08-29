'use strict';

angular.module('techApp.services', []).factory('Technician', function($resource) {
  return $resource('https://agile-peak-59834.herokuapp.com/api/technicians/:id', {
    id: '@_id'
  }, {
    update: {
      method: 'PUT'
    }
  });
}).service('popupService', function($window) {
  this.showPopup = function(message) {
    return $window.confirm(message);
  }
});
