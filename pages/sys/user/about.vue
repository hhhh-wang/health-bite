<template>
	<view class="profile-container">
		<!-- 顶部返回和标题 -->
		<view class="header">
			<u-icon name="arrow-left" size="44" @click="goBack"></u-icon>
			<text class="header-title">个人主页</text>
		</view>

		<!-- 个人信息卡片 -->
		<view class="profile-card">
			<view class="profile-header">
				<view class="avatar-wrapper">
					<u-avatar :src="avatarUrl" size="120"></u-avatar>
					<view class="edit-icon">
						<u-icon name="edit-pen" size="32" color="#42d392" @click="editProfile"></u-icon>
					</view>
				</view>
				<view class="user-info">
					<text class="username">KOTO</text>
					<text class="email">koto123@gmail.com</text>
					<view class="health-score">
						<text class="score">健康分数：85</text>
						<u-icon name="heart-fill" color="#ff6b6b" size="28"></u-icon>
					</view>
				</view>
			</view>
			
			<!-- 添加健康数据概览 -->
			<view class="health-overview">
				<view class="overview-item">
					<text class="value">1200</text>
					<text class="label">今日卡路里</text>
				</view>
				<view class="overview-item">
					<text class="value">7</text>
					<text class="label">连续打卡</text>
				</view>
				<view class="overview-item">
					<text class="value">12</text>
					<text class="label">收藏食谱</text>
				</view>
			</view>
		</view>

		<!-- 个人信息列表 -->
		<view class="section-title">
			<u-icon name="account" size="32" color="#42d392"></u-icon>
			<text>基础信息</text>
		</view>
		<view class="info-list">
			<u-cell-item 
				title="性别" 
				:value="userInfo.gender"
				:arrow="true"
				@click="editInfo('gender')">
				<u-icon slot="icon" name="man" size="44" color="#42d392"></u-icon>
			</u-cell-item>
			<u-cell-item 
				title="年龄" 
				:value="userInfo.age"
				:arrow="true"
				@click="editInfo('age')">
				<u-icon slot="icon" name="calendar" size="44" color="#42d392"></u-icon>
			</u-cell-item>
			<u-cell-item 
				title="体重" 
				:value="userInfo.weight"
				:arrow="true"
				@click="editInfo('weight')">
				<u-icon slot="icon" name="order" size="44" color="#42d392"></u-icon>
			</u-cell-item>
			<u-cell-item 
				title="身高" 
				:value="userInfo.height"
				:arrow="true"
				@click="editInfo('height')">
				<u-icon slot="icon" name="man-add" size="44" color="#42d392"></u-icon>
			</u-cell-item>
		</view>

		<!-- 健康目标 -->
		<view class="section-title">
			<u-icon name="star" size="32" color="#42d392"></u-icon>
			<text>健康目标</text>
		</view>
		<view class="info-list">
			<u-cell-item 
				title="目标体重" 
				value="60kg"
				:arrow="true"
				@click="editInfo('targetWeight')">
				<u-icon slot="icon" name="arrow-down" size="44" color="#42d392"></u-icon>
			</u-cell-item>
			<u-cell-item 
				title="每日卡路里目标" 
				value="1800kcal"
				:arrow="true"
				@click="editInfo('targetCalories')">
				<u-icon slot="icon" name="fire" size="44" color="#42d392"></u-icon>
			</u-cell-item>
		</view>

		<!-- 账号安全 -->
		<view class="section-title">
			<u-icon name="lock" size="32" color="#42d392"></u-icon>
			<text>账号安全</text>
		</view>
		<view class="info-list">
			<u-cell-item 
				title="手机号" 
				:value="userInfo.phone"
				:arrow="true"
				@click="editInfo('phone')">
				<u-icon slot="icon" name="phone" size="44" color="#42d392"></u-icon>
			</u-cell-item>
			<u-cell-item 
				title="修改密码" 
				value="******"
				:arrow="true"
				@click="editInfo('password')">
				<u-icon slot="icon" name="lock" size="44" color="#42d392"></u-icon>
			</u-cell-item>
		</view>
	</view>
</template>

<script>
/**
 * Copyright (c) 2013-Now http://jeesite.com All rights reserved.
 */
import { navigateBack } from '@/common/utils/navigate';
export default {
	data() {
		return {
			avatarUrl: '/static/images/avatar.png',
			userInfo: {
				gender: '男',
				age: '23岁',
				weight: '65kg',
				height: '179cm',
				phone: '138****8888'
			}
		}
	},
	methods: {
		goBack() {
			navigateBack({
				redirectUrl: '/pages/sys/user/index',
				isTab: true
			});
		},
		editProfile() {
			uni.showToast({
				title: '编辑头像',
				icon: 'none'
			})
		},
		editInfo(type) {
			switch(type) {
				case 'gender':
					uni.showActionSheet({
						itemList: ['男', '女'],
						success: (res) => {
							this.userInfo.gender = ['男', '女'][res.tapIndex];
							uni.showToast({
								title: '已修改性别',
								icon: 'success'
							});
						}
					});
					break;
				case 'phone':
					uni.navigateTo({
						url: '/pages/sys/user/phone'
					});
					break;
				case 'password':
					uni.navigateTo({
						url: '/pages/sys/user/pwd'
					});
					break;
				default:
					uni.showToast({
						title: '编辑' + type,
						icon: 'none'
					});
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.profile-container {
	min-height: 100vh;
	background-color: #f8f8f8;
	padding-bottom: 40rpx;

	.header {
		display: flex;
		align-items: center;
		padding: 20rpx 30rpx;
		
		.header-title {
			flex: 1;
			text-align: center;
			font-size: 32rpx;
			font-weight: 500;
			margin-right: 44rpx;
		}
	}

	.profile-card {
		margin: 20rpx;
		padding: 30rpx;
		background: linear-gradient(135deg, #42d392 0%, #34b484 100%);
		border-radius: 50rpx;
		color: #ffffff;

		.profile-header {
			display: flex;
			align-items: center;
			
			.avatar-wrapper {
				position: relative;
				margin-right: 30rpx;

				.edit-icon {
					position: absolute;
					right: -10rpx;
					bottom: -10rpx;
					background-color: #ffffff;
					border-radius: 50%;
					padding: 6rpx;
					box-shadow: 0 2rpx 8rpx rgba(0,0,0,0.1);
				}
			}

			.user-info {
				flex: 1;
				
				.username {
					font-size: 36rpx;
					font-weight: bold;
					color: #ffffff;
					display: block;
				}

				.email {
					font-size: 24rpx;
					color: rgba(255,255,255,0.8);
					margin-top: 8rpx;
					display: block;
				}

				.health-score {
					display: flex;
					align-items: center;
					margin-top: 16rpx;
					
					.score {
						font-size: 28rpx;
						margin-right: 10rpx;
					}
				}
			}
		}

		.health-overview {
			display: flex;
			justify-content: space-around;
			margin-top: 30rpx;
			padding-top: 20rpx;
			border-top: 2rpx solid rgba(255,255,255,0.2);

			.overview-item {
				text-align: center;

				.value {
					font-size: 36rpx;
					font-weight: bold;
					display: block;
				}

				.label {
					font-size: 24rpx;
					color: rgba(255,255,255,0.8);
					margin-top: 4rpx;
				}
			}
		}
	}

	.section-title {
		display: flex;
		align-items: center;
		font-size: 28rpx;
		color: #666;
		padding: 30rpx 30rpx 10rpx;

		text {
			margin-left: 10rpx;
			font-weight: 500;
		}
	}

	.info-list {
		background-color: #ffffff;
		margin-bottom: 20rpx;
		border-radius: 50rpx;
		margin: 0 20rpx 20rpx;
	}
}
</style>
