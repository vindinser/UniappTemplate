[toc]

### LossAssessmentAPP

​			作者：zs

​			版本：1.0.0

​			版权：zs

#### 项目介绍

#### 项目结构
  ``` js
    .
    ├── api                        // 所有请求  
    ├── components                 // 全局公用组件
    ├── pages                      // 页面文件
    ├── plugins                    // 通用方法
    ├── store                      // 全局 store管理
    ├── common
    │   ├── config
    │   │  ├── index               // 环境配置
    │   │  ├── color               // 主体颜色配置
    │   │  └── tabbar              // 底部栏配置
	│   └── utils                  // 公用方法
    ├── static                     // 公共文件
    │   ├── image                  // 图片
    │   │   └── tabbar             // 导航栏图标
	│   ├── iconfont               // iconfont图标
    │   ├── logo.png               // logo图片
    │   └── style                  // style样式
    ├── uni_modules                // uniui组件
    │   └── uview-ui               // uview
    ├── App.vue                    // 应用配置
    ├── main.js                    // Vue初始化入口文件
    ├── manifest.json              // 配置打包
    ├── pages.json                 // 配置页面路由
    ├── permission.js              // 权限拦截
    └── uni.scss                   // 全局样式变量
  ```

### 配置文件
  - 应用环境配置 config.js

  ``` js
    // 应用全局配置
    module.exports = {
      baseUrl: 'http://localhost:8848',
      // 应用信息
      appInfo: {
        // 应用名称
        name: "LossAssessmentAPP",
        // 应用版本
        version: "1.0.0"
      }
    }
  ```

### 核心技术

  > 技术栈 uniapp、vue、vuex、uview-ui