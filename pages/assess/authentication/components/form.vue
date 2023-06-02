<!-- 定损员认证表单 -->
<template>
	<view class="u-p-32">
		<view class="authentication-header">
			<view class="authentication-header_title">定损员认证</view>
			<view class="authentication-header_intr">需填写以下信息，认证审核后即可开通账号权限</view>
		</view>
		<!-- 认证表单 -->
		<view class="u-m-t-80">
			<u-form ref="authenticationFormRef" :model="authenticationForm" :rules="rules">
				<u-form-item label="保险公司" prop="insureCompanyName" required>
					<u-input v-model="authenticationForm.insureCompanyName" placeholder="输入保险公司" />
				</u-form-item>
				<u-form-item label="真实姓名" prop="userName" required>
					<u-input v-model="authenticationForm.userName" placeholder="输入真实姓名" />
				</u-form-item>
				<u-form-item label="手机号码" required>
					<u-input v-model="$store.getters.userPhone" placeholder="默认回显注册手机号" disabled />
				</u-form-item>
			</u-form>
			<view class="u-m-t-80">
				<u-button text="提交认证" type="primary" @click="submitAuthenc" />
				<view class="btn-intr">提交后我司会进行审核，审核通过后可添加中标通知车辆</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { lossAssessmentFillIn } from "@/api/assess.js"
	
	export default {
		data: () => ({
			authenticationForm: {
				insureCompanyName: '', // 保险公司
				userName: '' // 真实姓名
			},
			rules: {
				insureCompanyName: [{ required: true, message: '请输入保险公司' }],
				userName: [{ required: true, message: '请输入真实姓名' }]
			},
		}),
		methods: {
			// 提交认证
			submitAuthenc() {
				this.$refs.authenticationFormRef.validate().then(async () => {
					const res = await lossAssessmentFillIn(this.authenticationForm)
					if(!res.success) return
					this.$emit('refreshAuditInfo')
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.authentication-header {
		@include custom-text($c: $u-main-color, $H: 20px, $ls: -0.24px);
		font-feature-settings: 'case' on;
		
		&_title {
			margin-bottom: 8px;
			@include custom-text($c: $u-black-color, $s: 20px, $w: 600, $H: 25px, $ls: 0.38px);
		}
	}
	
	.btn-intr {
		margin-top: 12px;
		@include custom-text($c: $uni-text-color-secondary, $s: 12px, $H: 16px);
		text-align: center;
	}
</style>