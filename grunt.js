"use strict";

module.exports = function(grunt) {

    grunt.initConfig({
        lint: {
            all: [
                "grunt.js",
                "tests/*.js",
                "tasks/*.js"
            ]
        },
        jshint: {
            options: {
                "node": true,
                "es5": true,
                "globalstrict": true
            }
        },
        shell: {
            tmpdir : {
                command: "mkdir tmp"
            }
        },
        clean: {
            tmp: ["tmp"]
        },
        rsync: {
            single: {
                src: "./tests/fixtures/test.txt",
                dest: "./tmp/test.txt"
            },
            multiple: {
                src: "./tests/fixtures/multiple/",
                dest: "./tmp/multiple",
                recursive: true
            }
        },
        vows: {
            all: {
                files: ["tests/basic.js"],
                reporter: "spec",
                verbose: false,
                silent: false,
                colors: true
            }
        }
    });

    grunt.loadNpmTasks("grunt-shell");
    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-vows");

    grunt.loadTasks("tasks");

    grunt.registerTask("test","lint clean:tmp shell:tmpdir rsync vows clean:tmp");
};