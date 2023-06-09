<!-- 图片上传组件 -->
<template>
	<view class="u-m-t-30">
		<u-upload
			:fileList="fileList1"
			@afterRead="afterRead"
			@delete="deletePic"
			@clickPreview="clickPreview"
			name="1"
			multiple
			:maxCount="maxCount"
			:deletable="deletable"
			:previewFullImage="true"
		/>
	</view>
</template>

<script>
	import md5Libs from "uni_modules/uview-ui/libs/function/md5"
	
	export default {
		props: {
			imgStr: {
				type: String,
				default: ''
			}, // 回显的图片 url
			picType: {
				type: String,
				default: 'pic_home'
			}, // 接口中所需参数
			maxCount: {
				type: Number,
				default: 10
			}, // 图片上传上限
			deletable: {
				type: Boolean,
				default: true
			} // 是否展示删除按钮
		},
		data() {
			return {
				fileList1: [],
				fileListSend: [], // 向外传递的图片数组
				isFristLoading: true
			}
		},
		methods: {
			// 第一次进入加载图片事件（watch事件监听无效）
			fristLoadImgs(imgStr) {
				imgStr.split(',').forEach(url => {
					this.fileList1.push({
						url: `${ this.$u.config.thumbnail_1080 }${ url }`
					})
					this.fileListSend.push({ url })
				})
			},
			// 删除图片
			deletePic(event) {
				this[`fileList${event.name}`].splice(event.index, 1)
				this.fileListSend.splice(event.index, 1)
				this.handleSendImg()
			},
			// 新增图片
			async afterRead(event) {
				// 当设置 multiple 为 true 时, file 为数组格式，否则为对象格式
				let lists = [].concat(event.file)
				let fileListLen = this[`fileList${event.name}`].length
				lists.map((item) => {
					this[`fileList${event.name}`].push({
						...item,
						status: 'uploading',
						message: '上传中'
					})
				})
				
				for (let i = 0; i < lists.length; i++) {
					const res = await this.uploadFilePromise(lists[i].url)
					let item = this[`fileList${event.name}`][fileListLen]
					this[`fileList${event.name}`].splice(fileListLen, 1, Object.assign(item, {
						status: res.success ? 'success' : 'failed',
						message: res.msg || '上传失败',
						url: `${ this.$u.config.thumbnail_1080 }${ res?.ListData?.[0] ?? '' }`
					}))
					this.fileListSend.splice(fileListLen, 1, {
						url: res?.ListData?.[0] ?? ''
					})
					fileListLen++
				}
				this.handleSendImg()
			},
			// 上传图片
			uploadFilePromise(url) {
				return new Promise((resolve, reject) => {
					uni.uploadFile({
						header: {
							// #ifdef APP-PLUS
							'User-Agent': this.setUserAgent(),
							// #endif
							// #ifdef MP-WEIXIN
							'Pic-Type': this.picType,
							'Content-Type': "multipart/form-data",
							// #endif
							'File-Sign': this.setFileSing()
						},
						formData: {
							// #ifndef MP-WEIXIN
							filePath: this.picType,
							// #endif
						},
						url: this.$u.config.newUpload,
						filePath: url,
						name: url,
						success: res => {
							console.log(JSON.parse(res.data))
							resolve(JSON.parse(res.data))
						},
						fail: err => {
							resolve(err)
						}
					})
				})
			},
			// 文件上传设置headers参数
			setUserAgent() {
				// #ifdef APP-PLUS
				return plus.navigator.getUserAgent().replace(' uni-app Html5Plus/1.0', '')
				// #endif
				// #ifdef MP-WEIXIN
				return this.$store.getters.wxAgent
				// #endif
				// #ifdef H5
				return window.navigator.userAgent
				// #endif
			},
			setFileSing() {
				let date = this.$u.timeFormat(new Date().getTime())
				let agent = this.setUserAgent()
				return md5Libs.md5(date + agent)
			},
			// 处理图片格式，并向外传递
			handleSendImg() {
				const imgStr = this.fileListSend.reduce((pre, { url }) => `${ pre }${ pre === '' ? '' : ',' }${ url }`, '')
				this.$emit('update:imgStr', imgStr)
				
			},
			// 全屏预览图片时触发事件
			clickPreview(url, lists, name) {
				console.log(url, lists, name)
			}
			
		}
	}
</script>

<style lang="scss" scoped>

</style>