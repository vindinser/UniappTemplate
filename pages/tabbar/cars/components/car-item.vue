<!-- 车辆详情 -->
<template>
	<view>
		<!-- 间隔槽 -->
		<u-gap height="8" bgColor="#f3f4f6" />
		<view class="cars-item">
			<view class="cars-item_header">
				<text class="iconfont icon-chepaihao" style="color: #1570EF;" />
				<text class="u-m-l-24">{{ item.basicPlateNo }}</text>
				<view class="cars-item_header-status" :style="{color: item.status === '已提交' ? '#1570EF' : ''}">
					<text>{{ item.status }}</text>
					<u-icon v-if="!item.imageUrl" name="arrow-right" />
				</view>
			</view>
			<view class="cars-item_body">
				<view class="cars-item_body-item" v-for="items, index in listItemObjKey" :key="index">
					<view class="item-name">{{ items.name }}</view>
					<view class="item-value">{{ item[items.valueKey] || '-' }}</view>
				</view>
				<view class="cars-item_body-item img-box" v-if="item.imageUrl">
					<view class="item-name">图片信息</view>
					<view class="item-value img-box_container">
						<slot name="image" />
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			item: {
				type: Object,
				default: () => {}
			}
		},
		data: () => ({
			listItemObjKey: [
				{ name: '拍卖编号', valueKey: 'auctionNumber' },
				{ name: '车主姓名', valueKey: 'userName' },
				{ name: '车主手机号', valueKey: 'userPhone' },
				{ name: '车辆停放地', valueKey: 'area' },
				{ name: '备注', valueKey: 'remark' },
				{ name: '创建时间', valueKey: 'createTime' },
			]
		})
	}
</script>

<style lang="scss" scoped>
	.cars-item {
		padding: 16px;
		
		&_header {
			padding: 8px 0;
			border-bottom: 1px solid #F3F4F6;
			@include custom-flex($align: center);
			
			&-status {
				margin-left: auto;
				@include custom-flex($align: center);
			}
		}
		
		&_body {
			padding: 8px 0;
			
			&-item {
				padding: 8px 0;
				font-feature-settings: 'case' on;
				@include custom-flex($align: flex-start);
				@include custom-text($c: #909193, $H: 20px, $ls: -0.24px);
				
				.item-name {
					width: 100px;
				}
				
				.item-value {
					flex: 1;
				}
			}
			
			.img-box {
				@include custom-flex($direction: column);
				
				&_container {
					max-height: 200px;
					overflow: auto;
				}
			}
		}
	}
</style>