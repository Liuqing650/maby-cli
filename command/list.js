'use strict'
const config = require('../templates')

module.exports = () => {
  // console.log(config.tpl)
  // 显示模板编号
  function showList() {
    Object.keys(config.tpl).map((tplName) => {
      console.log('名称： %s | 编号：[ %s ] | 分支: %s ', tplName, config.tpl[tplName].no, config.tpl[tplName].branch);
    })
  }
  showList();
  process.exit()
}