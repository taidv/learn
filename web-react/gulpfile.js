const gulp = require('gulp');
const tar = require('gulp-tar');
const gz = require('gulp-gzip');
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

gulp.task('build', gulp.series('build:api', 'build:ui', done => done()));

gulp.task('test:api', (callback) => {
    return execGulp(apiDir, 'test', callback);
});

gulp.task('test', gulp.series('test:api', done => done()));

gulp.task('clean', done => {
    return del([target], done);
});

gulp.task('deploy:tar.gz', () => {
    return gulp.src(`${target}/**/*`, { base: `./${target}` })
        .pipe(tar(`${packageJson.name}-${packageJson.version}.tar`))
        .pipe(gz())
        .pipe(gulp.dest(target));
});

gulp.task('deploy', gulp.series('clean', 'build', 'deploy:tar.gz', done => done()));

gulp.task('default', gulp.series('clean', 'build', done => done()));