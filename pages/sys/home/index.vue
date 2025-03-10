<template>
	<view class="container">
		<!-- 顶部区域 - 使用更活力的设计 -->
		<view class="header-section">
			<view class="avatar-wrapper">
				<image src="/static/images/avatar.png" class="avatar-img"></image>
			</view>
			<view class="date-display">
				<text class="date-text">{{ date_text }}</text>
			</view>
			<view class="date-picker-btn btn-hover" @click="showDatePicker">
				<u-icon name="calendar" size="40" color="#ffffff"></u-icon>
			</view>
		</view>
		
		<!-- 欢迎文本 - 增加活力感 -->
		<view class="welcome-section wave-bg">
			<view class="greeting">
				您好, 变量人生
			</view>
			<view class="progress-message">
				<u-icon name="arrow-upward" color="#42d392" size="28"></u-icon>
				<text>你昨天增加了2kg, 继续保持!</text>
			</view>
		</view>
		
		<!-- 卡路里卡片 - 更加活力化 -->
		<view class="fitness-card calories-card">
			<view class="card-header">
				<view class="icon-circle">
					<text class="fire-icon">🔥</text>
				</view>
				<text class="card-title">今日卡路里</text>
			</view>
			<view class="card-content">
				<text class="current-value">{{currentCalories}}</text>
				<text class="unit">kcal</text>
			</view>
			<view class="progress-container">
				<view class="progress-bar">
					<view class="progress-fill" :style="{width: caloriePercentage + '%'}"></view>
					<view class="progress-indicator" :style="{left: caloriePercentage + '%'}"></view>
				</view>
			</view>
			<view class="card-footer">
				<text>目标: {{targetCalories}} kcal (已完成{{caloriePercentage}}%)</text>
			</view>
		</view>
		
		<!-- 营养素卡片 - 更鲜明的视觉效果 -->
		<view class="nutrition-cards">
			<!-- 碳水化合物卡片 -->
			<view class="nutrition-card carbs-card">
				<view class="card-top">
					<view class="nutrient-icon">🌾</view>
					<view class="nutrient-title">碳水化合物</view>
					<view class="nutrient-value">
						<text class="number">134</text>
						<text class="unit">g</text>
					</view>
				</view>
				<view class="progress-info">
					<text class="percentage">28%</text>
					<view class="progress-bar">
						<view class="progress carbs" style="width: 28%;"></view>
					</view>
				</view>
			</view>
			
			<!-- 脂肪卡片 -->
			<view class="nutrition-card fat-card">
				<view class="card-top">
					<view class="nutrient-icon">🥑</view>
					<view class="nutrient-title">总脂肪</view>
					<view class="nutrient-value">
						<text class="number">94</text>
						<text class="unit">g</text>
					</view>
				</view>
				<view class="progress-info">
					<text class="percentage">81%</text>
					<view class="progress-bar">
						<view class="progress fat" style="width: 81%;"></view>
					</view>
				</view>
			</view>
		</view>
		
		<!-- 饮食区域 - 更友好的设计 -->
		<view class="content-section">
			<view class="section-header">
				<view class="title-with-icon">
					<u-icon name="shopping-cart" size="36" color="#42d392"></u-icon>
					<text class="section-title">今天的饮食</text>
				</view>
				<view class="action-btn btn-hover" @click="showActionSheet">
					<u-icon name="more-dot-fill" size="40" color="#ffffff"></u-icon>
				</view>
			</view>
			
			<!-- 饮食列表 - 更流畅的卡片设计 -->
			<view class="meal-list">
				<!-- 早餐 -->
				<view class="meal-card btn-hover">
					<image src="/static/common/img/breakfast.png" class="meal-icon"></image>
					<view class="meal-details">
						<text class="meal-name">早餐</text>
						<view class="meal-stats">
							<view class="stat-item">
								<u-icon name="grid" size="24" color="#666666"></u-icon>
								<text>3 食物</text>
							</view>
							<view class="stat-item">
								<u-icon name="fire" size="24" color="#ff9736"></u-icon>
								<text class="calories">582 / 631 kcal</text>
							</view>
						</view>
					</view>
					<view class="arrow-icon">
						<u-icon name="arrow-right" size="30" color="#42d392"></u-icon>
					</view>
				</view>
				
				<!-- 午餐 -->
				<view class="meal-card btn-hover">
					<image src="/static/common/img/lunch.png" class="meal-icon"></image>
					<view class="meal-details">
						<text class="meal-name">午餐</text>
						<view class="meal-stats">
							<view class="stat-item">
								<u-icon name="grid" size="24" color="#666666"></u-icon>
								<text>3 食物</text>
							</view>
							<view class="stat-item">
								<u-icon name="fire" size="24" color="#ff9736"></u-icon>
								<text class="calories">1157 / 1262 kcal</text>
							</view>
						</view>
					</view>
					<view class="arrow-icon">
						<u-icon name="arrow-right" size="30" color="#42d392"></u-icon>
					</view>
				</view>
				
				<!-- 晚餐 -->
				<view class="meal-card btn-hover">
					<image src="/static/common/img/dinner.png" class="meal-icon"></image>
					<view class="meal-details">
						<text class="meal-name">晚餐</text>
						<view class="meal-stats">
							<view class="stat-item">
								<u-icon name="grid" size="24" color="#666666"></u-icon>
								<text>0 食物</text>
							</view>
							<view class="stat-item">
								<u-icon name="fire" size="24" color="#ff9736"></u-icon>
								<text class="calories">0 / 946 kcal</text>
							</view>
						</view>
					</view>
					<view class="arrow-icon">
						<u-icon name="arrow-right" size="30" color="#42d392"></u-icon>
					</view>
				</view>
			</view>
		</view>
		
		<!-- 饮水区域 - 视觉感更强 -->
		<view class="content-section">
			<view class="section-header">
				<view class="title-with-icon">
					<u-icon name="glass" size="36" color="#4eb8f0"></u-icon>
					<text class="section-title">饮水量</text>
				</view>
				<view class="action-btn water-btn btn-hover">
					<u-icon name="plus" size="36" color="#ffffff"></u-icon>
				</view>
			</view>
			
			<view class="water-section">
				<view class="water-level">
					<view class="water-wave" style="height: 20%"></view>
					<view class="water-stats">
						<text class="amount">570</text>
						<text class="separator">/</text>
						<text class="total">2000ml</text>
						<text class="percentage">28%</text>
					</view>
				</view>
				<view class="water-cups">
					<view class="cup active"></view>
					<view class="cup active"></view>
					<view class="cup"></view>
					<view class="cup"></view>
					<view class="cup"></view>
					<view class="cup"></view>
					<view class="cup"></view>
				</view>
			</view>
		</view>
		
		<!-- 运动区域 - 更有活力 -->
		<view class="content-section">
			<view class="section-header">
				<view class="title-with-icon">
					<u-icon name="heart" size="36" color="#ff5e3a"></u-icon>
					<text class="section-title">运动</text>
				</view>
				<view class="action-btn exercise-btn btn-hover">
					<u-icon name="plus" size="36" color="#ffffff"></u-icon>
				</view>
			</view>
			
			<view class="exercise-card btn-hover" @click="goToExercise">
				<image src="/static/common/img/sports.png" class="exercise-icon"></image>
				<view class="exercise-details">
					<text class="exercise-title">今日活动</text>
					<view class="exercise-stats">
						<view class="stat-item">
							<u-icon name="star" size="24" color="#ffd66b"></u-icon>
							<text>2 活动</text>
						</view>
						<view class="stat-item">
							<u-icon name="fire" size="24" color="#ff9500"></u-icon>
							<text class="calories negative">-545 kcal</text>
						</view>
					</view>
				</view>
				<view class="arrow-icon">
					<u-icon name="arrow-right" size="30" color="#ff5e3a"></u-icon>
				</view>
			</view>
		</view>
		
		<!-- 保留原有的功能组件 -->
		<u-picker v-model="showCalendar" mode="time" @confirm="confirmDate" @cancel="closeCalendar">
			<u-calendar
				:show="showCalendar"
				mode="single"
				:defaultDate="selectedDate"
				@change="dateChange"
				@confirm="confirmDate"
				@close="closeCalendar"
				color="#42d392"
			></u-calendar>
		</u-picker>
		
		<u-action-sheet
			:list="actionList"
			v-model="showActions"
			@click="handleAction"
			:border-radius="20"
			cancel-text="取消"
		></u-action-sheet>
	</view>
</template>

<script>
/**
 * Copyright (c) 2013-Now http://jeesite.com All rights reserved.
 */
export default {
	data() {
		return {
			showCalendar: false,
			selectedDate: this.getFormatDate(),
			currentDate: this.getFormatDate(),
			date_text: this.getFormatDate(),
			showActions: false,
			actionList: [
				{
					text: '忽略今天',
					icon: 'calendar-fill'
				},
				{
					text: '复制另一天的饮食',
					icon: 'calendar'
				},
				{
					text: '设置',
					icon: 'setting'
				}
			],
			currentCalories: 1739,
			targetCalories: 2925
		}
	},
	computed: {
		caloriePercentage() {
			return Math.min(Math.round((this.currentCalories / this.targetCalories) * 100), 100);
		}
	},
	mounted() {
	},
	methods: {
		// 格式化日期
		getFormatDate() {
			const date = new Date()
			const year = date.getFullYear()
			const month = String(date.getMonth() + 1).padStart(2, '0')
			const day = String(date.getDate()).padStart(2, '0')
			return `${year}-${month}-${day}`
		},

		// 显示日期选择器
		showDatePicker() {
			console.log('显示日期选择器')
			this.showCalendar = true
		},
		
		// 确认日期
		confirmDate(e) {
			console.log('确认日期:', e)
			// 格式化日期字符串
			const date = `${e.year}-${e.month}-${e.day}`
			this.selectedDate = date
			this.date_text = date
			this.showCalendar = false
			// 获取选中日期的数据
			this.fetchDayData(date)
		},
		
		// 日期改变事件
		dateChange(e) {
			console.log('日期改变:', e)
			const date = `${e.year}-${e.month}-${e.day}`
			this.selectedDate = date
			this.date_text = date
			// 获取选中日期的数据
			this.fetchDayData(date)
		},
		
		// 关闭日期选择器
		closeCalendar() {
			this.showCalendar = false
		},
		
		// 获取选中日期的数据
		fetchDayData(date) {
			// 这里添加获取数据的逻辑
			console.log('获取日期数据:', date)
			// 可以从 store 获取对应日期的饮食数据
			this.$store.dispatch('meal/fetchDayMeals', date)
		},
		// 显示操作菜单
		showActionSheet() {
			this.showActions = true
		},
		
		// 处理菜单选择
		handleAction(index) {
			switch(index) {
				case 0: // 忽略今天
					this.ignoreTodayMeal()
					break
				case 1: // 复制另一天的饮食
					this.goToCopyMeal()
					break
				case 2: // 设置
					this.goToSettings()
					break
			}
		},
		
		// 跳转到复制饮食页面
		goToCopyMeal() {
			uni.navigateTo({
				url: '/pages/meal/copy/index'
			})
		},
		
		// 跳转到设置页面
		goToSettings() {
			uni.navigateTo({
				url: '/pages/meal/settings/index'
			})
		},
		goToExercise() {
			uni.navigateTo({
				url: '/pages/sys/exercise/detail'
			})
		}
	}
};
</script>

<style lang="scss">
@import 'index.scss';

page {
	background-color: #f8f8f8;
	font-family: "Microsoft YaHei", sans-serif;
}

.container {
	padding: 30rpx;
	background-color: #f8f8f8;
}

/* 顶部区域样式 */
.header-section {
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-bottom: 40rpx;
	
	.avatar-wrapper {
		width: 100rpx;
		height: 100rpx;
		border-radius: 50%;
		overflow: hidden;
		box-shadow: 0 6rpx 16rpx rgba(0, 0, 0, 0.1);
		border: 3rpx solid rgba(66, 211, 146, 0.3);
		
		.avatar-img {
			width: 100%;
			height: 100%;
			border-radius: 50%;
		}
	}
	
	.date-display {
		flex: 1;
		display: flex;
		justify-content: center;
		
		.date-text {
			font-size: 32rpx;
			font-weight: bold;
			color: #333;
			background: rgba(66, 211, 146, 0.1);
			padding: 10rpx 20rpx;
			border-radius: 30rpx;
		}
	}
	
	.date-picker-btn {
		width: 100rpx;
		height: 100rpx;
		border-radius: 50%;
		background: linear-gradient(135deg, #42d392, #2cc17e);
		display: flex;
		align-items: center;
		justify-content: center;
		box-shadow: 0 6rpx 16rpx rgba(66, 211, 146, 0.3);
		transition: all 0.3s;
	}
}

/* 欢迎区域样式 */
.welcome-section {
	margin: 20rpx 0 40rpx;
	background: linear-gradient(135deg, #fbfbfb, #f0f0f0);
	border-radius: 30rpx;
	padding: 30rpx;
	text-align: center;
	box-shadow: 0 8rpx 20rpx rgba(0, 0, 0, 0.05);
	
	.greeting {
		font-size: 44rpx;
		font-weight: bold;
		color: #333;
		margin-bottom: 20rpx;
		background: linear-gradient(45deg, #42d392, #4eb8f0);
		-webkit-background-clip: text;
		color: transparent;
	}
	
	.progress-message {
		font-size: 28rpx;
		color: #666;
		display: flex;
		align-items: center;
		justify-content: center;
		
		text {
			margin-left: 10rpx;
		}
	}
}

/* 卡路里卡片样式 */
.fitness-card {
	background: linear-gradient(135deg, rgb(235, 246, 214), rgb(220, 240, 200));
	border-radius: 30rpx;
	padding: 40rpx 30rpx;
	margin-bottom: 30rpx;
	box-shadow: 0 8rpx 20rpx rgba(0, 0, 0, 0.07);
	
	.card-header {
		display: flex;
		align-items: center;
		justify-content: center;
		margin-bottom: 30rpx;
		
		.icon-circle {
			width: 60rpx;
			height: 60rpx;
			border-radius: 50%;
			background: rgba(255, 151, 54, 0.2);
			display: flex;
			align-items: center;
			justify-content: center;
			margin-right: 15rpx;
			
			.fire-icon {
				font-size: 36rpx;
			}
		}
		
		.card-title {
			font-size: 36rpx;
			color: #333;
			font-weight: 600;
		}
	}
	
	.card-content {
		margin: 30rpx 0;
		text-align: center;
		
		.current-value {
			font-size: 90rpx;
			background: linear-gradient(45deg, #42d392, #ff9736);
			-webkit-background-clip: text;
			color: transparent;
			font-weight: 700;
		}
		
		.unit {
			font-size: 32rpx;
			color: #666;
			margin-left: 10rpx;
		}
	}
	
	.progress-container {
		margin: 20rpx 0;
		padding: 0 20rpx;
		
		.progress-bar {
			height: 16rpx;
			background-color: rgba(255, 255, 255, 0.6);
			border-radius: 50rpx;
			overflow: visible;
			position: relative;
			
			.progress-fill {
				height: 100%;
				background: linear-gradient(90deg, #42d392, #ff9736);
				border-radius: 50rpx;
				transition: width 0.5s ease-out;
			}
			
			.progress-indicator {
				position: absolute;
				width: 30rpx;
				height: 30rpx;
				background: #ffffff;
				border: 6rpx solid #42d392;
				border-radius: 50%;
				top: 50%;
				transform: translate(-50%, -50%);
				box-shadow: 0 4rpx 8rpx rgba(0, 0, 0, 0.2);
			}
		}
	}
	
	.card-footer {
		font-size: 28rpx;
		color: #666;
		margin-top: 20rpx;
		display: flex;
		justify-content: center;
		
		text {
			background-color: rgba(255, 255, 255, 0.6);
			padding: 10rpx 20rpx;
			border-radius: 50rpx;
			font-weight: 500;
		}
	}
}

/* 营养卡片样式 */
.nutrition-cards {
	margin: 30rpx 0;
	display: flex;
	gap: 20rpx;
	
	.nutrition-card {
		flex: 1;
		border-radius: 30rpx;
		padding: 24rpx;
		box-shadow: 0 8rpx 20rpx rgba(0, 0, 0, 0.07);
		transition: all 0.3s;
		
		&.carbs-card {
			background: linear-gradient(135deg, #fff6e5, #ffe8c0);
		}
		
		&.fat-card {
			background: linear-gradient(135deg, #ffe5e5, #ffcaca);
		}
		
		.card-top {
			display: flex;
			flex-direction: column;
			margin-bottom: 16rpx;
			
			.nutrient-icon {
				font-size: 36rpx;
				margin-bottom: 10rpx;
			}
			
			.nutrient-title {
				font-size: 28rpx;
				color: #666;
				margin-bottom: 10rpx;
				font-weight: 600;
			}
			
			.nutrient-value {
				display: flex;
				align-items: baseline;
				
				.number {
					font-size: 50rpx;
					font-weight: bold;
					color: #333;
				}
				
				.unit {
					font-size: 28rpx;
					color: #999;
					margin-left: 8rpx;
				}
			}
		}
		
		.progress-info {
			.percentage {
				font-size: 30rpx;
				font-weight: bold;
				margin-bottom: 15rpx;
				display: block;
				text-align: right;
			}
			
			.progress-bar {
				height: 10rpx;
				background-color: rgba(255, 255, 255, 0.6);
				border-radius: 50rpx;
				overflow: hidden;
				
				.progress {
					height: 100%;
					border-radius: 50rpx;
					transition: width 0.5s ease-out;
					
					&.carbs {
						background: linear-gradient(90deg, #ffaa00, #ff8800);
					}
					
					&.fat {
						background: linear-gradient(90deg, #ff6b6b, #ff4545);
					}
				}
			}
		}
	}
}

/* 内容区域样式 */
.content-section {
	margin-top: 40rpx;
	animation: fadeIn 0.5s ease-out;
	
	.section-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 30rpx;
		
		.title-with-icon {
			display: flex;
			align-items: center;
			
			.section-title {
				font-size: 36rpx;
				font-weight: bold;
				color: #333;
				margin-left: 15rpx;
			}
		}
		
		.action-btn {
			width: 80rpx;
			height: 80rpx;
			border-radius: 50%;
			display: flex;
			align-items: center;
			justify-content: center;
			background: #42d392;
			box-shadow: 0 6rpx 12rpx rgba(66, 211, 146, 0.3);
			transition: all 0.3s;
			
			&.water-btn {
				background: linear-gradient(135deg, #4eb8f0, #33a3e1);
				box-shadow: 0 6rpx 12rpx rgba(78, 184, 240, 0.3);
			}
			
			&.exercise-btn {
				background: linear-gradient(135deg, #ff9500, #ff5e3a);
				box-shadow: 0 6rpx 12rpx rgba(255, 94, 58, 0.3);
			}
		}
	}
	
	/* 饮食列表样式 */
	.meal-list {
		display: flex;
		flex-direction: column;
		gap: 20rpx;
	}
	
	.meal-card {
		display: flex;
		align-items: center;
		padding: 30rpx;
		background: #ffffff;
		border-radius: 30rpx;
		box-shadow: 0 6rpx 16rpx rgba(0, 0, 0, 0.05);
		transition: all 0.3s;
		
		.meal-icon {
			width: 90rpx;
			height: 90rpx;
			border-radius: 50%;
			background: rgba(66, 211, 146, 0.1);
			padding: 15rpx;
		}
		
		.meal-details {
			flex: 1;
			margin-left: 30rpx;
			
			.meal-name {
				font-size: 34rpx;
				color: #333;
				font-weight: bold;
				margin-bottom: 10rpx;
			}
			
			.meal-stats {
				display: flex;
				gap: 30rpx;
				
				.stat-item {
					display: flex;
					align-items: center;
					
					text {
						font-size: 28rpx;
						color: #666;
						margin-left: 10rpx;
						font-weight: 500;
					}
					
					.calories {
						color: #42d392;
						
						&.negative {
							color: #ff9500;
						}
					}
				}
			}
		}
		
		.arrow-icon {
			width: 60rpx;
			display: flex;
			justify-content: center;
		}
		
		&:hover {
			transform: translateY(-5rpx);
		}
	}
	
	/* 水分摄入区域 */
	.water-section {
		background: linear-gradient(135deg, #4eb8f0, #33a3e1);
		border-radius: 30rpx;
		padding: 40rpx 30rpx;
		box-shadow: 0 8rpx 20rpx rgba(78, 184, 240, 0.3);
		
		.water-level {
			height: 200rpx;
			background: rgba(255, 255, 255, 0.2);
			border-radius: 20rpx;
			margin-bottom: 30rpx;
			position: relative;
			overflow: hidden;
			
			.water-wave {
				position: absolute;
				bottom: 0;
				left: 0;
				right: 0;
				background: rgba(255, 255, 255, 0.6);
				border-radius: 20rpx 20rpx 0 0;
			}
			
			.water-stats {
				position: absolute;
				top: 0;
				left: 0;
				right: 0;
				bottom: 0;
				display: flex;
				align-items: center;
				justify-content: center;
				
				text {
					color: #ffffff;
					font-weight: bold;
					font-size: 36rpx;
					text-shadow: 0 2rpx 5rpx rgba(0, 0, 0, 0.2);
				}
				
				.separator {
					margin: 0 10rpx;
				}
				
				.percentage {
					margin-left: 30rpx;
					background: rgba(255, 255, 255, 0.3);
					padding: 6rpx 16rpx;
					border-radius: 20rpx;
				}
			}
		}
		
		.water-cups {
			display: flex;
			justify-content: space-between;
			margin: 40rpx;
			
			.cup {
				position: relative;
				width: 45rpx;
				height: 65rpx;
				background: rgba(255, 255, 255, 0.3);
				clip-path: polygon(0 0, 100% 0, 85% 100%, 15% 100%);
				transition: all 0.3s;
				
				&::after {
					content: '';
					position: absolute;
					top: 0;
					left: 0;
					width: 100%;
					height: 4rpx;
					background: rgba(255, 255, 255, 0.5);
				}
				
				&.active {
					background: rgba(255, 255, 255, 0.8);
					transform: translateY(-5rpx);
					
					&::after {
						background: rgba(255, 255, 255, 1);
					}
				}
			}
		}
	}
	
	/* 运动卡片样式 */
	.exercise-card {
		display: flex;
		align-items: center;
		padding: 30rpx;
		background: #ffffff;
		border-radius: 30rpx;
		box-shadow: 0 6rpx 16rpx rgba(0, 0, 0, 0.05);
		transition: all 0.3s;
		
		.exercise-icon {
			width: 90rpx;
			height: 90rpx;
			border-radius: 50%;
			background: rgba(255, 94, 58, 0.1);
			padding: 15rpx;
		}
		
		.exercise-details {
			flex: 1;
			margin-left: 30rpx;
			
			.exercise-title {
				font-size: 34rpx;
				color: #333;
				font-weight: bold;
				margin-bottom: 10rpx;
			}
			
			.exercise-stats {
				display: flex;
				gap: 30rpx;
				
				.stat-item {
					display: flex;
					align-items: center;
					
					text {
						font-size: 28rpx;
						color: #666;
						margin-left: 10rpx;
						font-weight: 500;
					}
					
					.calories {
						&.negative {
							color: #ff9500;
							font-weight: bold;
						}
					}
				}
			}
		}
	}
}

@keyframes fadeIn {
	from {
		opacity: 0;
		transform: translateY(20rpx);
	}
	to {
		opacity: 1;
		transform: translateY(0);
	}
}
</style>
