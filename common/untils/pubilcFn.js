// 公用方法

import { phoneCode } from '@/api/login'

// 获取验证码
const getCodeFn = async ({ _this, refsName = 'uCode', userPhone = '' }) => {
	// 正则验证手机号是否合法
	const reg = /^1[3,4,5,6,7,8,9][0-9]{9}$/;
	const regRes = reg.test(userPhone)
	if (_this.$refs[refsName].canGetCode && regRes) {
		const res = await phoneCode({ userPhone }, '正在获取验证码')
		_this.$modal.msg('验证码已发送')
		// 通知验证码组件内部开始倒计时
		_this.$refs[refsName].start()
	} else {
		const modelMsg = regRes ? '倒计时结束后再发送' : '请输入合法的手机号'
		_this.$modal.msg(modelMsg)
	}
}

export {
	getCodeFn
}