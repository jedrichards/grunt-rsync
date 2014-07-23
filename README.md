## grunt-rsync

A Grunt multitask for accessing the file copying and syncing capabilities of the rsync command line utility. Uses the [rsyncwrapper](https://github.com/jedrichards/rsyncwrapper) npm module for the core functionality.

### Release notes

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

For example, the following task config defines three targets. The `dist` target could be used to create a distribution of a website ready for deployment, excluding files related to Git and uncompiled SCSS. The `stage` and `prod` targets could be used to copy the distribution to the relevant remote hosts over ssh.

(Note: `grunt-rsync` now uses the normalised target/task-level options as described in [here](http://gruntjs.com/configuring-tasks#options).)

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
            syncDestIgnoreExcl: true
        }
    },
    prod: {
        options: {
            src: "../dist/",
            dest: "/var/www/site",
            host: "user@live-host",
            syncDestIgnoreExcl: true
        }
    }
}
```

### Options

##### `src [String|Array<String>] *required`

Path to src. Can be a single filename, or an array of filenames. Shell wildcard expansion is supported. Examples:

```
src: "./dist/"
src: ["./dir-a/file1","./dir-b/file2"]
src: "./*.foo"
src: "foo{1,2,3}.txt"
etc.
```

##### `dest [String] *required`

Path to destination. Example, `"/var/www/mysite.tld"`.

##### `ssh [Bool] default: false`

Run rsync over ssh.  This is `false` by default.  To use this you need to have public/private key passwordless ssh access setup and working between your workstation and your host.  If set to `true`, you should specify ssh host data as part of your `src` or `dest` values, e.g. `user@1.2.3.4:/var/www/site`.

Another good approach is to define a host alias in your ssh config and just reference that alias in your rsync options.

##### `port [String]`

If your ssh host uses a non standard SSH port then set it here. Example, `"1234"`.

##### `privateKey [String]`

To specify an SSH private key other than the default for this host. Example, `"~/.ssh/aws.pem"`

##### `recursive [Boolean] default: false`

Recurse into directories. This is `false` by default which means only files in the `src` root are copied. Equivalent to the `--recursive` rsync command line flag.

##### `syncDest [Boolean] default: false`

Delete objects in `dest` that aren't present in `src`. Also deletes files that have been specifically excluded from transfer in `dest`. Take care with this option, since misconfiguration could cause data loss. Equivalent to setting both the `--delete` and `--delete-excluded` rsync command line flags.

##### `syncDestIgnoreExcl [Boolean] default: false`

The same as `syncDest`, but without the `--delete-excluded` behaviour. One use case for using this option could be while syncing a Node app to a server: you want to exclude transferring the local `node_modules` folder while retaining the remote `node_modules` folder.

##### `compareMode [String] enum: "checksum"|"sizeOnly"`

By default files will be compared by modified date and file size. Set this value to `checksum` to compare by a 128bit checksum, or `sizeOnly` to compare only by file size.

##### `exclude [Array<String>]`

Optional array of rsync patterns to exclude from transfer.  Include patterns are defined before exclude patterns when building the rsync command.

##### `include [Array<String>]`

Optional array of rsync patterns to include in the transfer, if previously excluded. Include patterns are defined before exclude patterns when building the rsync command.

##### `dryRun [Boolean] default: false`

Buffer verbose information to stdout about the actions rsyncwrapper would take without modifying the filesystem. Equivalent to setting both the `--dry-run` and `--verbose` rsync command line flags.

#### `onStdout [Function]`

Optional callback function. Called every time rsync outputs to `stdout`. Use this to print rsync output as it happens, rather than all at the end. Example: `function (data) { console.log(data) }`.

#### `onStderr [Function]`

Optional callback function. Called every time rsync outputs to `stderr`. Use this to print rsync error output as it happens, rather than all at the end. Example: `function (data) { console.log(data) }`.

##### `args [Array<String>]`

Array of additional arbitrary rsync command line options and flags.

The above options are provided for convenience and are designed to cover the most common use cases for rsync, they don't necessarily map directly to single rsync arguments with the same names. If you'd like to handcraft your rsync command then just use the `src`, `dest` and `args` options.

For extra information and subtlety relating to rsync options please consult the [rsync manpages](http://linux.die.net/man/1/rsync).


### Wildcards, exclude patterns, globbing etc.

Any wildcards expansions and/or exclude patterns and globbing of paths are handled either by the shell or rsync itself. So importantly this task does **not** use Grunt's in-built path expanding and globbing.

For more information on rsync's syntax check the [rsync manpages](http://linux.die.net/man/1/rsync).

For information about how this task's options relate to rsync's functionality check [rsyncwrapper](https://github.com/jedrichards/rsyncwrapper).

### Testing

Basic tests are run on [Vows Async BDD](http://vowsjs.org/) via this package's Gruntfile. To test `grunt-rsync` clone the repo and install the devDependancies:

    $ npm install --dev
    $ npm test
