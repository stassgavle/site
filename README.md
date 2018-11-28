# stassgavle.se

Commercial Website for company Stass (LJB Konfektion AB).

## Getting Started

Project uses Gulp to build and serve content from source files in /src.

These instructions will get you a copy of the project up and running on your local machine for development. See deployment for notes on how to deploy the project on Github Pages.

### Prerequisites

* [node](https://nodejs.org/)
* [gulp-cli](https://www.npmjs.com/package/gulp-cli)


### Install

```npm install```


### Gulp main tasks

* ```gulp watch```
Builds and Serves content at localhost:3000. Watches for changes in /src

* ```gulp build```
Builds and packages to /dist for deployment


## Deployment

Website is currently deployed to Github Pages from gh-pages branch – through a worktree in the /dist folder.

To deploy:

1. ```git clone``` (get the files)
2. navigate to project root
3. ```git worktree add dist gh-pages``` (set up git worktree, and gh-pages upstream)
4. (make changes to src, commit to master, etc.)
5. ```gulp build``` (build and package for production)
6. navigate to ```/dist``` (make sure the branch changes to gh-pages when in /dist)
7. git add, commit and push to ```gh-pages``` branch:
    7.```git add .```, ```git commit```, ```git push origin gh-pages```


### Useful commands

* When commiting for production at gh-pages branch – in the commit message, it is preferred to reference the master commit (hash) from which the build is produced from, e.g.:
```
// put master's commit hash in variable $commithash
set commithash (git log '--format=format:%H' master -1)

// check the hash is correct
echo $commithash

// commit with hash in the message
git commit -m "Build output as of $commithash"
```

* Handling git worktree:
    * ```git worktree list``` see present worktrees
    * ```git worktree prune``` remove local worktrees
    * ```git worktree add -b new_branch_name dist``` set up worktree with new branch into dist-folder

## Built With
* [Gulp](https://gulpjs.com/) - Build system
* [SCSS](https://sass-lang.com/) - CSS preprocessor
* [PostCSS](https://postcss.org/) - CSS postprocessor
    * (with various plugins)

# Authors

Designed and built by [Robin Andersson](http://robinandersson.se/ "robinandersson.se").
