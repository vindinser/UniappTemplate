<!-- 修改绑定手机号 -->
<template>
	<view>
		<!-- 顶部导航栏 -->
		<u-navbar title="修改绑定手机号" auto-back />
		<!-- 提示 -->
		<view class="prompt">修改成功后，请使用新手机号登录！</view>
		<!-- 修改手机号表单 -->
		<verify-phone nextRouterPath="/pages/login/login" toOrReLaunch="reLaunch" />
	</view>
</template>

<script>

</script>

<style lang="scss" scoped>
	.prompt {
		padding: 16px;
		background-color: #FEF0F0;
		@include custom-text($c: #F04438, $H: 20px, $ls: -0.24px);
		font-feature-settings: 'case' on;
	}
</style>
