'use strict';

/**
 * @ngdoc service
 * @name <%= scriptAppName %>.<%= name %>Repository
 * @description
 * # <%= name %>Repository
 * Repository in <%= scriptAppName %>.
 */
angular.module('<%= scriptAppName %>')
    .factory('<%= name %>Repository', function (Repository) {
        return new Repository('/<%= cleanAppName %>/<%= name %>/:id');
    });
