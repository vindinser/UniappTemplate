import request from '@/common/untils/httpUntil.js'

// 注册
export function register(data) {
	return request({
		'url': '/user/register',
		headers: {
			isToken: false
		},
		data
	})
}

// 获取验证码
export function phoneCode(data, showLoadingTitle) {
	return request({
		'url': '/user/phoneCode',
		headers: {
			isToken: false
		},
		data,
		showLoadingTitle
	})
}

// 登录
export function login(data) {
	return request({
		'url': '/user/login',
		headers: {
			isToken: false
		},
		'data': data
	})
}

// 判断验证码
export function determineCode(data) {
	return request({
		'url': '/user/determineCode',
		headers: {
			isToken: false
		},
		'data': data
	})
}

// 重置密码
export function resetPassword(data) {
	return request({
		'url': '/user/resetPassword',
		headers: {
			isToken: false
		},
		'data': data
	})
}

// 获取用户信息
export function personalData() {
	return request({
		'url': '/user/personalData'
	})
}

// 退出方法
export function logout() {
	return request({
		'url': '/logout',
		'method': 'post'
	})
}