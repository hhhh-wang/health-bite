<template>
	<view class="container">
		<view class="header">
			<view class="avatar">
				<image src="/static/images/avatar.png"></image>
			</view>
			<view class="date-selector">
				<text>{{currentDate}}</text>
				<u-icon name="arrow-down" size="28"></u-icon>
			</view>
			<view class="settings">
				<u-icon name="calendar" size="40" color="#ffffff"></u-icon>
			</view>
		</view>
		
		<view class="title-section">
			<text class="page-title">数据报告</text>
			<view class="more-actions">
				<u-icon name="more-dot-fill" size="40" color="#333"></u-icon>
			</view>
		</view>
		
		<!-- 标签页组件 -->
		<view class="tabs-container">
			<u-tabs 
				:list="tabsList" 
				:current="current"
				@change="tabChange"
				activeStyle="color: #ffffff; background-color: #223039;"
				inactiveStyle="color: #303133;"
				itemStyle="height: 80rpx; padding: 0 40rpx; border-radius: 50rpx; margin: 0 10rpx;"
			></u-tabs>
			
			<!-- 懒加载内容 -->
			<view class="tab-content">
				<component :is="currentComponent"></component>
			</view>
		</view>
	</view>
</template>

<script>
// 引入各个标签页组件
import CalorieTab from '@/components/calorie-tab/index';
import NutritionTab from '@/components/nutrition-tab/index';
import NutritionDistributionTab from '@/components/nutrition-distribution-tab/index';

export default {
	components: {
		CalorieTab,
		NutritionTab,
		NutritionDistributionTab
	},
	data() {
		return {
			currentDate: '2023-12-01',
			current: 0,
			tabsList: [
				{name: '干卡'},
				{name: '产能营养'},
				{name: '营养成分'}
			]
		}
	},
	computed: {
		// 根据当前选中的标签返回对应的组件
		currentComponent() {
			switch(this.current) {
				case 0: 
					return 'CalorieTab';
				case 1: 
					return 'NutritionTab';
				case 2: 
					return 'NutritionDistributionTab';
				default: 
					return 'CalorieTab';
			}
		}
	},
	methods: {
		// 标签切换事件
		tabChange(index) {
			this.current = index;
		}
	}
}
</script>

<style lang="scss">
.container {
	padding: 0;
	background-color: #ffffff;
	
	.header {
		padding: 40rpx 30rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		
		.avatar {
			width: 80rpx;
			height: 80rpx;
			border-radius: 50%;
			overflow: hidden;
			
			image {
				width: 100%;
				height: 100%;
			}
		}
		
		.date-selector {
			display: flex;
			align-items: center;
			font-size: 32rpx;
			color: #333;
		}
		
		.settings {
			width: 80rpx;
			height: 80rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			background-color: #42d392;
			border-radius: 50%;
		}
	}
	
	.title-section {
		padding: 20rpx 30rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		
		.page-title {
			font-size: 40rpx;
			font-weight: bold;
			color: #333;
		}
		
		.more-actions {
			background-color: #e9e9e9;
			padding: 10rpx 20rpx;
			border-radius: 50rpx;
		}
	}
	
	.tabs-container {
		padding: 20rpx 30rpx;
		
		.tab-content {
			margin-top: 30rpx;
		}
	}
}
</style>