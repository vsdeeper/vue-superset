const shell = require('shelljs')

// 删除es目录
shell.rm('-rf', 'es')

// 创建es目录
shell.mkdir('-p', 'es')

// 复制
shell.cp('-Rf', ['src/superset/*'], 'es')
