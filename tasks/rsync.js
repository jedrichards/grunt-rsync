"use strict";

var rsync = require("rsyncwrapper");

var escapeSpaces = function(path) {
    if (typeof path === "string") {
        return path.replace(/\b\s/g, "\\ ");
    } else {
        return path;
    }
};

var escapeSpacesInSrcAndDestPaths = function(options) {
    // Escape paths in the src, dest, include, exclude, and excludeFirst arguments
    ["src", "dest", "include", "exclude", "excludeFirst"].forEach(function(optionKey) {
        var option = options[optionKey];
        if (typeof option === "string") {
            options[optionKey] = escapeSpaces(option);
        } else if (Array.isArray(option) === true) {
            options[optionKey] = option.map(escapeSpaces);
        }
    });

    return options;
};

module.exports = function (grunt) {

    grunt.task.registerMultiTask("rsync","Performs rsync tasks.",function () {

        var done = this.async();

        var options = escapeSpacesInSrcAndDestPaths( this.options() );

        grunt.log.writelns("rsyncing "+options.src+" >>> "+options.dest);

        if ( !options.onStdout ) {
            options.onStdout = function (data) {
                grunt.log.write(data.toString("utf8"));
            };
        }

        try {
            rsync(options,function (error,stdout,stderr,cmd) {
                grunt.log.writeln("Shell command was: "+cmd);
                if ( error ) {
                    grunt.log.error();
                    grunt.log.writeln(error.toString().red);
                    done(false);
                } else {
                    grunt.log.ok();
                    done(true);
                }
            });
        } catch (error) {
            grunt.log.writeln("\n"+error.toString().red);
            done(false);
        }
    });
};
