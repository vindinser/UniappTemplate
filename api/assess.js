import request from '@/common/untils/httpUntil.js'

// 定损相关接口

// 获取定损员认证信息
export function lossAssessorInfo() {
	return request({
		'url': '/user/lossAssessorInfo'
	})
}