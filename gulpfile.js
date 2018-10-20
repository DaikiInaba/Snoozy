var gulp = require('gulp')
var sass = require('gulp-sass')

gulp.task('compile-scss', function() {
  return gulp.src('./src/renderer/asset/scss/index.scss')
             .pipe(sass.sync().on('error', sass.logError))
             .pipe(gulp.dest('./src/renderer/asset'))
})

gulp.task('watch:scss', function() {
  gulp.watch('./src/renderer/asset/scss/*.scss', ['compile-scss'])
      .on('change', function(e) {
        console.log('File ' + e.path + 'was ' + e.type + ', runnning tasks...' )
      })
})

gulp.task('default', ['watch:scss'])
