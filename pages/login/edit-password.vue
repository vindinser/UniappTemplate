<!-- 设置新密码登录 -->
<template>
	<view class="u-sys login-box">
		<!-- 顶部导航栏(如不写，需条件编译微信小程序样式) -->
		<u-navbar :title="emptyString" auto-back />
		<!-- 登录头部 -->
		<view class="login-head">
			<text>设置新密码登录</text>
			<text class="login-head_secondary-info">请保持两次密码输入一致</text>
		</view>
		<!-- 登录表单 -->
		<view class="login-form">
			<u-form ref="loginForm" :model="loginForm" :rules="rules">
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
			</u-form>
			<view class="u-m-t-80">
				<u-button text="确认" type="primary" :loading="loading" @click="handleLogin" />
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
	export default {
		data: () => ({
			emptyString: '', // 如果直接在标签中写空串则微信小程序展示为true
			loginForm: {
				password: '',
			}, // 登录表单
			rules: {
				password: [{ required: true, message: '请输入登录密码' } ],
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
