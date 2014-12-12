'use strict';

/**
 * @ngdoc overview
 * @name <%= scriptAppName %>
 * @description
 * # <%= scriptAppName %>
 *
 * Main module of the application.
 */
angular.module('<%= scriptAppName %>', [<%= angularModules %>])
    .config(function($stateProvider) {
        $stateProvider.state('ox.<%= routeName %>', {
            url: '/<%= routeName %>',
            views: {
                '@ox': {
                    templateUrl: 'modules/ox-help/src/views/main.html',
                    controller: 'MainCtrl'
                }
            }
        });
    });
