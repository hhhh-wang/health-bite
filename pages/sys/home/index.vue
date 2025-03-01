<template>
	<view class="container">
		<!-- 顶部区域 -->
		<view class="header">
			<view class="avatar">
				<image src="/static/images/avatar.png" ></image>
			</view>
			<view class="date-display">
				<text class="date-text">{{ date_text }}</text>
			</view>
			<view class="date-picker" @click="showDatePicker">
				<u-icon 
					name="calendar" 
					size="40" 
					color="#ffffff"
				></u-icon>
			</view>

		</view>
		<view class="text-content">
			<view class="hello">
				您好, 变量人生
			</view>
			<view class="weight-tip">
				你昨天增加了2kg, 继续保持!
			</view>
		</view>
		<!-- 主要内容区 -->
		<view class="content">
			
			<view class="progress-circle">
				<canvas canvas-id="progressCanvas" class="progress-canvas"></canvas>
				<view class="circle-content">
					<text class="fire-icon">🔥</text>
					<view class="calorie-info">
						<text class="unit">大卡</text>
						<text class="value">1739 kcal</text>
						<text class="total">2925 kcal</text>
					</view>
				</view>
			</view>
		</view>
		<view class="nutrition-stats">
			<view class="stat-item left">
				<view class="number">134<text class="unit">g</text></view>
				<view class="label">
					<text>总碳水化合物</text>
					<text class="percentage">28%</text>
				</view>
				<view class="progress-bar">
					<view class="progress" style="width: 28%;"></view>
				</view>
			</view>
			<view class="stat-item right">
				<view class="number">94<text class="unit">g</text></view>
				<view class="label">
					<text>总脂肪</text>
					<text class="percentage">81%</text>
				</view>
				<view class="progress-bar">
					<view class="progress" style="width: 81%;"></view>
				</view>
			</view>
		</view>

		<!-- 在原有代码后添加新的内容区 -->
		<view class="content-area">
			<!-- 饮食区域 -->
			<view class="today-header">
				<text class="title">今天的饮食</text>
				<view class="more-btn" @click="showActionSheet">
					<u-icon name="more-dot-fill" size="40" color="#42d392"></u-icon>
				</view>
			</view>
			<view class="diet-list">
				<!-- 早餐 -->
				<view class="food-item">

					<image src="/static/common/img/breakfast.png" class="meal-icon"></image>
					<view class="food-info">
						<text class="meal-type">早餐</text>
						<view class="food-stats">
							<text>3 食物</text>
							<text class="calories">582 / 631 kcal</text>
						</view>
					</view>
					<u-icon name="arrow-right" size="30" color="#42d392"></u-icon>
				</view>

				<!-- 午餐 -->
				<view class="food-item">
					<image src="/static/common/img/lunch.png" class="meal-icon"></image>
					<view class="food-info">
						<text class="meal-type">午餐</text>
						<view class="food-stats">
							<text>3 食物</text>
							<text class="calories">1157 / 1262 kcal</text>
						</view>
					</view>
					<u-icon name="arrow-right" size="30" color="#42d392"></u-icon>
				</view>

				<!-- 晚餐 -->
				<view class="food-item">
					<image src="/static/common/img/dinner.png" class="meal-icon"></image>
					<view class="food-info">
						<text class="meal-type">晚餐</text>
						<view class="food-stats">
							<text>0 食物</text>
							<text class="calories">0 / 946 kcal</text>
						</view>
					</view>
					<u-icon name="arrow-right" size="30" color="#42d392"></u-icon>
				</view>
			</view>
			
			<!-- 饮水区域 -->
			<view class="today-header">
				<text class="title">饮水量</text>
				<view class="more-btn">
					<u-icon name="more-dot-fill" size="40" color="#42d392"></u-icon>
				</view>
			</view>
			<view class="water-section">
				<view class="water-cups">
					<view class="cup active"></view>
					<view class="cup active"></view>
					<view class="cup"></view>
					<view class="cup"></view>
					<view class="cup"></view>
					<view class="cup"></view>
					<view class="cup"></view>
				</view>
				<view class="water-stats">
					<text class="amount">570</text>
					<text class="separator">/</text>
					<text class="total">2000ml</text>
					<text class="percentage">20%</text>
				</view>
			</view>

			<!-- 运动区域 -->
			<view class="today-header">
				<text class="title">运动</text>
				<view class="more-btn">
					<u-icon name="more-dot-fill" size="40" color="#42d392"></u-icon>
				</view>
			</view>
			<view class="diet-list">
				<view class="food-item" @click="goToExercise">
					<image src="/static/common/img/sports.png" class="meal-icon"></image>
					<view class="food-info">
						<text class="meal-type">运动</text>
						<view class="food-stats">
							<text>2 活动</text>
							<text class="calories" style="color: #ff9500;">-545 kcal</text>
						</view>
					</view>
					<u-icon name="arrow-right" size="30" color="#42d392"></u-icon>
				</view>
			</view>
		</view>

		<!-- 日期选择器 -->
		<u-picker
			v-model="showCalendar"
			mode="time"
			@confirm="confirmDate"
			@cancel="closeCalendar"
		>
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

		<!-- 添加操作菜单 -->
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
			percentage: 60, // 进度百分比
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
			]
		}
	},
	mounted() {
		this.drawProgress()
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
		
		// 日期改变
		dateChange(e) {
			console.log('日期改变:', e)
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
		
		// 关闭日期选择器
		closeCalendar() {
			this.showCalendar = false
		},
		
		// 获取选中日期的数据
		fetchDayData(date) {
			// 这里添加获取数据的逻辑
			console.log('获取日期数据:', date)
		},
		drawProgress() {
			const ctx = uni.createCanvasContext('progressCanvas', this)
			const width = 150 // 半径
			const lineWidth = 15 // 圆环宽度
			const centerX = width
			const centerY = width
			
			// 绘制底色圆环
			ctx.beginPath()
			ctx.arc(centerX, centerY, width - lineWidth, Math.PI, 0)
			ctx.setLineWidth(lineWidth)
			ctx.setStrokeStyle('rgb(212, 235, 164)') // 底色
			ctx.setLineCap('round')
			ctx.stroke()
			
			// 绘制进度圆环
			ctx.beginPath()
			ctx.arc(
				centerX,
				centerY,
				width - lineWidth,
				Math.PI,
				Math.PI + (Math.PI * this.percentage) / 100
			)
			ctx.setLineWidth(lineWidth)
			ctx.setStrokeStyle('rgb(157, 208, 48)') // 进度条颜色
			ctx.setLineCap('round')
			ctx.stroke()
			ctx.draw()
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
	padding: 40rpx;
	background-color: #f8f8f8;
}

.header {
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-bottom: calc(4vh);
	padding: calc(2vh) calc(2vw);
	
	.avatar {
		width: calc(20vw);
		height: calc(20vw);
		min-width: 80rpx;
		min-height: 80rpx;
		max-width: 120rpx;
		max-height: 120rpx;
		border-radius: 50%;
		overflow: hidden;
		
		image {
			width: 100%;
			height: 100%;
			border-radius: 50%;
		}
	}
	
	.date-display {
		flex: 1;
		display: flex;
		justify-content: center;
		align-items: center;
		
		.date-text {
			font-size: clamp(40rpx, 3.2vw, 32rpx);
			font-weight: bold;
			color: #333;
		}
	}
	
	.date-picker {
		width: calc(20vw);
		height: calc(20vw);
		min-width: 80rpx;
		min-height: 80rpx;
		max-width: 120rpx;
		max-height: 120rpx;
		border-radius: 50%;
		background: #42d392;
		display: flex;
		align-items: center;
		justify-content: center;
		box-shadow: 0 4rpx 12rpx rgba(66, 211, 146, 0.3);
		
		.u-icon {
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}
}

.text-content {
	margin: 40rpx 20rpx;  // 改用上下左右margin确保边距自适应
	text-align: center;
	display: flex;          // 改用flex布局
	flex-direction: column; // 垂直方向排列
	justify-content: center;// 居中对齐
	width: auto;           // 自适应宽度
	
	.hello {
		font-size: calc(40rpx + 2vw); // 使用calc和vw使字体大小自适应
		font-weight: bold;
		color: #333;
		margin-bottom: 4vh;  // 使用vh单位使间距自适应
	}
	
	.weight-tip {
		font-size: calc(24rpx + 1vw); // 使用calc和vw使字体大小自适应
		font-weight: bold;
		color: #666;
	}
}

.content {
	background: transparent;
	border-radius: 50rpx;

	.progress-circle {
		position: relative;
		display: flex;
		justify-content: center;
		margin: 60rpx 0;
		background-color: rgb(235, 246, 214);
		border-radius: 50rpx;
		padding: 40rpx;
		overflow: hidden;
		
		.progress-canvas {
			width: 610rpx;
			height: 400rpx;
			display: block;
		}
		
		.circle-content {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			text-align: center;
			
			.fire-icon {
				font-size: 40rpx;
				color: #ff9500;
				margin-bottom: 20rpx;
				display: block;
			}
			
			.calorie-info {
				display: flex;
				flex-direction: column;
				align-items: center;
				gap: 8rpx;
				
				.unit {
					font-size: 39rpx;
					color: #666;
					line-height: 1;
				}
				
				.value {
					font-size: 60rpx;
					color: #333;
					font-weight: 700;
					line-height: 1.2;
				}
				
				.total {
					font-size: 39rpx;
					color: #999;
					line-height: 1;
				}
			}
		}
	}
}
	.nutrition-stats {
		display: flex;
		justify-content: space-between;
		margin-top: 40rpx;
		background-color: rgb(240, 241, 241);
		padding: 30rpx;
		border-radius: 50rpx;
		
		.stat-item {
			flex: 1;
			padding: 0 20rpx;
			
			.number {
				font-size: 50rpx;
				font-weight: bold;
				color: #333;
				margin-bottom: 20rpx;
				
				.unit {
					font-size: 30rpx;
					margin-left: 4rpx;
				}
			}
			
			.label {
				display: flex;
				justify-content: space-between;
				font-size: 30rpx;
				color: #666;
				margin-bottom: 30rpx;
				
				.percentage {
					color: #42d392;
				}
			}
			
			.progress-bar {
				height: 6rpx;
				background: #eee;
				border-radius: 50rpx;
				margin-bottom: 30rpx;
				
				.progress {
					height: 100%;
					background: #42d392;
					border-radius: 50rpx;
				}
			}
			
			&.left .progress {
				background: #ff9500;
			}
			
			&.right .progress {
				background: #ff9500;
			}
		}
	}

.content-area {
	margin-top: 40rpx;
	
	.today-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: 30rpx 0 40rpx;
		
		.title {
			font-size: 32rpx;
			font-weight: bold;
			color: #333;
			margin-left: 20rpx;
		}
		
		.more-btn {
			width: 120rpx;
			height: 80rpx;
			background-color: rgb(23, 52, 48);
			border-radius: 40rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			margin-right: 20rpx;
			
			.u-icon {
				transform: scale(0.8);
			}
		}
	}

	.diet-list, .water-section {
		background-color: rgb(240, 241, 241);
		border-radius: 50rpx;
		padding: 30rpx;
		margin-bottom: 30rpx;
	}
	
	.diet-list {
		.food-item {
			display: flex;
			align-items: center;
			padding: 30rpx;
			background: #f8f8f8;
			border-radius: 50rpx;
			margin-bottom: 20rpx;
			
			&:last-child {
				margin-bottom: 0;
			}
			
			.meal-icon {
				width: 80rpx;
				height: 80rpx;
			}
			
			.food-info {
				flex: 1;
				margin-left: 30rpx;
				
				.meal-type {
					font-size: 32rpx;
					color: #333;
					font-weight: bold;
					margin-bottom: 10rpx;
				}
				
				.food-stats {
					font-size: 28rpx;
					color: #666;
					display: flex;
					gap: 20rpx;
					font-weight: bold;
					
					.calories {
						color: #42d392;
					}
				}
			}
		}
	}
	
	.water-section {
		background-color: rgb(25, 184, 136);
		
		.water-cups {
			display: flex;
			justify-content: space-between;
			margin: 40rpx;
			
			.cup {
				position: relative;
				width: 45rpx;
				height: 65rpx;
				background: rgb(177, 212, 184);  // 未满杯子的背景色
				clip-path: polygon(0 0, 100% 0, 85% 100%, 15% 100%);  // 创建梯形形状
				
				// 杯口边缘
				&::after {
					content: '';
					position: absolute;
					top: 0;
					left: 0;
					width: 100%;
					height: 4rpx;
					background: rgba(255, 255, 255, 0.3);
				}
				
				&.active {
					background: rgb(255, 255, 255);  // 已满杯子的背景色
					
					&::after {
						background: rgba(255, 255, 255, 0.8);
					}
				}
			}
		}
		
		.water-stats {
			text-align: center;
			font-size: 28rpx;
			color: #ffffff;
			font-weight: bold;
			.separator {
				margin: 0 10rpx;
			}
			
			.percentage {
				margin-left: 20rpx;
				
			}
		}
	}
}

.food-stats {
	.calories {
		&.negative {
			color: #ff9500;  // 运动消耗卡路里显示为橙色
		}
	}
}

.more-btn {
	&:active {
		opacity: 0.8;
	}
}
</style>
