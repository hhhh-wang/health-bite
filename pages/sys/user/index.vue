<template>
	<view class="user-container">
		<!-- 顶部标题栏 -->
		<view class="header">
			<view class="left-placeholder"></view>
			<text class="title">我的</text>
			<view class="logout-button" @click="logout">
				<text>退出</text>
			</view>
		</view>
		
		<!-- 用户信息区域 -->
		<view class="user-info">
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
				<view class="menu-icon-box">
					<u-icon name="level" size="40" color="#5E8B2E"></u-icon>
				</view>
				<text class="menu-text">订阅</text>
				<u-icon name="arrow-right" size="24" color="#BBBBBB" class="arrow-icon"></u-icon>
			</view>
			
			<!-- 个人主页 -->
			<view class="menu-item profile" @click="navTo('/pages/sys/user/about')">
				<view class="menu-icon-box">
					<u-icon name="account" size="40" color="#2D8CF0"></u-icon>
				</view>
				<text class="menu-text">个人主页</text>
				<u-icon name="arrow-right" size="24" color="#BBBBBB" class="arrow-icon"></u-icon>
			</view>
			
			<!-- 帮助中心 -->
			<view class="menu-item help" @click="navTo('/pages/sys/user/help')">
				<view class="menu-icon-box">
					<u-icon name="headphone" size="40" color="#606266"></u-icon>
				</view>
				<text class="menu-text">帮助中心</text>
				<u-icon name="arrow-right" size="24" color="#BBBBBB" class="arrow-icon"></u-icon>
			</view>
			
			<!-- 设置 -->
			<view class="menu-item settings" @click="navTo('/pages/settings/index')">
				<view class="menu-icon-box">
					<u-icon name="setting" size="40" color="#19be6b"></u-icon>
				</view>
				<text class="menu-text">设置</text>
				<u-icon name="arrow-right" size="24" color="#BBBBBB" class="arrow-icon"></u-icon>
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
			age: 29,
			height: 179,
			weight: 65
		};
	},
	computed: {
		avatarUrl() {
			let url = this.vuex_user.avatarUrl || '/ctxPath/static/images/user1.jpg';
			url = url.replace('/ctxPath/', this.vuex_baseUrl + '/');
			return url + '?t=' + new Date().getTime();
		}
	},
	methods: {
		navTo(url) {
			uni.navigateTo({
				url: url
			});
		},
		logout() {
			this.$u.api.logout().then(res => {
				this.$u.toast(res.message);
			});
			setTimeout(() => {
				uni.reLaunch({
					url: '/pages/sys/login/index'
				});
			}, 500);
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
		}
	}
};
</script>

<style lang="scss" scoped>
.user-container {
	min-height: 100vh;
	background-color: #f5f7fa;
	padding-bottom: 30rpx;
}

.header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 40rpx 30rpx 20rpx;
	
	.left-placeholder {
		width: 70rpx; /* 与右侧按钮宽度相同 */
	}
	
	.title {
		font-size: 36rpx;
		font-weight: bold;
		color: #2c3e50;
		flex: 1;
		text-align: center;
	}
	
	.logout-button {
		height: 60rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0 10rpx;
		
		text {
			font-size: 28rpx;
			color: #2c3e50;
			font-weight: 500;
		}
	}
}

.user-info {
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 30rpx 0 50rpx;
	
	.avatar-container {
		width: 160rpx;
		height: 160rpx;
		border-radius: 50%;
		background-color: #ffcc00;
		overflow: hidden;
		margin-bottom: 20rpx;
		
		.avatar {
			width: 100%;
			height: 100%;
			object-fit: cover;
		}
	}
	
	.user-name {
		font-size: 40rpx;
		font-weight: bold;
		color: #2c3e50;
		margin-bottom: 16rpx;
	}
	
	.user-stats {
		display: flex;
		align-items: center;
		color: #7f8c8d;
		font-size: 28rpx;
		
		.stat-divider {
			margin: 0 20rpx;
			color: #bdc3c7;
		}
	}
}

.menu-grid {
	padding: 0 30rpx;
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	gap: 20rpx;
	
	.menu-item {
		position: relative;
		background-color: #ffffff;
		border-radius: 20rpx;
		padding: 40rpx 30rpx;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		
		&.subscription {
			background-color: #FFF6E9;
		}
		
		&.profile {
			background-color: #F0F9FF;
		}
		
		&.help {
			background-color: #F6F6F6;
		}
		
		&.settings {
			background-color: #F0FFF0;
		}
		
		.menu-icon-box {
			margin-bottom: 20rpx;
		}
		
		.menu-text {
			font-size: 30rpx;
			color: #333333;
			font-weight: 500;
		}
		
		.arrow-icon {
			position: absolute;
			right: 30rpx;
			top: 50%;
			transform: translateY(-50%);
		}
	}
}
</style>
