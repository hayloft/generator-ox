'use strict';

describe('Service: <%= name %>Repository', function() {

    // load the repository's module module
    beforeEach(module('<%= scriptAppName %>'));

    var <%= name %>Repository, Repository;

    // initialize the repository and a mock scope
    beforeEach(inject(function(_<%= name %>Repository_, _Repository_) {
        <%= name %>Repository = _<%= name %>Repository_;
        Repository = _Repository_;
    }));

    it('should be instance of repository', function() {
        expect(<%= name %>Repository).toEqual(jasmine.any(Repository));
    });
});
