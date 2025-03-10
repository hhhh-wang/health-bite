<template>
	<view class="calorie-container">
		<!-- 顶部卡路里总览卡片 -->
		<view class="calorie-card top-card">
			<view class="card-bubble bubble-1"></view>
			<view class="card-bubble bubble-2"></view>
			
			<view class="total-wrapper">
				<text class="total-value">{{ totalCalories }}</text>
				<text class="total-unit">kcal</text>
			</view>
			
			<view class="total-label">总摄入量</view>
			
			<view class="divider"></view>
			
			<view class="metrics-container">
				<view class="metric">
					<text class="metric-value">{{ averageCalories }}</text>
					<text class="metric-label">平均Cals</text>
				</view>
				<view class="metric">
					<text class="metric-value">{{ targetCalories }}</text>
					<text class="metric-label">目标Cals</text>
				</view>
			</view>
		</view>
		
		<!-- 饼图卡片 -->
		<view class="calorie-card chart-card">
			<view class="chart-header">
				<text class="chart-title">卡路里分布</text>
				<view class="chart-divider"></view>
			</view>
			
			<calorie-pie-chart 
				:mealData="pieChartData" 
				canvasId="calories-tab-pie"
			/>
		</view>
		
		<!-- 下方详细数据卡片 -->
		<view class="meal-details">
			<view class="meal-row">
				<meal-card
					:calories="mealDetails[0].calories"
					:name="mealDetails[0].name"
					:percentage="mealDetails[0].percentage"
					:color="mealDetails[0].color"
				/>
				
				<meal-card
					:calories="mealDetails[1].calories"
					:name="mealDetails[1].name"
					:percentage="mealDetails[1].percentage"
					:color="mealDetails[1].color"
				/>
			</view>
			
			<view class="meal-row">
				<meal-card
					:calories="mealDetails[2].calories"
					:name="mealDetails[2].name"
					:percentage="mealDetails[2].percentage"
					:color="mealDetails[2].color"
				/>
				
				<meal-card
					:calories="mealDetails[3].calories"
					:name="mealDetails[3].name"
					:percentage="mealDetails[3].percentage"
					:color="mealDetails[3].color"
				/>
			</view>
		</view>
	</view>
</template>

<script>
import CaloriePieChart from '@/components/calorie-pie-chart/index.vue';
import MealCard from '@/components/meal-card/index.vue';

export default {
	name: 'CalorieTab',
	components: {
		CaloriePieChart,
		MealCard
	},
	data() {
		return {
			// 三餐卡路里数据
			mealCalories: {
				breakfast: 1572,
				lunch: 4987,
				dinner: 2091,
				other: 1932
			},
			
			// 目标卡路里
			targetCalories: 2925,
			
			// 颜色对应
			colors: {
				breakfast: "#43B3AE", // 柔和绿松石色
				lunch: "#5B9BD5",     // 柔和天蓝色
				dinner: "#F8BD7F",    // 柔和橙黄色
				other: "#E99497"      // 柔和粉红色
			}
		};
	},
	computed: {
		// 计算总卡路里
		totalCalories() {
			return this.mealCalories.breakfast + 
				   this.mealCalories.lunch + 
				   this.mealCalories.dinner + 
				   this.mealCalories.other;
		},
		
		// 计算平均卡路里
		averageCalories() {
			return Math.round(this.totalCalories / 12);  // 假设12天的平均值
		},
		
		// 饼图数据 - 转换为组件所需格式
		pieChartData() {
			return [
				{ name: "早餐", value: this.mealCalories.breakfast },
				{ name: "午餐", value: this.mealCalories.lunch },
				{ name: "晚餐", value: this.mealCalories.dinner },
				{ name: "其他", value: this.mealCalories.other }
			];
		},
		
		// 详情数据，包括百分比和颜色
		mealDetails() {
			return [
				{
					name: '早餐',
					calories: this.mealCalories.breakfast,
					percentage: Math.round((this.mealCalories.breakfast / this.totalCalories) * 100),
					color: this.colors.breakfast
				},
				{
					name: '午餐',
					calories: this.mealCalories.lunch,
					percentage: Math.round((this.mealCalories.lunch / this.totalCalories) * 100),
					color: this.colors.lunch
				},
				{
					name: '晚餐',
					calories: this.mealCalories.dinner,
					percentage: Math.round((this.mealCalories.dinner / this.totalCalories) * 100),
					color: this.colors.dinner
				},
				{
					name: '其他',
					calories: this.mealCalories.other,
					percentage: Math.round((this.mealCalories.other / this.totalCalories) * 100),
					color: this.colors.other
				}
			];
		}
	},
	mounted() {
		setTimeout(this.getServerData, 200);
	},
	onReady() {
		setTimeout(this.getServerData, 300);
	},
	methods: {
		// 完全模仿示例代码的方法名和实现
		getServerData() {
			// 完全按照示例格式
			let res = {
				series: [
					{
						data: [
							{ name: "早餐", value: this.mealCalories.breakfast },
							{ name: "午餐", value: this.mealCalories.lunch },
							{ name: "晚餐", value: this.mealCalories.dinner },
							{ name: "其他", value: this.mealCalories.other }
						]
					}
				]
			};
			
			console.log('重新设置图表数据');
		}
	}
};
</script>

<style lang="scss" scoped>
.calorie-container {
	padding: 30rpx;
	background-color: #f8f8f8;
	min-height: 100vh;
	
	// 卡片通用样式
	.calorie-card {
		background-color: #ffffff;
		border-radius: 20rpx;
		box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.06);
		padding: 30rpx;
		margin-bottom: 30rpx;
		position: relative;
		overflow: hidden;
	}
	
	// 顶部卡片样式
	.top-card {
		background: linear-gradient(135deg, #42d392, #34b17f);
		border-radius: 24rpx;
		box-shadow: 0 8rpx 20rpx rgba(66, 211, 146, 0.2);
		padding: 40rpx 30rpx;
		margin-bottom: 30rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		position: relative;
		overflow: hidden;
		
		.card-bubble {
			position: absolute;
			border-radius: 50%;
			background: rgba(255, 255, 255, 0.1);
		}
		
		.bubble-1 {
			width: 160rpx;
			height: 160rpx;
			top: -40rpx;
			right: -40rpx;
		}
		
		.bubble-2 {
			width: 120rpx;
			height: 120rpx;
			bottom: -30rpx;
			left: 40rpx;
		}
		
		.total-wrapper {
			display: flex;
			align-items: baseline;
			padding-bottom: 4rpx;
			
			.total-value {
				font-size: 72rpx;
				font-weight: 700;
				color: #ffffff;
				line-height: 1;
				letter-spacing: -1rpx;
				text-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.1);
			}
			
			.total-unit {
				font-size: 28rpx;
				font-weight: 500;
				color: rgba(255, 255, 255, 0.9);
				margin-left: 8rpx;
			}
		}
		
		.total-label {
			font-size: 24rpx;
			color: rgba(255, 255, 255, 0.85);
			margin-bottom: 16rpx;
		}
		
		.divider {
			width: 60rpx;
			height: 4rpx;
			background-color: rgba(255, 255, 255, 0.6);
			border-radius: 2rpx;
			margin: 10rpx 0 24rpx;
		}
		
		.metrics-container {
			display: flex;
			width: 100%;
			justify-content: center;
			
			.metric {
				display: flex;
				flex-direction: column;
				align-items: center;
				padding: 0 50rpx;
				
				&:first-child {
					position: relative;
					
					&:after {
						content: '';
						position: absolute;
						right: 0;
						top: 15%;
						height: 70%;
						width: 1rpx;
						background-color: rgba(255, 255, 255, 0.3);
					}
				}
				
				.metric-value {
					font-size: 40rpx;
					font-weight: 600;
					color: #ffffff;
					margin-bottom: 4rpx;
				}
				
				.metric-label {
					font-size: 24rpx;
					color: rgba(255, 255, 255, 0.85);
					letter-spacing: 1rpx;
				}
			}
		}
	}
	
	// 饼图卡片
	.chart-card {
		background-color: #ffffff;
		padding: 30rpx;
		height: 600rpx; // 给饼图足够的高度
		border-radius: 24rpx;
		box-shadow: 0 6rpx 16rpx rgba(0, 0, 0, 0.05);
		
		.chart-header {
			display: flex;
			align-items: center;
			margin-bottom: 20rpx;
			
			.chart-title {
				font-size: 32rpx;
				font-weight: bold;
				color: #333;
				margin-right: 16rpx;
			}
			
			.chart-divider {
				flex: 1;
				height: 2rpx;
				background: linear-gradient(90deg, #42d392, transparent);
			}
		}
	}
	
	// 餐食详情区域
	.meal-details {
		.meal-row {
			display: flex;
			justify-content: space-between;
			margin-bottom: 24rpx;
			gap: 20rpx;
			
			&:last-child {
				margin-bottom: 0;
			}
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