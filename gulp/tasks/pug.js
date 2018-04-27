module.exports = function() {
  $.gulp.task('pug', function() {
    return $.gulp.src('app/pug/pages/*.pug')
      .pipe($.plugins.pug({
        // locals: {
        //   nav: JSON.parse($.fs.readFileSync('./data/navigation.json', 'utf8')),
        //   content: JSON.parse($.fs.readFileSync('./data/content.json', 'utf8'))
        // },
        pretty: true
      }))

      .pipe($.gulp.dest('build'))
      .on('end', $.browserSync.reload);
  });
};
