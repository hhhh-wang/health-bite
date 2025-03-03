<template>
	<view class="calorie-container">
		<view class="total-calories">
			<text class="total-number">{{ totalCalories }} kcal</text>
			<view class="calorie-types">
				<text>{{ averageCalories }}平均Cals</text>
				<text>{{ targetCalories }}目标Cals</text>
			</view>
		</view>
		
		<view class="charts-box">
			<qiun-data-charts 
				type="pie"
				:opts="opts"
				:chartData="chartData"
				canvasId="calories-pie-chart"
			/>
		</view>
		
		<view class="calorie-details">
			<view class="detail-item" v-for="(item, index) in mealDetails" :key="index">
				<text class="value">{{ item.calories }}</text>
				<text class="label">{{ item.name }}</text>
				<text class="percentage" :style="{color: item.color}">{{ item.percentage }}%</text>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'CalorieTab',
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
			
			// 图表数据 - 使用最简单的数据结构
			chartData: {
				series: []
			},
			
			// 图表配置 - 简化配置
			opts: {
				color: ["#43B3AE", "#5B9BD5", "#F8BD7F", "#E99497"],
				padding: [15, 15, 15, 15],
				enableScroll: false,
				extra: {
					pie: {
						activeOpacity: 0.8,
						activeRadius: 10,
						offsetAngle: 0,
						labelWidth: 15,
						border: false,
						borderWidth: 3,
						borderColor: "#FFFFFF"
					}
				}
			},
			
			// 颜色对应 - 使用更健康的颜色
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
			
			this.chartData = res;
			console.log('重新设置图表数据');
		}
	}
};
</script>

<style lang="scss" scoped>
.calorie-container {
	padding: 20rpx;
	
	.total-calories {
		text-align: center;
		margin-bottom: 30rpx;
		
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
	
	.charts-box {
		width: 100%;
		height: 300px; /* 使用px而非rpx */
		margin: 20rpx 0 30rpx;
		background-color: #fff;
		border-radius: 16rpx;
		padding: 10rpx;
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
			}
		}
	}
}
</style> 