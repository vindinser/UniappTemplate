import request from '@/common/untils/httpUntil.js'
import { config } from '@/common/config'

// 公用接口

// 获取下拉列表 —— 省
const hzdfProvince = () => request({
	url: '/SecurityActual/hzdfProvince',
	baseUrl: config.erpUrl,
	data: {}
})

// 获取下拉列表 —— 市
const hzdfCity = provinceCode => request({
	url: '/SecurityActual/hzdfCity',
	data: { provinceCode },
	baseUrl: config.erpUrl
})

// 获取下拉列表 —— 县
const hzdfArea = cityCode => request({
	url: '/SecurityActual/hzdfArea',
	data: { cityCode },
	baseUrl: config.erpUrl
})

// 顺丰 地址识别
const SfSmartAddress = address => request({
	url: '/allTheMembers/SfSmartAddress',
	data: { address },
	baseUrl: config.erpUrl
})

export {
	hzdfProvince,
	hzdfCity,
	hzdfArea
}