'use strict';

const gulp = require('gulp'),
  sourcemaps = require('gulp-sourcemaps'),
  concat = require('gulp-concat'),
  clean = require('gulp-clean'),
  file = require('gulp-file'),
  buble = require('gulp-buble'),
  sass = require('dart-sass'),
  fs = require('fs'),
  through = require('through2'),
  server = require('electron-connect').server;

const input = {
  jsx: 'src/jsx/**/*.jsx',
  sass: 'src/style/*.scss',
  index: 'src/index.html'
};
const output = {
  dir: 'app',
  css: 'ui/cyril.css',
  js: 'ui/cyril.js',
  path: function(which) {
    return [this.dir, this[which]].join('/');
  }
};

function sassify() {
  return through.obj(function(file, enc, cb) {
    sass.render({file: file.path}, function(err, result) {
      if (result && result.buffer.length) {
        fs.appendFile(output.path('css'), result.buffer);
      }
      cb();
    });
  });
}

gulp.task('clean', function() {
  gulp.src(['app/ui/*'], {read: false})
    .pipe(clean());
});

gulp.task('build:index', function() {
  gulp.src(input.index)
    .pipe(gulp.dest(output.dir));
});
gulp.task('build:js', function() {
  fs.writeFileSync(output.path('js'), '');
  gulp.src(input.jsx)
    .pipe(buble())
    .pipe(concat(output.js))
    .pipe(gulp.dest(output.dir));
});
gulp.task('build:css', function() {
  fs.writeFileSync(output.path('css'), '');
  gulp.src(input.sass)
    .pipe(sassify());
});
gulp.task('build', ['build:index', 'build:js', 'build:css']);

gulp.task('serve', function() {
  var electron = server.create();
  electron.start();
  gulp.watch(input.index, ['build:index', electron.restart]);
  gulp.watch(input.sass, ['build:css', electron.restart]);
  gulp.watch(input.jsx, ['build:js', electron.restart]);
});

gulp.task('default', ['clean', 'build', 'serve']);
