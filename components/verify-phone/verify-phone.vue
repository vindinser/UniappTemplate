<!-- 验证手机号 -->
<template>
	<view class="u-p-32">
		<u-form ref="loginForm" :model="loginForm" :rules="rules">
			<u-form-item label="手机号码" prop="userPhone">
				<u-input v-model="loginForm.userPhone" :disabled="phoneNoDisabled" placeholder="输入手机号码" />
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
		<!-- 操作按钮 -->
		<view class="u-m-t-80">
			<u-button :text="toOrReLaunch === 'reLaunch' ? '确定' : '下一步'" type="primary" @click="handleLogin" />
		</view>
	</view>
</template>

<script>
	import { getCodeFn } from '@/common/untils/pubilcFn.js'
	import { determineCode, modifyUserPhone } from '@/api/login.js'
	
	export default {
		name:"verify-phone",
		props: {
			userPhone: {
				type: String,
				default: ''
			}, // 手机号
			nextRouterPath: {
				type: String,
				default: ''
			}, // 跳转的路径
			phoneNoDisabled: {
				type: Boolean,
				default: false
			}, // 手机号是否可输入
			toOrReLaunch: {
				type: String,
				default: 'to'
			} // to: 验证手机 reLaunch: 修改绑定的手机
		},
		data: () => ({
			loginForm: {
				userPhone: '',
				code: ''
			}, // 验证手机号表单
			rules: {
				userPhone: [{ required: true, message: '请输入手机号码' } ],
				code: [{ required: true, message: '请输入验证码' } ]
			}, // 找回密码表单验证规则
			tips: '',
			api: determineCode
		}),
		mounted() {
			this.userPhone !== '' && (this.loginForm.userPhone = this.userPhone)
			this.toOrReLaunch === 'toOrReLaunch' && (this.api = modifyUserPhone)
		},
		methods: {
			// 获取验证码
			getCode() {
				getCodeFn({ _this: this, userPhone: this.loginForm.userPhone })
			},
			// 下一步按钮点击事件
			handleLogin() {
				if(!this.nextRouterPath) return this.$modal.msg('操作有误请重试！')
				this.$refs.loginForm.validate().then(res => {
					this.api(this.loginForm).then(res => {
						const paramUrl = uni.$u.queryParams(this.loginForm)
						this.$tab[this.toOrReLaunch](`${ this.nextRouterPath }${ paramUrl }`)
					}).catch(err => {
						console.error(err)
						if(['验证码有误', '验证码过期'].includes(err)) return
						this.loginForm.code = ''
					})
				})
			}
		}
	}
</script>

<style lang="scss" scoped>

</style>