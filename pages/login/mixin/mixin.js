// 登录、注册、找回密码 混入

import { getCodeFn } from '@/common/untils/pubilcFn.js'

export default {
	methods: {
		// 获取验证码
		getCode() {
			getCodeFn({ _this: this, userPhone: this.loginForm.userPhone })
		}
	}
}