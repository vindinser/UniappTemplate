import request from '@/common/untils/httpUntil.js'

// 定损相关接口

// 获取定损员认证信息
const lossAssessorInfo = data => request({ url: '/user/lossAssessorInfo' })

// 定损员认证信息提交
const lossAssessmentFillIn = data => request({ url: '/verify/lossAssessmentFillIn', data })

// 定损员认证信息修改
const authenticationInfo = data => request({ url: '/user/authenticationInfo', data })

// 获取定损员认证记录
const certificationApproval = data => request({ url: '/user/certificationApproval' })

// 获取全部车辆列表
const biddingCarList = data => request({ url: '/bidding/car/biddingCarList', data })

export {
	lossAssessorInfo,
	lossAssessmentFillIn,
	authenticationInfo,
	certificationApproval,
	biddingCarList
}