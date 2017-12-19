'use strict'
const co = require('co')
const prompt = require('co-prompt')
const config = require('../templates')
const chalk = require('chalk')
const fs = require('fs')

module.exports = () => {
  co(function* () {

    // 分步接收用户输入的参数
    let tplName = yield prompt('模板名称: ')
    let gitUrl = yield prompt('模板链接[git]: ')
    let branch = yield prompt('分支: ')
    function createNo() {
      var tempNo = () => { return parseInt(Math.random() * 100) * 100 + parseInt(Math.random() * 100) };
      var judgeRepeat = (no) => {
        var isRepeat = false;
        Object.keys(config.tpl).map((item) => {
          if (config.tpl[item].no === no) {
            isRepeat = true;
            no = judgeRepeat(tempNo());
          }
        })
        if (!isRepeat) {
          return no;
        }
      }
      return judgeRepeat(tempNo());
    }
    // 避免重复添加
    if (!config.tpl[tplName]) {
      config.tpl[tplName] = {}
      config.tpl[tplName]['no'] = createNo()
      config.tpl[tplName]['url'] = gitUrl.replace(/[\u0000-\u0019]/g, '') // 过滤unicode字符
      config.tpl[tplName]['branch'] = branch
    } else {
      console.log(chalk.red('模板已存在，请检查后重新添加!'))
      process.exit()
    }

    // 把模板信息写入templates.json
    fs.writeFile(__dirname + '/../templates.json', JSON.stringify(config), 'utf-8', (err) => {
      if (err) console.log(err)
      console.log(chalk.green('新模板添加成功!\n'))
      console.log(chalk.grey('最新模板列表: \n'))
      console.log(config)
      console.log('\n')
      process.exit()
    })
  })
}