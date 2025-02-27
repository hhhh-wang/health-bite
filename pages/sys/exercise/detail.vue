<template>
	<view class="container">
		<!-- 顶部导航栏 -->
		<u-navbar
			title="运动详情"
			:is-back="true"
			:background="{ background: '#ffffff' }"
		>
			<view class="right" slot="right">
				<u-icon name="plus" size="28" color="#18B566" @click="handleAdd"></u-icon>
			</view>
		</u-navbar>
		
		<!-- 搜索框 -->
		<view class="search-box">
			<u-search
				v-model="searchKeyword"
				:show-action="false"
				placeholder="输入关键字搜索"
				shape="round"
				:clearabled="true"
				@change="handleSearch"
			></u-search>
		</view>
		
		<!-- 卡路里统计卡片 -->
		<view class="calorie-card">
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
					type="line"
					:opts="chartOpts"
					:chartData="chartData"
				/>
			</view>
		</view>
		
		<!-- 底部统计数据 -->
		<view class="stats-container">
			<view class="stat-item increase">
				<text class="value">1739kcal</text>
				<text class="label">增长卡卡</text>
				<text class="percentage">59%</text>
			</view>
			<view class="stat-item decrease">
				<text class="value">-545kcal</text>
				<text class="label">消耗卡卡</text>
				<text class="percentage">32%</text>
			</view>
		</view>

		<!-- 已完成运动列表 -->
		<view class="exercise-list">
            <view class="exercise-title">运动数据</view>
			<view class="exercise-item">
				<view class="exercise-icon">
					<image src="/static/common/img/pingpong.png"></image>
				</view>
				<view class="exercise-info">
					<text class="exercise-name">乒乓球</text>
					<text class="exercise-duration">30 分钟</text>
				</view>
				<view class="exercise-calories">
					<text>-155 卡路里</text>
				</view>
				<view class="delete-btn" @click="deleteExercise(1)">
					<u-icon name="close" color="#999" size="20"></u-icon>
				</view>
			</view>
			<view class="exercise-item">
				<view class="exercise-icon">
					<image src="/static/common/img/basketball.png"></image>
				</view>
				<view class="exercise-info">
					<text class="exercise-name">篮球</text>
					<text class="exercise-duration">50 分钟</text>
				</view>
				<view class="exercise-calories">
					<text>-390 卡路里</text>
				</view>
				<view class="delete-btn" @click="deleteExercise(2)">
					<u-icon name="close" color="#999" size="20"></u-icon>
				</view>
			</view>
		</view>

		<!-- 今日运动 -->
		<view class="today-exercise">
			<view class="section-title">今日运动</view>
			<view class="exercise-options">
				<view class="option-item" @click="addExercise('健身')">
					<view class="option-icon">
						<image src="/static/common/img/fitness.png"></image>
					</view>
					<view class="option-info">
						<text class="option-name">杠铃</text>
						<text class="option-stats">-- 分钟  --卡路里</text>
					</view>
					<view class="add-btn">
						<u-icon name="plus" color="#42d392" size="24"></u-icon>
					</view>
				</view>
				<view class="option-item" @click="addExercise('跑步')">
					<view class="option-icon">
						<image src="/static/common/img/running.png"></image>
					</view>
					<view class="option-info">
						<text class="option-name">跑步</text>
						<text class="option-stats">-- 分钟  --卡路里</text>
					</view>
					<view class="add-btn">
						<u-icon name="plus" color="#42d392" size="24"></u-icon>
					</view>
				</view>
				<view class="option-item" @click="addExercise('台球')">
					<view class="option-icon">
						<image src="/static/common/img/billiards.png"></image>
					</view>
					<view class="option-info">
						<text class="option-name">台球</text>
						<text class="option-stats">-- 分钟  --卡路里</text>
					</view>
					<view class="add-btn">
						<u-icon name="plus" color="#42d392" size="24"></u-icon>
					</view>
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
				categories: ['', '', '', '', '', ''],
				series: [{
					name: '增长',
					data: [35, 45, 47, 43, 40, 47],
					color: '#18B566'
				}, {
					name: '消耗',
					data: [20, 25, 28, 26, 27, 32],
					color: '#FF6B6B'
				}]
			},
			chartOpts: {
				color: ["#18B566","#FF6B6B"],
				padding: [15, 15, 15, 15],
				legend: {
					show: true,
					position: 'bottom',
					itemGap: 20,
				},
				xAxis: {
					show: true,
					type: 'category'
				},
				yAxis: {
					show: true,
					type: 'value'
				},
				extra: {
					line: {
						type: 'curve',
						width: 2
					}
				}
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
		}
	}
}
</script>

<style lang="scss" scoped>
.container {
	min-height: 100vh;
	background-color: #f5f5f5;
	
	.search-box {
		padding: 20rpx;
	}
	
	.calorie-card {
		margin: 20rpx;
		padding: 30rpx;
		background-color: #ffffff;
		border-radius: 16rpx;
		box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.05);
		
		.calorie-total {
			text-align: center;
			margin-bottom: 20rpx;
			
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
			margin-bottom: 30rpx;
		}
		
		.chart-container {
			height: 400rpx;
			width: 100%;
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
			background-color: #ffffff;
			border-radius: 16rpx;
			box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.05);
			
			.value {
				font-size: 36rpx;
				font-weight: bold;
				display: block;
				margin-bottom: 10rpx;
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

	.exercise-list {
		margin: 20rpx;
		
		.exercise-item {
			display: flex;
			align-items: center;
			padding: 30rpx;
			background-color: rgba(24, 181, 102, 0.1);
			border-radius: 16rpx;
			margin-bottom: 20rpx;
			position: relative;
			
			.exercise-icon {
				width: 80rpx;
				height: 80rpx;
				
				image {
					width: 100%;
					height: 100%;
				}
			}
			
			.exercise-info {
				flex: 1;
				margin-left: 20rpx;
				
				.exercise-name {
					font-size: 32rpx;
					color: #333;
					font-weight: bold;
				}
				
				.exercise-duration {
					font-size: 24rpx;
					color: #666;
					margin-top: 8rpx;
				}
			}
			
			.exercise-calories {
				font-size: 28rpx;
				color: #ff6b6b;
				font-weight: bold;
			}
			
			.delete-btn {
				position: absolute;
				top: 20rpx;
				right: 20rpx;
				padding: 10rpx;
			}
		}
	}

	.today-exercise {
		margin: 20rpx;
		
		.section-title {
			font-size: 32rpx;
			font-weight: bold;
			color: #333;
			margin-bottom: 20rpx;
			padding: 0 20rpx;
		}
		
		.exercise-options {
			background-color: #fff;
			border-radius: 16rpx;
			padding: 20rpx;
			
			.option-item {
				display: flex;
				align-items: center;
				padding: 20rpx;
				border-bottom: 2rpx solid #f5f5f5;
				
				&:last-child {
					border-bottom: none;
				}
				
				.option-icon {
					width: 60rpx;
					height: 60rpx;
					
					image {
						width: 100%;
						height: 100%;
					}
				}
				
				.option-info {
					flex: 1;
					margin-left: 20rpx;
					
					.option-name {
						font-size: 28rpx;
						color: #333;
					}
					
					.option-stats {
						font-size: 24rpx;
						color: #999;
						margin-top: 4rpx;
					}
				}
				
				.add-btn {
					padding: 10rpx;
				}
			}
		}
	}
}
</style> 