module.exports = function() {
  $.gulp.task('watch', function() {
    $.gulp.watch('app/pug/**/*.pug', $.gulp.series('pug'));
    $.gulp.watch('app/assets/js/main.js', $.gulp.series('scripts'));
    $.gulp.watch('app/assets/scss/**/*.scss', $.gulp.series('sass'));
  });
};
