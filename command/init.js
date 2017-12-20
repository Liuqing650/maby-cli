'use strict'
const exec = require('child_process').exec
const co = require('co')
const prompt = require('co-prompt')
const config = require('../templates')
const chalk = require('chalk')

module.exports = () => {
  co(function* () {
    
    // 显示模板编号
    function showList() {
      Object.keys(config.tpl).map((tplName) => {
        if (config.tpl[tplName]) {
          console.log('名称： %s | 编号：[ %s ] | 描述：[ %s ]', 
            tplName, 
            config.tpl[tplName].no, 
            config.tpl[tplName].desc ? config.tpl[tplName].desc : '暂无描述');
        }
      })
    }
    showList();
    // 获取对应的模板
    function getTplName (no) {
      let result = "";
      Object.keys(config.tpl).map((tplName) => {
        if (config.tpl[tplName].no == parseInt(no)) {
          result = tplName;
        }
      })
      return result;
    }
    // 处理用户输入
    let tplNo = yield prompt('模板编号: ')
    let tplName = getTplName(tplNo);
    let projectName = yield prompt('项目名称: ')
    let gitUrl
    let branch
    if (!config.tpl[tplName]) {
      console.log(chalk.red('\n × 模板不存在,查看模板: maby list!'))
      process.exit()
    }
    gitUrl = config.tpl[tplName].url
    branch = config.tpl[tplName].branch

    // git命令，远程拉取项目并自定义项目名
    let cmdStr = `git clone ${gitUrl} ${projectName} && cd ${projectName} && git checkout ${branch}`

    console.log(chalk.white('\n 项目创建中,请稍后...'))

    exec(cmdStr, (error, stdout, stderr) => {
      if (error) {
        console.log(error)
        process.exit()
      }
      console.log(chalk.green('\n ✅ 项目创建完成!'))
      console.log(`\n cd ${projectName} && npm install \n`)
      process.exit()
    })
  })
}