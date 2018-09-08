const changed = require('gulp-changed');
const del = require('del');
const gulp = require('gulp');
const mocha = require('gulp-mocha');
const runSequence = require('run-sequence');
const sourcemaps = require('gulp-sourcemaps');
const webpack = require('webpack');
const webpackstream = require('webpack-stream');
const ts = require('gulp-typescript');
const packageJson = require('./package.json');
var tsProject = ts.createProject("tsconfig.json");
var paths = {

}
const distTest = packageJson.test;

const TYPESCRIPT_FILES = ['src/**/*.{ts,tsx,less}'];
const STATIC_FILES = ['src/static/**/*', '!**/*.{ts,tsx}'];

var webpackCfg = require('./webpack.config.js');

var cdnResolve = function (lib, version) { };

gulp.task('build:static', function () {
    return gulp.src(STATIC_FILES)
        .pipe(changed('dist'))
        .pipe(gulp.dest('dist'));
});

gulp.task('build:webpack', function () {
    return gulp.src(TYPESCRIPT_FILES)
        .pipe(webpackstream(webpackCfg, webpack))
        .pipe(gulp.dest('dist'));
});


gulp.task("default", ["build:static", "build:webpack"]);

gulp.task('test:clean', () => {
    return del([`./${distTest}`]);
});

gulp.task('test:static', function () {
    return gulp.src(STATIC_FILES)
        .pipe(gulp.dest(`./${distTest}/src/static`));
});

gulp.task('test:build', () => {
    return gulp.src(["./src/**/*.ts", "./src/**/*.tsx", "./test/**/*.ts", "./test/**/*.tsx"], { base: './' })
        .pipe(sourcemaps.init())
        .pipe(tsProject()).js
        .pipe(sourcemaps.mapSources((sourcePath, file) => "../".repeat(sourcePath.match(/\//g).length - 2) + sourcePath))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(`./${distTest}`));
});

gulp.task('test:run', () => {
    gulp.src([`./${distTest}/**/*.spec.js`, `./${distTest}/**/*.spec.jsx`], { read: false })
        .pipe(mocha({
            exit: true,
            reporter: process.env.MOCHA_REPORTER ? process.env.MOCHA_REPORTER : "spec",
            reporterOptions: process.env.MOCHA_REPORTEROPTIONS ? process.env.MOCHA_REPORTEROPTIONS : undefined,
            require: ['jsdom-global/register']
        }))
        .on('error', console.error);
});

gulp.task('test', (callback) => {
    return runSequence(['test:clean'], ['test:static', 'test:build'], ['test:run'], callback);
});