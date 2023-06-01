<!-- 修改密码 -->
<template>
	<view>
		<!-- 顶部导航栏 -->
		<u-navbar title="设置新密码" auto-back />
		<!-- 提示 -->
		<view class="prompt">修改成功后，请使用新密码登录！</view>
		<!-- 修改密码表单 -->
		<edit-pwd :code="code" :userPhone="userPhone" />
	</view>
</template>

<script>
	export default {
		data: () => ({
			userPhone: '',
			code: ''
		}),
		onLoad({ userPhone = '', code = ''}) {
			userPhone !== '' && (this.userPhone = userPhone)
			code !== '' && (this.code = code)
		},
	}
</script>

<style lang="scss" scoped>
	.prompt {
		padding: 16px;
		background-color: #FEF0F0;
		@include custom-text($c: #F04438, $H: 20px, $ls: -0.24px);
		font-feature-settings: 'case' on;
	}
</style>
