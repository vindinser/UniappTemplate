import $modal from './modal.js'
import $tab from './tab.js'
import $store from '@/store/index.js'

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
	},
	// 认证提示
	certificationPrompt: () => {
		if(!$store.getters.auditStatus) {
			$modal.confirm(
				'请填写定损员认证后再进行操作',
				'定损员认证',
				'暂不认证',
				'立即认证'
			).then(() => {
				$tab.to('/pages/assess/authentication/authentication')
			})
		}
	}
}