<!-- 定损员认证 item -->
<template>
	<view class="">
		<view class="audit-info" v-for="items, indexs in list" :key="indexs">
			<view class="audit-info_item" v-for="item, index in items.list" :key="index">
				<view class="audit-info_item-name">{{ item.name }}</view>
				<view class="audit-info_item-value">{{ item.value }}</view>
			</view>
			<!-- #ifndef MP-WEIXIN -->
			<text
				class="audit-info_icon iconfont"
				:class="computedIcon('class', items)"
				:style="computedIcon('style', items)"
			/>
			<!-- #endif -->
			<!-- #ifdef  MP-WEIXIN -->
			<text v-if="[0, 2].includes(items.assessorApprovalStatus)" class="audit-info_icon iconfont icon-shenhezhong" style="color: #1570EF;" />
			<text v-else-if="items.assessorApprovalStatus === 1" class="audit-info_icon iconfont icon-yitongguo" style="color: #5AC725;" />
			<text v-else-if="items.assessorApprovalStatus === 999" class="audit-info_icon iconfont icon-weitongguo" style="color: #FF5B05;" />
			<!-- #endif --> 
		</view>
	</view>
</template>

<script>
	export default {
		name: 'CertificationItem',
		props: {
			list: {
				type: Array,
				default: () => []
			}
		},
		methods: {
			// 动态渲染 icon
			computedIcon(type, { assessorApprovalStatus: objKey = 0 }) {
				return (obj => 
					obj[objKey]?.[type] ?? ''
				)({
					0: { class: 'icon-shenhezhong', style: { color: '#1570EF' } },
					2: { class: 'icon-shenhezhong', style: { color: '#1570EF' } },
					1: { class: 'icon-yitongguo', style: { color: '#5AC725' } },
					999: { class: 'icon-weitongguo', style: { color: '#FF5B05' } }
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.audit-info {
		margin-bottom: 16px;
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
</style>