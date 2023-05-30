<!-- 账号设置与安全 -->
<template>
	<view class="u-sys">
		<!-- 顶部导航栏 -->
		<u-navbar title="账号设置与安全" auto-back />
		<!-- 间隔槽 -->
		<u-gap height="8" bgColor="#f3f4f6" />
		<!-- 账号设置与安全 -->
		<u-cell-group :border="false">
			<block v-for="item, index in list" :key="index">
				<u-cell :title="item.title" isLink titleStyle="padding: 6px 0;" @click="itemClick(item)" />
			</block>
		</u-cell-group>
	</view>
</template>

<script>
	export default {
		data: () => ({
			agreementlist: [],
			setList: [{
				title: '账号注销',
				path: 'pages/componentsC/write-off/write-off'
			}]
		}),
		computed: {
			list() {
				return [...this.agreementlist, ...this.setList]
			}
		},
		methods: {
			// 点击了设置项
			itemClick(item) {
				console.log(item)
			}
		}
	}
</script>

<style lang="scss" scoped>

</style>
