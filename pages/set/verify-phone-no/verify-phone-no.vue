<!-- 验证手机号 -->
<template>
	<view>
		<!-- 顶部导航栏 -->
		<u-navbar title="验证手机号码" auto-back />
		<!-- 提示 -->
		<view class="prompt">为保护您的账号安全，需要对当前注册的手机进行验证</view>
		<!-- 验证手机号码 -->
		<verify-phone :userPhone="userPhone" :nextRouterPath="nextRouterPath" phoneNoDisabled />
	</view>
</template>

<script>
	export default {
		data: () => ({
			userPhone: '',
			nextRouterPath: ''
		}),
		onLoad({ nextRouterPath = '' }) {
			nextRouterPath !== '' && (this.nextRouterPath = `/pages/set/${ nextRouterPath }/${ nextRouterPath }`)
			this.$store.getters.userPhone !== '' && (this.userPhone = this.$store.getters.userPhone)
		}
	}
</script>

<style scoped lang="scss">
	.prompt {
		padding: 16px;
		background-color: #FEF0F0;
		@include custom-text($c: #F04438, $H: 20px, $ls: -0.24px);
		font-feature-settings: 'case' on;
	}
</style>
