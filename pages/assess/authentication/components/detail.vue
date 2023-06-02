<!-- 审核认证信息 -->
<template>
	<view class="u-sys u-p-32">
		<view class="audit-info">
			<view class="audit-info_item" v-for="item, index in list" :key="index">
				<view class="audit-info_item-name">{{ item.name }}</view>
				<view class="audit-info_item-value">{{ item.value }}</view>
			</view>
			<text class="audit-info_icon iconfont icon-shenhezhong" :style="{ color: $u.config.color[`u-primary`] }" />
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			auditInfo: {
				type: Object,
				default: () => {}
			}
		},
		computed: {
			list() {
				return (arr => {
					if(this.auditInfo === {}) {
						return arr
					} else {
						arr.forEach(item => {
							item.value = this.auditInfo[item.keyName]
						})
						return arr
					}
				})([
					{ name: '保险公司', keyName: 'insureCompanyName', value: '' },
					{ name: '真实姓名', keyName: 'userName', value: '' },
					{ name: '手机号码', keyName: 'userPhone', value: '' },
					{ name: 'ID编号', keyName: 'userNumber', value: '' },
				])
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
				width: 64px;
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
</style>