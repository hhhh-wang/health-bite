<template>
	<view class="user-container">
		<!-- 用户信息区域 -->
		<view class="user-info">
			<view class="avatar-box">
				<image class="avatar" :src="avatarUrl"></image>
			</view>
			<view class="user-name">KOTO</view>
			<view class="user-details">
				<text class="detail-item">{{age}}岁</text>
				<text class="detail-item">{{height}}cm</text>
				<text class="detail-item">{{weight}}kg</text>
			</view>
		</view>

		<!-- 功能菜单区域 -->
		<view class="menu-grid">
			<!-- 订阅 -->
			<view class="menu-item" @click="navTo('/pages/subscription/index')">
				<u-icon name="crown-fill" size="44" color="#FFB900" class="menu-icon"></u-icon>
				<text class="menu-text">订阅</text>
				<u-icon name="arrow-right" size="24" color="#C0C4CC" class="arrow-icon"></u-icon>
			</view>
			<!-- 个人主页 -->
			<view class="menu-item" @click="navTo('/pages/profile/index')">
				<u-icon name="account" size="44" color="#42d392" class="menu-icon"></u-icon>
				<text class="menu-text">个人主页</text>
				<u-icon name="arrow-right" size="24" color="#C0C4CC" class="arrow-icon"></u-icon>
			</view>
			<!-- 帮助中心 -->
			<view class="menu-item" @click="navTo('/pages/help/index')">
				<u-icon name="headphone" size="44" color="#42d392" class="menu-icon"></u-icon>
				<text class="menu-text">帮助中心</text>
				<u-icon name="arrow-right" size="24" color="#C0C4CC" class="arrow-icon"></u-icon>
			</view>
			<!-- 设置 -->
			<view class="menu-item" @click="navTo('/pages/settings/index')">
				<u-icon name="setting" size="44" color="#42d392" class="menu-icon"></u-icon>
				<text class="menu-text">设置</text>
				<u-icon name="arrow-right" size="24" color="#C0C4CC" class="arrow-icon"></u-icon>
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
		upgrade(){
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
	padding: 30rpx;
	background-color: #ffffff;
}

.user-info {
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 40rpx 0;
	
	.avatar-box {
		width: 160rpx;
		height: 160rpx;
		border-radius: 50%;
		overflow: hidden;
		background-color: #ffd700; // 黄色背景
		
		.avatar {
			width: 100%;
			height: 100%;
			object-fit: cover;
		}
	}
	
	.user-name {
		font-size: 36rpx;
		font-weight: bold;
		margin-top: 20rpx;
	}
	
	.user-details {
		margin-top: 10rpx;
		color: #666;
		font-size: 28rpx;
		
		.detail-item {
			margin: 0 15rpx;
		}
	}
}

.notice-box {
	margin: 30rpx 0;
	padding: 30rpx;
	background-color: #f0fff0;
	border-radius: 16rpx;
	display: flex;
	justify-content: space-between;
	align-items: center;
	
	.notice-content {
		display: flex;
		flex-direction: column;
		
		.notice-desc {
			font-size: 24rpx;
			color: #666;
			margin-top: 8rpx;
		}
	}
	
	.notice-icon {
		font-size: 40rpx;
		color: #42d392;
	}
}

.menu-grid {
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	gap: 20rpx;
	margin-top: 30rpx;
	
	.menu-item {
		position: relative;
		background-color: #f8f8f8;
		padding: 30rpx;
		border-radius: 16rpx;
		display: flex;
		align-items: center;
		transition: all 0.3s ease;
		
		&:nth-child(1) {
			background-color: #FFF5E6;  // 订阅按钮特殊背景色
		}
		
		&:active {
			transform: scale(0.98);
			opacity: 0.9;
		}
		
		.menu-icon {
			margin-right: 20rpx;
		}
		
		.menu-text {
			font-size: 28rpx;
			color: #333;
			flex: 1;
		}
		
		.arrow-icon {
			position: absolute;
			right: 20rpx;
		}
	}
}
</style>
