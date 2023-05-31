<template>
	<view>
		cars123
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		onShow() {
			// 未认证弹窗认证
			this.$tools.certificationPrompt()
		},
		onTabItemTap(e) {
			// tab 点击时执行，此处直接接收单击事件
			console.log(e)
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
