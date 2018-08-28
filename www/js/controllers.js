'use strict';

angular.module('techApp.controllers', [])
    .controller('TechnicianListController', function(
        $scope, $state, popupService, $window, Technician
    ) {
        $scope.technicians = Technician.query();

        $scope.deleteTechnician = function(technician) {
            if (popupService.showPopup('Really delete this?')) {
                technician.$delete(function() {
                    $window.location.href = '';
                });
            }
        }
    })
    .controller('TechnicianViewController', function(
        $scope, $stateParams, Technician
    ) {
        $scope.technician = Technician.get({
            id: $stateParams.id
        });
    })
    .controller('TechnicianCreateController', function(
        $scope, $state, $stateParams, Technician
    ) {
        $scope.technician = new Technician();

        $scope.addTechnician = function() {
            $scope.technician.$save(function() {
                $state.go('technicians');
            });
        }
    })
    .controller('TechnicianEditController', function(
        $scope, $state, $stateParams, Technician
    ) {
        $scope.updateTechnician = function() {
            $scope.technician.$update(function() {
                $state.go('technicians');
            });
        };

        $scope.loadTechnician = function() {
            $scope.technician = Technician.get({
                id: $stateParams.id
            });
        };

        $scope.loadTechnician();
    });
