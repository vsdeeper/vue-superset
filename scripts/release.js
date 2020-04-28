const shell = require('shelljs')

// 删除dist目录
shell.rm('-rf', 'dist')

// 创建dist目录
shell.mkdir('-p', 'dist')

// 复制
shell.cp('-Rf', ['src/superset/common/', 'src/superset/config/', 'src/superset/lang/', 'src/superset/mobile/', 'src/superset/pc/'], 'dist')
