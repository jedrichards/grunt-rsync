"use strict";

var rsync = require("rsyncwrapper").rsync;

module.exports = function (grunt) {

    grunt.registerMultiTask("rsync","Perform rsync tasks.",function () {

        var done = this.async();
        var options = this.data;
        var host = typeof options.host === "undefined" ? "" : options.host+":";

        grunt.log.write("rsyncing "+options.src+" > "+host+options.dest);

        try {
            rsync(options,function (error,stdout,stderr) {
                if ( error ) {
                    grunt.log.writeln(" error".red);
                    grunt.log.writeln(error.message.red);
                    done(false);
                } else {
                    grunt.log.writeln(" done".green);
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