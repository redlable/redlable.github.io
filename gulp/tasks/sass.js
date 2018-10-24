module.exports = function() {
  $.gulp.task('sass', function () {
    return $.gulp.src('app/assets/scss/screen.scss')
      .pipe($.plugins.sourcemaps.init())
      .pipe($.plugins.sass().on('error', $.plugins.notify.onError(function(err) {
        return {
          title: 'Styles',
          message: err.message
        };
      })))
      .pipe($.plugins.autoprefixer({
        browsers: ['last 2 versions']
      }))
      .pipe($.plugins.csso())
      .pipe($.plugins.sourcemaps.write())
      .pipe($.gulp.dest('css/'))
      .pipe($.browserSync.reload({
        stream: true
      }));
  });
};
