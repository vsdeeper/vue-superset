/* 
 *根据ttf字体文件生成开发字体
 */
const Fontmin = require('fontmin');

const fontmin = new Fontmin()
    .src('scripts/fonts/PingFang-SC-Light.ttf')
    .dest('scripts/fonts/dist');

fontmin.run(function (err, files) {
    if (err) {
        throw err;
    }

    console.log(files[0]);
    // => { contents: <Buffer 00 01 00 ...> }
});