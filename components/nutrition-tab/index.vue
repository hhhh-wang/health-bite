<template>
	<view class="nutrition-container">
		<view class="nutrition-card">
			<view class="card-header">
				<text class="title">今日营养摄入</text>
			</view>
			<view class="nutrition-grid">
				<view class="grid-item">
					<text class="value">120g</text>
					<text class="label">蛋白质</text>
					<text class="percentage">80%</text>
				</view>
				<view class="grid-item">
					<text class="value">45g</text>
					<text class="label">脂肪</text>
					<text class="percentage">60%</text>
				</view>
				<view class="grid-item">
					<text class="value">280g</text>
					<text class="label">碳水化合物</text>
					<text class="percentage">75%</text>
				</view>
				<view class="grid-item">
					<text class="value">2.5L</text>
					<text class="label">水分</text>
					<text class="percentage">85%</text>
				</view>
			</view>
		</view>
		
		<view class="chart-section">
			<view class="section-title">营养分布</view>
			<view class="chart-placeholder"></view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'NutritionTab',
	data() {
		return {
			// 后续可以添加数据
		}
	}
}
</script>

<style lang="scss" scoped>
.nutrition-container {
	padding: 20rpx;
	
	.nutrition-card {
		background-color: #ffffff;
		border-radius: 20rpx;
		padding: 30rpx;
		box-shadow: 0 2rpx 10rpx rgba(0,0,0,0.1);
		
		.card-header {
			margin-bottom: 30rpx;
			
			.title {
				font-size: 32rpx;
				font-weight: bold;
				color: #333;
			}
		}
		
		.nutrition-grid {
			display: grid;
			grid-template-columns: repeat(2, 1fr);
			gap: 30rpx;
			
			.grid-item {
				padding: 20rpx;
				background-color: #f8f8f8;
				border-radius: 16rpx;
				
				.value {
					font-size: 36rpx;
					font-weight: bold;
					color: #333;
					display: block;
				}
				
				.label {
					font-size: 24rpx;
					color: #666;
					margin-top: 10rpx;
					display: inline-block;
				}
				
				.percentage {
					float: right;
					font-size: 24rpx;
					color: #42d392;
					margin-top: 10rpx;
				}
			}
		}
	}
	
	.chart-section {
		margin-top: 40rpx;
		
		.section-title {
			font-size: 32rpx;
			font-weight: bold;
			color: #333;
			margin-bottom: 20rpx;
		}
		
		.chart-placeholder {
			height: 400rpx;
			background-color: #f5f5f5;
			border-radius: 20rpx;
		}
	}
}
</style> 