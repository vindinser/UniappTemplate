<!-- 权限管理 -->
<template>
	<view class="u-sys">
		<!-- 顶部导航栏 -->
		<u-navbar title="权限管理" auto-back />
		<!-- 间隔槽 -->
		<u-gap height="8" bgColor="#f3f4f6" />
		<!-- 权限管理 -->
		<u-cell-group :border="false">
			<block v-for="(item, index) in list" :key="index">
				<u-cell
					:title="item.title"
					:value="item.value"
					isLink
					:value-style="item.valueStyle"
					@click="itemClick(item)"
				>
					<template #label>
						<view style="width: 420rpx; color: #999999; font-size: 13px; line-height: 18px; margin-top: 3px;">{{ item.label }}</view>
					</template>
				</u-cell>
			</block>
		</u-cell-group>
		<!-- 模态框 -->
		<u-modal
			:show="modal.show"
			:title="modal.title"
			:content="modal.content"
			:confirm-color="$u.color.primary"
			cancel-text="再想想"
			confirm-text="去设置"
			showCancelButton
			closeOnClickOverlay
			@confirm="gotoAppPermissionSetting"
			@cancel="modal.show = false"
			@close="modal.show = false"
		/>
	</view>
</template>

<script>
	export default {
		data: () => ({
			list: [{
				title: '允许华正东方开启位置权限',
				label: '设置详细地址，根据位置信息便于给你提供服务。',
				value: '去设置'
			}, {
				title: '允许华正东方开启相机权限',
				label: '进行拍照、录视频。',
				value: '去设置'
			}, {
				title: '允许华正东方访问相册权限',
				label: '用于实现图片或视频上传。设置头像、上传个人认证图片等。',
				value: '去设置'
			}],
			modal: {
				show: false,
				title: '',
				content: ''
			}
		}),
		methods: {
			// 点击去开启权限
			itemClick(item) {
				this.modal.title = item.title
				this.modal.content = '关闭后，将无法' + item.label
				this.modal.show = true
			},
			// 跳转到**应用**的权限页面
			gotoAppPermissionSetting() {
				// #ifndef APP-PLUS
				return this.modal.show = false
				// #endif
				var isIos = (plus.os.name == "iOS")
				if (isIos) {
					var UIApplication = plus.ios.import("UIApplication");
					var application2 = UIApplication.sharedApplication();
					var NSURL2 = plus.ios.import("NSURL");
					// var setting2 = NSURL2.URLWithString("prefs:root=LOCATION_SERVICES");		
					var setting2 = NSURL2.URLWithString("app-settings:");
					application2.openURL(setting2);
			
					plus.ios.deleteObject(setting2);
					plus.ios.deleteObject(NSURL2);
					plus.ios.deleteObject(application2);
				} else {
					// console.log(plus.device.vendor);
					var Intent = plus.android.importClass("android.content.Intent");
					var Settings = plus.android.importClass("android.provider.Settings");
					var Uri = plus.android.importClass("android.net.Uri");
					var mainActivity = plus.android.runtimeMainActivity();
					var intent = new Intent();
					intent.setAction(Settings.ACTION_APPLICATION_DETAILS_SETTINGS);
					var uri = Uri.fromParts("package", mainActivity.getPackageName(), null);
					intent.setData(uri);
					mainActivity.startActivity(intent);
				}
			}
		}
	}
</script>

<style>

</style>
