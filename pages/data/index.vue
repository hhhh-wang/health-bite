<template>
	<view class="container">
		<view class="header">
			<view class="avatar">
				<image src="/static/images/avatar.png"></image>
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
			date: '',
			showCalendar: false,
			mode: 'single',
			selectedDate: this.getFormatDate(),
			date_text: this.getFormatDate(),
			defaultDate: '',
			minDate: '',
			maxDate: '',

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
	onLoad() {
		// 初始化日期为今天
		const now = new Date();
		const year = now.getFullYear();
		const month = now.getMonth() + 1;
		const day = now.getDate();
		this.date = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
		this.defaultDate = this.date;
		this.minDate = '2020-01-01';
		this.maxDate = this.date;
	},
	methods: {
		// 标签切换事件
		tabChange(index) {
			this.current = index;
		},
		// 显示日期选择器
		showDatePicker() {
			console.log('显示日期选择器')
			this.showCalendar = true
		},
		// 日期选择确认
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
		calendarClose() {
			this.showCalendar = false;
		},
				// 获取选中日期的数据
		fetchDayData(date) {
			// 这里添加获取数据的逻辑
			console.log('获取日期数据:', date)
		},
		getFormatDate() {
			const date = new Date()
			const year = date.getFullYear()
			const month = String(date.getMonth() + 1).padStart(2, '0')
			const day = String(date.getDate()).padStart(2, '0')
			return `${year}-${month}-${day}`
		},
	}
}
</script>

<style lang="scss">
.container {
	padding: 40rpx;
	background-color: #f8f8f8;
	
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