## grunt-rsync

A Grunt multitask for accessing the file copying and syncing capabilities of the rsync command line utility. Uses the [rsyncwrapper](https://github.com/jedrichards/rsyncwrapper) npm module for the core functionality.

### Release notes

- `0.6.2` Updated to `rsyncwrapper 0.4.1`.
- `0.6.0` Updated to `rsyncwrapper 0.4.0`.
- `0.5.0` Updated to `rsyncwrapper 0.3.0`.
- `0.4.0` Updated to `rsyncwrapper 0.2.0`.
- `0.3.0` Updated to `rsyncwrapper 0.1.0`. Some changes under the hood there, so a minor version bump seems appropriate. `src` values that include wildcards should now be properly expanded by the shell.
- `0.2.0` Updated task to properly use the config [options](http://gruntjs.com/configuring-tasks#options) object
- `0.1.0` Grunt `0.4` compatibility
- `0.0.5` Initial releases, Grunt `0.3` compatible

If you're upgrading to Grunt `v0.4` you shouldn't need to make any changes to your existing `grunt-rsync` task config, just be sure to `npm install` the latest version. But be sure to place an issue if you have any problems.

### Prerequisites

A reasonably modern version of rsync (>=`v2.6.9`) in your `PATH`.

### Installation

    $ npm install grunt-rsync

### Usage

Add a `rsync` object to your Grunt config and `grunt.loadNpmTasks("grunt-rsync")`.

> Note: `grunt-rsync` uses the normalised target/task-level options for multitasks as described [here](http://gruntjs.com/configuring-tasks#options).)

### Options

This task uses [rsyncwrapper](https://github.com/jedrichards/rsyncwrapper) under the hood.

All options are passed verbatim to rsyncwrapper and are documented in that project's README [here](https://github.com/jedrichards/rsyncwrapper#options).

### Example

The following task config defines three targets.

The `dist` target could be used to create a distribution of a website ready for deployment, excluding files related to Git and uncompiled SCSS.

The `stage` and `prod` targets could be used to copy the distribution to the relevant remote hosts over ssh.

```javascript
rsync: {
    options: {
        args: ["--verbose"],
        exclude: [".git*","*.scss","node_modules"],
        recursive: true
    },
    dist: {
        options: {
            src: "./",
            dest: "../dist"
        }
    },
    stage: {
        options: {
            src: "../dist/",
            dest: "/var/www/site",
            host: "user@staging-host",
            delete: true // Careful this option could cause data loss, read the docs!
        }
    },
    prod: {
        options: {
            src: "../dist/",
            dest: "/var/www/site",
            host: "user@live-host",
            delete: true // Careful this option could cause data loss, read the docs!
        }
    }
}
```

### Wildcards, exclude patterns, globbing etc.

Any wildcards expansions and/or exclude patterns and globbing of paths are handled either by the shell or rsync itself. So importantly this task does **not** use Grunt's in-built path expanding and globbing.

For more information on rsync's syntax check the [rsync manpages](http://linux.die.net/man/1/rsync).

For information about how this task's options relate to rsync's functionality check [rsyncwrapper](https://github.com/jedrichards/rsyncwrapper).

### Testing

Basic tests are run on [Vows Async BDD](http://vowsjs.org/) via this package's Gruntfile. To test `grunt-rsync` clone the repo and install the devDependancies:

    $ npm install --dev
    $ npm test
