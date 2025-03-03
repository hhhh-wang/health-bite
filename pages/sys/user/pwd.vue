<template>
	<view class="wrap">
		<view class="header">
			<u-icon name="arrow-left" size="44" @click="cancel"></u-icon>
			<text class="header-title">修改密码</text>
		</view>
		<u-form class="form" :model="model" :rules="rules" ref="uForm">
			<u-form-item label="手机号" prop="phone" label-width="180">
				<text class="current-phone">{{currentPhone}}</text>
			</u-form-item>
			<u-form-item label="验证码" prop="code" label-width="180">
				<view class="code-input-box">
					<u-input 
						v-model="model.code"
						type="number"
						maxlength="6"
						placeholder="请输入验证码">
					</u-input>
					<u-button 
						:disabled="counting"
						size="mini" 
						type="primary" 
						@click="getCode">
						{{counting ? `${counter}s后重新获取` : '获取验证码'}}
					</u-button>
				</view>
			</u-form-item>
			<u-form-item label="新密码" prop="newPassword" label-width="180">
				<u-input type="password" v-model="model.newPassword" placeholder="请输入新密码"></u-input>
			</u-form-item>
			<u-form-item label="确认密码" prop="confirmNewPassword" label-width="180">
				<u-input type="password" v-model="model.confirmNewPassword" placeholder="请确认新密码"></u-input>
			</u-form-item>
		</u-form>
		<view class="form-footer">
			<u-button class="btn" type="primary" @click="submit">提交</u-button>
			<!-- <u-button class="btn" type="default" @click="cancel">关闭</u-button> -->
		</view>
	</view>
</template>
<script>
/**
 * Copyright (c) 2013-Now http://jeesite.com All rights reserved.
 */
import base64 from '@/common/base64.js';
export default {
	data() {
		return {
			currentPhone: '138****8888', // 当前手机号
			model: {
				code: '',
				newPassword: '',
				confirmNewPassword: ''
			},
			rules: {
				code: [{
					required: true,
					message: '请输入验证码',
					trigger: ['change', 'blur']
				}, {
					len: 6,
					message: '请输入6位验证码',
					trigger: ['change', 'blur']
				}],
				newPassword: [{
					required: true,
					message: '请输入新密码',
					trigger: ['change','blur'],
				}, {
					pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]+\S{5,12}$/,
					message: '需同时含有字母和数字，长度在6-12之间',
					trigger: ['change','blur'],
				}],
				confirmNewPassword: [{
					required: true,
					message: '请重新输入密码',
					trigger: ['change','blur'],
				}, {
					validator: (rule, value, callback) => {
						return value === this.model.newPassword;
					},
					message: '两次输入的密码不相等',
					trigger: ['change','blur'],
				}]
			},
			counting: false,
			counter: 60
		};
	},
	onReady() {
		this.$refs.uForm.setRules(this.rules);
	},
	methods: {
		// 获取验证码
		getCode() {
			// 开始倒计时
			this.counting = true;
			this.counter = 60;
			const timer = setInterval(() => {
				if (this.counter > 0) {
					this.counter--;
				} else {
					this.counting = false;
					clearInterval(timer);
				}
			}, 1000);
			
			// TODO: 调用发送验证码接口
			this.$u.toast('验证码已发送');
		},
		submit() {
			this.$refs.uForm.validate(valid => {
				if (valid) {
					this.$u.api.user.infoSavePwd({
						code: this.model.code,
						newPassword: base64.btoa(this.model.newPassword),
						confirmNewPassword: base64.btoa(this.model.confirmNewPassword)
					}).then(res => {
						uni.showModal({
							title: '提示',
							content: res.message,
							showCancel: false,
							success: function () {
								if (res.result == 'true') {
									uni.navigateBack();
								}
							}
						});
					});
				} else {
					this.$u.toast('您填写的信息有误，请根据提示修正。');
				}
			});
		},
		cancel() {
			uni.navigateBack();
		}
	}
};
</script>
<style lang="scss">
.wrap {
	min-height: 100vh;
	background-color: #f8f8f8;
	
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
	
	.form {
		margin-top: 20rpx;
		padding: 20rpx;
		background-color: #ffffff;
		
		.current-phone {
			font-size: 28rpx;
			color: #666;
		}
		
		.code-input-box {
			display: flex;
			align-items: center;
			
			.u-input {
				flex: 1;
				margin-right: 20rpx;
			}
		}
	}
	
	.form-footer {
		margin: 40rpx 20rpx;
		
		.btn {
			margin-bottom: 20rpx;
		}
	}
}
</style>
