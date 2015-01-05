'use strict';

/**
 * @ngdoc function
 * @name <%= scriptAppName %>.controller:<%= classedName %>Ctrl
 * @description
 * # <%= classedName %>Ctrl
 * Controller of the <%= scriptAppName %>
 */
angular.module('<%= scriptAppName %>')
    .controller('<%= classedName %>Ctrl', function($scope<% if (edit) { %>, <%= object %><% } %>) {
        <% if (edit) { %>$scope.<%= object %> = <%= object %>;<% } %>
    });
