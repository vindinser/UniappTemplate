<!-- 省市县选择 -->
<template>
	<view class="select-area" @click="selectParkingArea">
		<u--input v-model="selectPlaceName" :placeholder="placeholder" disabled disabledColor="#ffffff" />
		<!-- 选择省市县弹窗 -->
		<u-popup :show="show" mode="bottom" round="16">
			<!-- 标题 -->
			<view class="popup-head">
				<view class="popup-head__title">
					<text>{{ placeholder }}</text>
					<u-icon class="popup-head__title-icon" name="close" @click="show = false" />
				</view>
				<!-- 搜索 -->
				<u-search v-model="keyword" shape="square" actionText="搜索" animation @search="handleSearch" @clear="handleSearch" @custom="handleSearch" />
			</view>
			<!-- 内容 -->
			<view class="popup-body">
				<!-- 默认展示 -->
				<swiper v-if="!search" :current="swiperIndex" next-margin="450rpx" style="height: 100%;" @change="swiperChange">
					<!-- 省 -->
					<swiper-item v-for="(item1, index1) in swiperList" :key="index1">
					    <scroll-view scroll-y class="list-box u-border-top">
					        <view class="list-box_item u-border-bottom" v-for="item in item1" :key="item.code" @click="swiperItemChange(item, index1)" v-show="item.show">
					            <u-icon
									v-if="isSelect(item, index1)"
									name="checkmark"
									class="u-m-r-10 u-primary"
									color="`${ $u.config.color[`u-primary`] }`"
								/>
					            <view
									class="u-flex-1 u-line-1 u-font-xs"
									:class="{ 'u-primary font-weight-bold': isSelect(item, index1) }"
								>{{ item.name }}</view>
					            <u-icon v-if="index1 < 2" name="arrow-right" />
					        </view>
					    </scroll-view>
					</swiper-item>
				</swiper>
			</view>
			<!-- 底部 -->
			<view class="popup-foot">
			    <u-button type="primary" shape="circle" @click="confirm">确定</u-button>
			</view>
		</u-popup>
		<u-icon name="arrow-right" />
	</view>
</template>

<script>
	import { hzdfProvince, hzdfCity, hzdfArea } from "@/api/common.js"
	
	export default {
		name:"select-area",
		props: {
			value: {
				type: Object,
				default: () => {}
			},
			placeholder: {
				type: String,
				default: '请选择省市县'
			}
		},
		data: () => ({
			show: false,
			search: false,
			swiperIndex: 0,
			provinceList: [], // 省
			cityList: [], // 市
			areaList: [], // 县
			selectItem: {
				province: {
					code: '',
					name: ''
				}, // 选择的省
				city: {
					code: '',
					name: ''
				}, // 选择的市
				area: {
					code: '',
					name: ''
				}, // 选择的县
			},
			level: ['province', 'city', 'area'],
			apiArr: [hzdfProvince, hzdfCity, hzdfArea],
			keyword: '',
			selectPlaceName: ''
		}),
		computed: {
			swiperList() {
				return ((a, b, c) => {
					if(c.length !== 0) {
						return [a, b, c]
					} else if(b.length !== 0) {
						return [a, b]
					} else {
						return [a]
					}
				})(this.provinceList, this.cityList, this.areaList)
			}
		},
		mounted() {
			this.getSwiperItemList()
		},
		methods: {
			// 选择车辆停放地
			selectParkingArea() {
				uni.hideKeyboard()
				this.show = !this.show
			},
			// swiper改变
			swiperChange({ detail: { current } }) {
				this.keyword = ''
				this.swiperIndex = current
			},
			// 选择的省改变
			swiperItemChange(val, index) {
				this.swiperIndex = index > 0 ? index - 1 : index // 切换swiper的索引
				this.selectItem[this.level[index]] = val
				index < 2 && this.getSwiperItemList(index + 1, val.code)
			},
			// 获取省/市/县
			async getSwiperItemList(index = 0, code = '') {
				index !== 3 && (this.areaList = [])
				const level = this.level[index]
				const res = await this.apiArr[index](code)
				if(!res.success) return this[`${ level }List`] = []
				this[`${ level }List`] = res.ListData.map(item => ({
					code: item[`${ level }Code`],
					name: item[`${ level }Name`],
					show: item[`${ level }Code`].includes(this.keyword) || item[`${ level }Name`].includes(this.keyword),
					parentCode: code
				}))
			},
			// 是否选中
			isSelect(item, index) {
				return this.selectItem[this.level[index]].code === item.code
			},
			// 搜索事件
			handleSearch() {
				console.log(this.swiperList, this.swiperList.length)
				this.handelSearchList(this.provinceList)
				if(this.swiperList.length < 2) return
				console.log('city')
				const cityArr = this.handelSearchList(this.cityList)
				cityArr.length > 0 && this.handelSearchList(this.provinceList, cityArr)
				if(this.swiperList.length < 3) return
				console.log('area')
				const areaArr = this.handelSearchList(this.areaList)
				if(areaArr.length < 0) return
				const proviceArr = this.handelSearchList(this.cityList, areaArr)
				proviceArr.length > 0 && this.handelSearchList(this.provinceList, proviceArr)
			},
			// 处理搜索
			handelSearchList(arr, codeSetArr = []) {
				let codeSet = new Set()
				arr.forEach(item => {
					if(codeSetArr.length > 0) {
						codeSetArr.includes(item.code) && (item.show = true)
					} else {
						const show = item.code.includes(this.keyword) || item.name.includes(this.keyword)
						item.show = show
					}
					if(item.show && item.parentCode !== '') {
						codeSet.add(item.parentCode)
					}
				})
				return [...codeSet]
			},
			// 确定按钮点击事件
			confirm() {
				for(let k in this.selectItem) {
					this.selectPlaceName = `${ this.selectPlaceName }${ this.selectPlaceName === '' ? '' : ' ' } ${ this.selectItem[k].name }`
				}
				this.$emit('update:value', this.selectItem)
				this.show = false
			}
		},
		options: { styleIsolation: 'shared' } // 解决微信小程序 /deep/ 不生效
	}
</script>

<style scoped lang="scss">
	.select-area {
		width: 100%;
		@include custom-flex($align: center);
		
		/deep/ .u-popup {
			flex: 0;
		}
		
		.popup-head {
			padding: 30rpx;
			
			&__title {
				text-align: center;
				position: relative;
				margin-bottom: 30rpx;
				@include custom-text($s: 16px, $w: 600);
				
				&-icon {
					position: absolute;
					top: 4rpx;
					right: 0;
				}
			}
		}
		
		.popup-body {
			width: 100%;
			height: 40vh;
			
			.list-box {
				width: 100%;
				height: 100%;
				
				&_item {
					padding: 20rpx 30rpx;
					display: flex;
					align-items: center;
				}
			}
			
			.font-weight-bold {
				font-weight: 700;
			}
		}
		
		.popup-foot {
			padding: 30rpx;
		}
	}
</style>