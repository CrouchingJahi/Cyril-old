const gulp = require('gulp'),
  // sourcemaps = require('gulp-sourcemaps'),
  // applySourceMap = require('vinyl-sourcemaps-apply'),
  clean = require('gulp-clean'),
  concat = require('gulp-concat'),
  sass = require('dart-sass'),
  through = require('through2'),
  electron = require('electron-connect').server.create();

const input = {
  jsx: 'app/ui/**/*.jsx',
  sass: 'app/style/*.scss',
  index: 'app/index.html'
};
const output = {
  dir: 'app',
  ui: 'ui',
  css: 'ui/cyril.css',
  cssmap: 'ui/cyril.css.map',
  path: function (which) {
    return [this.dir, this[which]].join('/');
  }
};

function sassify(options) {
  return through.obj(function (file, enc, cb) {
    options = options || {};
    options.file = file.path;
    // if (file.sourceMap) {
      // options.sourceMap = true;
      // options.outFile = output.path('css');
    // }
    sass.render(options, function (err, result) {
      if (err) {
        console.error("Sass Error: " + err.message);
      }
      else {
        file.contents = result.buffer;
        // if (file.sourceMap) {
          // applySourceMap(file, result.map);
        // }
      }
      cb(err, file);
    });
  });
}

gulp.task('clean', function () {
  gulp.src([output.path('css')], {read: false})
    .pipe(clean());
});

// dart-sass is young, and it does not yet support source maps.
// The functionality is here, though, for whenever it's added.
// https://github.com/sass/dart-sass/issues/2
gulp.task('build:css', function () {
  gulp.src(input.sass)
    // .pipe(sourcemaps.init())
    .pipe(sassify())
    // .pipe(sourcemaps.write(output.path('cssmap')))
    .pipe(concat(output.path('css')))
    .pipe(gulp.dest('.'));
});
gulp.task('build', ['build:css']);

gulp.task('watch:sass', function () {
  gulp.watch(input.sass, ['build:css']);
});
gulp.task('watch', ['watch:sass']);

gulp.task('serve', function () {
  electron.start();
});

gulp.task('dev', ['watch', 'serve'], function () {
  gulp.watch([input.jsx, input.sass], electron.reload);
});

gulp.task('default', ['clean', 'build', 'dev']);
