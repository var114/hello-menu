var gulp = require('gulp'),
    sass = require('gulp-sass'),
    livereload = require('gulp-livereload'),
    // express = require('express'),
    watch = require('gulp-watch');


gulp.task('default', function () {
  var server = livereload(); // Create tiny livereload server

  gulp.src('*.scss')
    .pipe(watch())
    .pipe(sass({errLogToConsole: true}))
    .pipe(gulp.dest('./public/css'))
    .pipe(livereload());

  gulp.src('template/*.jade')
    .pipe(watch())
    .pipe(livereload());
  // gulp.watch('*.jade').on('change', function(file) {
  //   server.changed(file.path);
  // });
});
