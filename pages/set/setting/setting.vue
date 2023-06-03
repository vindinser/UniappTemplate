<!-- 设置 -->
<template>
	<view class="u-sys">
		<!-- 顶部导航栏 -->
		<u-navbar title="设置" auto-back />
		<!-- 间隔槽 -->
		<u-gap height="8" bgColor="#f3f4f6" />
		<!-- 权限管理 -->
		<u-cell-group :border="false">
			<block v-for="(item, index) in setList" :key="index">
				<u-cell :title="item.title" isLink titleStyle="padding: 6px 0;" @click="itemClick(item)" />
			</block>
		</u-cell-group>
		<!-- 退出登录 -->
		<view class="logout-btn">
			<u-button text="退出登录" type="error" @click="logOut" />
		</view>
	</view>
</template>

<script>
	export default {
		data: () => ({
			setList: [
				{
					title: '权限管理',
					path: '/pages/set/rights/rights'
				}
			]
		}),
		methods: {
			// 点击了设置项
			itemClick({ path }) {
				this.$tab.to(path)
			},
			// 退出登录
			logOut() {
				this.$store.dispatch('LogOut').then(() => this.$tab.reLaunch(`/pages/login/login`))
			}
		}
	}
</script>

<style lang="scss">
	.logout-btn {
		position: absolute;
		/* #ifndef MP-WEIXIN */
		bottom: -34px;
		/* #endif */
		/* #ifdef  MP-WEIXIN */
		bottom: 24px;
		/* #endif */
		left: 16px;
		right: 16px;
	}
</style>
