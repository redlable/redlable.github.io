module.exports = function() {
  $.gulp.task('sass', function () {
    return $.gulp.src('src/static/scss/main.scss')
      .pipe($.glp.sourcemaps.init())
      .pipe($.glp.sass().on('error', $.glp.sass.logError))
      .pipe($.glp.autoprefixer({
        browsers: ['last 10 versions']
      }))
      .on('error', $.glp.notify.onError({
        title: 'Style'
      }))
      .pipe($.glp.csso())
      .pipe($.glp.sourcemaps.write())
      .pipe($.gulp.dest('build/static/css'))
      .pipe($.bs.reload({
        stream: true
      }));
  });
};
