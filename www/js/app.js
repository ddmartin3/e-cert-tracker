'use strict';

angular.module(
  'techApp',
  [
    'ui.router',
    'ngResource',
    'techApp.controllers',
    'techApp.services'
  ]
);

angular.module('techApp').config(function($stateProvider, $httpProvider) {
  $stateProvider.state('technicians', {
    url: '/technicians',
    templateUrl: 'templates/technicians.html',
    controller: 'TechnicianListController'
  }).state('viewTechnician', {
    url: '/technicians/:id/view',
    templateUrl: 'templates/technician-view.html',
    controller: 'TechnicianViewController'
  }).state('newTechnician', {
    url: '/technicians/new',
    templateUrl: 'templates/technician-add.html',
    controller: 'TechnicianCreateController'
  }).state('editTechnician', {
    url: '/technicians/:id/edit',
    templateUrl: 'templates/technician-edit.html',
    controller: 'TechnicianEditController'
  });
}).run(function($state) {
  $state.go('technicians');
});
