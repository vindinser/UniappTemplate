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
			}
		}
	}
</script>

<style lang="scss">

</style>
