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
			chartData: {
				categories: ["蛋白质", "脂肪", "碳水化合物", "水分"],
				series: [{
					name: "营养达成率",
					data: [80, 60, 75, 85]
				}]
			},
			opts: {
				color: ["#42d392"],  // 使用与UI一致的主题色
				padding: [5, 5, 5, 5],
				dataLabel: false,
				enableScroll: false,
				legend: {
					show: false  // 由于只有一组数据，不需要显示图例
				},
				extra: {
					radar: {
						gridType: "radar",
						gridColor: "#CCCCCC",
						gridCount: 4,
						opacity: 0.2,
						max: 100,  // 设置为100以显示百分比
						labelShow: true,
						border: true
					}
				}
			}
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
		
		.charts-box {
			width: 100%;
			height: 400rpx;
			background-color: #ffffff;
			border-radius: 20rpx;
			padding: 20rpx;
			box-shadow: 0 2rpx 10rpx rgba(0,0,0,0.1);
		}
	}
}
</style> 