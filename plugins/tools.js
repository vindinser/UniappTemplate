export default {
	// 返回页面并执行刷新方法
	backToRefreshList: (_this, refreshFnName = 'renovateList') => {
		// #ifdef APP-NVUE
		const eventChannel = _this.$scope.eventChannel; // 兼容APP-NVUE
		// #endif
		// #ifndef APP-NVUE
		const eventChannel = _this.getOpenerEventChannel();
		// #endif
		eventChannel.emit(refreshFnName)
		uni.navigateBack()
	}
}