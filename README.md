## grunt-rsync

A Grunt multitask for accessing the file copying and syncing capabilities of the rsync command line utility. Uses the [rsyncwrapper](https://github.com/jedrichards/rsyncwrapper) npm module for the core functionality.

### Prerequisites

A reasonably modern version of rsync (>=2.6.9) in your PATH.

### Installation

    $ npm install grunt-rsync

### Usage

Add a `rsync` object to your Grunt config and `grunt.loadNpmTasks("grunt-rsync")`.

All options defined in the config are passed verbatim to [rsyncwrapper](https://github.com/jedrichards/rsyncwrapper), so check that project's readme for more details on the possible options.

For example, the following task config defines three targets. The `dist` target could be used to create a distribution of a website ready for deployment, excluding files related to Git and uncompiled SCSS. The `deploy-staging` and `deploy-live` targets could be used to copy the distribution to the relevant remote hosts over ssh.

```javascript
rsync: {
    dist: {
        src: "./",
        dest: "../dist",
        recursive: true,
        exclude: [".git*","*.scss"]
    },
    deploy-staging: {
        src: "../dist/",
        dest: "/var/www/site",
        host: "user@staging-host",
        recursive: true,
        syncDest: true
    },
    deploy-live: {
        src: "../dist/",
        dest: "/var/www/site",
        host: "user@live-host",
        recursive: true,
        syncDest: true
    }
}
```

### Wildcards, exclude patterns, globbing etc.

Any wildcards, exclude patterns and globbing of paths are handled by rsync itself. So importantly this task does **not** use Grunt's in-built path expanding and globbing at all. For more information on rsync's sytax check the [rsync manpages](http://linux.die.net/man/1/rsync). For information about how this task's options relate to rsync's functionality check [rsyncwrapper](https://github.com/jedrichards/rsyncwrapper).

### Testing

Basic tests are run on [Vows Async BDD](http://vowsjs.org/) via this package's Gruntfile. To test grunt-rsync clone the repo and ensure that the devDependancies are present. Additionally ensure that Grunt and Vows are installed globally, and then invoke:

    $ npm test