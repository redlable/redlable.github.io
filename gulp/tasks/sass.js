module.exports = function() {
  $.gulp.task('sass', function () {
    return $.gulp.src('app/assets/scss/screen.scss')
      .pipe($.plugins.sourcemaps.init())
      .pipe($.plugins.sass().on('error', $.plugins.sass.logError))
      .pipe($.plugins.autoprefixer({
        browsers: ['last 2 versions']
      }))
      .on('error', $.plugins.notify.onError({
        title: 'Style'
      }))
      .pipe($.plugins.csso())
      .pipe($.plugins.sourcemaps.write())
      .pipe($.gulp.dest('build/css'))
      .pipe($.browserSync.reload({
        stream: true
      }));
  });
};
