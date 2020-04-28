const shell = require('shelljs')

// 删除dist目录
shell.rm('-rf', 'dist')
// shell.rm('-rf', 'common')
// shell.rm('-rf', 'mobile')
// shell.rm('-rf', 'pc')
// shell.rm('-rf', 'config')
// shell.rm('-rf', 'lang')

// 创建dist目录
shell.mkdir('-p', 'dist')

// 向dist目录复制文件
shell.cp('-Rf', 'src/superset/*', 'dist')
