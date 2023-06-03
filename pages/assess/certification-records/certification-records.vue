<!-- 认证记录 -->
<template>
	<view class="u-p-32">
		<!-- 顶部导航栏 -->
		<u-navbar title="定损员认证记录" auto-back />
		<!-- 定损员认证记录 -->
		<certification-item :list="certificationRecordsList" />
	</view>
</template>

<script>
	import { certificationApproval } from '@/api/assess.js'
	import CertificationItem from '../authentication/components/certification-item.vue'
	
	export default {
		components: {
			CertificationItem
		},
		data: () => ({
			certificationRecordsList: []
		}),
		onLoad() {
			this.getCertificationRecordsList()
		},
		methods: {
			// 获取定损员审批记录
			async getCertificationRecordsList() {
				const res = await certificationApproval()
				if(!res.success || res.ListData.length === 0) return this.certificationRecordsList = []
				this.certificationRecordsList = res.ListData.map(item => ({
					list: [
						{ name: '保险公司', value: item.insureCompanyName },
						{ name: '真实姓名', value: item.userName },
						{ name: '手机号码', value: item.userPhone },
						{ name: 'ID编号', value: item.userNumber },
					],
					assessorApprovalStatus: item.assessorApprovalStatus
				}))
			}
		}
	}
</script>

<style>

</style>
