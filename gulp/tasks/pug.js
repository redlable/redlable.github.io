module.exports = function() {
  $.gulp.task('pug', function() {
    return $.gulp.src('app/pug/pages/*.pug')
      .pipe($.plugins.pug({
        pretty: true
      }))

      .pipe($.gulp.dest('build'))
      .on('end', $.browserSync.reload);
  });
};
