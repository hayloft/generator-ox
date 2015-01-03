'use strict';

angular.module('<%= scriptAppName %>')
    .config(function($stateProvider) {
        $stateProvider.state('ox.<%= cleanAppName %>', {
            url: '/<%= cleanAppName %>',
            template: '<ui-view></ui-view>',
            abstract: true
        });
    });
