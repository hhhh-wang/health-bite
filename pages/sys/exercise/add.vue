<template>
	<view class="container">
		<!-- 顶部导航栏 -->
		<view class="custom-navbar">
			<view class="left" @click="goBack">
				<view class="back-button">
					<u-icon name="arrow-left" color="#333" size="20"></u-icon>
				</view>
			</view>
			<view class="center">
				<text class="title">添加运动记录</text>
			</view>
		</view>
		
		<view class="form-container">
			<u-form :model="form" ref="uForm" :rules="rules">
				<!-- 运动类型选择 -->
				<view class="form-item">
					<view class="label">运动类型</view>
					<view class="type-selector" @click="showTypeSelect = true">
						<text v-if="selectedTypeName" class="selected-type">{{ selectedTypeName }}</text>
						<text v-else class="placeholder">请选择运动类型</text>
						<u-icon name="arrow-right" size="20" color="#666"></u-icon>
					</view>
					<u-select
						v-model="showTypeSelect"
						:list="exerciseTypes"
						@confirm="handleTypeChange"
						@cancel="showTypeSelect = false"
					></u-select>
				</view>
				
				<!-- 运动时长 -->
				<view class="form-item">
					<view class="label">运动时长</view>
					<view class="duration-selector" @click="showDurationPicker = true">
						<text v-if="form.duration" class="selected-duration">{{ formatDuration }}</text>
						<text v-else class="placeholder">请选择运动时长</text>
						<u-icon name="arrow-right" size="20" color="#666"></u-icon>
					</view>
					<u-select
						v-model="showDurationPicker"
						:list="durationList"
						@confirm="onDurationConfirm"
						@cancel="showDurationPicker = false"
					></u-select>
				</view>
				
				<!-- 消耗卡路里 -->
				<view class="form-item">
					<view class="label">消耗卡路里</view>
					<view class="calorie-input">
						<u-input
							v-model="form.calories"
							type="number"
							placeholder="请输入消耗的卡路里"
							:border="false"
							:placeholderStyle="'color: #999'"
						></u-input>
						<text class="unit">kcal</text>
					</view>
				</view>
				

			
				<!-- 备注 -->
				<view class="form-item">
					<view class="label">备注</view>
					<u-input
						v-model="form.remark"
						type="textarea"
						placeholder="请输入运动备注"
						:border="false"
						height="100"
						:placeholderStyle="'color: #999'"
					></u-input>
				</view>
			</u-form>
			
			<!-- 保存按钮 -->
			<view class="submit-btn">
				<u-button 
					type="primary" 
					@click="handleSubmit"
					:customStyle="{
						background: '#42d392',
						color: '#ffffff',
						borderRadius: '50rpx',
						height: '90rpx',
						fontSize: '32rpx'
					}"
				>保存</u-button>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			showDurationPicker: false,
			durationList: (() => {
				const list = []
				// 从5分钟到3小时，每5分钟一个选项
				for(let i = 5; i <= 180; i += 5) {
					const hours = Math.floor(i / 60)
					const minutes = i % 60
					let label = ''
					if (hours > 0) {
						label += `${hours}小时`
					}
					if (minutes > 0 || hours === 0) {
						label += `${minutes}分钟`
					}
					list.push({
						value: i.toString(),
						label: label
					})
				}
				return list
			})(),
			form: {
				type: '',
				duration: '',
				hours: 0,
				minutes: 30,
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
				}]
			},
			exerciseTypes: [
				{ value: '1', label: '跑步' },
				{ value: '2', label: '游泳' },
				{ value: '3', label: '骑行' },
				{ value: '4', label: '健身' },
				{ value: '5', label: '瑜伽' },
				{ value: '6', label: '篮球' },
				{ value: '7', label: '足球' },
				{ value: '8', label: '乒乓球' }
			],
			showCalendar: false,
			showTypeSelect: false,
			selectedTypeName: ''
		}
	},
	computed: {
		formatDuration() {
			const hours = this.form.hours
			const minutes = this.form.minutes
			if (hours === 0) {
				return `${minutes}分钟`
			}
			return `${hours}小时${minutes}分钟`
		}
	},
	methods: {
		goBack() {
			uni.navigateBack()
		},
		handleTypeChange(e) {
			console.log('选择的运动类型:', e)
			const value = e[0].value
			const label = e[0].label
			this.form.type = value
			this.selectedTypeName = label
			this.showTypeSelect = false
		},
		handleDateChange(e) {
			this.form.date = `${e.year}-${e.month}-${e.day}`
			this.showCalendar = false
		},
		onDurationConfirm(e) {
			const totalMinutes = parseInt(e[0].value)
			this.form.hours = Math.floor(totalMinutes / 60)
			this.form.minutes = totalMinutes % 60
			this.form.duration = totalMinutes
			this.showDurationPicker = false
		},
		handleSubmit() {
			this.$refs.uForm.validate(valid => {
				if (valid) {
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
	background-color: #ffffff;
	
	.custom-navbar {
		display: flex;
		align-items: center;
		padding: 20rpx 40rpx;
		background-color: #ffffff;
		height: 120rpx;
		
		.left {
			.back-button {
				width: 80rpx;
				height: 80rpx;
				background-color: rgb(246, 247, 247);
				border-radius: 50%;
				display: flex;
				align-items: center;
				justify-content: center;
			}
		}
		
		.center {
			flex: 1;
			text-align: center;
			
			.title {
				font-size: 36rpx;
				font-weight: bold;
				color: #333;
			}
		}
	}

	.form-container {
		padding: 40rpx;
		
		.form-item {
			background-color: rgb(240, 241, 241);
			border-radius: 30rpx;
			padding: 30rpx;
			margin-bottom: 30rpx;
			
			.label {
				font-size: 28rpx;
				color: #333;
				font-weight: bold;
				margin-bottom: 20rpx;
			}
			
			.duration-selector {
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 20rpx 0;
				
				.selected-duration {
					font-size: 28rpx;
					color: #333;
				}
				
				.placeholder {
					font-size: 28rpx;
					color: #999;
				}
			}
			
			.calorie-input {
				display: flex;
				align-items: center;
				gap: 20rpx;
				
				.unit {
					font-size: 28rpx;
					color: #666;
				}
			}
			
			.date-picker {
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 20rpx 0;
				
				.placeholder {
					color: #999;
					font-size: 28rpx;
				}
			}
			
			.type-selector {
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 20rpx 0;
				
				.selected-type {
					font-size: 28rpx;
					color: #333;
				}
				
				.placeholder {
					font-size: 28rpx;
					color: #999;
				}
			}
			
			/deep/ .u-input {
				background-color: transparent;
				
				&__input {
					font-size: 28rpx;
					color: #333;
				}
			}
			
			/deep/ .u-textarea {
				background-color: transparent;
				padding: 0;
			}
		}
		
		.submit-btn {
			margin-top: 60rpx;
			padding: 0 40rpx;
		}
	}
}
</style> 