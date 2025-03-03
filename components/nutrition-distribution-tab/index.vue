<template>
	<view class="nutrition-distribution-container">
		<view class="distribution-list">
			<view class="list-item" v-for="(item, index) in nutritionList" :key="index">
				<view class="item-header">
					<text class="name">{{item.name}}</text>
					<text class="value">{{item.value}}</text>
				</view>
				<view class="progress-bar">
					<view class="progress" :style="{width: item.percentage + '%', backgroundColor: item.color}"></view>
				</view>
				<view class="item-footer">
					<text class="percentage">{{item.percentage}}%</text>
					<text class="target">目标: {{item.target}}</text>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
export default {
	name: 'NutritionDistributionTab',
	data() {
		return {
			nutritionList: [
				{
					name: '维生素A',
					value: '750μg',
					target: '800μg',
					percentage: 85,
					color: '#42d392'
				},
				{
					name: '维生素C',
					value: '80mg',
					target: '100mg',
					percentage: 75,
					color: '#647eff'
				},
				{
					name: '钙',
					value: '800mg',
					target: '1000mg',
					percentage: 65,
					color: '#ff8f6b'
				},
				{
					name: '铁',
					value: '12mg',
					target: '15mg',
					percentage: 70,
					color: '#ffbd6b'
				}
			]
		}
	}
}
</script>

<style lang="scss" scoped>
.nutrition-distribution-container {
	padding: 20rpx;
	
	.distribution-list {
		.list-item {
			margin-bottom: 30rpx;
			padding: 20rpx;
			background-color: #ffffff;
			border-radius: 16rpx;
			box-shadow: 0 2rpx 10rpx rgba(0,0,0,0.1);
			
			.item-header {
				display: flex;
				justify-content: space-between;
				margin-bottom: 15rpx;
				
				.name {
					font-size: 28rpx;
					color: #333;
					font-weight: bold;
				}
				
				.value {
					font-size: 28rpx;
					color: #666;
				}
			}
			
			.progress-bar {
				height: 10rpx;
				background-color: #f5f5f5;
				border-radius: 5rpx;
				overflow: hidden;
				
				.progress {
					height: 100%;
					transition: width 0.3s ease;
				}
			}
			
			.item-footer {
				display: flex;
				justify-content: space-between;
				margin-top: 10rpx;
				
				.percentage {
					font-size: 24rpx;
					color: #42d392;
				}
				
				.target {
					font-size: 24rpx;
					color: #999;
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