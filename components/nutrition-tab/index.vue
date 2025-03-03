<template>
	<view class="nutrition-container">
		<view class="nutrition-card">
			<view class="card-header">
				<text class="title">今日营养摄入</text>
			</view>
			<view class="nutrition-grid">
				<view class="grid-item" v-for="(item, index) in nutritionData" :key="index">
					<text class="value">{{item.value}}</text>
					<text class="label">{{item.label}}</text>
					<text class="percentage" :style="{ color: getProgressColor(item.percentage) }">
						{{item.percentage}}%
					</text>
					<view class="progress-bar">
						<view class="progress" 
							  :style="{ width: item.percentage + '%', backgroundColor: getProgressColor(item.percentage) }">
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<view class="chart-section">
			<view class="section-title">营养分布</view>
			<view class="charts-box">
				<qiun-data-charts 
					type="radar"
					:opts="opts"
					:chartData="chartData"
				/>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'NutritionTab',
	data() {
		return {
			nutritionData: [
				{ label: '蛋白质', value: '120g', percentage: 80 },
				{ label: '脂肪', value: '45g', percentage: 60 },
				{ label: '碳水化合物', value: '280g', percentage: 75 },
				{ label: '水分', value: '2.5L', percentage: 85 }
			],
			chartData: {
				categories: ["蛋白质", "脂肪", "碳水化合物", "水分"],
				series: [{
					name: "营养达成率",
					data: [80, 60, 75, 85]
				}]
			},
			opts: {
				color: ["#42d392"],
				padding: [5, 5, 5, 5],
				dataLabel: false,
				enableScroll: false,
				legend: {
					show: false
				},
				extra: {
					radar: {
						gridType: "radar",
						gridColor: "#CCCCCC",
						gridCount: 4,
						opacity: 0.2,
						max: 100,
						labelShow: true,
						border: true
					}
				}
			}
		}
	},
	methods: {
		getProgressColor(percentage) {
			if (percentage >= 90) return '#FF6B6B';
			if (percentage >= 70) return '#42d392';
			if (percentage >= 50) return '#4ECDC4';
			return '#FFB900';
		}
	}
}
</script>

<style lang="scss" scoped>
.nutrition-container {
	padding: 30rpx;
	background-color: #f8f9fa;
	min-height: 100vh;
	
	.nutrition-card {
		background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
		border-radius: 24rpx;
		padding: 30rpx;
		box-shadow: 0 4rpx 20rpx rgba(0,0,0,0.05);
		
		.card-header {
			margin-bottom: 30rpx;
			
			.title {
				font-size: 36rpx;
				font-weight: 600;
				color: #2c3e50;
				position: relative;
				padding-left: 24rpx;
				
				&::before {
					content: '';
					position: absolute;
					left: 0;
					top: 50%;
					transform: translateY(-50%);
					width: 8rpx;
					height: 32rpx;
					background-color: #42d392;
					border-radius: 4rpx;
				}
			}
		}
		
		.nutrition-grid {
			display: grid;
			grid-template-columns: repeat(2, 1fr);
			gap: 30rpx;
			
			.grid-item {
				padding: 24rpx;
				background: #ffffff;
				border-radius: 20rpx;
				box-shadow: 0 2rpx 10rpx rgba(0,0,0,0.03);
				transition: all 0.3s ease;
				
				&:hover {
					transform: translateY(-2rpx);
					box-shadow: 0 4rpx 15rpx rgba(0,0,0,0.08);
				}
				
				.value {
					font-size: 40rpx;
					font-weight: bold;
					color: #2c3e50;
					display: block;
					margin-bottom: 8rpx;
				}
				
				.label {
					font-size: 26rpx;
					color: #7f8c8d;
					display: inline-block;
				}
				
				.percentage {
					float: right;
					font-size: 26rpx;
					font-weight: 500;
				}
				
				.progress-bar {
					height: 6rpx;
					background-color: #edf2f7;
					border-radius: 3rpx;
					margin-top: 16rpx;
					overflow: hidden;
					
					.progress {
						height: 100%;
						border-radius: 3rpx;
						transition: width 0.3s ease;
					}
				}
			}
		}
	}
	
	.chart-section {
		margin-top: 40rpx;
		
		.section-title {
			font-size: 32rpx;
			font-weight: 600;
			color: #2c3e50;
			margin-bottom: 24rpx;
			padding-left: 24rpx;
			position: relative;
			
			&::before {
				content: '';
				position: absolute;
				left: 0;
				top: 50%;
				transform: translateY(-50%);
				width: 8rpx;
				height: 32rpx;
				background-color: #42d392;
				border-radius: 4rpx;
			}
		}
		
		.charts-box {
			width: 100%;
			height: 500rpx;
			background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
			border-radius: 24rpx;
			padding: 30rpx;
			box-shadow: 0 4rpx 20rpx rgba(0,0,0,0.05);
		}
	}
}
</style> 