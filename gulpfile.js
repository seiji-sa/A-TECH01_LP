const {src, watch, dest, series} = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const cssSorter = require("css-declaration-sorter");
const mmq = require("gulp-merge-media-queries");


const sassBuild = () =>{
    return src('src/sass/*.scss')
    .pipe(sass({outputStyle: 'expanded'}))
    .pipe(dest('dist/css'))
    .pipe(postcss([autoprefixer(),cssSorter({order:'smacss'})]))
    .pipe(mmq())
}

const srcPath = {
    html: 'src/index.html',
    css: 'src/sass/*.scss'
}

const distPath = {
    css: 'dist/css/style.css'
}

const watchFile = () =>{
    watch(srcPath.css, sassBuild)
}

exports.default = series(sassBuild,watchFile);
exports.build = sassBuild;


