<!-- 地址识别 -->
<template>
	<view style="width: 100%;">
		<u--input
			v-model="inputValue"
			:placeholder="placeholder"
			@change="inputValueChange"
			@blur="inputValueBlur"
		/>
	</view>
</template>

<script>
	import { SfSmartAddress } from '@/api/common.js'
	
	export default {
		name:"address-recognition",
		props: {
			value: {
				type: String,
				default: ''
			},
			placeholder: {
				type: String,
				default: '请输入地址'
			}
		},
		data: () => ({
			inputValue: ''
		}),
		methods: {
			// 输入框的值发色会给你变化
			inputValueChange(val) {
				this.$emit('update:value', val)
			},
			// 输入框失去焦点
			async inputValueBlur(val) {
				if(val === '') return
				const res = await SfSmartAddress(val)
				if(res.constructor !== Array || !res[0].success) return
				const [{result: [{originDestRegions: data}]}] = res
				const resolveAddress = {
					province: {
						code: data[0]?.provinceCode ?? '',
						name: data[0]?.name ?? ''
					}, // 省
					city: {
						code: data[1]?.cityCode ?? '',
						name: data[1]?.name ?? ''
					}, // 市
					area: {
						code: data[2]?.areaCode ?? '',
						name: data[2]?.name ?? ''
					}, // 县
				}
				this.$emit('update:resolveAddress', resolveAddress)
			}
		}
	}
</script>

<style>

</style>