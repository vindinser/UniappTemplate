<!-- 车辆详情 -->
<template>
	<view class="detail-box">
		<!-- 顶部导航栏 -->
		<u-navbar title="车辆信息详情" />
		<!-- 车辆基本详情 -->
		<car-item :item="carInfo">
			<template #image>
				<upload-files ref="imageViewRef" :imgStr.sync="carInfo.imageUrl" :maxCount="0" :deletable="false" />
			</template>
		</car-item>
		<!-- 间隔槽 -->
		<u-gap height="8" bgColor="#f3f4f6" />
		<!-- 处置信息 -->
		<view class="disposal-info">
			<view class="disposal-info_header">处置信息</view>
			<view class="disposal-info_body">
				<u-steps direction="column" current="0" dot>
					<u-steps-item v-for="item, index in disposalInfo" :title="item.title" :desc="item.desc" :key="index" />
				</u-steps>
			</view>
		</view>
	</view>
</template>

<script>
	import CarItem from "@/pages/tabbar/cars/components/car-item.vue"
	import { biddingCarDetails } from "@/api/assess.js"
	
	export default {
		components: {
			CarItem
		},
		data: () => ({
			carInfo: {
				basicPlateNo: '',
				status: '',
				auctionNumber: '',
				userName: '',
				userPhone: '',
				area: '',
				remark: '',
				createTime: '',
				imageUrl: ''
			},
			disposalInfo: []
		}),
		onLoad({ auctionNumber }) {
			auctionNumber && this.getDetailData(auctionNumber)
		},
		methods: {
			// 获取详情
			async getDetailData(auctionNumber) {
				const res = await biddingCarDetails({ auctionNumber })
				console.log(res)
				for(let k in this.carInfo) {
					if(k.includes('user')) {
						this.carInfo[k] = res.data?.[k.replace('user','owner')] ?? ''
					} else {
						this.carInfo[k] = res.data?.[k] ?? ''
					}
				}
				this.disposalInfo = res.ListData.map(item => ({
					title: `${ item.statusName } \xa0\xa0\ ${ item. createTime}`,
					desc: item.message
				}))
				this.$nextTick(() => {
					res.data.imageUrl && this.$refs.imageViewRef.fristLoadImgs(res.data.imageUrl)
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.detail-box {
		height: 100vh;
		@include custom-flex($direction: column);
		
		.disposal-info {
			flex: 1;
			padding: 16px;
			overflow: hidden;
			@include custom-flex($direction: column);
			
			&_header {
				padding: 8px 0;
				border-bottom: 1px solid #F3F4F6;
				@include custom-flex($align: center);
			}
			
			&_body {
				flex: 1;
				padding-top: 16px;
				overflow: auto;
			}
		}
	}
</style>
