<!-- 账号设置与安全 -->
<template>
	<view class="u-sys">
		<!-- 顶部导航栏 -->
		<u-navbar title="账号设置与安全" auto-back />
		<!-- 账号设置与安全 -->
		<u-cell-group :border="false">
			<block v-for="(item, index) in [...agreementlist, ...setList]" :key="index">
				<u-cell :title="item.title" :index="index" @click="itemClick(item)" />
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
