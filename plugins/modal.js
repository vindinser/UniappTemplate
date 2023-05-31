export default {
	// 消息提示
	msg(content) {
		uni.showToast({
			title: content,
			icon: 'none',
			position: 'bottom'
		})
	},
	// 错误消息
	msgError(content) {
		uni.showToast({
			title: content,
			icon: 'error',
			position: 'bottom'
		})
	},
	// 成功消息
	msgSuccess(content) {
		uni.showToast({
			title: content,
			icon: 'success',
			position: 'bottom'
		})
	},
	// 隐藏消息
	hideMsg(content) {
		uni.hideToast()
	},
	// 弹出提示
	alert(content) {
		uni.showModal({
			title: '提示',
			content: content,
			showCancel: false
		})
	},
	// 确认窗体
	confirm(content, title = '系统提示', cancelText = '取消', confirmText = '确定') {
		return new Promise((resolve, reject) => {
			uni.showModal({
				title,
				content,
				cancelText,
				confirmText,
				success: function(res) {
					res.confirm && resolve(res.confirm)
					res.cancel && reject(res.cancel)
				}
			})
		})
	},
	// 提示信息
	showToast(option) {
		if (typeof option === 'object') {
			uni.showToast(option)
		} else {
			uni.showToast({
				title: option,
				icon: 'none',
				position: 'bottom',
				duration: 2500
			})
		}
	},
	// 打开遮罩层
	loading(content = '') {
		uni.showLoading({
			title: content,
			mask: true
		})
	},
	// 关闭遮罩层
	closeLoading() {
		uni.hideLoading()
	}
}
