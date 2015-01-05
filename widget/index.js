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
    required: true
  });

  var bower = require(path.join(process.cwd(), 'bower.json'));
  var match = require('fs').readFileSync(path.join(
    this.env.options.appPath,
    'scripts/app.' + (this.env.options.coffee ? 'coffee' : 'js')
  ), 'utf-8').match(/\.when/);

  //this.hookFor('ox:controller');
  //this.hookFor('ox:repository');
};

util.inherits(Generator, ScriptBase);

Generator.prototype.askForEdit = function askForEdit() {
  var cb = this.async();

  this.prompt([{
    type: 'confirm',
    name: 'edit',
    message: 'Would you like to add editing for this widget?',
    default: false
  }], function (props) {
    this.edit = props.edit;

    cb();
  }.bind(this));
};

Generator.prototype.askForObject = function askForObject() {
  var cb = this.async();

  this.prompt([{
    type: 'text',
    name: 'object',
    message: 'If the widget requires an object, enter the objects name (' + (this.edit ? 'required' : 'NOT required') + '):'
  }], function (props) {
    this.object = props.object;

    cb();
  }.bind(this));
};

Generator.prototype.rewriteAppJs = function () {
  var coffee = this.env.options.coffee;

  this.uri = this.name;
  if (this.options.uri) {
    this.uri = this.options.uri;
  }

  this.lName = this.name.charAt(0).toUpperCase() + this.name.substring(1);

  var spliceable = [
    "    dashboardProvider.widget('ox." + this.cleanAppName + "." + this.name + "', {",
    "        title: '" + this.i18nAppName + ".Widget." + this.lName + ".Title',",
    "        description: '" + this.i18nAppName + ".Widget." + this.lName + ".Descr',",
    "        controller: '" + this.lName + "WidgetCtrl',"
  ];

  if (this.edit) {
    spliceable.push("        edit: {");
    spliceable.push("            object: '" + this.object + "',");
    spliceable.push("            title: '" + this.i18nAppName + ".Form." + this.lName + ".Edit',");
    spliceable.push("            controller: '" + this.lName + "EditCtrl',");
    spliceable.push("            templateUrl: 'modules/ox-" + this.cleanAppName + "/src/views/forms/" + this.name + ".html'");
    spliceable.push("        },");
  }

  if (this.object) {
    spliceable.push("        templateUrl: 'modules/ox-" + this.cleanAppName + "/src/views/widgets/" + this.name + ".html',");
    spliceable.push("        require: ['" + this.object + "']");
  } else {
    spliceable.push("        templateUrl: 'modules/ox-" + this.cleanAppName + "/src/views/widgets/" + this.name + ".html'");
  }
  spliceable.push("    });");

  var config = {
    file: path.join(
      this.env.options.appPath,
      'scripts/configs/widgets.' + (coffee ? 'coffee' : 'js')
    ),
    needle: '});',

    splicable: spliceable
  };

  angularUtils.rewriteFile(config);
};


Generator.prototype.createViews = function createViews() {
  this.template('../common/widget/content.html', this.env.options.appPath + '/views/widgets/' + this.name + '.html');

  if (this.edit) {
    this.template('../common/widget/form.html', this.env.options.appPath + '/views/forms/' + this.name + '.html');
  }

  var beforeName = this.name;
  this.entityName = beforeName;

  this.name = beforeName + '-widget';
  this.classedName = beforeName.charAt(0).toUpperCase() + beforeName.substring(1) + 'Widget';
  this.generateSourceAndTest(
    'widget',
    'spec/widget',
    'controllers',
    this.options['skip-add'] || false
  );

  if (this.edit) {
    this.name = beforeName + '-edit';
    this.classedName = beforeName.charAt(0).toUpperCase() + beforeName.substring(1) + 'Edit';
    this.generateSourceAndTest(
      'edit',
      'spec/widget',
      'controllers',
      this.options['skip-add'] || false
    );
  }

  this.name = beforeName;
};

