import tab from './tab'
import auth from './auth'
import modal from './modal'
import tools from './tools'

export default {
	install(Vue) {
		// 页签操作
		Vue.prototype.$tab = tab
		// 认证对象
		Vue.prototype.$auth = auth
		// 模态框对象
		Vue.prototype.$modal = modal
		// 工具
		Vue.prototype.$tools = tools
	}
}
