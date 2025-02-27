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
				<text class="title">运动详情</text>
			</view>
			<view class="right" @click="handleAdd">
				<view class="add-button">
					<u-icon name="plus" color="#ffffff" size="20"></u-icon>
				</view>
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
				<text class="exercise-count">2运动</text>
			</view>
			
			<!-- 图表区域 -->
			<view class="chart-container">
				<qiun-data-charts 
					type="area"
					:opts="chartOpts"
					:chartData="chartData"
					canvasId="exerciseChart"
					background="none"
				/>
			</view>
		</view>
		
		<!-- 底部统计数据 -->
		<view class="stats-container">
			<view class="stat-item increase">
				<text class="value">1739kcal</text>
				<text class="label">增长千卡</text>
				<text class="percentage">59%</text>
			</view>
			<view class="stat-item decrease">
				<text class="value">-545kcal</text>
				<text class="label">消耗千卡</text>
				<text class="percentage">32%</text>
			</view>
		</view>

		<!-- 已完成运动列表 -->
		<view class="exercise-title">运动数据</view>
		
		<view class="exercise-list">       
			<view class="exercise-item">
				<image src="/static/common/img/sports/table-tennis.png"></image>
				<view class="exercise-info">
					<text class="exercise-name">乒乓球</text>
                    <view class="exercise-calories">
                        <text class="exercise-duration">30 分钟</text>
                        <text>155 消耗</text>
                    </view>
				</view>
				<view class="delete-btn" @click="deleteExercise(1)">
					<u-icon name="close" size="20"></u-icon>
				</view>
			</view>
			<view class="exercise-item">
				<image src="/static/common/img/sports/basketball.png"></image>
				<view class="exercise-info">
					<text class="exercise-name">篮球</text>
	
                    <view class="exercise-calories">
                        <text class="exercise-duration">30 分钟</text>
                        <text>155 消耗</text>
                    </view>
				</view>
				<view class="delete-btn" @click="deleteExercise(2)">
					<u-icon name="close" size="20"></u-icon>
				</view>
			</view>
		</view>

		<view class="exercise-title">今日运动</view>
		<view class="exercise-list">
			<view class="exercise-item" @click="addExercise('跑步')">
				<image src="/static/common/img/sports/run.png"></image>
				<view class="exercise-info">
					<text class="exercise-name">添加运动记录</text>
					<view class="exercise-calories">
						<text class="exercise-duration">-- 分钟</text>
						<text>-- 消耗</text>
					</view>
				</view>
				<view class="add-btn">
					<u-icon name="plus" color="#42d392" size="24"></u-icon>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			searchKeyword: '',
			chartData: {
				categories: ['20', '26', '32', '38', '44', '50'],
				series: [{
					name: '增长',
					data: [35, 45, 47, 43, 40, 47],
					color: '#42d392'
				}, {
					name: '消耗',
					data: [20, 25, 28, 26, 27, 32],
					color: '#ff6b6b'
				}]
			},
			chartOpts: {
				padding: [30, 10, 10, 40],
				background: 'rgb(255, 232, 215)',
				enableScroll: false,
				legend: {
					show: false
				},
				xAxis: {
					show: false,
					type: 'category',
					boundaryGap: false,
					disabled: true
				},
				yAxis: {
					show: true,
					gridType: 'dash',
					gridColor: '#E3E3E3',
					splitNumber: 5,
					format: 'number',
					min: 20,
					max: 50,
					fontSize: 11,
					color: '#999999',
					axisLine: false,
					disabled: true,
					disableGrid: false
				},
				extra: {
					area: {
						type: 'curve',
						opacity: 0.15,
						addLine: true,
						width: 2,
						gradient: true,
						activeType: 'none'
					}
				},
				width: 650,
				height: 300
			}
		}
	},
	methods: {
		handleAdd() {
			// 添加运动记录
			uni.navigateTo({
				url: '/pages/sys/exercise/add'
			})
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
			uni.navigateBack({
				delta: 1,
				animationType: 'pop-out',
				animationDuration: 300
			})
		}
	}
}
</script>

<style lang="scss" scoped>
.container {
	min-height: 100vh;
	background-color: #ffffff;
	padding: 0 25rpx;
	
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
		
		.right {
			width: 120rpx;
			height: 120rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			
			.add-button {
				width: 120rpx;
				height: 120rpx;
				background-color: #18B566;
				border-radius: 50%;
				display: flex;
				align-items: center;
				justify-content: center;
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
		
		.chart-container {
			height: 300rpx;
			width: 100%;
			margin: 30rpx 0;
			position: relative;
			
			/deep/ .qiun-charts {
				width: 100%;
				height: 100%;
			}
		}
	}
	
	.stats-container {
		display: flex;
		justify-content: space-between;
		padding: 20rpx;
		
		.stat-item {
			flex: 1;
			margin: 0 10rpx;
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
		}
		
		.increase .value {
			color: #18B566;
		}
		
		.decrease .value {
			color: #FF6B6B;
		}
	}
	.exercise-title {
            font-size: 32rpx;
			font-weight: bold;
			color: #333;
			margin-left: 20rpx;
            margin: 20rpx;
        }
	.exercise-list {
        border-radius: 50rpx;
        padding: 30rpx;
		.exercise-item {
			display: flex;
			align-items: center;
			padding: 30rpx;
			border-radius: 50rpx;
			margin-bottom: 40rpx;
			position: relative;
			box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.05);
			background-color: rgb(235, 246, 214);
			image {
				width: 80rpx;
				height: 80rpx;
				padding: 15rpx;
			}
			
			/deep/ .exercise-info {
				flex: 1;
				margin-left: 20rpx;
				
				.exercise-name {
					font-size: 32rpx;
					color: #333;
					font-weight: bold;
					margin-bottom: 20rpx !important;
				}
				
				.exercise-calories {
					display: flex;
					align-items: center;
					gap: 30rpx;
					margin-top: 15rpx;
					
					.exercise-duration {
						font-size: 24rpx;
						color: #666;
						background-color: #f5f5f5;
						padding: 4rpx 16rpx;
						border-radius: 20rpx;
					}
					
					text:last-child {
						font-size: 24rpx;
						color: #ff6b6b;
						font-weight: bold;
					}
				}
			}
			
			.delete-btn {
				width: 44rpx;
				height: 44rpx;
				display: flex;
				align-items: center;
				justify-content: center;
			
				border-radius: 50%;
				margin-left: 20rpx;
				
				.u-icon {
					color: #ff4c4c 
				}
			}
		}
	}

	.section-title {
			font-size: 32rpx;
			font-weight: bold;
			color: #333;
			margin-bottom: 20rpx;
			padding: 0 20rpx;
		}
}
</style> 