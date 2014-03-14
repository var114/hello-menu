var gulp = require('gulp'),
    sass = require('gulp-sass'),
    livereload = require('gulp-livereload'),
    express = require('express'),
    watch = require('gulp-watch'),
    nodemon = require('gulp-nodemon');

gulp.task('default', function () {
  var server = livereload(); // Create tiny livereload server

  nodemon({
    script: 'hello.js', 
    ext: 'js',
    ignore: ["public/", "template/", "Gulpfile.js"]
  })
      .on('restart', function () {
        console.log('Restarted Server!');
      })

  gulp.watch('sass/*.scss').on('change', function (file) {
    gulp.src('sass/main.scss')
      .pipe(sass({errLogToConsole: true}))
      .pipe(gulp.dest('./public/css'))
      .pipe(livereload());
  })

  gulp.src(['template/**/*.jade', 'public/js/*.js'])
    .pipe(watch())
    .pipe(livereload());
});
