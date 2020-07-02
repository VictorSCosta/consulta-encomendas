var minify = require('gulp-minifier');
var gulp = require('gulp');

function defaultTask(cb) {
    return gulp.src('src/**/*').pipe(minify({
        minify: true,
        minifyHTML: {
          collapseWhitespace: true,
          conservativeCollapse: false,
        },
        minifyJS: {
          sourceMap: true
        },
        minifyCSS: true,
        getKeptComment: function (content, filePath) {
            var m = content.match(/\/\*![\s\S]*?\*\//img);
            return m && m.join('\n') + '\n' || '';
        }
      })).pipe(gulp.dest('public'));
  }
  
  exports.default = defaultTask