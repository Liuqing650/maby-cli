'use strict'
const config = require('../templates')

module.exports = () => {
  // console.log(config.tpl)
  // 显示模板编号
  function showList() {
    Object.keys(config.tpl).map((tplName) => {
      if (config.tpl[tplName]) {
        console.log('名称： %s | 编号：[ %s ] | 分支: %s | 描述： %s ', 
          tplName, 
          config.tpl[tplName].no, 
          config.tpl[tplName].branch, 
          config.tpl[tplName].desc ? config.tpl[tplName].desc : '暂无描述');
      }
    })
  }
  showList();
  process.exit()
}