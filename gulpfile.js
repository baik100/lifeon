// npm i gulp gulp-connect gulp-livereload gulp-html-extend gulp-imagemin run-sequence del gulp-sass gulp-autoprefixer gulp-sourcemaps gulp-remove-html-comments gulp-npm-dist gulp-rename gulp-gh-pages-will gulp-base64 gulp-ftp gulp-cache-bust

// plugin
var gulp = require('gulp'),

    // server + live-reload
    connect = require('gulp-connect'),

    livereload = require('gulp-livereload'),

    // html include
    include = require('gulp-html-tag-include');

    // image minify
    imagemin = require('gulp-imagemin'),

    // task run sequancial
    runSequence = require('run-sequence'),

    // clean before running
    clean = require('del'),

    // styling
    sass = require('gulp-sass'),

    // for cross browsing
    autoprefixer = require('gulp-autoprefixer'),

    // source tracking
    sourcemaps = require('gulp-sourcemaps'),

    // comment remove
    removeHtmlComment = require('gulp-remove-html-comments'),

    // get node_modules to build
    npmDist = require('gulp-npm-dist'),

    // change path name
    rename = require('gulp-rename'),

    // gulp-gh-pages
    publish = require('gulp-gh-pages-will'),

    // image inliner(for slow network)
    base64 = require('gulp-base64'),

    // ftp
    ftp = require('gulp-ftp'),

    cachebust = require('gulp-cache-bust');

// 환경설정
var path = {
    src: {
        root: 'src',
        style: 'src/scss',
        js: 'src/js',
        template: 'src',
        images: 'src/images',
        fonts: 'src/fonts',
        conf: 'src/conf',
        html: 'src/html'
    },
    build: 'lifeon'
};


// --------------------------------------------------------------------------------
// task running 설정
// --------------------------------------------------------------------------------

// 로컬 서버 설정 :: host 설정 해주지 않으면 외부에서 보이질 않는구나.
gulp.task('connect', function () {
    connect.server({
        root: './',
        port: 5000,
        livereload: true,
        directory: true,
        host: 'localhost'
    });
});

// 파일 변경 감지 :: local
gulp.task('watch', function (callback) {
    livereload.listen();
    gulp.watch(path.src.js + '/*.js', ['copy:js'], callback);
    gulp.watch(path.src.style + '/**/*.{scss,sass,css}', ['convert:sass:sourcemap'], callback);

    // 탬플릿은 세밀하게 지정해줘야 될지도...
    gulp.watch([
        path.src.template + '/**/*.html',
        path.src.html + '/**/*.html',
    ], ['html'], callback);

    // 이미지 수정처리
    gulp.watch(path.src.root + '/**/*.{png,jpg,gif}', ['copy:images'], callback);
});



// 빌드 전 청소
gulp.task('clean', function () {
    return clean(path.build);
});

// scss 변환 :: local
gulp.task('convert:sass:sourcemap', function () {

    return gulp.src(path.src.style + '/**/style.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'expanded'
        }))
        .on('error', function (err) {
            console.log(err.toString());
            this.emit('end');
        })
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'ie 11'],
            expand: true,
            flatten: true
        }))
        .pipe(base64({
            maxImageSize: 120 * 1024 // bytes,
        }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(path.build + '/css'))
        .pipe(livereload());
});

// scss 변환 :: build, sass > hack
gulp.task('convert:sass', function () {
    return gulp.src(path.src.style + '/**/style.scss')
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'ie 10', 'ie 11'],
            expand: true,
            flatten: false
        }))
        .pipe(base64({
            maxImageSize: 120 * 1024 // bytes,
        }))
        .pipe(gulp.dest(path.build + '/css'))
        .pipe(livereload());
});

// js 파일 :: local, 복사
gulp.task('copy:js', function () {
    return gulp.src([path.src.js + '/*.js', path.src.js + '/*.json'])
        .pipe(gulp.dest(path.build + '/js'))
        .pipe(livereload());
});

// fonts 파일 :: local, 복사
gulp.task('copy:fonts', function () {
    return gulp.src(path.src.fonts + '/**')
        .pipe(gulp.dest(path.build + '/fonts'))
});

// jquery include
npmDistExcludeJS = [
    '*.map',
    'src/**/*',
    'examples/**/*',
    'example/**/*',
    'demo/**/*',
    'spec/**/*',
    'docs/**/*',
    'tests/**/*',
    'test/**/*',
    'Gruntfile.js',
    'gulpfile.js',
    'package.json',
    'package-lock.json',
    'bower.json',
    'composer.json',
    'yarn.lock',
    'webpack.config.js',
    'README',
    'LICENSE',
    'CHANGELOG',
    '*.yml',
    '*.md',
    '*.coffee',
    '*.ts',
    '*.scss',
    '*.less',

    'core.js',
    'slim',
    'assets',
    // '*.css',
    '*.gif',
    'component.json',
    'slick.jquery.json',
    '*.rb',
    '*.markdown',
    '*.html',
    'MakeFile',
    '*.eot',
    '*.ttf',
    '*.woff',
    '*.svg',
    '*.png',
    'slick',
    'fonts'
];

gulp.task('copy:node_modules', function () {
    return gulp.src(
        npmDist({
            copyUnminified: false,
            slimexcludes: npmDistExcludeJS // only import jquery
        }), {
            base: './node_modules'
        }
    )
        // .pipe(rename(function (path) {
        //     path.dirname = '';
        // }))
        .pipe(gulp.dest(path.build + '/js'))
        .pipe(livereload());
});

// js 파일 :: build, concat > copy
gulp.task('copy:js:concat:minify', function () {
    return;
});

// conference file copy :: local, build 공통
gulp.task('copy:conf', function () {
    return gulp.src(path.src.conf + '/*')
        .pipe(gulp.dest(path.build))
        .pipe(livereload());
});

// images :: local, copy
gulp.task('copy:images', function () {
    return gulp.src(path.src.images + '/**/*.{jpg,png,gif,svg}')
        .pipe(gulp.dest(path.build + '/images'))
        .pipe(livereload());
});

gulp.task('imagesmin', function () {
    return gulp.src(path.src.images + '/*.{jpg,png,gif,svg}')
        .pipe(imagesmin({
            interlaced: true,
            progressive: true,
            optimizationLevel: 5,
            verbose: true
        }))
        .pipe(gulp.dest(path.src.images));
});


// html 처리
gulp.task('html', function () {
    return gulp.src(path.src.root + '/**/*.html')
        .pipe(include())
        .pipe(removeHtmlComment())
        .pipe(cachebust({type: 'timestamp'})) // 캐시 삭제
        .pipe(gulp.dest(path.build))
        .pipe(livereload());
});


// 배포
gulp.task('release', function () {
    return gulp.src(path.build + '/**/*')
        .pipe(publish({
            message: '깃허브 페이지에 반영됨. Published to Github pages'
        }))
});


// ftp upload
gulp.task('ftp', function () {
    return gulp.src(path.build + '/**/*')
        .pipe(ftp({
            remotePath: '/',
            host: '',
            user: '',
            pass: ''
        }))
});

// --------------------------------------------------------------------------------
// pipe running
// --------------------------------------------------------------------------------

gulp.task('local', function () {
    runSequence('clean', 'copy:images', 'copy:fonts', 'convert:sass:sourcemap', 'copy:conf', 'html', 'copy:js', ['connect', 'watch']);
});

gulp.task('build', function () {
    runSequence('clean', 'copy:images', 'copy:fonts', 'convert:sass', 'copy:conf', 'html', ['copy:js', 'copy:node_modules'], 'release');
});

// gulp.task('upload', function () {
//   runSequence('clean', 'copy:images', 'copy:fonts', 'convert:sass', 'copy:conf', 'html', ['copy:js', 'copy:node_modules'], 'ftp');
// });