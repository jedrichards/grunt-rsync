"use strict";

var rsync = require("rsyncwrapper").rsync;

module.exports = function (grunt) {

    grunt.registerMultiTask("rsync","Performs rsync tasks.",function () {

        var done = this.async();

        var options = this.data;

        options.src = this.file.src;
        options.dest = this.file.dest;

        var host = typeof options.host === "undefined" ? "" : options.host+":";

        // fix dest error when run with grunt watch
        options.dest = options.dest.replace(host, "");

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