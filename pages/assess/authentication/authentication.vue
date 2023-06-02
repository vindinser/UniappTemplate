<template>
	<view>
		<!-- 顶部导航栏 -->
		<u-navbar title="定损员认证" auto-back />
		<!-- 无数据 -->
		<view class="u-m-t-80" v-if="this.auditInfo.lossAdjusterCertification === ''">
			<u-empty text="无数据" />
		</view>
		<!-- 认证表单 -->
		<template v-else-if="this.auditInfo.lossAdjusterCertification === 0">
			<authentica-form @refreshAuditInfo="getLossAssessorInfo" />
		</template>
		<!-- 认证审核信息 -->
		<template v-else>
			<authentica-detail :auditInfo="auditInfo" />
		</template>
	</view>
</template>

<script>
	import AuthenticaForm from './components/form.vue'
	import AuthenticaDetail from './components/detail.vue'
	import { lossAssessorInfo } from "@/api/assess.js"
	
	export default {
		components: {
			AuthenticaForm,
			AuthenticaDetail
		},
		data: () => ({
			auditInfo: {
				insureCompanyName: '', // 保险公司
				lossAdjusterCertification: '', // 认证状态
				userPhone: '', // 电话号码
				userName: '', // 用户姓名
				userNumber: '' // 用户编号
			}
		}),
		onLoad() {
			this.$store.getters.auditStatus && this.getLossAssessorInfo()
		},
		methods: {
			// 获取定损员认证信息
			async getLossAssessorInfo() {
				const { data: res } = await lossAssessorInfo()
				for(let k in this.auditInfo) {
					this.auditInfo[k] = res[k] || ''
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	
</style>
