<template>
	<view class="container">
		<!-- 顶部区域 -->
		<view class="custom-navbar">
			<view class="left" @click="goBack">
				<view class="back-button">
					<u-icon name="arrow-left" color="#333" size="20"></u-icon>
				</view>
			</view>
			<view class="center">
				<text class="title">当前的饮食</text>
			</view>
		</view>
		<!-- 在原有代码后添加新的内容区 -->
		<view class="content-area">
			<!-- 当前饮食区域 -->
			<view class="today-header">
				<text class="title">饮食区域</text>

			</view>
			<view class="diet-list-current">
				<!-- 早餐 -->
				<view class="food-item-current">

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
				<view class="food-item-current">
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
				<view class="food-item-current">
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

			<view class="today-header">
				<text class="title">其他可选</text>

			</view>
			<view class="diet-list-optional">
				<!-- 早饭后茶点 -->
				<view class="food-item-optional">
					<image src="/static/common/img/settings/after-breakfast.png" class="meal-icon"></image>
					<view class="food-info">
						<text class="meal-type">早饭后茶点</text>
						<view class="food-stats">
							<text class="calories">51 kcal</text>
						</view>
					</view>
					<u-icon name="plus" size="30" color="#42d392"></u-icon>
				</view>

				<!-- 午餐后水果 -->
				<view class="food-item-optional">
					<image src="/static/common/img/settings/fruit-lunch.png" class="meal-icon"></image>
					<view class="food-info">
						<text class="meal-type">午餐后茶点</text>
						<view class="food-stats">
							<text class="calories">92 kcal</text>
						</view>
					</view>
					<u-icon name="plus" size="30" color="#42d392"></u-icon>
				</view>

				<!-- 运动前补给 -->
				<view class="food-item-optional">
					<image src="/static/common/img/settings/pre-exercise.png" class="meal-icon"></image>
					<view class="food-info">
						<text class="meal-type">运动前补给</text>
						<view class="food-stats">
							<text class="calories">46 kcal</text>
						</view>
					</view>
					<u-icon name="plus" size="30" color="#42d392"></u-icon>
				</view>

				<!-- 运动后补给 -->
				<view class="food-item-optional">
					<image src="/static/common/img/settings/post-exercise.png" class="meal-icon"></image>
					<view class="food-info">
						<text class="meal-type">运动后补给</text>
						<view class="food-stats">
							<text class="calories">46 kcal</text>
						</view>
					</view>
					<u-icon name="plus" size="30" color="#42d392"></u-icon>
				</view>

				<!-- 睡前小吃 -->
				<view class="food-item-optional">
					<image src="/static/common/img/settings/bedtime-snack.png" class="meal-icon"></image>
					<view class="food-info">
						<text class="meal-type">睡前小吃</text>
						<view class="food-stats">
							<text class="calories">46 kcal</text>
						</view>
					</view>
					<u-icon name="plus" size="30" color="#42d392"></u-icon>
				</view>

				<!-- 放纵餐 -->
				<view class="food-item-optional">
					<image src="/static/common/img/settings/Indulgent-meal.png" class="meal-icon"></image>
					<view class="food-info">
						<text class="meal-type">放纵餐</text>
						<view class="food-stats">
							<text class="calories">1000kcal</text>
						</view>
					</view>
					<u-icon name="plus" size="30" color="#42d392"></u-icon>
				</view>
			</view>
		</view>
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
		goBack() {
			// 获取当前页面栈
			const pages = getCurrentPages()
			if (pages.length > 1) {
				// 如果有上一页，则正常返回
				uni.navigateBack({
					delta: 1,
					animationType: 'pop-out',
					animationDuration: 300,
					success: () => {
						console.log('返回成功')
					},
					fail: (err) => {
						console.error('返回失败:', err)
						// 如果返回失败，则重定向到首页
						uni.switchTab({
							url: '/pages/sys/home/index'
						})
					}
				})
			} else {
				// 如果没有上一页，则重定向到首页
				uni.switchTab({
					url: '/pages/sys/home/index'
				})
			}
		}
	}
};
</script>

<style lang="scss">

page {
	background-color: #f8f8f8;
	font-family: "Microsoft YaHei", sans-serif;
}

.container {
	padding: 40rpx;
	background-color: #f8f8f8;
	
	.custom-navbar {
		display: flex;
		align-items: center;
		padding: 20rpx 30rpx;
		background-color: #f8f8f8;
		position: relative;
		height: 120rpx;
		
		.left {
			position: relative;
			z-index: 1;
			
			.back-button {
				width: 100rpx;
				height: 100rpx;
				background-color: rgb(240, 241, 241);
				border-radius: 50%;
				display: flex;
				align-items: center;
				justify-content: center;
				transition: all 0.3s ease;
				
				&:active {
					transform: scale(0.95);
					background-color: rgb(235, 236, 236);
				}
			}
		}
		
		.center {
			position: absolute;
			left: 0;
			right: 0;
			top: 50%;
			transform: translateY(-50%);
			text-align: center;
			pointer-events: none;
			
			.title {
				font-size: 36rpx;
				font-weight: bold;
				color: #333;
			}
		}
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

	.diet-list-current, .diet-list-optional {
		background-color: rgb(240, 241, 241);
		border-radius: 50rpx;
		padding: 30rpx;
		margin-bottom: 30rpx;
	}
	
	.diet-list-current {
		.food-item-current {
			display: flex;
			align-items: center;
			padding: 30rpx;
			background: rgb(235, 246, 214);
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

	.diet-list-optional {
		.food-item-optional {
			display: flex;
			align-items: center;
			padding: 30rpx;
			background: rgb(246, 247, 247);
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

