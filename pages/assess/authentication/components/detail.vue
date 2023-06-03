<!-- 审核认证信息 -->
<template>
	<view class="u-p-32">
		<!-- 认证信息 -->
		<certification-item :list="list" />
		<!-- 修改认证信息按钮 -->
		<view class="u-m-t-60" v-if="auditInfo.lossAdjusterCertification === 1">
			<u-button text="修改认证信息" type="primary" plain @click="editAuditInfo" />
		</view>
		<!-- 认证记录 -->
		<view class="certification-records" @click="viewAuditRecords">
			<text class="u-m-r-8">认证记录</text>
			<u-icon name="arrow-right" color="#909399" size="15px" />
		</view>
	</view>
</template>

<script>
	import CertificationItem from './certification-item.vue'
	
	export default {
		components: {
			CertificationItem
		},
		props: {
			auditInfo: {
				type: Object,
				default: () => {}
			}
		},
		computed: {
			list() {
				return ((list, assessorApprovalStatus = 0) => {
					this.auditInfo !== {} && list.forEach(item => {
						item.value = this.auditInfo[item.keyName]
					})
					return [{ list, assessorApprovalStatus }]
				})([
					{ name: '保险公司', keyName: 'insureCompanyName', value: '' },
					{ name: '真实姓名', keyName: 'userName', value: '' },
					{ name: '手机号码', keyName: 'userPhone', value: '' },
					{ name: 'ID编号', keyName: 'userNumber', value: '' },
				], this.auditInfo.lossAdjusterCertification)
			}
		},
		methods: {
			// 修改认证信息
			editAuditInfo() {
				this.$tab.to(`/pages/set/verify-phone-no/verify-phone-no?nextRouterPath=edit-audit-info`)
			},
			// 查看认证记录
			viewAuditRecords() {
				this.$tab.to('/pages/assess/certification-records/certification-records')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.audit-info {
		padding: 16px;
		border-radius: 8px;
		border: 0.545301px solid #F3F4F6;
		box-shadow: 0px 2px 9px 2px rgba(0, 0, 0, 0.03);
		position: relative;
		overflow: auto;
		
		&_item {
			@include custom-text($c: $u-main-color, $H: 22px, $ls: -0.24px);
			@include custom-flex();
			
			&-name {
				width: 74px;
			}
			
			&-value {}
		}
		
		&_icon {
			font-size: 60px;
			position: absolute;
			top: -10px;
			right: -10px;
			transform: rotate(-30deg);
		}
	}
	
	.certification-records {
		left: 0;
		right: 0;
		bottom: 32px;
		position: absolute;
		@include custom-flex($align: center, $justify: center);
		@include custom-text($c: #909399, $s: 12px, $h: 16px, $H: 16px);
	}
</style>