var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var autoprefixer = require('autoprefixer');

/**
 * clean file
 * gulp-clean
 **/
gulp.task('clean', function () {
  return gulp.src(['./dist'], {read: false})
      .pipe($.clean());
});


/**
 * jade task
 * gulp-jade, gulp-plumber, brower-sync
 **/
gulp.task('jade', function() {
  // var YOUR_LOCALS = {};
  return gulp.src('./source/**/*.jade')
  .pipe($.plumber())
  .pipe($.jade({
    pretty: true,
    // locals: YOUR_LOCALS
  }))
  .pipe(gulp.dest('./dist/'));
});
 
/**
 * sass task
 * gulp-sass, gulp-plumber, gulp-postcss, autoprefixer, gulp-soucemaps, brower-sync
 **/
gulp.task('sass', function () {
  var plugins = [
    autoprefixer({browsers: ['last 3 versions']}),
  ];
  return gulp.src('./source/sass/**/*.scss')
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe($.sass().on('error', $.sass.logError))
    .pipe($.postcss(plugins))
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest('./dist/css'));
});

/**
 * watch task
 **/
gulp.task('watch', function () {
  gulp.watch('./source/sass/**/*.scss', gulp.series('sass'));
  gulp.watch('./source/**/*.jade', gulp.series('jade'));
});

/**
 * develop (default) task
 **/
gulp.task('default', gulp.series('clean', gulp.parallel('jade', 'sass','watch')))

