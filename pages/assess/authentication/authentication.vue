<template>
	<view class="u-sys">
		<!-- 顶部导航栏 -->
		<u-navbar title="定损员认证" auto-back />
		<!-- 认证表单 -->
		<template v-if="!isAudit">
			<authentica-form />
		</template>
		<!-- 认证审核信息 -->
		<template v-else>
			<authentica-detail />
		</template>
		
	</view>
</template>

<script>
	import AuthenticaForm from './components/form.vue'
	import AuthenticaDetail from './components/detail.vue'
	
	export default {
		components: {
			AuthenticaForm,
			AuthenticaDetail
		},
		data: () => ({
			isAudit: false, // true: 已提交过审核 false： 未提交过审核
		}),
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
	
</style>
