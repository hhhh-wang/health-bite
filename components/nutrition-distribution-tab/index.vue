<template>
	<view class="nutrition-distribution-container">
		<view class="section-header">
			<text class="section-title">营养成分详情</text>
			<view class="section-divider"></view>
		</view>
		
		<view class="distribution-list">
			<view class="list-item" v-for="(item, index) in nutritionList" :key="index">
				<view class="item-header">
					<view class="name-container">
						<view class="icon-circle" :style="{backgroundColor: item.color}"></view>
						<text class="name">{{item.name}}</text>
					</view>
					<text class="value">{{item.value}}</text>
				</view>
				<view class="progress-bar">
					<view class="progress" :style="{width: item.percentage + '%', backgroundColor: item.color}"></view>
				</view>
				<view class="item-footer">
					<text class="percentage" :style="{color: item.color}">{{item.percentage}}%</text>
					<text class="target">目标: {{item.target}}</text>
				</view>
			</view>
		</view>
		
		<view class="nutrition-tips">
			<view class="tips-header">
				<view class="tips-icon">💡</view>
				<text class="tips-title">健康小贴士</text>
			</view>
			<view class="tips-content">
				<text class="tip-text">保持均衡饮食，确保每日摄入足够的维生素和矿物质对维持身体健康至关重要。</text>
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
	padding: 30rpx;
	
	.section-header {
		display: flex;
		align-items: center;
		margin-bottom: 30rpx;
		
		.section-title {
			font-size: 32rpx;
			font-weight: 600;
			color: #2c3e50;
			margin-right: 16rpx;
		}
		
		.section-divider {
			flex: 1;
			height: 2rpx;
			background: linear-gradient(90deg, #42d392, transparent);
		}
	}
	
	.distribution-list {
		.list-item {
			margin-bottom: 30rpx;
			padding: 30rpx;
			background-color: #ffffff;
			border-radius: 20rpx;
			box-shadow: 0 6rpx 16rpx rgba(0,0,0,0.05);
			transition: all 0.3s ease;
			
			&:hover {
				transform: translateY(-2rpx);
				box-shadow: 0 8rpx 25rpx rgba(0,0,0,0.08);
			}
			
			.item-header {
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-bottom: 20rpx;
				
				.name-container {
					display: flex;
					align-items: center;
					
					.icon-circle {
						width: 24rpx;
						height: 24rpx;
						border-radius: 50%;
						margin-right: 12rpx;
						opacity: 0.8;
					}
					
					.name {
						font-size: 30rpx;
						color: #333;
						font-weight: bold;
					}
				}
				
				.value {
					font-size: 30rpx;
					color: #666;
					font-weight: 500;
				}
			}
			
			.progress-bar {
				height: 12rpx;
				background-color: #f5f5f5;
				border-radius: 6rpx;
				overflow: hidden;
				box-shadow: inset 0 1rpx 2rpx rgba(0,0,0,0.1);
				
				.progress {
					height: 100%;
					transition: width 0.6s cubic-bezier(0.25, 0.8, 0.25, 1);
					border-radius: 6rpx;
				}
			}
			
			.item-footer {
				display: flex;
				justify-content: space-between;
				margin-top: 16rpx;
				
				.percentage {
					font-size: 26rpx;
					font-weight: 600;
				}
				
				.target {
					font-size: 26rpx;
					color: #999;
				}
			}
		}
	}
	
	.nutrition-tips {
		background: linear-gradient(135deg, rgba(66, 211, 146, 0.1), rgba(66, 211, 146, 0.05));
		border-radius: 20rpx;
		padding: 30rpx;
		margin-top: 20rpx;
		box-shadow: 0 4rpx 12rpx rgba(66, 211, 146, 0.1);
		
		.tips-header {
			display: flex;
			align-items: center;
			margin-bottom: 16rpx;
			
			.tips-icon {
				margin-right: 12rpx;
				font-size: 32rpx;
			}
			
			.tips-title {
				font-size: 28rpx;
				font-weight: 600;
				color: #42d392;
			}
		}
		
		.tips-content {
			.tip-text {
				font-size: 26rpx;
				color: #666;
				line-height: 1.5;
			}
		}
	}
}
</style> 