/* eslint-env node */
const path = require('path');
const {src, dest, series} = require('gulp');
const sass = require('gulp-dart-sass');
const filter = require('gulp-filter');
const sourcemaps = require('gulp-sourcemaps');
const {rimraf} = require('rimraf');

const DIST_DIR = path.resolve('dist');

function clean() {
    return rimraf(DIST_DIR);
}

function build() {
    return src(['lib/**/*.scss'])
        .pipe(sourcemaps.init())
        .pipe(sass({charset: false}).on('error', sass.logError))
        .pipe(sourcemaps.write('.'))
        .pipe(filter((f) => f.contents.length))
        .pipe(dest(DIST_DIR));
}

exports.clean = clean;
exports.default = series([clean, build]);
