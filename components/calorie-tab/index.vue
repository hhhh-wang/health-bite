<template>
	<view class="calorie-container">
		<view class="total-calories">
			<text class="total-number">10582 kcal</text>
			<view class="calorie-types">
				<text>892平均Cals</text>
				<text>2925目标Cals</text>
			</view>
		</view>
		
		<view class="calorie-chart">
			<!-- 这里后续会接入实际的图表组件 -->
			<view class="chart-placeholder"></view>
		</view>
		
		<view class="calorie-details">
			<view class="detail-item">
				<text class="value">1572</text>
				<text class="label">早餐</text>
				<text class="percentage">14%</text>
			</view>
			<view class="detail-item">
				<text class="value">4987</text>
				<text class="label">午餐</text>
				<text class="percentage">48%</text>
			</view>
			<view class="detail-item">
				<text class="value">2091</text>
				<text class="label">晚餐</text>
				<text class="percentage">20%</text>
			</view>
			<view class="detail-item">
				<text class="value">1932</text>
				<text class="label">其他</text>
				<text class="percentage">18%</text>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'CalorieTab',
	data() {
		return {
			// 后续可以添加数据
		}
	}
}
</script>

<style lang="scss" scoped>
.calorie-container {
	padding: 20rpx;
	
	.total-calories {
		text-align: center;
		margin-bottom: 40rpx;
		
		.total-number {
			font-size: 48rpx;
			font-weight: bold;
			color: #333;
		}
		
		.calorie-types {
			margin-top: 10rpx;
			font-size: 24rpx;
			color: #666;
			
			text {
				margin: 0 10rpx;
			}
		}
	}
	
	.calorie-chart {
		height: 400rpx;
		margin: 30rpx 0;
		
		.chart-placeholder {
			width: 100%;
			height: 100%;
			background-color: #f5f5f5;
			border-radius: 20rpx;
		}
	}
	
	.calorie-details {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		
		.detail-item {
			width: 48%;
			padding: 20rpx;
			margin-bottom: 20rpx;
			background-color: #f8f8f8;
			border-radius: 16rpx;
			
			.value {
				font-size: 32rpx;
				font-weight: bold;
				color: #333;
			}
			
			.label {
				font-size: 24rpx;
				color: #666;
				margin-left: 10rpx;
			}
			
			.percentage {
				float: right;
				font-size: 24rpx;
				color: #42d392;
			}
		}
	}
}
</style> 