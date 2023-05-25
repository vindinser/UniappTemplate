// export default function request(url, data, showLoading) {
// 	let token = uni.getStorageSync('token')
// 	if (!token) {
// 		return uni.showToast({
// 			title: '信息验证失败，请重新登录',
// 			icon: 'none'
// 		})
// 	}
// 	if (showLoading) {
// 		uni.showLoading({
// 			title: '加载中...',
// 			mask: true
// 		})
// 	}
// 	return new Promise((resolve, reject) => {
// 		uni.request({
// 			url,
// 			data,
// 			method: 'POST',
// 			header: {
// 				token
// 			},
// 			success: (res) => {
// 				if (showLoading) {
// 					uni.hideLoading()
// 				}
// 				if (res.data.success === undefined) {
// 					if (res.data.code != 1000) {
// 						uni.showToast({
// 							title: res.data.msg || '失败',
// 							icon: 'none'
// 						});
// 						return reject(res.data)
// 					}
// 				} else {
// 					if (!res.data.success) {
// 						uni.showToast({
// 							title: res.data.msg || '失败',
// 							icon: 'none'
// 						});
// 						return reject(res.data)
// 					}
// 				}
// 				// 成功
// 				resolve(res.data)
// 			},
// 			fail: (error) => {
// 				if (showLoading) {
// 					uni.hideLoading()
// 				}
// 				uni.showToast({
// 					title: '网络异常',
// 					icon: 'none'
// 				});
// 				return reject(error)
// 			}
// 		});
// 	})
// }

import store from '@/store'
import { config } from '@/common/config'
import { getToken } from '@/common/untils/authUntil.js'
import errorCode from '@/common/untils/errorCode.js'
import { toast, showConfirm, tansParams } from '@/common/untils/commonUntil.js'

let timeout = 10000
let baseUrl = config.baseUrl

const request = config => {
	baseUrl = config.baseUrl ? config.baseUrl : baseUrl
	// 是否需要设置 token
	const isToken = (config.headers || {}).isToken === false
	config.header = config.header || {}
	if (getToken() && !isToken) {
		config.header['Authorization'] = 'Bearer ' + getToken()
	}
	// get请求映射params参数
	if (config.params) {
		let url = config.url + '?' + tansParams(config.params)
		url = url.slice(0, -1)
		config.url = url
	}
	return new Promise((resolve, reject) => {
		uni.request({
			method: config.method || 'get',
			timeout: config.timeout || timeout,
			// url: config.baseUrl || baseUrl + config.url,
			url: baseUrl + config.url,
			data: config.data,
			header: config.header,
			dataType: 'json'
		}).then(response => {
			let [error, res] = response
			if (error) {
				toast('后端接口连接异常')
				reject('后端接口连接异常')
				return
			}
			const code = res.data.code || 200
			const msg = errorCode[code] || res.data.msg || errorCode['default']
			if (code === 401) {
				showConfirm('登录状态已过期，您可以继续留在该页面，或者重新登录?').then(res => {
					if (res.confirm) {
						store.dispatch('LogOut').then(res => {
							uni.reLaunch({
								url: '/pages/login'
							})
						})
					}
				})
				reject('无效的会话，或者会话已过期，请重新登录。')
			} else if (code === 500) {
				toast(msg)
				reject('500')
			} else if (code !== 200) {
				toast(msg)
				reject(code)
			}
			resolve(res.data)
		}).catch(error => {
			let { message } = error
			if (message === 'Network Error') {
				message = '后端接口连接异常'
			} else if (message.includes('timeout')) {
				message = '系统接口请求超时'
			} else if (message.includes('Request failed with status code')) {
				message = '系统接口' + message.substr(message.length - 3) + '异常'
			}
			toast(message)
			reject(error)
		})
	})
}

export default request