"use strict";

var rsync = require("rsyncwrapper").rsync;

module.exports = function (grunt) {

    grunt.task.registerMultiTask("rsync","Performs rsync tasks.",function () {

        var done = this.async();

        var options = this.data;

        var host = typeof options.host === "undefined" ? "" : options.host+":";

        grunt.log.write(options.src+" > "+host+options.dest);

        try {
            rsync(options,function (error,stdout,stderr,cmd) {
                if ( error ) {
                    grunt.log.writeln(" error".red);
                    grunt.log.writeln(cmd.grey);
                    grunt.log.writeln(error.toString().red);
                    done(false);
                } else {
                    grunt.log.writeln(" done".green);
                    grunt.log.writeln(cmd.grey);
                    grunt.log.write(stdout);
                    done(true);
                }
            });
        } catch (error) {
            grunt.log.writeln("\n"+error.toString().red);
            done(false);
        }
    });
};