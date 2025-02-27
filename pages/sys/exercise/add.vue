<template>
	<view class="container">
		<u-navbar
			title="添加运动记录"
			:is-back="true"
			:background="{ background: '#ffffff' }"
		></u-navbar>
		
		<view class="form-container">
			<u-form :model="form" ref="uForm" :rules="rules">
				<u-form-item label="运动类型" prop="type">
					<u-select
						v-model="form.type"
						:list="exerciseTypes"
						@change="handleTypeChange"
					></u-select>
				</u-form-item>
				
				<u-form-item label="运动时长" prop="duration">
					<u-number-box
						v-model="form.duration"
						:min="1"
						:max="300"
						:step="1"
					></u-number-box>
					<text class="unit">分钟</text>
				</u-form-item>
				
				<u-form-item label="消耗卡路里" prop="calories">
					<u-input
						v-model="form.calories"
						type="number"
						placeholder="请输入消耗的卡路里"
					></u-input>
					<text class="unit">kcal</text>
				</u-form-item>
				
				<u-form-item label="运动日期" prop="date">
					<u-calendar
						v-model="showCalendar"
						:mode="'date'"
						@change="handleDateChange"
					></u-calendar>
				</u-form-item>
				
				<u-form-item label="备注" prop="remark">
					<u-input
						v-model="form.remark"
						type="textarea"
						placeholder="请输入运动备注"
					></u-input>
				</u-form-item>
			</u-form>
			
			<view class="submit-btn">
				<u-button type="primary" @click="handleSubmit">保存</u-button>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			form: {
				type: '',
				duration: 30,
				calories: '',
				date: '',
				remark: ''
			},
			rules: {
				type: [{
					required: true,
					message: '请选择运动类型',
					trigger: ['change', 'blur']
				}],
				duration: [{
					required: true,
					message: '请输入运动时长',
					trigger: ['change', 'blur']
				}],
				calories: [{
					required: true,
					message: '请输入消耗卡路里',
					trigger: ['change', 'blur']
				}],
				date: [{
					required: true,
					message: '请选择运动日期',
					trigger: ['change', 'blur']
				}]
			},
			exerciseTypes: [
				{
					value: '1',
					label: '跑步'
				},
				{
					value: '2',
					label: '游泳'
				},
				{
					value: '3',
					label: '骑行'
				},
				{
					value: '4',
					label: '健身'
				},
				{
					value: '5',
					label: '瑜伽'
				}
			],
			showCalendar: false
		}
	},
	methods: {
		handleTypeChange(value) {
			this.form.type = value
		},
		handleDateChange(value) {
			this.form.date = value
			this.showCalendar = false
		},
		handleSubmit() {
			this.$refs.uForm.validate(valid => {
				if (valid) {
					// TODO: 调用API保存运动记录
					uni.showToast({
						title: '保存成功',
						icon: 'success'
					})
					setTimeout(() => {
						uni.navigateBack()
					}, 1500)
				}
			})
		}
	}
}
</script>

<style lang="scss" scoped>
.container {
	min-height: 100vh;
	background-color: #f5f5f5;
	
	.form-container {
		margin: 20rpx;
		padding: 30rpx;
		background-color: #ffffff;
		border-radius: 16rpx;
		
		.unit {
			margin-left: 10rpx;
			color: #666;
			font-size: 28rpx;
		}
	}
	
	.submit-btn {
		margin-top: 40rpx;
	}
}
</style> 