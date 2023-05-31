import store from '@/store'
import { config } from '@/common/config'
import { getToken } from '@/common/untils/authUntil.js'
import errorCode from '@/common/untils/errorCode.js'
import { toast, tansParams, loading } from '@/common/untils/commonUntil.js'

let timeout = 10000
let baseUrl = config.baseUrl

const request = config => {
	baseUrl = config.baseUrl ? config.baseUrl : baseUrl
	// 是否需要设置 token
	const isToken = (config.headers || {}).isToken === false
	config.header = config.header || {}
	if (getToken() && !isToken) {
		config.header['token'] = getToken()
	}
	// get请求映射params参数
	if (config.params) {
		let url = config.url + '?' + tansParams(config.params)
		url = url.slice(0, -1)
		config.url = url
	}
	// 是否展示加载
	loading(config.showLoadingTitle || '加载中...')
	
	return new Promise((resolve, reject) => {
		uni.request({
			method: config.method || 'post',
			timeout: config.timeout || timeout,
			url: baseUrl + config.url,
			data: config.data,
			header: config.header,
			dataType: 'json'
		}).then(({ statusCode, data }) => {
			if (statusCode !== 200) {
				toast('网络异常')
				reject('网络异常')
				return
			}
			if(data.success) {
				resolve(data)
			} else {
				toast(data.msg)
				reject(data.msg)
			}
		}).catch(error => {
			let { errMsg: message = '' } = error
			if (message === 'Network Error') {
				message = '后端接口连接异常'
			} else if (message.includes('timeout')) {
				message = '系统接口请求超时'
			} else if (message.includes('Request failed with status code')) {
				message = '系统接口' + message.substr(message.length - 3) + '异常'
			} else {
				message = '请求失败'
			}
			toast(message)
			reject(error)
		}).finally(() => {
			uni.hideLoading()
		})
	})
}

export default request