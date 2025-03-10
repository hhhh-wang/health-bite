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
		<view class="calorie-card">
			<view class="calorie-total">
				<text class="number">1194</text>
				<text class="unit">kcal</text>
			</view>
			<view class="date-info">
				<text class="date">12月1日</text>
				<text class="food-count">3 食物</text>
                <text class="remaining">49 kcal 剩余</text>
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
			<view class="stat-item calories">
				<view class="stat-icon">🔥</view>
				<text class="value">1739 kcal</text>
				<text class="label">总热量</text>
				<text class="percentage">59%</text>
			</view>
			<view class="stat-item carbs">
				<view class="stat-icon">🌾</view>
				<text class="value">58 g</text>
				<text class="label">碳水化合物</text>
				<text class="percentage">58 g</text>
			</view>

            <view class="stat-item fat">
				<view class="stat-icon">🥑</view>
				<text class="value">26 g</text>
				<text class="label">脂肪</text>
				<text class="percentage">59%</text>
			</view>
			<view class="stat-item protein">
				<view class="stat-icon">🥩</view>
				<text class="value">28 g</text>
				<text class="label">蛋白质</text>
				<text class="percentage">45 g</text>
			</view>  
		</view>

		<!-- 饮食数据列表 -->
		<view class="section-header">
			<view class="header-icon">🍽️</view>
			<text class="section-title">饮食数据</text>
		</view>
		
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
						<view class="edit-btn" @click="handleEdit(food)">
							<u-icon name="edit-pen" color="#42d392" :size="28"></u-icon>
						</view>
						<view class="delete-btn" @click="handleDelete(food.id)">
							<u-icon name="trash" color="#ff4c4c" :size="28"></u-icon>
						</view>
					</view>
				</view>
			</template>
		</view>

		<view class="action-buttons-container">
			<view class="manual-btn" @click="handleManualAdd">
				<u-icon name="plus" color="#ffffff" :size="24"></u-icon>
				<text>手动添加</text>
			</view>
			<view class="scan-btn" @click="handleScan">
				<u-icon name="scan" color="#ffffff" :size="24"></u-icon>
				<text>扫描添加</text>
			</view>
		</view>
	</view>
</template>

<script>
import { navigateBack } from '@/common/utils/navigate';
import NutritionChart from '@/components/nutrition-chart/index.vue';  // 修改导入方式
export default {
	components: {
		NutritionChart,
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
	background-color: #f8f9fa;
	padding: 0 30rpx;
	padding-bottom: 40rpx;
	position: relative;
	
	.custom-navbar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 20rpx 0;
		background-color: transparent;
		position: relative;
		height: 100rpx;
		
		.left {
			z-index: 1;
			.back-button {
				width: 80rpx;
				height: 80rpx;
				background-color: rgba(255, 255, 255, 0.9);
				border-radius: 50%;
				display: flex;
				align-items: center;
				justify-content: center;
				box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
				transition: all 0.2s;
				
				&:active {
					transform: scale(0.95);
				}
			}
		}
		
		.center {
			position: absolute;
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%);
			
			.title {
				font-size: 38rpx;
				font-weight: bold;
				color: #333;
			}
		}
	}
	
	/* 卡路里卡片 */
	.calorie-card {
		background: linear-gradient(135deg, #42d392, #3abeaf);
		border-radius: 30rpx;
		padding: 40rpx 30rpx;
		margin: 20rpx 0 40rpx;
		color: #fff;
		box-shadow: 0 10rpx 20rpx rgba(66, 211, 146, 0.2);
		overflow: hidden;
		position: relative;
		
		&::before {
			content: '';
			position: absolute;
			top: -20rpx;
			right: -20rpx;
			width: 180rpx;
			height: 180rpx;
			border-radius: 50%;
			background: rgba(255, 255, 255, 0.1);
		}
		
		&::after {
			content: '';
			position: absolute;
			bottom: -40rpx;
			left: -40rpx;
			width: 220rpx;
			height: 220rpx;
			border-radius: 50%;
			background: rgba(255, 255, 255, 0.08);
		}
		
		.calorie-total {
			display: flex;
			align-items: baseline;
			margin-bottom: 20rpx;
			position: relative;
			z-index: 1;
			
			.number {
				font-size: 68rpx;
				font-weight: bold;
				letter-spacing: -1rpx;
			}
			
			.unit {
				font-size: 34rpx;
				opacity: 0.9;
				margin-left: 10rpx;
			}
		}
		
		.date-info {
			display: flex;
			align-items: center;
			font-size: 26rpx;
			opacity: 0.9;
			margin-bottom: 30rpx;
			position: relative;
			z-index: 1;
			
			.date {
				font-weight: 500;
				margin-right: 30rpx;
			}
			
			.food-count, .remaining {
				position: relative;
				padding-left: 20rpx;
				margin-left: 20rpx;
				
				&::before {
					content: '';
					position: absolute;
					left: 0;
					top: 50%;
					transform: translateY(-50%);
					width: 6rpx;
					height: 6rpx;
					border-radius: 50%;
					background: #fff;
					opacity: 0.8;
				}
			}
			
			.remaining {
				font-weight: 500;
			}
		}
	}
	
	/* 统计数据 */
	.stats-container {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		gap: 20rpx;
		margin-bottom: 50rpx;
		
		.stat-item {
			width: calc(50% - 20rpx); /* 强制两列布局，考虑间距 */
			background: #fff;
			border-radius: 24rpx;
			padding: 25rpx 20rpx;
			display: flex;
			flex-direction: column;
			box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.04);
			position: relative;
			overflow: hidden;
			
			&::after {
				content: '';
				position: absolute;
				left: 0;
				top: 0;
				width: 8rpx;
				height: 100%;
				opacity: 0.7;
			}
			
			.stat-icon {
				position: absolute;
				top: 15rpx;
				right: 15rpx;
				font-size: 28rpx;
				opacity: 0.7;
			}
			
			.value {
				font-size: 40rpx;
				font-weight: bold;
				margin-bottom: 8rpx;
			}
			
			.label {
				font-size: 24rpx;
				color: #666;
				margin-bottom: 15rpx;
			}
			
			.percentage {
				font-size: 24rpx;
				font-weight: 500;
				padding: 6rpx 14rpx;
				border-radius: 20rpx;
				align-self: flex-start;
			}
			
			&.calories {
				&::after { background-color: #42d392; }
				.value { color: #42d392; }
				.percentage { 
					background-color: rgba(66, 211, 146, 0.1);
					color: #42d392;
				}
			}
			
			&.carbs {
				&::after { background-color: #ff9736; }
				.value { color: #ff9736; }
				.percentage { 
					background-color: rgba(255, 151, 54, 0.1);
					color: #ff9736;
				}
			}
			
			&.fat {
				&::after { background-color: #ff5e3a; }
				.value { color: #ff5e3a; }
				.percentage { 
					background-color: rgba(255, 94, 58, 0.1);
					color: #ff5e3a;
				}
			}
			
			&.protein {
				&::after { background-color: #4eb8f0; }
				.value { color: #4eb8f0; }
				.percentage { 
					background-color: rgba(78, 184, 240, 0.1);
					color: #4eb8f0;
				}
			}
		}
	}
	
	/* 饮食数据标题 */
	.section-header {
		display: flex;
		align-items: center;
		margin: 40rpx 0 30rpx;
		
		.header-icon {
			font-size: 40rpx;
			margin-right: 15rpx;
		}
		
		.section-title {
			font-size: 34rpx;
			font-weight: bold;
			color: #333;
			position: relative;
			
			&::after {
				content: '';
				position: absolute;
				left: 0;
				bottom: -10rpx;
				width: 40rpx;
				height: 4rpx;
				background: #42d392;
				border-radius: 2rpx;
			}
		}
	}
	
	/* 食物列表 */
	.food-list {
		.food-item {
			background: #fff;
			border-radius: 20rpx;
			padding: 25rpx;
			margin-bottom: 20rpx;
			box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.03);
			transition: all 0.2s;
			
			&:active {
				transform: scale(0.99);
			}
			
			.food-basic-info {
				display: flex;
				align-items: center;
				margin-bottom: 20rpx;
				
				.food-icon {
					width: 80rpx;
					height: 80rpx;
					border-radius: 20rpx;
					background: rgba(66, 211, 146, 0.1);
					padding: 10rpx;
				}
				
				.food-main-info {
					margin-left: 20rpx;
					
					.food-name {
						font-size: 30rpx;
						font-weight: bold;
						color: #333;
						margin-bottom: 8rpx;
						display: block;
					}
					
					.food-portion {
						font-size: 24rpx;
						color: #999;
					}
				}
			}
			
			.food-nutrition {
				display: flex;
				flex-wrap: wrap;
				gap: 12rpx;
				margin-bottom: 20rpx;
				
				.nutrition-item {
					padding: 6rpx 16rpx;
					font-size: 22rpx;
					border-radius: 20rpx;
					
					&.calories {
						color: #42d392;
						background: rgba(66, 211, 146, 0.1);
					}
					
					&.carbs {
						color: #ff9736;
						background: rgba(255, 151, 54, 0.1);
					}
					
					&.fat {
						color: #ff5e3a;
						background: rgba(255, 94, 58, 0.1);
					}
					
					&.protein {
						color: #4eb8f0;
						background: rgba(78, 184, 240, 0.1);
					}
				}
			}
			
			.action-buttons {
				display: flex;
				justify-content: flex-end;
				gap: 15rpx;
				
				.edit-btn, .delete-btn {
					width: 60rpx;
					height: 60rpx;
					border-radius: 50%;
					display: flex;
					align-items: center;
					justify-content: center;
					transition: all 0.2s;
					
					&:active {
						transform: scale(0.9);
					}
				}
				
				.edit-btn {
					background: rgba(66, 211, 146, 0.1);
				}
				
				.delete-btn {
					background: rgba(255, 76, 76, 0.1);
				}
			}
		}
	}
	
	/* 底部操作按钮 */
	.action-buttons-container {
		display: flex;
		gap: 20rpx;
		margin-top: 40rpx;
		
		.manual-btn, .scan-btn {
			flex: 1;
			height: 90rpx;
			border-radius: 45rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			color: #fff;
			font-size: 28rpx;
			font-weight: bold;
			box-shadow: 0 6rpx 15rpx rgba(0, 0, 0, 0.1);
			transition: all 0.3s;
			
			u-icon {
				margin-right: 10rpx;
			}
			
			&:active {
				transform: translateY(2rpx);
				box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.08);
			}
		}
		
		.manual-btn {
			background: linear-gradient(135deg, #42d392, #2cc17e);
		}
		
		.scan-btn {
			background: linear-gradient(135deg, #4facfe, #00f2fe);
		}
	}
}
</style> 
