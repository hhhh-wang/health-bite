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
				<text class="title">扫一扫</text>
			</view>
			<view class="right" @click="toggleFlash">
				<view class="flash-nav-button" :class="{ 'active': isFlashOn }">
					<u-icon name="lightning" color="#ffffff" size="24"></u-icon>
					<view class="flash-icon">
						<text class="flash-line"></text>
						<text class="flash-arrow"></text>
					</view>
				</view>
			</view>
		</view>
		
		<!-- 扫描区域 -->
		<view class="scan-area">
			<camera class="camera" device-position="back" :flash="flashMode" @error="handleError">
				<cover-view class="scan-box">
					<cover-view class="corner top-left"></cover-view>
					<cover-view class="corner top-right"></cover-view>
					<cover-view class="corner bottom-left"></cover-view>
					<cover-view class="corner bottom-right"></cover-view>
					<cover-view class="scan-line"></cover-view>
				</cover-view>
			</camera>
		</view>
		<!-- 提示文本 -->
		<view class="tip-text">
			<text>扫一扫食物</text>
		</view>
	</view>
</template>

<script>
import { navigateBack } from '@/common/utils/navigate';

export default {
	data() {
		return {
			isFlashOn: false,
			flashMode: 'off' // 闪光灯模式：off-关闭，torch-常亮
		}
	},
	methods: {
		handleBack() {
			navigateBack({
				redirectUrl: '/pages/meal/detail/index',
				isTab: true
			});
		},
		handleError(e) {
			console.error('相机错误：', e);
			uni.showToast({
				title: '相机启动失败',
				icon: 'error'
			});
		},
		toggleFlash() {
			this.isFlashOn = !this.isFlashOn;
			this.flashMode = this.isFlashOn ? 'torch' : 'off';
			
			// 显示提示
			uni.showToast({
				title: this.isFlashOn ? '已开启闪光灯' : '已关闭闪光灯',
				icon: 'none',
				duration: 1500
			});
		}
	},
	onLoad() {
		// 检查相机权限
		// #ifdef MP-WEIXIN
		uni.getSetting({
			success: (res) => {
				if (!res.authSetting['scope.camera']) {
					uni.showModal({
						title: '提示',
						content: '需要使用相机权限，是否前往设置？',
						success: (modalRes) => {
							if (modalRes.confirm) {
								uni.openSetting();
							} else {
								this.handleBack();
							}
						}
					});
				}
			}
		});
		// #endif
	}
}
</script>

<style lang="scss" scoped>
.container {
	min-height: 100vh;
	background-color: #000000;
	position: relative;
	
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
			
			.flash-nav-button {
				width: 120rpx;
				height: 120rpx;
				background-color: #666666;
				border-radius: 50%;
				display: flex;
				align-items: center;
				justify-content: center;
				transition: all 0.3s ease;
				position: relative;
				
				.flash-icon {
					position: absolute;
					width: 40rpx;
					height: 40rpx;
					
					.flash-line {
						position: absolute;
						left: 50%;
						top: 0;
						width: 4rpx;
						height: 24rpx;
						background-color: #ffffff;
						transform: translateX(-50%);
					}
					
					.flash-arrow {
						position: absolute;
						left: 50%;
						bottom: 0;
						width: 20rpx;
						height: 20rpx;
						border-left: 4rpx solid #ffffff;
						border-bottom: 4rpx solid #ffffff;
						transform: translateX(-50%) rotate(-45deg);
					}
				}
				
				&.active {
					background-color: #42d392;
					
					.flash-icon {
						.flash-line, .flash-arrow {
							background-color: #ffffff;
							border-color: #ffffff;
						}
					}
				}
			}
		}
	}

	.scan-area {
		width: 100%;
		height: 100vh;
		position: relative;
		
		.camera {
			width: 100%;
			height: 100%;
		}
		
		.scan-box {
			position: absolute;
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%);
			width: 500rpx;
			height: 300rpx;
			border: 2rpx solid rgba(255, 255, 255, 0.5);
			
			.corner {
				position: absolute;
				width: 40rpx;
				height: 40rpx;
				border-color: #42d392;
				border-style: solid;
				border-width: 6rpx;
			}
			
			.top-left {
				left: -6rpx;
				top: -6rpx;
				border-right: none;
				border-bottom: none;
			}
			
			.top-right {
				right: -6rpx;
				top: -6rpx;
				border-left: none;
				border-bottom: none;
			}
			
			.bottom-left {
				left: -6rpx;
				bottom: -6rpx;
				border-right: none;
				border-top: none;
			}
			
			.bottom-right {
				right: -6rpx;
				bottom: -6rpx;
				border-left: none;
				border-top: none;
			}
			
			.scan-line {
				position: absolute;
				left: 0;
				top: 0;
				width: 100%;
				height: 2rpx;
				background-color: #42d392;
				animation: scan 2s linear infinite;
			}
		}
	}
	
	.tip-text {
		position: absolute;
		left: 0;
		right: 0;
		bottom: 200rpx;
		text-align: center;
		color: #ffffff;
		font-size: 28rpx;
		padding: 20rpx;
	}
}

@keyframes scan {
	from {
		top: 0;
	}
	to {
		top: 100%;
	}
}
</style> 