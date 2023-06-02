import request from '@/common/untils/httpUntil.js'

// 定损相关接口

// 获取定损员认证信息
const lossAssessorInfo = data => request({ url: '/user/lossAssessorInfo' })

// 定损员认证信息提交
const lossAssessmentFillIn = data => request({ url: '/verify/lossAssessmentFillIn', data })

// 定损员认证信息修改
const authenticationInfo = data => request({ url: '/user/authenticationInfo', data })

export {
	lossAssessorInfo,
	lossAssessmentFillIn,
	authenticationInfo
}