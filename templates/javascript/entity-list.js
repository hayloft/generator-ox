'use strict';

/**
 * @ngdoc function
 * @name <%= scriptAppName %>.controller:<%= classedName %>Ctrl
 * @description
 * # <%= classedName %>Ctrl
 * Controller of the <%= scriptAppName %>
 */
angular.module('<%= scriptAppName %>')
    .controller('<%= classedName %>Ctrl', function($scope, $state, <%= entityName %>Repository, editHelper) {
        $scope.repository = <%= entityName %>Repository;

        $scope.add = function($event) {
            var config = {
                controller: '<%= lName %>AddCtrl',
                title: '<%= i18nAppName %>.Form.<%= lName %>.Add'
            };

            editHelper.edit(
                <%= entityName %>Repository,
                'modules/ox-<%= cleanAppName %>/src/views/forms/<%= entityName %>.html',
                $event,
                config
            ).then(function(<%= entityName %>) {
                $state.go('ox.<%= cleanAppName %>.<%= entityName %>.show', <%= entityName %>);
            });
        };
    });
