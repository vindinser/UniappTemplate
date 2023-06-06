<!-- 添加中标通知车辆 -->
<template>
	<view>
		<!-- 顶部导航栏 -->
		<u-navbar title="添加中标通知车辆" />
		<!-- 内容 -->
		<view class="u-p-32">
			<u--form ref="uForm" :model="model" :rules="rules" labelPosition="left" labelWidth="96">
				<u-form-item label="拍卖编号" prop="auctionNumber" required>
					<u--input v-model="model.auctionNumber" placeholder="请输入拍卖编号" />
				</u-form-item>
				<u-form-item label="车牌号" prop="basicPlateNo" required>
					<u--input v-model="model.basicPlateNo" placeholder="请输入车牌号" />
				</u-form-item>
				<u-form-item label="车主姓名" prop="ownerName" required>
					<u--input v-model="model.ownerName" placeholder="请输入车主姓名" />
				</u-form-item>
				<u-form-item label="车主手机号" prop="ownerPhone" required>
					<u--input v-model="model.ownerPhone" placeholder="请输入车主手机号" />
				</u-form-item>
				<u-form-item label="车辆停放地" prop="auctionNumber" @click="selectParkingArea">
					<u--input v-model="model.auctionNumber" placeholder="请选择车辆停放地" disabled disabledColor="#ffffff" />
					<u-icon slot="right" name="arrow-right" />
				</u-form-item>
				<u-form-item label="详细地址" prop="detailedAddress" required>
					<u--input v-model="model.detailedAddress" placeholder="请输入详细地址" />
				</u-form-item>
				<u-form-item :label="emptyString">
					<u--textarea v-model="model.remark" placeholder="请输入备注" count />
				</u-form-item>
				<u-form-item label="图片信息" labelPosition="top" :borderBottom="false" prop="imageUrl" required>
					<!-- <u--input v-model="model.imageUrl" placeholder="请输入拍卖编号" /> -->
					图片
				</u-form-item>
			</u--form>
			<view class="u-m-t-56">
				<u-button type="primary" @click="submit">确认提交</u-button>
			</view>
		</view>
		<!-- 车辆停放地选择 -->
		<u-picker :show="parkingAreaPickerIsShow" :columns="parkingAreaPickerColumns" />
	</view>
</template>

<script>
	export default {
		data: () => ({
			model: {
				auctionNumber: '', // 拍卖编号
				basicPlateNo: '', // 车牌号
				ownerName: '', // 车主姓名
				ownerPhone: '', // 车主手机号
				detailedAddress: '', // 详细地址
				imageUrl: '', // 图片
				remark: '' // 备注
			},
			rules: {
				auctionNumber: { type: 'string', required: true, message: '请填写拍卖编号', trigger: ['blur', 'change'] },
				basicPlateNo: { type: 'string', required: true, message: '请填写车牌号', trigger: ['blur', 'change'] },
				ownerName: { type: 'string', required: true, message: '请填写车主姓名', trigger: ['blur', 'change'] },
				ownerPhone: { type: 'string', required: true, message: '请填写车主手机号', trigger: ['blur', 'change'] },
				detailedAddress: { type: 'string', required: true, message: '请填写详细地址', trigger: ['blur', 'change'] },
				imageUrl: { type: 'string', required: true, message: '请选择图片', trigger: ['blur', 'change'] },
			},
			emptyString: '',
			parkingAreaPickerIsShow: false,
			parkingAreaPickerColumns: [
				['中国', '美国', '日本']
			]
		}),
		onReady() {
			//如果需要兼容微信小程序，并且校验规则中含有方法等，只能通过setRules方法设置规则。
			this.$refs.uForm.setRules(this.rules)
		},
		methods: {
			// 确认提交按钮点击事件
			submit() {
				this.$refs.uForm.validate().then(res => {
					uni.$u.toast('校验通过')
				})
			},
			// 选择车辆停放地
			selectParkingArea() {
				uni.hideKeyboard()
				this.parkingAreaPickerIsShow = true
			}
		}
	}
</script>

<style lang="scss" scoped>
	.u-form /deep/ .u-form-item__body {
		padding: 16px 0;
	}
</style>
