const getters = {
	token: state => state.user.token,
	userId: state => state.user.userId,
	userPhone: state => state.user.userPhone,
	userName: state => state.user.userName,
	insureCompanyName: state => state.user.insureCompanyName,
	auditStatus: state => state.user.auditStatus
}
export default getters
