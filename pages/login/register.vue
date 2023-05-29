<!-- 注册 -->
<template>
	<view class="u-sys login-box">
		<!-- 顶部导航栏(如不写，需条件编译微信小程序样式) -->
		<u-navbar :title="emptyString" :left-icon="emptyString" :auto-back="false" />
		<!-- 登录头部 -->
		<view class="login-head">
			<text>注册华正拍卖平台</text>
			<text class="login-head_secondary-info">未注册过的手机号码请先注册</text>
		</view>
		<!-- 登录表单 -->
		<view class="login-form">
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
				<u-form-item label="确认密码" prop="password">
					<!-- #ifdef APP-PLUS -->
					<u-input v-show="password" v-model="loginForm.password" password placeholder="确认密码">
						<u-icon slot="suffix" name="eye" bold :size="18" @click="password = false" />
					</u-input>
					<u-input v-show="!password" v-model="loginForm.password" placeholder="确认密码">
						<u-icon slot="suffix" name="eye-off" bold :size="18" @click="password = true" />
					</u-input>
					<!-- #endif -->
					<!-- #ifndef APP-PLUS -->
					<u-input v-model="loginForm.password" :password="password" placeholder="确认密码">
						<u-icon slot="suffix" :name="password ? 'eye' : 'eye-off'" bold :size="18" @click="password = !password" />
					</u-input>
					<!-- #endif -->
				</u-form-item>
				<u-form-item label="验证码" prop="code">
					<u-input v-model="loginForm.code" type="number" placeholder="输入验证码">
						<template slot="suffix">
							<u-code ref="uCode" @change="(text) => tips = text" seconds="60" changeText="X秒重新获取" />
							<u-button @tap="getCode" :text="tips" type="primary" size="mini" />
						</template>
					</u-input>
				</u-form-item>
			</u-form>
			<view class="u-m-t-80">
				<u-button text="注册" type="primary" :loading="loading" @click="handleLogin" />
			</view>
		</view>
		<view class="accept-terms">
			<text class="u-tips-color">登录即代表同意</text>
			<text class="u-primary" @click="handleAgrement">《用户协议》</text>
			<text class="u-tips-color">与</text>
			<text class="u-primary" @click="handleAgrement">《隐私协议》</text>
		</view>
	</view>
</template>

<script>
	import { phoneCode, register } from '@/api/login'
	
	export default {
		data: () => ({
			emptyString: '', // 如果直接在标签中写空串则微信小程序展示为true
			loginForm: {
				username: '',
				password: '',
				code: ''
			}, // 登录表单
			rules: {
				username: [{ required: true, message: '请输入手机号码' } ],
				password: [{ required: true, message: '请输入登录密码' } ],
				code: [{ required: true, message: '请输入验证码' } ]
			}, // 登录表单验证规则
			password: true, // 密码输入框状态
			loading: false, // 登录按钮加载状态
			tips: ''
		}),
		methods: {
			// 登录按钮点击事件
			handleLogin() {
				this.$refs.loginForm.validate().then(res => {
					// this.loading = true
					console.log('login')
				})
			},
			// 获取验证码
			getCode() {
				if (this.$refs.uCode.canGetCode) {
					// 模拟向后端请求验证码
					uni.showLoading({
						title: '正在获取验证码'
					})
					// phoneCode({
					// 	userPhone: 17360776223
					// }).then(res => {
					// 	console.log(res)
					// }).catch(err => {
					// 	console.log(err)
					// }).finally(() => uni.hideLoading())
					setTimeout(() => {
						uni.hideLoading();
						// 这里此提示会被this.start()方法中的提示覆盖
						uni.$u.toast('验证码已发送');
						// 通知验证码组件内部开始倒计时
						this.$refs.uCode.start();
					}, 2000);
				} else {
					uni.$u.toast('倒计时结束后再发送');
				}
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
