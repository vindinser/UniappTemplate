<!-- 全部车辆 -->
<template>
	<view>
		<!-- 顶部导航栏 -->
		<u-navbar title="全部车辆" :left-icon="emptyString" :auto-back="false" />
		<!-- 搜索 -->
		<u-sticky bgColor="#fff">
			<view class="u-p-l-32 u-p-r-32">
				<u-search v-model="formSearch.keyword" shape="round" actionText="搜索" animation clearable />
			</view>
			<u-tabs :list="tabsList" @click="tabsClick" />
		</u-sticky>
		<!-- 列表 -->
		<view v-for="item in tableData.list" :key="item.auctionNumber" @click="carItemClick(item)">
			<car-item :item="item" />
		</view>
		<!-- 间隔槽 -->
		<u-gap height="8" bgColor="#f3f4f6" />
		<!-- 加载更多 -->
		<u-loadmore v-if="tableData.list.length > 0" :status="loadStatus" @loadmore="handleLoadmore" />
		<!-- 数据为空 -->
		<view class="u-m-t-80">
			<u-empty v-if="tableData.list.length === 0" />
		</view>
	</view>
</template>

<script>
	import { biddingCarList } from "@/api/assess.js"
	import CarItem from "./components/car-item.vue"
	
	export default {
		components: {
			CarItem
		},
		data: () => ({
			emptyString: '',
			formSearch: {
				keyword: '',
				status: 0,
				pageNo: 1,
				pageSize: '10'
			},
			tabsList: [
				{ name: '待接收', value: '0' },
				{ name: '已接收', value: '1' },
				{ name: '全部', value: '2' }
			],
			tableData: {
				list: [],
				total: 0
			},
			loadStatus: 'loadmore', // 上拉加载 (loadmore, loading, nomore)
			isRefresh: false, // 下拉刷新
		}),
		onShow() {
			// 未认证弹窗认证
			this.$tools.certificationPrompt()
		},
		onLoad() {
			this.$store.getters.auditStatus === 1 && this.getListData()
		},
		onTabItemTap(e) {
			// tab 点击时执行，此处直接接收单击事件
			console.log(e)
		},
		onPullDownRefresh() {
			if(this.$store.getters.auditStatus !== 1) {
				this.$tools.certificationPrompt()
				uni.stopPullDownRefresh()
			} else {
				this.isRefresh = true
				this.handRefresh()
			}
		},
		onReachBottom() {
			this.$store.getters.auditStatus === 1 && this.handleLoadmore()
		},
		methods: {
			// tabs 点击事件
			tabsClick({ value }) {
				this.formSearch.status = value
				this.handRefresh()
			},
			// 获取全部车辆数据
			getListData() {
				biddingCarList({
					"keyword": this.formSearch.keyword, // 关键字
					"status": Number(this.formSearch.status), // 状态码  0待接收   1已接收   2全部
					"pageNo": String(this.formSearch.pageNo), // 第X页
					"pageSize": this.formSearch.pageSize // 当页条数
				}).then(res => {
					if(!res.success) return this.handleData()
					this.handleData({
						ListData: res.ListData || [],
						count: res.data.count || 0
					})
				}).catch(err => {
					this.handleData()
					console.error(err)
				})
			},
			// 处理返回数据
			handleData(data) {
				if(data?.ListData && data?.count) { // 接口获取成功
					this.tableData.list = [...this.tableData.list, ...data.ListData]
					this.tableData.total = parseInt(data.count)
					// 判断有没有更多数据
					this.loadStatus = this.tableData.list.length >= this.tableData.total ? 'nomore' : 'loadmore'
					// 下拉刷新关闭
					if (this.isRefresh) {
						uni.stopPullDownRefresh()
						this.isRefresh = false
					}
				} else { // 接口获取失败
					this.loadStatus = 'loadmore'
					this.isRefresh && uni.stopPullDownRefresh()
				}
			},
			// 加载更多
			handleLoadmore() {
				if (this.loadStatus !== 'loadmore') return
				// 加载更多
				this.loadStatus = 'loading'
				this.formSearch.pageNo++
				this.getListData()
			},
			// 刷新
			handRefresh() {
				this.formSearch.pageNo = 1
				this.tableData.list = []
				this.getListData()
			},
			// 点击进入详情
			carItemClick({ auctionNumber = '' }) {
				this.$tab.to(`/pages/assess/car-detail/car-detail?auctionNumber=${ auctionNumber }`)
			}
		}
	}
</script>

<style lang="scss" scoped>
	
</style>
