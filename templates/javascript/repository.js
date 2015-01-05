'use strict';

/**
 * @ngdoc service
 * @name <%= scriptAppName %>.<%= repositoryName %>Repository
 * @description
 * # <%= repositoryName %>Repository
 * Repository in <%= scriptAppName %>.
 */
angular.module('<%= scriptAppName %>')
    .factory('<%= repositoryName %>Repository', function (Repository) {
        return new Repository('/<%= cleanAppName %>/<%= repositoryName %>/:id');
    });
