var gulp = require('gulp'),
    sass = require('gulp-sass'),
    livereload = require('gulp-livereload'),
    // express = require('express'),
    watch = require('gulp-watch');
    app = require('./hello');

gulp.task('default', function () {
  var server = livereload(); // Create tiny livereload server

  app.listen(3000);

  gulp.watch('*.scss').on('change', function (file) {
    gulp.src('main.scss')
      .pipe(sass({errLogToConsole: true}))
      .pipe(gulp.dest('./public/css'))
      .pipe(livereload());
  })

  gulp.src('template/*.jade')
    .pipe(watch())
    .pipe(livereload());
  // gulp.watch('*.jade').on('change', function(file) {
  //   server.changed(file.path);
  // });
});
