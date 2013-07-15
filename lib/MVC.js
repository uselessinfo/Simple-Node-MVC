var _ = require('lodash'),
    Emitter = require('events').EventEmitter,
    emitter = new Emitter(),
    fs = require('fs'),
    path = require('path'),
    Handlebars = require('Handlebars'),
    Component = require('./Component.js'),
    Controller = require('./Controller.js'),
    Action = require('./Action.js'),
    Router = require('./Router.js'),
    Model = require('./Model.js'),
    View = require('./View.js');

emitter.on('controllerLog', function (controllerName) {
//    console.log('Controller: ' + controllerName + ' loaded');
});

emitter.on('templateLog', function (message) {
//    console.log('Templates: ' + message);
});

/**
 * MVC is the collection of all necessary modules and utility methods
 * needed to create an MVC wrapper with dynamic routing and page rendering
 * around Express
 *
 * @class MVC
 * @returns {MVC}
 * @constructor
 * @extends Component
 */
function MVC() {
    if (!(this instanceof MVC)) {
        return new MVC();
    }
}

MVC.prototype = new Component();
MVC.prototype.constructor = MVC;

_.extend(MVC.prototype, {
    /** @lends MVC.prototype */
    Controller: Controller,
    Action: Action,
    Router: Router,
    Model: Model,
    View: View,
    loadControllers: function () {
        var self = this;

        fs.readdir('./' + this.config.controllerPath + '/', function (err, files) {
            _.each(files, function (fileName) {
                var controllerKey = fileName.replace('Controller.js','').toLowerCase();

                Router.prototype.controllers[controllerKey] = require('../' + self.config.controllerPath + '/' + fileName);

                emitter.emit('controllerLog', fileName);
            });
        });
    },
    loadTemplates: function (currentDirectory) {
        var self = this,
            templateRegex = new RegExp("\\" + this.config.templateExtension + "$");

        console.log('Loading templates from ' + path.join(this.config.templatePath, (currentDirectory || '')));

        fs.readdir(path.join(this.config.templatePath, (currentDirectory || '')), function (err, files) {
            emitter.emit('templateLog', 'Files in directory: ' + files);
            _.each(files, function (fileOrDirectoryName) {
                emitter.emit('templateLog', path.join(self.config.templatePath,fileOrDirectoryName));
                fs.stat(path.join(self.config.templatePath, (currentDirectory || ''), fileOrDirectoryName), function (err, stat){
                    if (stat && stat.isDirectory()) {
                        emitter.emit('templateLog', 'Loading templates from ' + path.join((currentDirectory || ''), fileOrDirectoryName));
                        self.loadTemplates(path.join((currentDirectory || ''), fileOrDirectoryName));
                    } else if (templateRegex.test(fileOrDirectoryName)) {
                        self.cacheTemplate((currentDirectory || ''), fileOrDirectoryName, templateRegex);
                    }
                });
            });
        });
    },
    cacheTemplate: function (currentDirectory, fileName, templateRegex) {
        var pathParts = currentDirectory.split(path.sep),
            currentTemplateCacheDirectory = Router.prototype.templateCache,
            self = this;

        _.each(pathParts, function(part) {
            if (!currentTemplateCacheDirectory[part]) {
                currentTemplateCacheDirectory[part] = {};
            }

            currentTemplateCacheDirectory = currentTemplateCacheDirectory[part];
        });

        emitter.emit('templateLog', 'ADDING TEMPLATE TO CACHE');
        emitter.emit('templateLog', 'KeyName: ' + fileName.replace(templateRegex, ''));
        fs.readFile(path.join(this.config.templatePath, currentDirectory, fileName), function (err, data) {
            currentTemplateCacheDirectory[fileName.replace(templateRegex, '')] = Handlebars.compile(data.toString());
            emitter.emit('templateLog', JSON.stringify(self.templateCache));
        });
    }
});

module.exports = MVC;