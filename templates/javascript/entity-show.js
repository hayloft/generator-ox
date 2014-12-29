'use strict';

/**
 * @ngdoc function
 * @name <%= scriptAppName %>.controller:<%= classedName %>Ctrl
 * @description
 * # <%= classedName %>Ctrl
 * Controller of the <%= scriptAppName %>
 */
angular.module('<%= scriptAppName %>')
    .controller('<%= classedName %>Ctrl', function($scope, <%= entityName %>) {
        $scope.view = {
            tabs: [{
                title: 'Details',
                type: 'dashboard',
                view: {
                    dashboard: {
                        rows: [{
                            columns: [{
                                flex: {
                                    flex: 50,
                                    sm: 100
                                },
                                widgets: []
                            }]
                        }]
                    }
                }
            }],
            provide: {
                <%= entityName %>: <%= entityName %>
            }
        };
    });
