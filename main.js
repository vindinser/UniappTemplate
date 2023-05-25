import App from './App'
import uView from '@/uni_modules/uview-ui'
import config from './common/config'
import plugins from './plugins'
import store from './store' // store

// #ifndef VUE3
import Vue from 'vue'
import './uni.promisify.adaptor'

App.mpType = 'app'
const app = new Vue({
  ...App
})
// 使用uview
Vue.use(uView)
// 封装的公用方法
Vue.use(plugins)
// vuex
Vue.prototype.$store = store
// 默认全局配置
uni.$u.setConfig(config)

Vue.config.productionTip = false

app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif