// 保留当前页面，跳转到应用内的某个页面
function navigateTo(options) {
	return uni.navigateTo(typeof options === 'string' ? { url: options } : options)
}

// 关闭当前页面，跳转到应用内的某个页面
function redirectTo(url) {
	return uni.redirectTo({ url })
}

// 关闭所有页面，打开到应用内的某个页面
function reLaunch(url) {
	return uni.reLaunch({ url })
}

// 跳转到tabBar页面，并关闭其他所有非tabBar页面
function switchTab(url) {
	return uni.switchTab({ url })
}

// 关闭当前页面，返回上一页面或多级页面
function navigateBack(options = 1) {
	return uni.navigateBack(typeof options === 'number' ? { delta: options } : options)
}

export default {
	navigateTo,
	redirectTo,
	reLaunch,
	switchTab,
	navigateBack,
	to: navigateTo,
	back: navigateBack
}
