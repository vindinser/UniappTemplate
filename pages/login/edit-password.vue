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
		<view class="login-box_form">
			<u-form ref="loginForm" :model="loginForm" :rules="rules">
				<u-form-item label="登录密码" prop="password1">
					<!-- #ifdef APP-PLUS -->
					<u-input v-show="loginPwdIsShow" v-model="loginForm.password1" password placeholder="输入密码">
						<u-icon slot="suffix" name="eye" bold :size="18" @click="loginPwdIsShow = false" />
					</u-input>
					<u-input v-show="!loginPwdIsShow" v-model="loginForm.password1" placeholder="输入密码">
						<u-icon slot="suffix" name="eye-off" bold :size="18" @click="loginPwdIsShow = true" />
					</u-input>
					<!-- #endif -->
					<!-- #ifndef APP-PLUS -->
					<u-input v-model="loginForm.password1" :password="loginPwdIsShow" placeholder="输入密码">
						<u-icon slot="suffix" :name="loginPwdIsShow ? 'eye' : 'eye-off'" bold :size="18" @click="loginPwdIsShow = !loginPwdIsShow" />
					</u-input>
					<!-- #endif -->
				</u-form-item>
				<u-form-item label="确认密码" prop="password">
					<!-- #ifdef APP-PLUS -->
					<u-input v-show="confrimPwdIsShow" v-model="loginForm.password2" password placeholder="确认密码">
						<u-icon slot="suffix" name="eye" bold :size="18" @click="confrimPwdIsShow = false" />
					</u-input>
					<u-input v-show="!confrimPwdIsShow" v-model="loginForm.password2" placeholder="确认密码">
						<u-icon slot="suffix" name="eye-off" bold :size="18" @click="confrimPwdIsShow = true" />
					</u-input>
					<!-- #endif -->
					<!-- #ifndef APP-PLUS -->
					<u-input v-model="loginForm.password2" :password="confrimPwdIsShow" placeholder="确认密码">
						<u-icon slot="suffix" :name="confrimPwdIsShow ? 'eye' : 'eye-off'" bold :size="18" @click="confrimPwdIsShow = !confrimPwdIsShow" />
					</u-input>
					<!-- #endif -->
				</u-form-item>
			</u-form>
			<view class="u-m-t-80">
				<u-button text="确认" type="primary" :loading="loading" @click="handleLogin" />
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
	import { resetPassword } from '@/api/login.js'
	import mixin from './mixin/mixin'
	
	export default {
		mixins: [mixin],
		data: () => ({
			loginForm: {
				userPhone: '', // 手机号
				password1: '', // 登录密码
				password2: '', // 确认密码
				code: '' // 验证码
			}, // 设置新密码表单
			rules: {
				password1: [{ required: true, message: '请输入6位以上登录密码', trigger: ['blur', 'change'], min: 6 }],
				password2: [{ required: true, message: '请确认密码', trigger: ['blur', 'change'], min: 6 }],
			}, // 设置新密码表单验证规则
			loginPwdIsShow: true, // 登录密码输入框状态
			confrimPwdIsShow: true, // 确认密码输入框状态
			loading: false, // 设置新密码确认按钮加载状态
		}),
		onLoad({ userPhone = '', code = ''}) {
			userPhone !== '' && (this.loginForm.userPhone = userPhone)
			code !== '' && (this.loginForm.code = code)
		},
		methods: {
			// 确认重置密码按钮点击事件
			handleLogin() {
				if(this.loginForm.password1 !== this.loginForm.password2) return this.$modal.msg('两次密码输入不一致！')
				this.$refs.loginForm.validate().then(res => {
					this.loading = true
					resetPassword(this.loginForm).then(res => {
						this.$tab.back(2)
					}).catch(err => {
						console.error(err)
					}).finally(() => this.loading = false)
				})
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
