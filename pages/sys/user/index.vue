<template>
	<view class="user-container">
		<!-- 用户信息区域 -->
		<view class="user-info-section">
			<view class="avatar-container">
				<image class="avatar" :src="avatarUrl"></image>
			</view>
			<view class="user-name">KOTO</view>
			<view class="user-stats">
				<text>{{age}} 岁</text>
				<text class="stat-divider">|</text>
				<text>{{height}}cm</text>
				<text class="stat-divider">|</text>
				<text>{{weight}}kg</text>
			</view>
		</view>
		
		<!-- 功能菜单 -->
		<view class="menu-grid">
			<!-- 订阅 -->
			<view class="menu-item subscription" @click="navTo('/pages/sys/user/subscription')">
				<view class="menu-icon-box green">
					<u-icon name="level" size="36" color="#4CAF50"></u-icon>
				</view>
				<view class="menu-content">
					<text class="menu-text">订阅</text>
					<u-icon name="arrow-right" size="22" color="#BBBBBB" class="arrow-icon"></u-icon>
				</view>
			</view>
			
			<!-- 个人主页 -->
			<view class="menu-item profile" @click="navTo('/pages/sys/user/about')">
				<view class="menu-icon-box blue">
					<u-icon name="account" size="36" color="#2196F3"></u-icon>
				</view>
				<view class="menu-content">
					<text class="menu-text">个人主页</text>
					<u-icon name="arrow-right" size="22" color="#BBBBBB" class="arrow-icon"></u-icon>
				</view>
			</view>
			
			<!-- 帮助中心 -->
			<view class="menu-item help" @click="navTo('/pages/sys/user/help')">
				<view class="menu-icon-box grey">
					<u-icon name="headphone" size="36" color="#607D8B"></u-icon>
				</view>
				<view class="menu-content">
					<text class="menu-text">帮助中心</text>
					<u-icon name="arrow-right" size="22" color="#BBBBBB" class="arrow-icon"></u-icon>
				</view>
			</view>
			
			<!-- 设置 -->
			<view class="menu-item settings" @click="navTo('/pages/settings/index')">
				<view class="menu-icon-box mint">
					<u-icon name="setting" size="36" color="#4DB6AC"></u-icon>
				</view>
				<view class="menu-content">
					<text class="menu-text">设置</text>
					<u-icon name="arrow-right" size="22" color="#BBBBBB" class="arrow-icon"></u-icon>
				</view>
			</view>
		</view>

		<!-- 饮食健康小知识 -->
		<view class="nutrition-tips-section">
			<view class="section-header">
				<text class="section-title">饮食健康小知识</text>
				<text class="refresh-tip" @click="refreshNutritionTip">换一条</text>
			</view>
			
			<view class="nutrition-tip-card">
				<view class="tip-icon">
					<u-icon name="level" size="32" color="#FF9800"></u-icon>
				</view>
				<view class="tip-content">
					<text class="tip-title">{{currentNutritionTip.title}}</text>
					<text class="tip-description">{{currentNutritionTip.content}}</text>
				</view>
			</view>
		</view>
		
		<!-- 退出按钮 -->
		<view class="logout-button" @click="logout">
			<text>退出登录</text>
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
			age: 29,
			height: 179,
			weight: 65,
			healthTips: [
				"每天步行8000-10000步，有助于维持心血管健康",
				"饭后适当休息20-30分钟再活动，有助于消化",
				"每天保持7-8小时的睡眠，可以增强免疫力",
				"多喝水，每天建议饮水量1.5-2升",
				"长时间使用电子设备后，记得休息眼睛，看远处放松"
			],
			currentTip: "",
			nutritionTips: [
				{
					title: "优质蛋白质来源",
					content: "鱼类、禽肉、蛋类、豆制品和低脂奶制品是优质蛋白质来源，每天适量摄入有助于肌肉健康。"
				},
				{
					title: "蔬菜水果每日五份",
					content: "研究表明，每天摄入至少5份蔬果(约400克)可降低心脏病、中风和某些癌症风险。"
				},
				{
					title: "膳食纤维助消化",
					content: "全谷物、豆类和坚果富含膳食纤维，能促进肠道健康，预防便秘和肠道疾病。"
				},
				{
					title: "好脂肪坏脂肪",
					content: "橄榄油、坚果和鱼类含有的不饱和脂肪酸有益心脏健康，应替代饱和脂肪和反式脂肪。"
				},
				{
					title: "控制盐糖摄入",
					content: "每日食盐摄入不超过5克，添加糖不超过25克，可降低高血压和肥胖风险。"
				},
				{
					title: "多元饮食更健康",
					content: "遵循平衡膳食原则，多样化选择各类食物，可获得全面的营养素，增强免疫力。"
				},
				{
					title: "进餐节奏很重要",
					content: "细嚼慢咽，感受饱腹感，避免暴饮暴食，有助于控制体重和改善消化。"
				}
			],
			currentNutritionTip: {}
		};
	},
	computed: {
		avatarUrl() {
			let url = this.vuex_user.avatarUrl || '/ctxPath/static/images/user1.jpg';
			url = url.replace('/ctxPath/', this.vuex_baseUrl + '/');
			return url + '?t=' + new Date().getTime();
		}
	},
	created() {
		this.refreshTip();
		this.refreshNutritionTip();
	},
	methods: {
		navTo(url) {
			uni.navigateTo({
				url: url
			});
		},
		logout() {
			// 显示确认对话框
			uni.showModal({
				title: '提示',
				content: '确定要退出登录吗？',
				success: (res) => {
					if (res.confirm) {
						// 用户点击确定，执行退出逻辑
						this.$u.api.logout().then(res => {
							this.$u.toast(res.message);
						});
						setTimeout(() => {
							uni.reLaunch({
								url: '/pages/sys/login/index'
							});
						}, 500);
					}
					// 用户点击取消，不执行任何操作
				}
			});
		},
		upgrade() {
			// #ifdef APP-PLUS
			this.$u.api.upgradeCheck().then(res => {
				if (res.result == 'true'){
					uni.showModal({
						title: '提示',
						content: res.message + '是否下载更新？',
						showCancel: true,
						success: function (res2) {
							if (res2.confirm) {
								plus.runtime.openURL(res.data.apkUrl);
							}
						}
					});
				}else{
					this.$u.toast(res.message);
				}
			});
			// #endif
			// #ifndef APP-PLUS
			this.$u.toast('小程序端或H5端无需检查更新')
			// #endif
		},
		refreshTip() {
			const randomIndex = Math.floor(Math.random() * this.healthTips.length);
			this.currentTip = this.healthTips[randomIndex];
		},
		refreshNutritionTip() {
			const randomIndex = Math.floor(Math.random() * this.nutritionTips.length);
			this.currentNutritionTip = this.nutritionTips[randomIndex];
		}
	}
};
</script>

<style lang="scss" scoped>
.user-container {
	min-height: 100vh;
	background-color: #F8F9FA;
	padding: 40rpx 30rpx;
	display: flex;
	flex-direction: column;
}

.user-info-section {
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 30rpx 0 50rpx;
	
	.avatar-container {
		width: 160rpx;
		height: 160rpx;
		border-radius: 50%;
		background-color: #E3F2FD;
		border: 6rpx solid #BBDEFB;
		overflow: hidden;
		margin-bottom: 24rpx;
		
		.avatar {
			width: 100%;
			height: 100%;
			object-fit: cover;
		}
	}
	
	.user-name {
		font-size: 38rpx;
		font-weight: bold;
		color: #263238;
		margin-bottom: 16rpx;
	}
	
	.user-stats {
		display: flex;
		align-items: center;
		color: #607D8B;
		font-size: 28rpx;
		
		.stat-divider {
			margin: 0 20rpx;
			color: #B0BEC5;
		}
	}
}

.menu-grid {
	margin-bottom: 40rpx;
	
	.menu-item {
		background-color: #FFFFFF;
		border-radius: 16rpx;
		padding: 28rpx 24rpx;
		margin-bottom: 20rpx;
		display: flex;
		align-items: center;
		box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
		
		&.subscription {
			background-color: #F1F8E9;
		}
		
		&.profile {
			background-color: #E1F5FE;
		}
		
		&.help {
			background-color: #F5F5F5;
		}
		
		&.settings {
			background-color: #E0F2F1;
		}
		
		.menu-icon-box {
			width: 80rpx;
			height: 80rpx;
			border-radius: 50%;
			display: flex;
			justify-content: center;
			align-items: center;
			margin-right: 24rpx;
			
			&.green {
				background-color: #E8F5E9;
			}
			
			&.blue {
				background-color: #E3F2FD;
			}
			
			&.grey {
				background-color: #ECEFF1;
			}
			
			&.mint {
				background-color: #E0F2F1;
			}
		}
		
		.menu-content {
			flex: 1;
			display: flex;
			justify-content: space-between;
			align-items: center;
		}
		
		.menu-text {
			font-size: 30rpx;
			color: #37474F;
			font-weight: 500;
		}
	}
}

.nutrition-tips-section {
	margin-bottom: 40rpx;
	
	.section-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 16rpx;
		
		.section-title {
			font-size: 32rpx;
			font-weight: bold;
			color: #263238;
		}
		
		.refresh-tip {
			font-size: 24rpx;
			color: #2196F3;
		}
	}
	
	.nutrition-tip-card {
		background-color: #FFF8E1;
		border-radius: 16rpx;
		padding: 24rpx;
		display: flex;
		align-items: center;
		box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
		
		.tip-icon {
			width: 70rpx;
			height: 70rpx;
			border-radius: 50%;
			background-color: #FFECB3;
			display: flex;
			justify-content: center;
			align-items: center;
			margin-right: 20rpx;
			flex-shrink: 0;
		}
		
		.tip-content {
			flex: 1;
			
			.tip-title {
				font-size: 30rpx;
				font-weight: bold;
				color: #FF9800;
				margin-bottom: 8rpx;
				display: block;
			}
			
			.tip-description {
				font-size: 26rpx;
				color: #5D4037;
				line-height: 1.5;
			}
		}
	}
}

.logout-button {
	margin-top: auto;
	background-color: #ffffff;
	border-radius: 16rpx;
	height: 88rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
	
	text {
		font-size: 30rpx;
		color: #F44336;
		font-weight: 500;
	}
}
</style>
