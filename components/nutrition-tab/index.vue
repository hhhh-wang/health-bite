<template>
	<view class="nutrition-container">
		<!-- 主营养卡片 -->
		<view class="nutrition-card">
			<view class="card-bubble bubble-1"></view>
			<view class="card-bubble bubble-2"></view>
			
			<view class="card-header">
				<text class="title">今日营养摄入</text>
			</view>
			
			<view class="nutrition-grid">
				<view class="grid-item" v-for="(item, index) in nutritionData" :key="index">
					<view class="item-icon" :class="'icon-' + index"></view>
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
		
		<!-- 营养分布雷达图 -->
		<view class="chart-section">
			<view class="section-header">
				<text class="section-title">营养分布</text>
				<view class="section-divider"></view>
			</view>
			
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
	min-height: 100vh;
	
	// 主营养卡片
	.nutrition-card {
		position: relative;
		background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
		border-radius: 24rpx;
		padding: 30rpx;
		box-shadow: 0 8rpx 30rpx rgba(0,0,0,0.05);
		overflow: hidden;
		
		// 装饰性气泡
		.card-bubble {
			position: absolute;
			border-radius: 50%;
			opacity: 0.07;
			
			&.bubble-1 {
				width: 200rpx;
				height: 200rpx;
				background-color: #42d392;
				top: -50rpx;
				right: -50rpx;
			}
			
			&.bubble-2 {
				width: 160rpx;
				height: 160rpx;
				background-color: #42d392;
				bottom: -40rpx;
				left: 30rpx;
				animation: bubbleFloat 6s infinite ease-in-out;
			}
		}
		
		.card-header {
			margin-bottom: 40rpx;
			
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
					background: linear-gradient(to bottom, #42d392, #2cc17e);
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
				box-shadow: 0 2rpx 15rpx rgba(0,0,0,0.03);
				transition: all 0.3s ease;
				position: relative;
				overflow: hidden;
				
				&:hover {
					transform: translateY(-2rpx);
					box-shadow: 0 8rpx 20rpx rgba(0,0,0,0.08);
				}
				
				.item-icon {
					position: absolute;
					top: 15rpx;
					right: 15rpx;
					width: 40rpx;
					height: 40rpx;
					border-radius: 50%;
					opacity: 0.1;
					
					&.icon-0 { // 蛋白质
						background-color: #4eb8f0;
					}
					
					&.icon-1 { // 脂肪
						background-color: #ff5e3a;
					}
					
					&.icon-2 { // 碳水化合物
						background-color: #ff9736;
					}
					
					&.icon-3 { // 水分
						background-color: #42d392;
					}
				}
				
				.value {
					font-size: 42rpx;
					font-weight: bold;
					color: #2c3e50;
					display: block;
					margin-bottom: 10rpx;
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
					height: 8rpx;
					background-color: #edf2f7;
					border-radius: 4rpx;
					margin-top: 16rpx;
					overflow: hidden;
					
					.progress {
						height: 100%;
						border-radius: 4rpx;
						transition: width 0.5s ease;
					}
				}
			}
		}
	}
	
	// 营养分布雷达图部分
	.chart-section {
		margin-top: 40rpx;
		
		.section-header {
			display: flex;
			align-items: center;
			margin-bottom: 24rpx;
			
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
		
		.charts-box {
			width: 100%;
			height: 500rpx;
			background: #ffffff;
			border-radius: 24rpx;
			padding: 30rpx;
			box-shadow: 0 8rpx 30rpx rgba(0,0,0,0.05);
		}
	}
}

@keyframes bubbleFloat {
	0% {
		transform: translateY(0) scale(1);
	}
	50% {
		transform: translateY(-10rpx) scale(1.05);
	}
	100% {
		transform: translateY(0) scale(1);
	}
}
</style> 