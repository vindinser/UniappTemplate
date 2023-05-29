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

// 登录方法
export function login(username, password, code, uuid) {
	const data = {
		username,
		password,
		code,
		uuid
	}
	return request({
		'url': '/login',
		headers: {
			isToken: false
		},
		'method': 'post',
		'data': data
	})
}

// 获取用户详细信息
export function getInfo() {
	return request({
		'url': '/getInfo',
		'method': 'get'
	})
}

// 退出方法
export function logout() {
	return request({
		'url': '/logout',
		'method': 'post'
	})
}