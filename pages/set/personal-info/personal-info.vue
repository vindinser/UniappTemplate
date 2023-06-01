<!-- 用户基本信息 -->
<template>
	<view class="u-sys user-info">
		<!-- 顶部导航栏 -->
		<u-navbar title="基本信息" auto-back />
		<!-- 基本信息 -->
		<view class="user-info_container">
			<view class="user-info_container-item" v-for="item, index in baseInfo" :key="index" @click="itemClick(item)">
				<text>{{ item.name }}</text>
				<view v-if="item.type === 'img'">
					<u-avatar src="/static/image/avatar/login.png" mode="widthFix" size="48" />
				</view>
				<view class="item-right" v-else>
					<text>{{ item.textValue }}</text>
					<view class="u-m-l-16" v-if="item.path">
						<u-icon name="arrow-right" />
					</view>
				</view>
			</view>
		</view>
		<!-- 定损员认证信息 -->
		<view class="user-info_title">定损员认证信息</view>
		<view class="user-info_container">
			<view class="user-info_container-item" v-for="item, index in auditInfo" :key="index" @click="itemClick(item)">
				<text>{{ item.name }}</text>
				<view class="item-right">
					<text>{{ item.textValue || auditInfoValue }}</text>
					<text class="item-right_audit-status" v-if="item.vuex_valueKey === 'insureCompanyName' && $store.getters.auditStatus === 1">已核验</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data: () => ({
			list: [
				{ name: '头像', type: 'img' },
				{ name: 'ID', textValue: '', vuex_valueKey: 'userId' },
				{ name: '手机号', textValue: '', vuex_valueKey: 'userPhone', path: 'edit-phone' },
				{ name: '修改密码', textValue: '', path: 'edit-pwd' },
				{ name: '真实姓名', textValue: '', vuex_valueKey: 'userName', isAudit: true },
				{ name: '保险公司', textValue: '', vuex_valueKey: 'insureCompanyName', isAudit: true }
			]
		}),
		computed: {
			// 定损员基本信息
			baseInfo() {
				return this.list.filter(({ isAudit }) => !isAudit)
			},
			// 定损员认证信息
			auditInfo() {
				return this.list.filter(({ isAudit }) => isAudit)
			},
			// 认证信息
			auditInfoValue() {
				switch(this.$store.getters.auditStatus) {
					case 1:
						return '已认证'
					case 2:
						return '待审核'
					case 999:
						return '审核未通过'
					default:
						return '未认证'
				}
			}
		},
		onLoad() {
			this.getUserInfo()
		},
		methods: {
			// 获取用户信息
			getUserInfo() {
				this.baseInfo.forEach(item => {
					item.vuex_valueKey && (item.textValue = this.$store.getters[item.vuex_valueKey] || '')
				})
			},
			// 信息项点击事件
			itemClick({ path = '' }) {
				path !== '' && this.$tab.to(`/pages/set/verify-phone-no/verify-phone-no?nextRouterPath=${ path }`)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.user-info {
		padding: 16px 0;
		min-height: 100vh;
		background-color: #F3F4F6;
		
		&_title {
			padding: 16px 16px 8px;
			@include custom-text($c: #888888, $s: 12px, $H: 16px);

			line-height: 16px;
		}
		
		&_container {
			background-color: $uni-bg-color;
			
			&-item {
				height: 32px;
				padding: 16px;
				line-height: 32px;
				@include custom-flex($align: center, $justify: space-between);
				
				.item-right {
					@include custom-flex($align: center);
					
					&_audit-status {
						color: #5AC725;
						margin-left: 8px;
					}
				}
			}
		}
	}
</style>
