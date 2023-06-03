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
				path: 'accountCancellation'
			}]
		}),
		computed: {
			list() {
				return [...this.agreementlist, ...this.setList]
			}
		},
		methods: {
			// 点击了设置项
			itemClick({ path = '' }) {
				if(path === 'accountCancellation') {
					this.$modal.confirm(
						`您在此平台注册的信息将全部删除
1、您在此平台注册的信息将全部删除，填写的个人资料信息将永久删除且无法恢复
2、上传的车辆资料和信息将永久删除且无法恢复
						`, 
						'账号注销提示',
						'取消',
						'申请注销'
					).then(() => {
						this.$store.dispatch('LogOff').then(() => this.$tab.reLaunch(`/pages/login/login`))
					})
				} else {
					console.log(path)
				}
			}
		}
	}
</script>

<style lang="scss" scoped>

</style>
