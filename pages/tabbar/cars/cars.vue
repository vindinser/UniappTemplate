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
		<view v-for="item in tableData.list" :key="item.auctionNumber">
			<!-- 间隔槽 -->
			<u-gap height="8" bgColor="#f3f4f6" />
			<view class="cars-item">
				<view class="cars-item_header">
					<text class="iconfont icon-chepaihao" style="color: #1570EF;" />
					<text class="u-m-l-24">{{ item.basicPlateNo }}</text>
					<view class="cars-item_header-status" :style="{color: item.status === '已提交' ? '#1570EF' : ''}">
						<text>{{ item.status }}</text>
						<u-icon name="arrow-right" />
					</view>
				</view>
				<view class="cars-item_body">
					<view class="cars-item_body-item" v-for="items, index in listItemObjKey" :key="index">
						<view class="item-name">{{ items.name }}</view>
						<view class="item-value">{{ item[items.valueKey] || '-' }}</view>
					</view>
				</view>
			</view>
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
	
	export default {
		data: () => ({
			emptyString: '',
			formSearch: {
				keyword: '',
				status: 2,
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
			listItemObjKey: [
				{ name: '拍卖编号', valueKey: 'auctionNumber' },
				{ name: '车主姓名', valueKey: 'userName' },
				{ name: '车主手机号', valueKey: 'userPhone' },
				{ name: '车辆停放地', valueKey: 'area' },
				{ name: '备注', valueKey: 'remark' },
				{ name: '创建时间', valueKey: 'createTime' },
			],
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
					"status": this.formSearch.status, // 状态码  0待接收   1已接收   2全部
					"pageNo": String(this.formSearch.pageNo), // 第X页
					"pageSize": this.formSearch.pageSize // 当页条数
				}).then(res => {
					console.log(res)
					if(!res.success) return this.handleData()
					this.handleData({
						ListData: resListData || [],
						count: res.data.count || 0
					})
				}).catch(err => {
					this.handleData()
					console.error(err)
				})
			},
			// 处理返回数据
			handleData(data) {
				// "area": "北京市-北京市-大兴区", // 车辆停放地
				// "auctionNumber": "bbp123138691212979", // 拍卖编号
				// "createTime": "2023-05-30 15:24:41", // 创建时间
				// "userPhone": "18032608755", // 车主手机号
				// "remark": "这是一条备注信息", // 备注信息
				// "userName": "张明辉2", // 车主姓名
				// "basicPlateNo": "京B88888", // 车牌号
				// "status": "已提交" // 状态
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
		}
	}
</script>

<style lang="scss" scoped>
	.cars-item {
		padding: 16px;
		
		&_header {
			padding: 8px 0;
			border-bottom: 1px solid #F3F4F6;
			@include custom-flex($align: center);
			
			&-status {
				margin-left: auto;
				@include custom-flex($align: center);
			}
		}
		
		&_body {
			padding: 8px 0;
			
			&-item {
				padding: 8px 0;
				font-feature-settings: 'case' on;
				@include custom-flex($align: flex-start);
				@include custom-text($c: #909193, $H: 20px, $ls: -0.24px);
				
				.item-name {
					width: 100px;
				}
				
				.item-value {
					flex: 1;
				}
			}
		}
	}
</style>
