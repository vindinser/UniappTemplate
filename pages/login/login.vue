<!-- 登录页 -->
<template>
	<view class="login-box">
		<!-- 顶部导航栏(如不写，需条件编译微信小程序样式) -->
		<u-navbar :title="emptyString" :left-icon="emptyString" :auto-back="false" />
		<!-- 登录头部 -->
		<view class="login-box_head">
			<text>欢迎使用华正拍卖平台</text>
			<!-- <view class="">未注册过的手机号请先注册</view> -->
		</view>
		<!-- 登录表单 -->
		<view class="login-box_form">
			<u-form ref="loginForm" :model="loginForm" :rules="rules">
				<u-form-item label="手机号码" prop="username">
					<u-input v-model="loginForm.username" placeholder="输入手机号码" />
				</u-form-item>
				<u-form-item label="登录密码" prop="password">
					<!-- #ifdef APP-PLUS -->
					<u-input v-show="password" v-model="loginForm.password" password placeholder="输入密码">
						<u-icon slot="suffix" name="eye" bold :size="18" @click="password = false" />
					</u-input>
					<u-input v-show="!password" v-model="loginForm.password" placeholder="输入密码">
						<u-icon slot="suffix" name="eye-off" bold :size="18" @click="password = true" />
					</u-input>
					<!-- #endif -->
					<!-- #ifndef APP-PLUS -->
					<u-input v-model="loginForm.password" :password="password" placeholder="输入密码">
						<u-icon slot="suffix" :name="password ? 'eye' : 'eye-off'" bold :size="18" @click="password = !password" />
					</u-input>
					<!-- #endif -->
				</u-form-item>
			</u-form>
			<view class="u-m-t-80">
				<u-button text="登录" type="primary" :loading="loading" @click="handleLogin" />
			</view>
			<view class="register-btn">
				<text class="u-primary" @click="registerBtnClick('retrieve-password')">找回密码</text>
				<text class="u-primary u-m-l-24 u-m-r-24">|</text>
				<text class="u-primary" @click="registerBtnClick('register')">立即注册</text>
			</view>
		</view>
		<view class="login-box_accept-terms">
			<text class="u-tips-color">登录即代表同意</text>
			<text class="u-primary" @click="handleAgrement">《用户协议》</text>
			<text class="u-tips-color">与</text>
			<text class="u-primary" @click="handleAgrement">《隐私协议》</text>
		</view>
	</view>
</template>

<script>
	import { login } from '@/api/login'
	
	export default {
		data: () => ({
			emptyString: '', // 如果直接在标签中写空串则微信小程序展示为true
			loginForm: {
				username: '17360776223',
				password: '123456',
				code: '',
				uuid: ''
			}, // 登录表单
			rules: {
				username: [{ required: true, message: '请输入手机号码' } ],
				password: [{ required: true, message: '请输入登录密码' } ]
			}, // 登录表单验证规则
			password: true, // 密码输入框状态
			loading: false // 登录按钮加载状态
		}),
		methods: {
			// 登录按钮点击事件
			handleLogin() {
				this.$refs.loginForm.validate().then(res => {
					// this.loading = true
					console.log('login')
					// this.$tab.switchTab(`/pages/tabbar/my/my`)
					login({
						userPhone: this.loginForm.userPhone,
						password: this.loginForm.password
					}).then(res => {
						console.log(res)
					}).catch(err => {
						console.log(err)
					})
				})
			},
			// 找回密码/立即注册
			registerBtnClick(operaType) {
				console.log(operaType, this.$tab)
				this.$tab.to(`/pages/login/${ operaType }`)
			},
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
