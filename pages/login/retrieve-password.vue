<!-- 找回密码 -->
<template>
	<view class="login-box">
		<!-- 顶部导航栏(如不写，需条件编译微信小程序样式) -->
		<u-navbar :title="emptyString" auto-back />
		<!-- 找回密码头部 -->
		<view class="login-box_head">
			<text>找回密码</text>
			<text class="login-box_head_secondary-info">通过验证码找回密码</text>
		</view>
		<!-- 找回密码表单 -->
		<verify-phone :userPhone="userPhone" :nextRouterPath="nextRouterPath" />
		<view class="login-box_accept-terms">
			<text class="u-tips-color">登录即代表同意</text>
			<text class="u-primary" @click="handleAgrement">《用户协议》</text>
			<text class="u-tips-color">与</text>
			<text class="u-primary" @click="handleAgrement">《隐私协议》</text>
		</view>
	</view>
</template>

<script>
	import mixin from './mixin/mixin'
	
	export default {
		mixins: [mixin],
		data: () => ({
			userPhone: '',
			nextRouterPath: '/pages/login/edit-password' // 验证验证码成功后跳转路径
		}),
		onLoad({ userPhone = ''}) {
			userPhone !== '' && (this.userPhone = userPhone)
		},
		methods: {
			// 协议点击事件
			handleAgrement() {
				console.log('点击了协议')
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import './style/index.scss';
</style>