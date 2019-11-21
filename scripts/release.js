const shell = require('shelljs')

// 删除
shell.rm('-rf', 'common')
shell.rm('-rf', 'mobile')
shell.rm('-rf', 'pc')

// 复制
shell.cp('-R', 'src/superset/common/', './')
shell.cp('-R', 'src/superset/mobile/', './')
shell.cp('-R', 'src/superset/pc/', './')
