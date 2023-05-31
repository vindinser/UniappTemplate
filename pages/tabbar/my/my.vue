<template>
	<view class="u-sys user-box">
		<!-- 顶部导航栏 -->
		<u-navbar :title="emptyString" :left-icon="emptyString" :auto-back="false" :bg-color="`${ $u.config.color[`u-primary`] }`" />
		<!-- 用户信息 -->
		<view class="user-box_info">
			<u-avatar :src="login" mode="widthFix" size="56" />
			<view class="info-inner">
				<view class="info-inner_top">
					<text class="info-inner_top-name">{{ $store.getters.userName || '未认证' }}</text>
					<text v-if="this.$store.getters.auditStatus === 1" class="info-inner_top-status">
						<text class="iconfont icon-renzheng" />
						<text>定损员已认证</text>
					</text>
				</view>
				<view class="info-inner__intr" @click="handleItemClick(baseInfoPath)">
					<text>{{ $tools.encryptionPhoneNo($store.getters.userPhone) }}</text>
					<text>查看并编辑个人资料</text>
					<u-icon name="arrow-right" color="#fff" size="15px" />
				</view>
			</view>
		</view>
		<!-- 用户设置 -->
		<view class="user-box_setting">
			<view class="user-box_setting-cars setting-item" @click="$tab.switchTab(`/pages/tabbar/cars/cars`)">
				<text class="iconfont icon-quanbucheliang-shouye-zhong" :style="{ color: $u.config.color[`u-primary`] }" />
				<text>全部车辆</text>
				<view class="setting-item_icon">
					<u-icon name="arrow-right" />
				</view>
			</view>
			<view class="user-box_setting-info">
				<view class="setting-item" v-for="item, index in settingList" :key="index" @click="handleItemClick(item)">
					<text class="iconfont" :class="item.icon" :style="{ color: item.color }" />
					<text>{{ item.name }}</text>
					<view class="setting-item_icon">
						<u-icon name="arrow-right" />
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import login from "static/image/avatar/login.png"
	import unLogin from "static/image/avatar/unLogin.png"
	
	export default {
		data: () => ({
			login,
			unLogin,
			emptyString: '',
			settingList: [
				{ icon: 'icon-renzheng-wode', name: '定损员认证', color: '#5AC725', path: '/pages/assess/authentication/authentication' },
				{ icon: 'icon-zhanghaoyuanquan-wode', name: '账号与安全', color: '#EAAA08', path: '/pages/set/account/account' },
				{ icon: 'icon-shezhi-wode', name: '设置', color: '#1570EF', path: '/pages/set/setting/setting' },
				{ icon: 'icon-tixing', name: '消息', color: '#1570EF', path: '' }
			],
			baseInfoPath: {
				path: ''
			}
		}),
		onShow() {
			if(this.$store.getters.auditStatus !== 1) {
				console.log('获取定损员信息')
			}
		},
		methods: {
			// 点击跳转设置项
			handleItemClick({ path }) {
				console.log(path)
				// this.$tab.to(path)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.user-box {
		background-color: $u-primary;
			
		&_info {
			height: 197px - 44px - 16px -16px;
			padding: 20px 16px 16px;
			@include custom-flex();
			@include custom-text($c: #fff, $s: 12px);
			
			.info-inner {
				margin-left: 16px;
				height: 56px;
				@include custom-flex($direction: column, $justify: center);
				
				&_top {
					color: $u-white-color;
					@include custom-flex($align: center);
					
					&-name {
						font-size: 18px;
						line-height: 24px;
						font-weight: 600;
					}
					
					&-status {
						margin-left: 8px;
						border-radius: 4px;
						padding: 2px;
						background-color: $uni-bg-color;
						@include custom-text($c: #5AC725, $s: 11px, $H: 13px, $ls: 0.066px);
					}
				}
				
				&__intr {
					margin-top: 4px;
					@include custom-flex($align: center);
					
					> text:nth-child(2) {
						margin: 0 4px;
					}
				}
			}
		}
		
		&_setting {
			flex: 1;
			padding: 32px 16px 0;
			position: relative;
			background-color: $uni-bg-color-grey;
			@include custom-flex($direction: column);
			
			@mixin custom-radius($tl: null, $tr: null, $bl: null, $br: null,) {
				border-top-left-radius: $tl;
				border-top-right-radius: $tr;
				border-bottom-left-radius: $bl;
				border-bottom-right-radius: $br;
			}
			
			&-cars {
				border-radius: 8px;
				background-color: $uni-bg-color;
				position: absolute;
				top: -48px;
				left: 16px;
				right: 16px;
			}
			
			&-info {
				flex: 1;
				overflow: auto;
				background-color: $uni-bg-color;
				@include custom-radius($tl: 8px, $tr: 8px)
			}
			
			.setting-item {
				height: 32px;
				padding: 16px;
				line-height: 32px;
				@include custom-flex($align: center);
				
				> text:nth-child(2) {
					margin-left: 8px;
				}
				
				&_icon {
					margin-left: auto;
				}
			}
		}
	}
</style>
