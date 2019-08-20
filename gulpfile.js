var gulp = require('gulp');

var inject = require('gulp-inject');

var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');
var sourcemaps = require('gulp-sourcemaps');

var webserver = require('gulp-webserver');

var htmlclean = require('gulp-htmlclean');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify-es').default;

var del = require('del');

var paths = {
  src: 'src/**/*',
  srcHTML: 'src/**/*.html',
  srcSCSS: 'src/styles/**/*.scss',
  srcJS: 'src/scripts/**/*.js',
  srcImages: 'src/images/**/*',
  // use generic 'misc' (instead of specific CNAME) if more files needs copying in the future
  srcCNAME: 'src/CNAME',
  tmp: 'tmp',
  tmpIndex: 'tmp/index.html',
  tmpCSS: 'tmp/**/*.css',
  tmpJS: 'tmp/**/*.js',
  tmpImages: 'tmp/images',
  dist: 'dist',
  distIndex: 'dist/index.html',
  distCSS: 'dist/**/*.css',
  distJS: 'dist/**/*.js',
  distImages: 'dist/images',
};

/* build and serve for development */

// remove earlier tmp builds
gulp.task('delete:tmp', function() {
  return del([paths.tmp]);
});

// copy src -html, -js, and -images to tmp
gulp.task('html', function() {
  return gulp.src(paths.srcHTML).pipe(gulp.dest(paths.tmp));
});
gulp.task('js', function() {
  return gulp
    .src(paths.srcJS)
    .pipe(sourcemaps.init())
    .pipe(concat('scripts.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.tmp));
});
gulp.task('images', function() {
  return gulp.src(paths.srcImages).pipe(gulp.dest(paths.tmpImages));
});

// process scss and copy css to tmp
gulp.task('scss', function() {
  var processors = [autoprefixer];
  return gulp
    .src(paths.srcSCSS)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss(processors))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.tmp));
});
gulp.task('deliver', gulp.series('delete:tmp', 'html', 'js', 'images', 'scss'));

// inject css and js into html
gulp.task(
  'inject',
  gulp.series('deliver', function() {
    var css = gulp.src(paths.tmpCSS);
    var js = gulp.src(paths.tmpJS);
    return gulp
      .src(paths.tmpIndex)
      .pipe(inject(css, { relative: true }))
      .pipe(inject(js, { relative: true }))
      .pipe(gulp.dest(paths.tmp));
  })
);

// start local server and watch for changes
gulp.task(
  'serve',
  gulp.series('inject', function() {
    return gulp.src(paths.tmp).pipe(
      webserver({
        port: 3000,
        livereload: true,
      })
    );
  })
);
gulp.task(
  'watch',
  gulp.series('serve', function() {
    gulp.watch(paths.src, gulp.series('inject'));
  })
);
gulp.task('default', gulp.series('watch'));

/* build and package for deployment */

// remove earlier dist builds
// – only delete content (keep directory) as to not confuse
// git (when pushing worktree to gh-pages branch)
gulp.task('delete:dist', function() {
  return del([`${paths.dist}/**`, `!${paths.dist}`]);
});

// clean, minify, etc. css/html/js etc. and copy src to dist
gulp.task('html:dist', function() {
  return gulp
    .src(paths.srcHTML)
    .pipe(htmlclean())
    .pipe(gulp.dest(paths.dist));
});
gulp.task('js:dist', function() {
  return gulp
    .src(paths.srcJS)
    .pipe(sourcemaps.init())
    .pipe(concat('scripts.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.dist));
});
gulp.task('images:dist', function() {
  return gulp.src(paths.srcImages).pipe(gulp.dest(paths.distImages));
});
gulp.task('cname:dist', function() {
  return gulp.src(paths.srcCNAME).pipe(gulp.dest(paths.dist));
});
gulp.task('scss:dist', function() {
  var processors = [autoprefixer, cssnano];
  return gulp
    .src(paths.srcSCSS)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss(processors))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.dist));
});
gulp.task(
  'deliver:dist',
  gulp.series(
    'delete:dist',
    'html:dist',
    'js:dist',
    'images:dist',
    'cname:dist',
    'scss:dist'
  )
);

// inject css and js into html
gulp.task(
  'inject:dist',
  gulp.series('deliver:dist', function() {
    var css = gulp.src(paths.distCSS);
    var js = gulp.src(paths.distJS);
    return gulp
      .src(paths.distIndex)
      .pipe(inject(css, { relative: true }))
      .pipe(inject(js, { relative: true }))
      .pipe(gulp.dest(paths.dist));
  })
);
gulp.task('build', gulp.series('inject:dist'));
