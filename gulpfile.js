'use strict';

const gulp = require('gulp'),
  // sourcemaps = require('gulp-sourcemaps'),
  clean = require('gulp-clean'),
  runSequence = require('run-sequence'),
  sass = require('dart-sass'),
  fs = require('fs'),
  through = require('through2'),
  server = require('electron-connect').server;

const input = {
  app: 'app/ui/app.js',
  jsx: 'app/ui/**/*.jsx',
  sass: 'app/style/*.scss',
  index: 'app/index.html'
};
const output = {
  dir: 'app',
  ui: 'ui',
  css: 'ui/cyril.css',
  js: 'ui/cyril.js',
  path: function (which) {
    return [this.dir, this[which]].join('/');
  }
};

function sassify() {
  return through.obj(function (file, enc, cb) {
    sass.render({file: file.path}, function (err, result) {
      if (result && result.buffer.length) {
        fs.appendFile(output.path('css'), result.buffer);
      }
      cb();
    });
  });
}

gulp.task('clean', function () {
  gulp.src([output.path('css')], {read: false})
    .pipe(clean());
});

gulp.task('build:css', function () {
  fs.writeFileSync(output.path('css'), '');
  gulp.src(input.sass)
    .pipe(sassify());
});
gulp.task('build', function () {
  fs.stat(output.path('ui'), function (err, stats) {
    if (!stats) {
      fs.mkdirSync(output.path('ui'));
    }
    runSequence(['build:css']);
  });
});

gulp.task('serve', function () {
  var electron = server.create();
  electron.start();
  gulp.watch(input.index, ['build:index', electron.restart]);
  gulp.watch(input.sass, ['build:css', electron.restart]);
  gulp.watch(input.jsx, ['build:js', electron.restart]);
});

gulp.task('default', ['clean', 'build', 'serve']);
