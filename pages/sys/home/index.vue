<template>
	<view class="container">
		<!-- 顶部区域 -->
		<view class="header">
			<view class="avatar">
				<image src="/static/images/avatar.png" ></image>
			</view>
			<view class="date-display">
				<text class="date-text">2025-02-01</text>
			</view>
			<view class="date-picker" @click="handleSkip">
				<u-icon 
					name="calendar" 
					size="40" 
					color="#ffffff"
					customStyle="background-color: #42d392; padding: 20rpx; border-radius: 50%;"
				></u-icon>
			</view>

		</view>
		<view class="text-content">
			<view class="hello">
				您好, KOTO
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
				<view class="more-btn">
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
				<view class="food-item">
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
		}
	},
	mounted() {
		this.drawProgress()
	},
	methods: {
		handleSkip() {
			// 处理日期选择
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
	margin-bottom: 40rpx;
	padding: 20rpx;
	
	.avatar {
		width: 120rpx;
		height: 120rpx;
		border-radius: 50%;
		overflow: hidden;
		
		image {
			width: 120rpx;
			height: 120rpx;
			border-radius: 50%;
		}
	}
	
	.date-display {
		flex: 1;
		display: flex;
		justify-content: center;
		align-items: center;
		
		.date-text {
			font-size: 32rpx;
			font-weight: bold;
			color: #333;
		}
	}
	
	.date-picker {
		width: 120rpx;
		height: 120rpx;
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
	margin-bottom: 40rpx;
	text-align: center;
	display: block;
	
	.hello {
		font-size: 50rpx;
		font-weight: bold;
		color: #333;
		margin-bottom: 30rpx;
	}
	
	.weight-tip {
		font-size: 28rpx;
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
				width: 60rpx;
				height: 80rpx;
				background: rgb(117, 212, 184);// 修改未满杯子的背景色
				border-radius: 20rpx;
				
				&.active {
					background: rgb(255, 255, 255);  // 修改已满杯子的背景色
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
</style>
