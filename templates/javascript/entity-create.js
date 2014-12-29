'use strict';

/**
 * @ngdoc function
 * @name <%= scriptAppName %>.controller:<%= classedName %>Ctrl
 * @description
 * # <%= classedName %>Ctrl
 * Controller of the <%= scriptAppName %>
 */
angular.module('<%= scriptAppName %>')
    .controller('<%= classedName %>Ctrl', function($scope, $state, <%= entityName %>Repository) {
        $scope.repository = <%= entityName %>Repository;

        $scope.finish = function(object) {
            $state.go('ox.<%= cleanAppName %>.<%= entityName %>.show', object);
        };
    });
