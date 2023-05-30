// 登录、注册、找回密码 混入

import { getCodeFn } from '@/common/untils/pubilcFn.js'

export default {
	data: () => ({
		emptyString: '', // 如果直接在标签中写空串则微信小程序展示为true
		tips: '' // 获取验证码按钮展示文字
	}),
	methods: {
		// 获取验证码
		getCode() {
			getCodeFn({ _this: this, userPhone: this.loginForm.userPhone })
		}
	}
}