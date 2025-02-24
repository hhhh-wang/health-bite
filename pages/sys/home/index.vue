<template>
	<view class="container">
		<!-- 顶部区域 -->
		<view class="header">
			<view class="avatar">
				<image src="/static/images/avatar.png" ></image>
			</view>
			<view class="date-display">
				<text class="date-text">2023-12-01</text>
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

		<!-- 主要内容区 -->
		<view class="content">
			<view class="text-content">
				<view class="hello">
					您好, KOTO
				</view>
				<view class="weight-tip">
					你昨天增加了2kg, 继续保持!
				</view>
			</view>

			<view class="progress-circle">
				<view class="circle-wrapper">
					<!-- 这里使用自定义组件或canvas绘制半圆进度 -->
					<u-circle-progress
						:percentage="60"
						:width="200"
						activeColor="#42d392"
						inactiveColor="#eee"
					></u-circle-progress>
					<view class="circle-content">
						<u-icon name="fire" size="24" color="#ff9500"></u-icon>
						<text class="unit">大卡</text>
						<text class="value">1739</text>
						<text class="total">/ 2925 kcal</text>
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
			
		}
	},
	methods: {
		handleSkip() {
			// 处理日期选择
		}
	}
};
</script>

<style lang="scss">
@import 'index.scss';
page {
	background-color: #f8f8f8;
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
		margin-right: 20rpx;
		
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
			font-family: "Microsoft YaHei", sans-serif;
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

.content {
	background: #fff;
	border-radius: 20rpx;
	padding: 30rpx;
	
	.text-content {
		margin-bottom: 40rpx;
		
		.hello {
			font-size: 40rpx;
			font-weight: bold;
			color: #333;
			margin-bottom: 10rpx;
		}
		
		.weight-tip {
			font-size: 28rpx;
			color: #666;
		}
	}
	
	.progress-circle {
		display: flex;
		justify-content: center;
		margin: 60rpx 0;
		
		.circle-wrapper {
			position: relative;
			
			.circle-content {
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
				text-align: center;
				
				.unit {
					font-size: 24rpx;
					color: #666;
					display: block;
				}
				
				.value {
					font-size: 48rpx;
					color: #333;
					font-weight: bold;
					margin: 10rpx 0;
				}
				
				.total {
					font-size: 24rpx;
					color: #999;
				}
			}
		}
	}
	
	.nutrition-stats {
		display: flex;
		justify-content: space-between;
		margin-top: 40rpx;
		
		.stat-item {
			flex: 1;
			padding: 0 20rpx;
			
			.number {
				font-size: 40rpx;
				font-weight: bold;
				color: #333;
				margin-bottom: 10rpx;
				
				.unit {
					font-size: 24rpx;
					margin-left: 4rpx;
				}
			}
			
			.label {
				display: flex;
				justify-content: space-between;
				font-size: 24rpx;
				color: #666;
				margin-bottom: 10rpx;
				
				.percentage {
					color: #42d392;
				}
			}
			
			.progress-bar {
				height: 6rpx;
				background: #eee;
				border-radius: 3rpx;
				
				.progress {
					height: 100%;
					background: #42d392;
					border-radius: 3rpx;
				}
			}
			
			&.left .progress {
				background: #42d392;
			}
			
			&.right .progress {
				background: #ff9500;
			}
		}
	}
}
</style>
