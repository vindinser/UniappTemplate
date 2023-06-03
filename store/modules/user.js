import { config } from '@/common/config'
import storage from '@/common/untils/storageUntil.js'
import constant from '@/common/untils/constantUntil.js'
import { login, logout, personalData, accountCancellation } from '@/api/login'
import { getToken, setToken, removeToken } from '@/common/untils/authUntil.js'

const baseUrl = config.baseUrl

const user = {
	state: {
		token: getToken(),
		userId: storage.get(constant.userId),
		userPhone: storage.get(constant.userPhone),
		userName: storage.get(constant.userName),
		insureCompanyName: storage.get(constant.insureCompanyName),
		auditStatus: storage.get(constant.auditStatus)
	},

	mutations: {
		SET_TOKEN: (state, token) => {
			state.token = token
		},
		SET_USERID: (state, userId) => {
			state.userId = userId
			storage.set(constant.userId, userId)
		},
		SET_USERPHONE: (state, userPhone) => {
			state.userPhone = userPhone
			storage.set(constant.userPhone, userPhone)
		},
		SET_USERNAME: (state, userName) => {
			state.userName = userName
			storage.set(constant.userName, userName)
		},
		SET_COMPANY: (state, insureCompanyName) => {
			state.insureCompanyName = insureCompanyName
			storage.set(constant.insureCompanyName, insureCompanyName)
		},
		SET_AUDITSTATUS: (state, auditStatus) => {
			state.auditStatus = auditStatus
			storage.set(constant.auditStatus, auditStatus)
		},
	},

	actions: {
		// 登录
		Login({ commit }, userInfo) {
			const userPhone = userInfo.userPhone.trim()
			const password = userInfo.password
			return new Promise((resolve, reject) => {
				login({
					userPhone,
					password
				}).then(res => {
					setToken(res.data.token)
					commit('SET_TOKEN', res.data.token)
					resolve()
				}).catch(error => {
					reject(error)
				})
			})
		},

		// 获取用户信息
		GetUserInfo({ commit, state }) {
			return new Promise((resolve, reject) => {
				personalData().then(res => {
					const data = res.data
					commit('SET_USERID', data.userNumber)
					commit('SET_USERPHONE', data.userPhone)
					commit('SET_USERNAME', data.userName)
					commit('SET_COMPANY', data.insureCompanyName)
					commit('SET_AUDITSTATUS', data.lossAdjusterCertification)
					resolve(res)
				}).catch(error => {
					reject(error)
				})
			})
		},
		
		// 注销账号
		LogOff({ commit, state }) {
			return new Promise((resolve, reject) => {
				accountCancellation().then(res => {
					commit('SET_USERID', '')
					commit('SET_USERPHONE', '')
					commit('SET_USERNAME', '')
					commit('SET_COMPANY', '')
					commit('SET_AUDITSTATUS', '')
					resolve(res)
				}).catch(err => {
					console.error(err)
				})
			})
		},

		// 退出系统
		LogOut({ commit, state }) {
			return new Promise((resolve, reject) => {
				logout(state.token).then(() => {
					commit('SET_TOKEN', '')
					commit('SET_ROLES', [])
					commit('SET_PERMISSIONS', [])
					removeToken()
					storage.clean()
					resolve()
				}).catch(error => {
					reject(error)
				})
			})
		}
	}
}

export default user
