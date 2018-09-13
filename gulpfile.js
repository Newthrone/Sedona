var gulp = require('gulp'); // Данной строчкой мы подключаем Gulp к нашему проекту, посредством функции require. Данная функция подключает пакеты из папки node_modules в наш проект, присваивая их переменной. В данном случае, мы создаем переменную gulp.

var browserSync = require('browser-sync'); // Подключаем Browser Sync

var concat      = require('gulp-concat'); // Подключаем gulp-concat (для конкатенации файлов)
    
var uglify      = require('gulp-uglifyjs'); // Подключаем gulp-uglifyjs (для сжатия JS)

var del         = require('del'); // Подключаем библиотеку для удаления файлов и папок

var imagemin    = require('gulp-imagemin'); // Подключаем библиотеку для работы с изображениями

var pngquant    = require('imagemin-pngquant'); // Подключаем библиотеку для работы с png

var cache       = require('gulp-cache'); // Подключаем библиотеку кеширования

gulp.task('default', ['watch']); // командой gulp будет вызываться gulp watch

gulp.task('browser-sync', function() { // Создаем таск browser-sync
    browserSync({ // Выполняем browser Sync
        server: { // Определяем параметры сервера
            baseDir: 'app' // Директория для сервера - app
        },
        notify: false // Отключаем уведомления
    });
});

gulp.task('scripts', function() {
    return gulp.src([ // Берем все необходимые библиотеки
        //'app/libs/jquery/dist/jquery.min.js', // Берем jQuery
        //'app/libs/magnific-popup/dist/jquery.magnific-popup.min.js' // Берем Magnific Popup
        ])
        .pipe(concat('libs.min.js')) // Собираем их в кучу в новом файле libs.min.js
        .pipe(uglify()) // Сжимаем JS файл
        .pipe(gulp.dest('app/js')); // Выгружаем в папку app/js
});


gulp.task('watch', ['browser-sync', 'scripts'], function() {
    gulp.watch('app/css/**/*.css', browserSync.reload); // Наблюдение за sass файлами
    gulp.watch('app/*.html', browserSync.reload); // Наблюдение за HTML файлами в корне проекта
    gulp.watch('app/js/**/*.js', browserSync.reload); // Наблюдение за JS файлами в папке js
});


gulp.task('clean', function() {
    return del.sync('dist'); // Удаляем папку dist перед сборкой
});

gulp.task('img', function() {
    return gulp.src('app/img/**/*') // Берем все изображения из app
        .pipe(cache(imagemin({  // Сжимаем их с наилучшими настройками с учетом кеширования
            interlaced: true,
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        })))
        .pipe(gulp.dest('dist/img')); // Выгружаем на продакшен
});


gulp.task('build', ['clean', 'img', 'scripts'], function() {

    var buildCss = gulp.src([ // Переносим CSS стили в продакшен
        'app/css/main.css',
        //'app/css/libs.min.css'
        ])
    .pipe(gulp.dest('dist/css'))

    var buildFonts = gulp.src('app/fonts/**/*') // Переносим шрифты в продакшен
    .pipe(gulp.dest('dist/fonts'))

    var buildJs = gulp.src('app/js/**/*') // Переносим скрипты в продакшен
    .pipe(gulp.dest('dist/js'))

    var buildHtml = gulp.src('app/*.html') // Переносим HTML в продакшен
    .pipe(gulp.dest('dist'));

});

gulp.task('clear', function () {
    return cache.clearAll();
})