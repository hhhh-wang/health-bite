<template>
	<view class="container">
		<!-- 顶部导航栏 -->
		<view class="custom-navbar">
			<view class="left" @click="goBack">
				<view class="back-button">
					<u-icon name="arrow-left" color="#333" size="20"></u-icon>
				</view>
			</view>
			<view class="center">
				<text class="title">饮食详情</text>
			</view>

		</view>
		

		<!-- 卡路里统计卡片 -->
		<view class="calorie-card" style="background-color: rgb(255, 232, 215);">
			<view class="calorie-total">
				<text class="number">1194</text>
				<text class="unit">kcal</text>
			</view>
			<view class="date-info">
				<text>12月1日</text>
				<text class="exercise-count">3 食物</text>
                <text class="exercise-count">49 kcal 剩余</text>
			</view>
			
			<!-- 图表区域 -->
			<nutrition-chart
				v-if="meals.length && nutritionData.length"
				:meals="meals"
				:nutritionData="nutritionData"
				:yAxis="yAxisConfig"
				:lineNames="['总热量', '碳水化合物', '脂肪', '蛋白质']"
				canvasId="mealChart"
			/>
		</view>
		
		<!-- 底部统计数据 -->
		<view class="stats-container">
			<view class="stat-item increase">
				<text class="value">1739 kcal</text>
				<text class="label">总热量</text>
				<text class="percentage">59%</text>
			</view>
			<view class="stat-item decrease">
				<text class="value">58 g</text>
				<text class="label">碳水化合物</text>
				<text class="percentage">58 g</text>
			</view>

            <view class="stat-item increase">
				<text class="value">26 g</text>
				<text class="label">脂肪</text>
				<text class="percentage">59%</text>
			</view>
			<view class="stat-item decrease">
				<text class="value">28 g</text>
				<text class="label">蛋白质</text>
				<text class="percentage">45 g</text>
			</view>  
		</view>

		<!-- 已完成运动列表 -->
		<view class="exercise-title">饮食数据</view>
		<view class="food-list">       
			<template v-for="food in $store.state.meal.foodList">
				<view class="food-item" :key="food.id">
					<view class="food-basic-info">
						<image src="/static/common/img/food/hotdog.png" class="food-icon"></image>
						<view class="food-main-info">
							<text class="food-name">{{ food.name }}</text>
							<text class="food-portion">{{ food.portion }}</text>
						</view>
					</view>
					<view class="food-nutrition">
						<text class="nutrition-item calories">{{ food.calories }} kcal</text>
						<text class="nutrition-item carbs">{{ food.carbs }} g</text>
						<text class="nutrition-item fat">{{ food.fat }} g</text>
						<text class="nutrition-item protein">{{ food.protein }} g</text>
					</view>
					<view class="action-buttons">
						<view class="delete-btn" @click="handleDelete(food.id)">
							<u-icon name="close" color="#ff4c4c" :size="32"></u-icon>
						</view>
						<view class="edit-btn" @click="handleEdit(food)">
							<u-icon name="edit-pen" color="#42d392" :size="32"></u-icon>
						</view>
					</view>
				</view>
			</template>
		</view>

		<view class="action-buttons-container">
			<view class="manual-btn" @click="handleManualAdd">
				<text>手动添加</text>
				<u-icon name="plus" color="#42d392" :size="40"></u-icon>
			</view>
			<view class="scan-btn" @click="handleScan">
				<text>扫描添加</text>
				<u-icon name="scan" color="#42d392" :size="40"></u-icon>
			</view>
			
		</view>
	</view>
</template>

<script>
import { navigateBack } from '@/common/utils/navigate';

export default {
	components: {
		'nutrition-chart': () => import('@/components/nutrition-chart/index'),
		'u-icon': () => import('@/uview-ui/components/u-icon/u-icon')
	},
	computed: {
		foodList() {
			return this.$store.state.meal.foodList
		},
		nutritionStats() {
			return this.$store.state.meal.nutritionStats
		}
	},
	data() {
		return {
			searchKeyword: '',
			meals: [],
			nutritionData: [],
			yAxisConfig: {
				min: 0,
				max: 150
			}
		}
	},
	methods: {
		handleAdd(food) {
			this.$store.dispatch('meal/addFood', food)
		},
		handleSearch(value) {
			// 搜索功能实现
			console.log('搜索关键词：', value)
		},
		// 删除运动记录
		deleteExercise(id) {
			uni.showModal({
				title: '提示',
				content: '确定要删除这条运动记录吗？',
				success: (res) => {
					if (res.confirm) {
						// TODO: 调用API删除运动记录
						uni.showToast({
							title: '删除成功',
							icon: 'success'
						})
					}
				}
			})
		},
		// 添加新的运动
		addExercise(type) {
			uni.navigateTo({
				url: `/pages/sys/exercise/add?type=${type}`
			})
		},
		goBack() {
			navigateBack({
				redirectUrl: '/pages/sys/home/index',
				isTab: true
			});
		},
		handleScan() {
			uni.navigateTo({
				url: '../../../pages/camera/camera',
				success: () => {
					console.log('跳转到扫描页面成功');
				},
				fail: (err) => {
					console.error('跳转到扫描页面失败：', err);
					uni.showToast({
						title: '跳转失败',
						icon: 'error'
					});
				}
			});
		},
		handleManualAdd() {
			uni.navigateTo({
				url: '/pages/meal/detail/addoredit'
			});
		},
		handleEdit(food) {
			this.$store.dispatch('meal/updateFood', {
				foodId: food.id,
				food
			})
		},
		handleDelete(foodId) {
			this.$store.dispatch('meal/removeFood', foodId)
		}
	},
	onLoad() {
		// 初始化图表数据
		this.meals = ['午餐', '晚餐']
		this.nutritionData = [
			[135, 140],  // 总热量
			[90, 95],    // 碳水化合物
			[50, 55],    // 脂肪
			[25, 30]     // 蛋白质
		]
		
		// 确保 foodList 是一个数组
		if (!this.$store.state.meal.foodList) {
			this.$store.state.meal.foodList = []
		}
	}
}
</script>

<style lang="scss" scoped>
.container {
	min-height: 100vh;
	background-color: #ffffff;
	padding: 0 25rpx;
	padding-bottom: 40rpx;
	position: relative;
	
	.custom-navbar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 10rpx 20rpx;
		background-color: #ffffff;
		position: relative;
		height: 120px;
		
		.left {
			.back-button {
				width: 120rpx;
				height: 120rpx;
				background-color: rgb(246, 247, 247);
				border-radius: 50%;
				display: flex;
				align-items: center;
				justify-content: center;
			}
		}
		
		.center {
			position: absolute;
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%);
			
			.title {
				font-size: 45rpx;
				font-weight: bold;
				color: #333;
			}
		}
	}
	
	.calorie-card {
		margin: 20rpx;
		padding: 30rpx;
		background-color: #ffffff;
		border-radius: 50rpx;
		box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.05);
		
		.calorie-total {
			text-align: center;
			margin-bottom: 15rpx;
			
			.number {
				font-size: 48rpx;
				font-weight: bold;
				color: #333;
			}
			
			.unit {
				font-size: 28rpx;
				color: #666;
				margin-left: 10rpx;
			}
		}
		
		.date-info {
			display: flex;
			justify-content: center;
			align-items: center;
			gap: 20rpx;
			color: #666;
			font-size: 28rpx;
			margin-bottom: 20rpx;
		}
	}
	
	.stats-container {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 20rpx;
		padding: 20rpx;
		
		.stat-item {
			width: calc(50% - 10rpx);
			margin: 0;
			padding: 30rpx;
			background-color: rgb(240, 241, 241);
			border-radius: 50rpx;
			box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.05);
			
			.value {
				font-size: 36rpx;
				font-weight: bold;
				display: block;
				margin-bottom: 20rpx;
			}
			
			.label {
				font-size: 24rpx;
				color: #666;
			}
			
			.percentage {
				font-size: 24rpx;
				margin-left: 10rpx;
			}

			// 总热量 - 绿色
			&:nth-child(1) .value {
				color: #42d392;
			}

			// 碳水化合物 - 红色
			&:nth-child(2) .value {
				color: #ff6b6b;
			}

			// 脂肪 - 橙色
			&:nth-child(3) .value {
				color: #ffa500;
			}

			// 蛋白质 - 紫色
			&:nth-child(4) .value {
				color: #8a2be2;
			}
		}
	}

	.exercise-title {
		font-size: 32rpx;
		font-weight: bold;
		color: #333;
		margin-left: 20rpx;
		margin: 20rpx;
	}

	.food-list {
		padding: 0 20rpx;
		margin-bottom: 40rpx;
		
		.food-item {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 30rpx;
			background-color: rgb(235, 246, 214);
			border-radius: 50rpx;
			margin-bottom: 20rpx;
			
			.food-basic-info {
				display: flex;
				align-items: center;
				flex: 1;
				
				.food-icon {
					width: 80rpx;
					height: 80rpx;
					margin-right: 20rpx;
				}
				
				.food-main-info {
					display: flex;
					flex-direction: column;
					
					.food-name {
						font-size: 32rpx;
						color: #333;
						font-weight: bold;
						margin-bottom: 20rpx;
					}
					
					.food-portion {
						font-size: 24rpx;
						color: #666;
					}
				}
			}
			
			.food-nutrition {
				display: flex;
				flex-direction: column;
				align-items: flex-end;
				margin-right: 70rpx;
				font-weight: bold;
				min-width: 120rpx;
				
				.nutrition-item {
					font-size: 26rpx;
					margin-bottom: 8rpx;
					
					&.calories {
						color: #42d392;
					}
					
					&.carbs {
						color: #ff6b6b;
					}
					
					&.fat {
						color: #ffa500;
					}
					
					&.protein {
						color: #8a2be2;
					}
				}
			}
			
			.action-buttons {
				display: flex;
				flex-direction: column;
				gap: 25rpx;
				margin-left: 10rpx;

				.edit-btn, .delete-btn {
					width: 80rpx;
					height: 80rpx;
					display: flex;
					align-items: center;
					justify-content: center;
					border-radius: 50%;
					background-color: rgba(255, 255, 255, 0.9);
					transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
					box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.1);
					position: relative;
					overflow: hidden;
					
					/deep/ .u-icon {
						transform: scale(1.8);
						font-weight: bold;
						transition: all 0.2s ease;
					}
					
					&:active {
						transform: scale(0.92);
						box-shadow: 0 1rpx 4rpx rgba(0, 0, 0, 0.2);
					}
				}
				
				.edit-btn {
					&:active {
						background-color: rgba(66, 211, 146, 0.1);
					}
				}
				
				.delete-btn {
					&:active {
						background-color: rgba(255, 76, 76, 0.1);
					}
				}
			}
		}
	}

	.action-buttons-container {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		gap: 20rpx;
		padding: 30rpx;
		margin-top: 20rpx;

		.scan-btn, .manual-btn {
			flex: 1;
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 30rpx 40rpx;
			background-color: rgb(240, 241, 241);
			border-radius: 50rpx;
			transition: all 0.2s ease;

			text {
				font-size: 32rpx;
				font-weight: bold;
				color: #333;
			}

			&:active {
				transform: scale(0.98);
				background-color: rgb(235, 236, 236);
			}
		}

		.scan-btn {
			background: rgb(235, 246, 214);
		}
	}
}
</style> 
