<!-- 设置新密码登录 -->
<template>
	<view class="login-box">
		<!-- 顶部导航栏(如不写，需条件编译微信小程序样式) -->
		<u-navbar :title="emptyString" auto-back />
		<!-- 设置新密码头部 -->
		<view class="login-box_head">
			<text>设置新密码登录</text>
			<text class="login-box_head_secondary-info">请保持两次密码输入一致</text>
		</view>
		<!-- 设置新密码表单 -->
		<edit-pwd :code="loginForm.code" :userPhone="loginForm.userPhone" />
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
			loginForm: {
				userPhone: '', // 手机号
				code: '' // 验证码
			}, // 设置新密码表单
		}),
		onLoad({ userPhone = '', code = ''}) {
			userPhone !== '' && (this.loginForm.userPhone = userPhone)
			code !== '' && (this.loginForm.code = code)
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
