module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jsdoc : {
            dist : {
                src: ['lib/*.js', 'controllers/*.js', 'models/*.js', 'views/*.js'],
                options: {
                    destination: 'doc',
                    template: 'node_modules/grunt-jsdoc/node_modules/ink-docstrap/template'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-jsdoc');

};