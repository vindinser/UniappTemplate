<template>
	<view>
		首页
		<text class="iconfont icon-shouye-select" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		onLoad() {
			console.log(this.$store.getters.auditStatus)
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
