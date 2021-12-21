const gulp = require('gulp')

const build = require('./tasks/build')

gulp.task(
  'build',
  gulp.series(done => {
    build(done)
  })
)