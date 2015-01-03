'use strict';
var path = require('path');
var chalk = require('chalk');
var util = require('util');
var ScriptBase = require('../script-base.js');
var angularUtils = require('../util.js');


var Generator = module.exports = function Generator() {
  ScriptBase.apply(this, arguments);

  this.option('uri', {
    desc: 'Allow a custom uri for routing',
    name: 'uri',
    type: String,
    required: false
  });

  var bower = require(path.join(process.cwd(), 'bower.json'));
  var match = require('fs').readFileSync(path.join(
    this.env.options.appPath,
    'scripts/app.' + (this.env.options.coffee ? 'coffee' : 'js')
  ), 'utf-8').match(/\.when/);

  //this.hookFor('ox:controller');
  this.hookFor('ox:repository');
};

util.inherits(Generator, ScriptBase);

Generator.prototype.rewriteAppJs = function () {
  var coffee = this.env.options.coffee;

  this.uri = this.name;
  if (this.options.uri) {
    this.uri = this.options.uri;
  }

  this.lName = this.name.charAt(0).toUpperCase() + this.name.substring(1);

  var config = {
    file: path.join(
      this.env.options.appPath,
      'scripts/configs/states.' + (coffee ? 'coffee' : 'js')
    ),
    needle: '});',
    splicable: [
      "    $stateProvider.state('ox." + this.cleanAppName + "." + this.name + "', {",
      "        url: '/" + this.name + "',",
      "        data: {",
      "            redirectTo: 'ox." + this.cleanAppName + "." + this.name + ".list',",
      "            title: '" + this.i18nAppName + "." + this.lName + ".Title',",
      "            icon: ''",
      "        },",
      "        templateUrl: 'modules/ox-" + this.cleanAppName + "/src/views/partials/" + this.name + "/main.html',",
      "        abstract: true",
      "    });",
      "    $stateProvider.state('ox." + this.cleanAppName + "." + this.name + ".list', {",
      "        url: '/list?query&filter&page',",
      "        views: {",
      "            actions: {",
      "                templateUrl: 'modules/ox-" + this.cleanAppName + "/src/views/partials/" + this.name + "/list/actions.html'",
      "            },",
      "            content: {",
      "                controller: function($scope, " + this.name + "Repository) {",
      "                     $scope.repository = " + this.name + "Repository;",
      "                     $scope.template   = 'modules/ox-" + this.cleanAppName + "/src/views/partials/" + this.name + "/list/" + this.name + ".html';",
      "                },",
      "                template: '<collection repository=\"repository\" template=\"template\"></collection>'",
      "            }",
      "        }",
      "    });",
      "    $stateProvider.state('ox." + this.cleanAppName + "." + this.name + ".show', {",
      "        url: '/{id:[0-9]{1,9}}',",
      "        data: {",
      "            redirectTo: null,",
      "            title: function(" + this.name + ") {",
      "                return " + this.name + ".id;",
      "            },",
      "            icon: null",
      "        },",
      "        resolve: {",
      "            " + this.name + ": function(" + this.name + "Repository, $stateParams) {",
      "                return " + this.name + "Repository.find($stateParams.id);",
      "            }",
      "        },",
      "        views: {",
      "            actions: {",
      "                controller: '" + this.lName + "ActionsCtrl',",
      "                templateUrl: 'modules/ox-" + this.cleanAppName + "/src/views/partials/" + this.name + "/show/actions.html'",
      "            },",
      "            content: {",
      "                controller: '" + this.lName + "ShowCtrl',",
      "                templateUrl: 'modules/ox-" + this.cleanAppName + "/src/views/partials/" + this.name + "/show/content.html'",
      "            }",
      "        }",
      "    });",
      "    $stateProvider.state('ox." + this.cleanAppName + "." + this.name + ".create', {",
      "        url: '/create',",
      "        data: {",
      "            redirectTo: null,",
      "            title: '" + this.i18nAppName + "." + this.lName + ".Create.Title',",
      "            icon: 'plus'",
      "        },",
      "        views: {",
      "            content: {",
      "                controller: '" + this.lName + "CreateCtrl',",
      "                templateUrl: 'modules/ox-" + this.cleanAppName + "/src/views/partials/" + this.name + "/create.html'",
      "            }",
      "        }",
      "    });"
    ]
  };

  angularUtils.rewriteFile(config);
};

Generator.prototype.createViews = function createViews() {
  // show route
  this.template('../common/entity/show/actions.html', this.env.options.appPath + '/views/partials/' + this.name + '/show/actions.html');
  this.template('../common/entity/show/content.html', this.env.options.appPath + '/views/partials/' + this.name + '/show/content.html');

  // main route
  this.template('../common/entity/main.html', this.env.options.appPath + '/views/partials/' + this.name + '/main.html');

  // create route
  this.template('../common/entity/create.html', this.env.options.appPath + '/views/partials/' + this.name + '/create.html');

  // list route
  this.template('../common/entity/list/actions.html', this.env.options.appPath + '/views/partials/' + this.name + '/list/actions.html');
  this.template('../common/entity/list/item.html', this.env.options.appPath + '/views/partials/' + this.name + '/list/' + this.name + '.html');

  var beforeName = this.name;
  this.entityName = beforeName;

  this.name = beforeName + '-actions';
  this.classedName = beforeName.charAt(0).toUpperCase() + beforeName.substring(1) + 'Actions';
  this.generateSourceAndTest(
    'entity-actions',
    'spec/entity-actions',
    'controllers',
    this.options['skip-add'] || false
  );

  this.name = beforeName + '-show';
  this.classedName = beforeName.charAt(0).toUpperCase() + beforeName.substring(1) + 'Show';
  this.generateSourceAndTest(
    'entity-show',
    'spec/entity-show',
    'controllers',
    this.options['skip-add'] || false
  );

  this.name = beforeName + '-create';
  this.classedName = beforeName.charAt(0).toUpperCase() + beforeName.substring(1) + 'Create';
  this.generateSourceAndTest(
    'entity-create',
    'spec/entity-create',
    'controllers',
    this.options['skip-add'] || false
  );

  this.name = beforeName;
};
