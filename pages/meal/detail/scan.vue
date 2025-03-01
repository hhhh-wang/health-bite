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
				<text class="title">扫一扫食物</text>
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
		
		<!-- 扫描按钮 -->
		<view class="scan-btn" @click="handleScan">
			<u-icon name="camera" color="#ffffff" size="40"></u-icon>
		</view>
		
		<view class="album-btn" @click="handleAlbum">
			<u-icon name="photo" color="#ffffff" size="60"></u-icon>
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
		},
		handleAlbum() {
			uni.chooseImage({
				count: 1,
				sourceType: ['album'],
				success: (res) => {
					console.log('选择图片成功：', res);
					// TODO: 处理选中的图片
					uni.showToast({
						title: '已选择图片',
						icon: 'success'
					});
				},
				fail: (err) => {
					console.error('选择图片失败：', err);
					uni.showToast({
						title: '选择失败',
						icon: 'error'
					});
				}
			});
		},
		handleScan() {
			// 扫描处理
			uni.showToast({
				title: '开始扫描',
				icon: 'none',
				duration: 1500
			});
			
			// TODO: 在这里添加扫描识别的逻辑
			const camera = uni.createCameraContext();
			camera.takePhoto({
				quality: 'high',
				success: (res) => {
					console.log('拍照成功：', res.tempImagePath);
					// TODO: 处理拍摄的图片
					uni.showToast({
						title: '扫描成功',
						icon: 'success'
					});
				},
				fail: (err) => {
					console.error('拍照失败：', err);
					uni.showToast({
						title: '扫描失败',
						icon: 'error'
					});
				}
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
	background-color: transparent;
	position: relative;
	z-index: 1;
	
	.custom-navbar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 10rpx 20rpx;
		position: relative;
		height: 120px;
		z-index: 10;
		
		.left {
			.back-button {
				width: 120rpx;
				height: 120rpx;
				background-color: rgba(255, 255, 255, 0.9);
				border-radius: 50%;
				display: flex;
				align-items: center;
				justify-content: center;
				
				&:active {
					background-color: rgba(255, 255, 255, 0.7);
				}
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
				color: #ffffff;
				text-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.3);
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
				background-color: rgba(255, 255, 255, 0.9);
				border-radius: 50%;
				display: flex;
				align-items: center;
				justify-content: center;
				transition: all 0.3s ease;
				position: relative;

				
				&:active {
					background-color: rgba(255, 255, 255, 0.7);
				}
				
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
						border-left: 4rpx solid #666666;
						border-bottom: 4rpx solid #666666;
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
		z-index: 2;
		
		.camera {
			width: 100%;
			height: 100%;
		}
		
		.scan-box {
			position: absolute;
			left: 50%;
			top: 35%;
			transform: translate(-50%, -50%);
			width: 66.67vw; // 屏幕宽度的2/3
			height: 50vh; // 屏幕高度的3/4
			border: 2rpx solid rgba(255, 255, 255, 0.8);
			box-shadow: 0 0 0 3000rpx rgba(0, 0, 0, 0.5);
			border-radius: 50rpx;
			z-index: 3;
			
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
				height: 4rpx; // 增加扫描线的粗细
				background: linear-gradient(to right, transparent, #42d392, transparent); // 添加渐变效果
				box-shadow: 0 0 8rpx rgba(66, 211, 146, 0.8); // 添加发光效果
				animation: scan 2s linear infinite;
			}
		}
	}
	
	.scan-btn {
		position: fixed;
		bottom: 10%;
		left: 50%;
		transform: translateX(-50%);
		width: 180rpx;
		height: 180rpx;
		background-color: #42d392;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 10;
		box-shadow: 0 4rpx 16rpx rgba(66, 211, 146, 0.4);
		transition: all 0.3s ease;
		
		&:active {
			transform: translateX(-50%) scale(0.95);
			background-color: #3bc185;
		}
	}
	
	.album-btn {
		position: fixed;
		bottom: 120rpx;
		right: 15%;
		z-index: 10;
		display: flex;
		flex-direction: column;
		align-items: center;
		
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