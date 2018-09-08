const gulp = require('gulp');
const tar = require('gulp-tar');
const gz = require('gulp-gzip');
const runSequence = require('run-sequence');
const del = require('del');
const exec = require('child_process').exec;
const packageJson = require('./package.json');

const root = process.cwd();
const apiDir = './projects/api/';
const apiPackageJson = require(`${apiDir}/package.json`);
const apiTarget = `${apiDir}/${apiPackageJson.build}/**/*`;
const uiDir = './projects/ui/';
const uiPackageJson = require(`${uiDir}/package.json`);
const uiTarget = `${uiDir}${uiPackageJson.main}/**/*`;

const target = 'dist';
const targetPublicDir = `${target}/${apiPackageJson.main}/public`;

const execGulp = (dir, arguments, callback) => {
    exec(`pushd ${dir} && gulp ${arguments} && popd`,
    {
        shell: '/bin/bash'
    },
        (error, stdout, stderr) => {
            if (stderr) {
                console.log(`stderr: ${stderr}`);
            }
            if (callback) {
                callback();
            }
        }
    );
};

gulp.task('build:api', (callback) => {
    execGulp(apiDir, 'deploy', () => {
        gulp.src(apiTarget)
            .pipe(gulp.dest(target), { end: true })
            .on('end', callback);
    });
});

gulp.task('build:ui', (callback) => {
    execGulp(uiDir, 'default', () => {
        gulp.src(uiTarget)
            .pipe(gulp.dest(targetPublicDir))
            .on('end', callback);
    });
});

gulp.task('build', (callback) => {
    return runSequence(['build:api'], ['build:ui'], callback);
});

gulp.task('test:api', (callback) => {
    return execGulp(apiDir, 'test', callback);
});

gulp.task('test', (callback) => {
    return runSequence(['test:api'], callback);
});

gulp.task('clean', () => {
    return del([target]);
});

gulp.task('deploy:tar.gz', () => {
    return gulp.src(`${target}/**/*`, { base: `./${target}` })
        .pipe(tar(`${packageJson.name}-${packageJson.version}.tar`))
        .pipe(gz())
        .pipe(gulp.dest(target));
});

gulp.task('deploy', (callback) => {
    buildSourceMaps = false;
    return runSequence(['clean'], ['build'], ['deploy:tar.gz'], callback)
});

gulp.task('default', (callback) => {
    return runSequence(['clean'], ['build'], callback);
});