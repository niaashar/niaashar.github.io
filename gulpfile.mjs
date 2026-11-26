import { src, dest, watch, parallel, series } from 'gulp';
import includer from 'gulp-file-include';
import less from 'gulp-less';

// Source files live in src/. A compiled site goes to the project root so
// GitHub Pages can publish it directly from the main branch / (root).
export function html() {
  return src('src/*.html')
    .pipe(includer({ prefix: '@@', basepath: '@file' }))
    .pipe(dest('.'));
}

export function styles() {
  return src('src/styles/styles.less')
    .pipe(less())
    .pipe(dest('styles'));
}

export function assets() {
  return src(['src/images/**/*', 'src/fonts/**/*', 'src/js/**/*'], { base: 'src' })
    .pipe(dest('.'));
}

export const build = parallel(html, styles, assets);

function watchFiles(done) {
  watch(['src/*.html', 'src/partials/**/*.html'], html);
  watch('src/styles/**/*.less', styles);
  watch(['src/images/**/*', 'src/fonts/**/*', 'src/js/**/*'], assets);
  done();
}

export const dev = series(build, watchFiles);
export default dev;
