<!-- 首页 -->
<template>
	<view class="u-sys">
		<!-- 轮播 -->
		<u--image src="/static/image/index/index-bg.png" width="100vw" mode="widthFix" />
		<!-- 内容 -->
		<view class="index-box">
			<!-- 通知 -->
			<view class="u-m-b-32" v-if="this.$store.getters.auditStatus !== 1">
				<u-notice-bar text="请先进行认证,审核通过后可进行功能操作" />
			</view>
			<!-- 公示 -->
			<view class="index-box_top">
				<view class="index-box_top-item" v-for="item, index in iconList" :key="index" @click="iconItomClick(item)">
					<text class="iconfont item-icon" :class="item.icon" :style="{ color: item.color }" />
					<text>{{ item.name }}</text>
				</view>
			</view>
			<!-- 添加中标通知车辆 -->
			<view class="index-box_bottom">
				<view class="index-box_bottom-container">
					<view class="container-intr">
						<view class="container-intr_item" v-for="item, index in stepList" :key="index">
							<text>{{ index + 1 }}</text>
							<text>{{ item }}</text>
						</view>
					</view>
					<view class="u-m-t-80">
						<u-button text="添加中标通知车辆" type="primary" @click="addCar" />
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data: () => ({
			iconList: [
				{ icon: 'icon-gonggao', name: '华正公告', color: '#FF5E09', path: '' },
				{ icon: 'icon-changjianwenti', name: '常见问题', color: '#5AC725', path: '' },
				{ icon: 'icon-kefurexian', name: '客服热线', color: '#1570EF', path: '' }
			],
			stepList: ['填写车辆相关信息', '华正线上下线同步车辆接收状态']
		}),
		onShow() {
			this.$tools.certificationPrompt()
		},
		methods: {
			// icon点击事件
			iconItomClick({ path }) {
				console.log(path)
			},
			// 添加中标通知车辆按钮点击事件
			addCar() {
				console.log('addCar')
			}
		}
	}
</script>

<style scoped lang="scss">
	.index-box {
		flex: 1;
		padding: 16px;
		@include custom-flex($direction: column);
		
		&_top {
			@include custom-flex($justify: space-around);
			
			&-item {
				@include custom-flex($direction: column, $align: center);
				
				.item-icon {
					font-size: 36px;
					margin-bottom: 6px;
				}
				
				> text:nth-child(2) {
					@include custom-text($c: #000000, $h: null, $H: 24px, $ls: null);
				}
			}
		}
		
		&_bottom {
			flex: 1;
			margin-top: 16px;
			border-radius: 8px;
			background-color: $u-bg-color-grey;
			@include custom-flex($align: center, $justify: center);
			
			&-container {
				padding: 16px;
				width: 100%;
				
				.container-intr {
					@include custom-text($c: $u-black-color, $H: 24px);
					
					&_item {
						margin: 16px 0;
						
						> text:nth-child(1) {
							width: 18px;
							height: 18px;
							text-align: center;
							border-radius: 100%;
							margin-right: 16px;
							display: inline-block;
							border: 1px solid #9ACAFC;
							background-color: #9ACAFC;
							@include custom-text($c: $u-white-color, $H: 20px);
						}
					}
				}
			}
		}
	}
</style>
