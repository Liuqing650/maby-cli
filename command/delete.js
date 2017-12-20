'use strict'
const co = require('co')
const prompt = require('co-prompt')
const config = require('../templates')
const chalk = require('chalk')
const fs = require('fs')

module.exports = () => {
  co(function* () {
    
    // 显示模板编号
    function showList() {
      Object.keys(config.tpl).map((tplName) => {
        if (config.tpl[tplName]) {
          console.log('名称： %s | 编号：[ %s ] | 描述：[ %s ]', 
            tplName, 
            config.tpl[tplName].no ? config.tpl[tplName].no : 'error',
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
    if (Object.keys(config.tpl).length < 1) {
      console.log(chalk.yellow('\n 暂无任何模板可删除,可以添加模板: maby add!'))
      process.exit()
    }
    // 接收用户输入的参数
    let tplNo = yield prompt('要删除的模板编号: ')
    let tplName = getTplName(tplNo);

    // 删除对应的模板
    if (config.tpl[tplName]) {
      // let obj = {"tpl":{}};
      // Object.keys(config.tpl).map((name) => {
      //   if (name != tplName) {
      //     obj.tpl[name] = config.tpl[tplName];
      //   }
      // })
      // config = obj;
      config.tpl[tplName] = undefined
    } else {
      console.log(chalk.red('模板不存在!'))
      process.exit()
    }

    // 写入template.json
    fs.writeFile(__dirname + '/../templates.json', JSON.stringify(config), 'utf-8', (err) => {
      if (err) console.log(err)
      console.log(chalk.green('模板已删除!'))
      console.log(chalk.grey('最新模板列表: \n'))
      showList()
      console.log('\n')
      process.exit()
    })
  })
}