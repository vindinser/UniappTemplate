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
		<view class="login-box_form">
			<u-form ref="loginForm" :model="loginForm" :rules="rules">
				<u-form-item label="手机号码" prop="userPhone">
					<u-input v-model="loginForm.userPhone" placeholder="输入手机号码" />
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
				<u-button text="下一步" type="primary" @click="handleLogin" />
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
	import mixin from './mixin/mixin'
	import { determineCode } from '@/api/login.js'
	
	export default {
		mixins: [mixin],
		data: () => ({
			loginForm: {
				userPhone: '',
				code: ''
			}, // 找回密码表单
			rules: {
				userPhone: [{ required: true, message: '请输入手机号码' } ],
				code: [{ required: true, message: '请输入验证码' } ]
			}, // 找回密码表单验证规则
		}),
		onLoad({ userPhone = ''}) {
			userPhone !== '' && (this.loginForm.userPhone = userPhone)
		},
		methods: {
			// 下一步按钮点击事件
			handleLogin() {
				this.$refs.loginForm.validate().then(res => {
					determineCode(this.loginForm).then(res => {
						const paramUrl = uni.$u.queryParams(this.loginForm)
						this.$tab.to(`/pages/login/edit-password${ paramUrl }`)
					}).catch(err => {
						console.error(err)
						err === '验证码有误' && (this.loginForm.code = '')
					})
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