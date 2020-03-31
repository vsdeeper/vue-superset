const shell = require('shelljs')

// 删除
shell.rm('-rf', 'common')
shell.rm('-rf', 'mobile')
shell.rm('-rf', 'pc')
shell.rm('-rf', 'config')
shell.rm('-rf', 'lang')

// 复制
shell.cp('-R', 'src/superset/common/', './')
shell.cp('-R', 'src/superset/mobile/', './')
shell.cp('-R', 'src/superset/pc/', './')
shell.cp('-R', 'src/superset/config/', './')
shell.cp('-R', 'src/superset/lang/', './')
