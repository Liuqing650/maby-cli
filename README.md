# [maby-cli](https://github.com/Liuqing650/maby-cli)

  [![NPM](https://nodei.co/npm/maby-cli.png)](https://nodei.co/npm/maby-cli/)

  maby-cli 是一个可扩展脚手架，用于快速创建新项目框架目录结构。

## 使用方法

  1. install
  ``` 
    npm install maby-cli -g
  ```
 
  2. create
 	```
    maby init
    
    名称： 4867 | 编号：[ mabyTemplate ]
    名称： 2045 | 编号：[ webpackProject ]
    模板编号: 4867
    项目名称: newProject
  ```
  接下来将开始创建选择的项目
  ```
    项目创建中,请稍后...

    ✅ 项目创建完成!

    cd newProject && npm install 
  ```

  3. run
  ```
    cd newProject
    npm install
  ```

## 功能模块

  | command | description | dec | Support |
  | ------ | ----------- | ----------- | ----------- |
  | add | 添加新模板 | ✔ |  |
  | init | 本地初始化项目 | ✔ | ✔ |
  | list | 查看所有模板 |✔ | ✔ |
  | delete | 删除模板 | ✔ |  |
