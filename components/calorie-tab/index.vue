<template>
	<view class="calorie-container">
		<!-- 顶部卡路里总览卡片 -->
		<view class="calorie-card top-card">
			<view class="total-wrapper">
				<text class="total-value">{{ totalCalories }}</text>
				<text class="total-unit">kcal</text>
			</view>
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
	background-color: #f7f9fc; // 浅蓝灰色背景，看起来清爽健康
	min-height: 100vh;
	
	// 卡片通用样式
	.calorie-card {
		background-color: #ffffff;
		border-radius: 20rpx;
		box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.06);
		padding: 30rpx;
		margin-bottom: 24rpx;
	}
	
	// 顶部卡片样式 - 已优化
	.top-card {
		background-color: #ffffff;
		border-radius: 28rpx;
		box-shadow: 0 6rpx 16rpx rgba(0, 0, 0, 0.03);
		padding: 36rpx 30rpx;
		margin-bottom: 24rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		
		.total-wrapper {
			display: flex;
			align-items: baseline;
			padding-bottom: 12rpx;
			
			.total-value {
				font-size: 72rpx;
				font-weight: 700;
				color: #2d3436;
				line-height: 1;
				letter-spacing: -1rpx;
			}
			
			.total-unit {
				font-size: 28rpx;
				font-weight: 500;
				color: #636e72;
				margin-left: 6rpx;
			}
		}
		
		.divider {
			width: 60rpx;
			height: 4rpx;
			background-color: #4299e1; // 健康蓝色
			border-radius: 2rpx;
			margin: 16rpx 0 24rpx;
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
						background-color: #e0e6ed;
					}
				}
				
				.metric-value {
					font-size: 40rpx;
					font-weight: 600;
					color: #2d3436;
					margin-bottom: 4rpx;
				}
				
				.metric-label {
					font-size: 24rpx;
					color: #636e72;
					letter-spacing: 1rpx;
				}
			}
		}
	}
	
	// 饼图卡片
	.chart-card {
		padding: 20rpx;
		height: 550rpx; // 给饼图足够的高度
	}
	
	// 餐食详情区域 - 样式简化，因为卡片已移至组件
	.meal-details {
		.meal-row {
			display: flex;
			justify-content: space-between;
			margin-bottom: 24rpx;
			
			&:last-child {
				margin-bottom: 0;
			}
		}
	}
}
</style> 