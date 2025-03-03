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
				</view>
			</view>
		</view>

		

		<!-- 个人信息列表 -->
		<view class="section-title">个人信息</view>
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
export default {
	data() {
		return {
			avatarUrl: '/static/images/avatar.png',
			userInfo: {
				gender: '男',
				age: '23岁',
				weight: '65kg',
				height: '179cm',
				phone: '138****8888',
				password: '******'
			}
		}
	},
	methods: {
		goBack() {
			uni.navigateBack()
		},
		editProfile() {
			// 编辑头像和用户名
			uni.showToast({
				title: '编辑个人信息',
				icon: 'none'
			})
		},
		handleFingerprint() {
			// 处理指纹识别设置
			uni.showToast({
				title: '设置指纹识别',
				icon: 'none'
			})
		},
		editInfo(type) {
			switch(type) {
				case 'gender':
					// 性别选择器
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
					// 修改手机号
					uni.navigateTo({
						url: '/pages/sys/user/phone'  // 跳转到修改手机号页面
					});
					break;
				case 'password':
					// 修改密码
					uni.navigateTo({
						url: '/pages/sys/user/password'  // 跳转到修改密码页面
					});
					break;
				default:
					// 其他信息的编辑
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
		background-color: #ffffff;
		
		.header-title {
			flex: 1;
			text-align: center;
			font-size: 32rpx;
			font-weight: 500;
			margin-right: 44rpx; // 补偿左侧图标的宽度
		}
	}

	.profile-card {
		margin: 20rpx;
		padding: 30rpx;
		background-color: #e8f5e9;
		border-radius: 16rpx;

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
					color: #333;
					display: block;
				}

				.email {
					font-size: 24rpx;
					color: #666;
					margin-top: 8rpx;
					display: block;
				}
			}
		}
	}

	.section-title {
		font-size: 28rpx;
		color: #666;
		padding: 30rpx 30rpx 10rpx;
	}

	.quick-login, .info-list {
		background-color: #ffffff;
		margin-bottom: 20rpx;
	}
}
</style>
