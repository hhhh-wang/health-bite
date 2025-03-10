<template>
	<view class="user-container">
		<!-- 用户信息区域 -->
		<view class="user-info-section">
			<view class="info-bg-decoration">
				<view class="decoration-circle circle-1"></view>
				<view class="decoration-circle circle-2"></view>
			</view>
			
			<view class="avatar-container">
				<image class="avatar" :src="avatarUrl"></image>
			</view>
			<view class="user-name">变量</view>
			<view class="user-stats">
				<view class="stat-item">
					<text class="stat-value">{{age}}</text>
					<text class="stat-label">岁</text>
				</view>
				<view class="stat-divider"></view>
				<view class="stat-item">
					<text class="stat-value">{{height}}</text>
					<text class="stat-label">cm</text>
				</view>
				<view class="stat-divider"></view>
				<view class="stat-item">
					<text class="stat-value">{{weight}}</text>
					<text class="stat-label">kg</text>
				</view>
			</view>
		</view>
		
		<!-- 功能菜单 -->
		<view class="menu-grid">
			<!-- 订阅 -->
			<view class="menu-item subscription" @click="navTo('/pages/sys/user/subscription')">
				<view class="menu-icon-box">
					<u-icon name="level" size="36" color="#4CAF50"></u-icon>
				</view>
				<view class="menu-content">
					<text class="menu-text">订阅</text>
					<u-icon name="arrow-right" size="22" color="#BBBBBB" class="arrow-icon"></u-icon>
				</view>
			</view>
			
			<!-- 个人主页 -->
			<view class="menu-item profile" @click="navTo('/pages/sys/user/about')">
				<view class="menu-icon-box">
					<u-icon name="account" size="36" color="#2196F3"></u-icon>
				</view>
				<view class="menu-content">
					<text class="menu-text">个人主页</text>
					<u-icon name="arrow-right" size="22" color="#BBBBBB" class="arrow-icon"></u-icon>
				</view>
			</view>
			
			<!-- 帮助中心 -->
			<view class="menu-item help" @click="navTo('/pages/sys/user/help')">
				<view class="menu-icon-box">
					<u-icon name="headphone" size="36" color="#607D8B"></u-icon>
				</view>
				<view class="menu-content">
					<text class="menu-text">帮助中心</text>
					<u-icon name="arrow-right" size="22" color="#BBBBBB" class="arrow-icon"></u-icon>
				</view>
			</view>
			
			<!-- 设置 -->
			<view class="menu-item settings" @click="navTo('/pages/settings/index')">
				<view class="menu-icon-box">
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
				<view class="section-divider"></view>
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
			// let url = this.vuex_user.avatarUrl || '/static/default-avatar.png';
			let url = '/static/default-avatar.png'
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
	padding: 20rpx 30rpx 80rpx;
	display: flex;
	flex-direction: column;
}

.user-info-section {
	position: relative;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 60rpx 40rpx;
	margin-bottom: 40rpx;
	background: linear-gradient(135deg, #42d392 0%, #3bb2b8 100%);
	border-radius: 30rpx;
	overflow: hidden;
	box-shadow: 0 10rpx 30rpx rgba(66, 211, 146, 0.2);
	
	.info-bg-decoration {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 0;
		overflow: hidden;
		
		.decoration-circle {
			position: absolute;
			border-radius: 50%;
			background-color: rgba(255, 255, 255, 0.1);
			
			&.circle-1 {
				width: 300rpx;
				height: 300rpx;
				top: -100rpx;
				right: -120rpx;
			}
			
			&.circle-2 {
				width: 200rpx;
				height: 200rpx;
				bottom: -80rpx;
				left: -80rpx;
			}
		}
	}
	
	.avatar-container {
		position: relative;
		z-index: 1;
		width: 160rpx;
		height: 160rpx;
		border-radius: 50%;
		background-color: rgba(255, 255, 255, 0.2);
		border: 6rpx solid rgba(255, 255, 255, 0.6);
		overflow: hidden;
		margin-bottom: 30rpx;
		box-shadow: 0 6rpx 16rpx rgba(0, 0, 0, 0.1);
		
		.avatar {
			width: 100%;
			height: 100%;
			object-fit: cover;
		}
	}
	
	.user-name {
		position: relative;
		z-index: 1;
		font-size: 42rpx;
		font-weight: bold;
		color: #FFFFFF;
		margin-bottom: 20rpx;
		text-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.1);
	}
	
	.user-stats {
		position: relative;
		z-index: 1;
		display: flex;
		align-items: center;
		background-color: rgba(255, 255, 255, 0.15);
		padding: 12rpx 30rpx;
		border-radius: 40rpx;
		box-shadow: 0 4rpx 10rpx rgba(0, 0, 0, 0.05);
		
		.stat-item {
			display: flex;
			align-items: baseline;
			
			.stat-value {
				font-size: 32rpx;
				font-weight: bold;
				color: #FFFFFF;
				margin-right: 4rpx;
			}
			
			.stat-label {
				font-size: 24rpx;
				color: rgba(255, 255, 255, 0.9);
			}
		}
		
		.stat-divider {
			width: 2rpx;
			height: 30rpx;
			background-color: rgba(255, 255, 255, 0.3);
			margin: 0 24rpx;
		}
	}
}

.menu-grid {
	margin-bottom: 40rpx;
	
	.menu-item {
		background-color: #FFFFFF;
		border-radius: 20rpx;
		padding: 28rpx 24rpx;
		margin-bottom: 20rpx;
		display: flex;
		align-items: center;
		box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.04);
		transition: all 0.3s;
		
		&:active {
			transform: translateX(6rpx);
			box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.02);
		}
		
		&.subscription {
			background-color: rgba(76, 175, 80, 0.05);
		}
		
		&.profile {
			background-color: rgba(33, 150, 243, 0.05);
		}
		
		&.help {
			background-color: rgba(96, 125, 139, 0.05);
		}
		
		&.settings {
			background-color: rgba(77, 182, 172, 0.05);
		}
		
		.menu-icon-box {
			width: 80rpx;
			height: 80rpx;
			border-radius: 16rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			margin-right: 24rpx;
			box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.06);
			
			&.green {
				background: linear-gradient(135deg, #4CAF50, #8BC34A);
			}
			
			&.blue {
				background: linear-gradient(135deg, #2196F3, #03A9F4);
			}
			
			&.grey {
				background: linear-gradient(135deg, #607D8B, #90A4AE);
			}
			
			&.mint {
				background: linear-gradient(135deg, #4DB6AC, #80CBC4);
			}
		}
		
		.menu-content {
			flex: 1;
			display: flex;
			justify-content: space-between;
			align-items: center;
			
			.menu-text {
				font-size: 32rpx;
				font-weight: 500;
				color: #333333;
			}
			
			.arrow-icon {
				opacity: 0.6;
			}
		}
	}
}

.nutrition-tips-section {
	background-color: #FFFFFF;
	border-radius: 20rpx;
	padding: 30rpx;
	margin-bottom: 40rpx;
	box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.04);
	
	.section-header {
		display: flex;
		align-items: center;
		margin-bottom: 24rpx;
		
		.section-title {
			font-size: 32rpx;
			font-weight: bold;
			color: #333;
		}
		
		.section-divider {
			flex: 1;
			height: 2rpx;
			background: linear-gradient(90deg, #42d392 30%, transparent);
			margin: 0 20rpx;
		}
		
		.refresh-tip {
			font-size: 26rpx;
			color: #42d392;
			padding: 6rpx 16rpx;
			border-radius: 30rpx;
			background-color: rgba(66, 211, 146, 0.08);
			transition: all 0.3s;
			
			&:active {
				background-color: rgba(66, 211, 146, 0.15);
			}
		}
	}
	
	.nutrition-tip-card {
		display: flex;
		background-color: #F9FCFA;
		padding: 24rpx;
		border-radius: 16rpx;
		border-left: 6rpx solid #FF9800;
		
		.tip-icon {
			margin-right: 20rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			width: 70rpx;
			height: 70rpx;
			border-radius: 50%;
			background-color: rgba(255, 152, 0, 0.1);
		}
		
		.tip-content {
			flex: 1;
			
			.tip-title {
				font-size: 30rpx;
				font-weight: bold;
				color: #333;
				margin-bottom: 10rpx;
			}
			
			.tip-description {
				font-size: 26rpx;
				color: #666;
				line-height: 1.5;
			}
		}
	}
}

.logout-button {
	margin-top: auto;
	background: linear-gradient(135deg, #ff7675, #d63031);
	color: white;
	padding: 28rpx 0;
	border-radius: 50rpx;
	text-align: center;
	font-size: 32rpx;
	font-weight: bold;
	box-shadow: 0 6rpx 16rpx rgba(214, 48, 49, 0.2);
	transition: all 0.3s;
	
	&:active {
		transform: translateY(4rpx);
		box-shadow: 0 2rpx 8rpx rgba(214, 48, 49, 0.15);
	}
	
	text {
		color: #FFFFFF;
	}
}
</style>
