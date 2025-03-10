<template>
	<view class="container">
		<!-- 顶部导航栏 -->
		<view class="custom-navbar">
			<view class="left" @click="handleBack">
				<view class="back-button">
					<u-icon name="arrow-left" color="#333" size="20"></u-icon>
				</view>
			</view>
			<view class="center">
				<text class="title">{{ isEdit ? '编辑饮食' : '添加饮食' }}</text>
			</view>
		</view>
		
		<view class="form-container">
			<u-form :model="form" ref="uForm" :rules="rules">
				<!-- 食物名称 -->
				<view class="form-item">
					<view class="label-row">
						<view class="label-icon">🍽️</view>
						<view class="label">食物名称</view>
					</view>
					<u-input
						v-model="form.name"
						type="text"
						placeholder="请输入食物名称"
						:border="false"
						:customStyle="{ 
							background: '#f8f8f8', 
							borderRadius: '12rpx',
							padding: '20rpx 30rpx',
							fontSize: '28rpx'
						}"
					></u-input>
				</view>
				
				<!-- 重量/毫升选择 -->
				<view class="form-item">
					<view class="label-row">
						<view class="label-icon">⚖️</view>
						<view class="label">数量单位</view>
					</view>
					<view class="unit-switch-container">
						<view class="unit-switch">
							<text 
								:class="['unit-option', form.unit === 'g' ? 'active' : '']"
								@click="switchUnit('g')"
							>重量(g)</text>
							<text 
								:class="['unit-option', form.unit === 'ml' ? 'active' : '']"
								@click="switchUnit('ml')"
							>毫升(ml)</text>
						</view>
					</view>
					<u-input
						v-model="form.amount"
						type="number"
						:placeholder="form.unit === 'g' ? '请输入重量' : '请输入毫升数'"
						:border="false"
						:customStyle="{ 
							background: '#f8f8f8', 
							borderRadius: '12rpx',
							padding: '20rpx 30rpx',
							fontSize: '28rpx'
						}"
					>
						<text slot="suffix" class="unit">{{form.unit}}</text>
					</u-input>
				</view>
				
				<!-- 卡路里 -->
				<view class="form-item">
					<view class="label-row">
						<view class="label-icon">🔥</view>
						<view class="label">卡路里</view>
					</view>
					<u-input
						v-model="form.calories"
						type="number"
						placeholder="请输入卡路里"
						:border="false"
						:customStyle="{ 
							background: '#f8f8f8', 
							borderRadius: '12rpx',
							padding: '20rpx 30rpx',
							fontSize: '28rpx'
						}"
					>
						<text slot="suffix" class="unit">kcal</text>
					</u-input>
				</view>
				
				<!-- 营养成分 -->
				<view class="nutrition-header">
					<view class="nutrition-title">营养成分</view>
					<view class="nutrition-line"></view>
				</view>
				
				<view class="nutrition-form">
					<!-- 总热量 -->
					<view class="nutrition-item calories-item">
						<view class="label-row">
							<view class="label-icon">🔥</view>
							<view class="label">总热量</view>
						</view>
						<u-input
							v-model="form.totalCalories"
							type="number"
							placeholder="请输入总热量"
							:border="false"
							:customStyle="{ 
								background: 'rgba(66, 211, 146, 0.08)', 
								borderRadius: '12rpx',
								padding: '20rpx 30rpx',
								fontSize: '28rpx'
							}"
						>
							<text slot="suffix" class="unit">kcal</text>
						</u-input>
					</view>
					
					<!-- 碳水化合物 -->
					<view class="nutrition-item carbs-item">
						<view class="label-row">
							<view class="label-icon">🌾</view>
							<view class="label">碳水化合物</view>
						</view>
						<u-input
							v-model="form.carbs"
							type="number"
							placeholder="请输入碳水化合物"
							:border="false"
							:customStyle="{ 
								background: 'rgba(255, 151, 54, 0.08)', 
								borderRadius: '12rpx',
								padding: '20rpx 30rpx',
								fontSize: '28rpx'
							}"
						>
							<text slot="suffix" class="unit">g</text>
						</u-input>
					</view>
					
					<!-- 脂肪 -->
					<view class="nutrition-item fat-item">
						<view class="label-row">
							<view class="label-icon">🥑</view>
							<view class="label">脂肪</view>
						</view>
						<u-input
							v-model="form.fat"
							type="number"
							placeholder="请输入脂肪含量"
							:border="false"
							:customStyle="{ 
								background: 'rgba(255, 94, 58, 0.08)', 
								borderRadius: '12rpx',
								padding: '20rpx 30rpx',
								fontSize: '28rpx'
							}"
						>
							<text slot="suffix" class="unit">g</text>
						</u-input>
					</view>
					
					<!-- 蛋白质 -->
					<view class="nutrition-item protein-item">
						<view class="label-row">
							<view class="label-icon">🥩</view>
							<view class="label">蛋白质</view>
						</view>
						<u-input
							v-model="form.protein"
							type="number"
							placeholder="请输入蛋白质含量"
							:border="false"
							:customStyle="{ 
								background: 'rgba(78, 184, 240, 0.08)', 
								borderRadius: '12rpx',
								padding: '20rpx 30rpx',
								fontSize: '28rpx'
							}"
						>
							<text slot="suffix" class="unit">g</text>
						</u-input>
					</view>
				</view>
			</u-form>
			
			<!-- 保存按钮 -->
			<view class="submit-btn">
				<u-button 
					type="primary" 
					@click="handleSubmit"
					:customStyle="{
						background: 'linear-gradient(135deg, #42d392, #2cc17e)',
						color: '#ffffff',
						borderRadius: '50rpx',
						height: '90rpx',
						fontSize: '32rpx',
						fontWeight: 'bold',
						boxShadow: '0 6rpx 15rpx rgba(66, 211, 146, 0.3)'
					}"
				>保存</u-button>
			</view>
		</view>
	</view>
</template>

<script>
import { navigateBack } from '@/common/utils/navigate';

export default {
	components: {
		'u-icon': () => import('@/uview-ui/components/u-icon/u-icon.vue')
	},
	data() {
		return {
			isEdit: false, // 是否是编辑模式
			id: '', // 编辑时的记录ID
			form: {
				name: '',
				unit: 'g', // 默认使用克重单位
				amount: '', // 数量（克重或毫升）
				calories: '',
				totalCalories: '',
				carbs: '',
				fat: '',
				protein: ''
			},
			rules: {
				name: [{
					required: true,
					message: '请输入食物名称',
					trigger: ['change', 'blur']
				}],
				amount: [{
					required: true,
					message: '请输入数量',
					trigger: ['change', 'blur']
				}],
				calories: [{
					required: true,
					message: '请输入卡路里',
					trigger: ['change', 'blur']
				}]
			}
		}
	},
	onLoad(options) {
		if (options.id) {
			this.isEdit = true;
			this.id = options.id;
			// 加载编辑数据
			this.form = {
				name: options.name || '',
				unit: options.unit || 'g',
				amount: options.amount || '',
				calories: options.calories || '',
				totalCalories: options.totalCalories || '',
				carbs: options.carbs || '',
				fat: options.fat || '',
				protein: options.protein || ''
			};
		}
	},
	methods: {
		handleBack() {
			navigateBack({
				redirectUrl: '/pages/meal/detail/index',
				isTab: true
			});
		},
		handleSubmit() {
			this.$refs.uForm.validate(valid => {
				if (valid) {
					// 构建提交的数据
					const submitData = {
						...this.form,
						id: this.id
					};
					
					// TODO: 调用API提交数据
					console.log('提交的数据：', submitData);
					
					uni.showToast({
						title: this.isEdit ? '修改成功' : '添加成功',
						icon: 'success'
					});
					
					setTimeout(() => {
						navigateBack({
							redirectUrl: '/pages/meal/detail/index',
							isTab: true
						});
					}, 1500);
				}
			});
		},
		switchUnit(unit) {
			if (this.form.unit !== unit) {
				this.form.unit = unit;
				this.form.amount = ''; // 切换单位时清空数量
			}
		}
	}
}
</script>

<style lang="scss">
.container {
	min-height: 100vh;
	background-color: #ffffff;
	display: flex;
	flex-direction: column;
	
	.custom-navbar {
		display: flex;
		align-items: center;
		height: 90rpx;
		padding: 0 30rpx;
		background-color: #ffffff;
		position: relative;
		
		.left {
			position: absolute;
			left: 30rpx;
			
			.back-button {
				width: 60rpx;
				height: 60rpx;
				border-radius: 50%;
				background: rgba(0, 0, 0, 0.05);
				display: flex;
				align-items: center;
				justify-content: center;
				transition: all 0.2s;
				
				&:active {
					transform: scale(0.9);
				}
			}
		}
		
		.center {
			flex: 1;
			text-align: center;
			
			.title {
				font-size: 32rpx;
				font-weight: bold;
				color: #333333;
			}
		}
	}
	
	.form-container {
		flex: 1;
		padding: 30rpx;
		
		.form-item {
			margin-bottom: 40rpx;
			
			.label-row {
				display: flex;
				align-items: center;
				margin-bottom: 15rpx;
				
				.label-icon {
					font-size: 30rpx;
					margin-right: 10rpx;
				}
				
				.label {
					font-size: 28rpx;
					font-weight: bold;
					color: #333333;
				}
			}
			
			.unit-switch-container {
				margin-bottom: 20rpx;
				
				.unit-switch {
					display: inline-flex;
					background: #f0f0f0;
					border-radius: 40rpx;
					padding: 4rpx;
					
					.unit-option {
						padding: 12rpx 30rpx;
						font-size: 24rpx;
						color: #666;
						border-radius: 40rpx;
						transition: all 0.3s;
						
						&.active {
							background: #42d392;
							color: #fff;
							font-weight: bold;
							box-shadow: 0 2rpx 10rpx rgba(66, 211, 146, 0.3);
						}
					}
				}
			}
			
			.unit {
				font-size: 28rpx;
				color: #666;
				margin-left: 10rpx;
			}
		}
		
		.nutrition-header {
			display: flex;
			align-items: center;
			margin: 60rpx 0 30rpx;
			
			.nutrition-title {
				font-size: 32rpx;
				font-weight: bold;
				color: #333;
				margin-right: 20rpx;
			}
			
			.nutrition-line {
				flex: 1;
				height: 2rpx;
				background: linear-gradient(90deg, #42d392, transparent);
			}
		}
		
		.nutrition-form {
			display: flex;
			flex-direction: column;
			gap: 30rpx;
			
			.nutrition-item {
				position: relative;
				border-radius: 16rpx;
				overflow: hidden;
				
				&.calories-item {
					.label {
						color: #42d392;
					}
				}
				
				&.carbs-item {
					.label {
						color: #ff9736;
					}
				}
				
				&.fat-item {
					.label {
						color: #ff5e3a;
					}
				}
				
				&.protein-item {
					.label {
						color: #4eb8f0;
					}
				}
			}
		}
		
		.submit-btn {
			margin-top: 80rpx;
			padding: 0 20rpx;
			
			.u-button--primary {
				transition: all 0.3s;
				
				&:active {
					transform: scale(0.98);
					box-shadow: 0 3rpx 8rpx rgba(66, 211, 146, 0.2);
				}
			}
		}
	}
}
</style> 