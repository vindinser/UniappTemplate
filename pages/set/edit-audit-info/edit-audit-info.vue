<!-- 修改认证信息 -->
<template>
	<view>
		<!-- 顶部导航栏 -->
		<u-navbar title="修改定损员认证信息" auto-back />
		<!-- 提示 -->
		<view class="prompt">
			<view>1、为保证账号数据安全，变更以下信息，需要重新审核，审核通过后，之前的账号数据会清空。</view>
			<view class="u-m-t-16">2，变更手机号后，下次登录需使用变更后的手机登录</view>
		</view>
		<!-- 修改认证信息表单 -->
		<view class="u-m-t-16 u-p-32">
			<u-form ref="authenticationFormRef" :model="authenticationForm" :rules="rules">
				<u-form-item label="保险公司" prop="insureCompanyName" required>
					<u-input v-model="authenticationForm.insureCompanyName" placeholder="输入保险公司" />
				</u-form-item>
				<u-form-item label="真实姓名" prop="userName" required>
					<u-input v-model="authenticationForm.userName" placeholder="输入真实姓名" />
				</u-form-item>
				<u-form-item label="手机号码" required>
					<u-input v-model="authenticationForm.userPhone" placeholder="默认回显注册手机号" disabled />
				</u-form-item>
			</u-form>
			<view class="u-m-t-60">
				<u-button text="提交修改信息" type="primary" @click="submitAuthenc" />
			</view>
		</view>
	</view>
</template>

<script>
	import { authenticationInfo } from "@/api/assess.js"
	
	export default {
		data: () => ({
			authenticationForm: {
				insureCompanyName: '', // 保险公司
				userName: '', // 真实姓名
				userPhone: '', // 用户手机号
				code: '' // 验证码
			},
			rules: {
				insureCompanyName: [{ required: true, message: '请输入保险公司' }],
				userName: [{ required: true, message: '请输入真实姓名' }]
			},
		}),
		onLoad({ userPhone = '', code = ''}) {
			this.$store.getters.userName !== '' && (this.authenticationForm.userName = this.$store.getters.userName)
			this.$store.getters.insureCompanyName !== '' && (this.authenticationForm.insureCompanyName = this.$store.getters.insureCompanyName)
			userPhone !== '' && (this.authenticationForm.userPhone = userPhone)
			code !== '' && (this.authenticationForm.code = code)
		},
		methods: {
			// 提交修改认证信息
			submitAuthenc() {
				this.$refs.authenticationFormRef.validate().then(async () => {
					const res = await authenticationInfo(this.authenticationForm)
					if(!res.success) return
					// 获取当前页面栈实例（此时最后一个元素为当前页）
					let pages = getCurrentPages()
					// 上上页面的实例
					let prevPage = pages[pages.length -3]
					// 给上上一页面实例绑定方法
					prevPage.$vm.getLossAssessorInfo()
					// 返回上上页
					this.$tab.back(2)
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.prompt {
		padding: 16px;
		background-color: #FEF0F0;
		@include custom-text($c: #F04438, $H: 20px, $ls: -0.24px);
		font-feature-settings: 'case' on;
	}
</style>
