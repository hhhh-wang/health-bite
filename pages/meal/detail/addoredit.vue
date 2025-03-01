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
					<view class="label">食物名称</view>
					<u-input
						v-model="form.name"
						type="text"
						placeholder="请输入食物名称"
						:border="false"
					></u-input>
				</view>
				
				<!-- 重量/毫升选择 -->
				<view class="form-item">
					<view class="label-container">
						<text class="label">数量单位</text>
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
					>
						<text slot="suffix" class="unit">{{form.unit}}</text>
					</u-input>
				</view>
				
				<!-- 卡路里 -->
				<view class="form-item">
					<view class="label">卡路里</view>
					<u-input
						v-model="form.calories"
						type="number"
						placeholder="请输入卡路里"
						:border="false"
					>
						<text slot="suffix" class="unit">kcal</text>
					</u-input>
				</view>
				
				<!-- 营养成分 -->
				<view class="nutrition-title">营养成分</view>
				<view class="nutrition-form">
					<view class="form-item">
						<view class="label">总热量 (kcal)</view>
						<u-input
							v-model="form.totalCalories"
							type="number"
							placeholder="请输入总热量"
							:border="false"
						>
							<text slot="suffix" class="unit">kcal</text>
						</u-input>
					</view>
					
					<view class="form-item">
						<view class="label">碳水化合物 (g)</view>
						<u-input
							v-model="form.carbs"
							type="number"
							placeholder="请输入碳水化合物含量"
							:border="false"
						>
							<text slot="suffix" class="unit">g</text>
						</u-input>
					</view>
					
					<view class="form-item">
						<view class="label">脂肪 (g)</view>
						<u-input
							v-model="form.fat"
							type="number"
							placeholder="请输入脂肪含量"
							:border="false"
						>
							<text slot="suffix" class="unit">g</text>
						</u-input>
					</view>
					
					<view class="form-item">
						<view class="label">蛋白质 (g)</view>
						<u-input
							v-model="form.protein"
							type="number"
							placeholder="请输入蛋白质含量"
							:border="false"
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

<style lang="scss" scoped>
.container {
	min-height: 100vh;
	background-color: #ffffff;
	padding: 0 25rpx;
	
	.custom-navbar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 10rpx 20rpx;
		background-color: #ffffff;
		position: relative;
		height: 120px;
		
		.left {
			.back-button {
				width: 120rpx;
				height: 120rpx;
				background-color: rgb(246, 247, 247);
				border-radius: 50%;
				display: flex;
				align-items: center;
				justify-content: center;
			}
		}
		
		.center {
			position: absolute;
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%);
			
			.title {
				font-size: 45rpx;
				font-weight: bold;
				color: #333;
			}
		}
	}
	
	.form-container {
		padding: 40rpx;
		
		.form-item {
			background-color: rgb(240, 241, 241);
			border-radius: 50rpx;
			padding: 30rpx;
			margin-bottom: 30rpx;
			
			.label-container {
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-bottom: 20rpx;
				
				.label {
					font-size: 30rpx;
					color: #333;
					font-weight: bold;
				}
				
				.unit-switch {
					display: flex;
					background-color: #ffffff;
					border-radius: 30rpx;
					overflow: hidden;
					
					.unit-option {
						padding: 10rpx 20rpx;
						font-size: 24rpx;
						color: #666;
						background-color: #ffffff;
						transition: all 0.3s ease;
						
						&.active {
							color: #ffffff;
							background-color: #42d392;
						}
						
						&:active {
							opacity: 0.8;
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
		
		.nutrition-title {
			font-size: 32rpx;
			font-weight: bold;
			color: #333;
			margin: 40rpx 0 20rpx;
			padding-left: 30rpx;
		}
		
		.nutrition-form {
			.form-item {
				background-color: rgb(235, 246, 214);
			}
		}
		
		.submit-btn {
			margin-top: 60rpx;
		}
	}
}
</style> 