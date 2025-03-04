<template>
	<view class="wrap">
		<js-lang title="login.title" :showBtn="true"></js-lang>
		<view class="logo">
			<image src="/static/images/logo.svg" mode="aspectFit"></image>
		</view>
		<view class="welcome-text">
			<text class="title">欢迎回来</text>
			<text class="subtitle">让我们一起开启健康生活</text>
		</view>
		<view class="list">
			<view class="list-call">
				<u-icon class="u-icon" size="40" name="account" color="#42d392"></u-icon>
				<input class="u-input" type="text" v-model="username" maxlength="32" :placeholder="$t('login.placeholderAccount')" />
				<u-checkbox v-model="remember" active-color="#42d392">{{$t('login.autoLogin')}}</u-checkbox>
			</view>
			<view class="list-call">
				<u-icon class="u-icon" size="40" name="lock" color="#42d392"></u-icon>
				<input class="u-input" type="text" v-model="password" maxlength="32" :placeholder="$t('login.placeholderPassword')" :password="!showPassword" />
				<image class="u-icon-right" :src="'/static/jeesite/login/eye_' + (showPassword ? 'open' : 'close') + '.png'" @click="showPass()"></image>
			</view>
			<view class="list-call" v-if="isValidCodeLogin">
				<u-icon class="u-icon" size="40" name="coupon"></u-icon>
				<input class="u-input" type="text" v-model="validCode" maxlength="4" placeholder="验证码" />
				<u-image class="img-valid-code" width="300rpx" height="90rpx" :src="imgValidCodeSrc" @click="refreshImgValidCode()"></u-image>
			</view>
			<view class="list-call base-url" v-if="showServerSelect">
				<u-icon class="u-icon" size="40" name="setting" style="padding-right:15rpx;"></u-icon>
				<js-select v-model="baseUrlValue" :items="baseUrlList" placeholder="快速切换服务器地址" @confirm="updateBaseUrl"></js-select>
			</view>
		</view>
		<view class="button health-button" hover-class="button-hover" @click="submit()">
			<text>{{$t('login.loginButton')}}</text>
		</view>
		<view class="footer">
			<navigator url="forget" open-type="navigate">{{$t('login.forget')}}</navigator>
			<text>|</text>
			<navigator url="reg" open-type="navigate">{{$t('login.reg')}}</navigator>
		</view>
		<view class="oauth2">
			<view class="oauth-btn" @click="wxLogin">
				<u-icon size="50" color="#42d392" name="weixin-circle-fill"></u-icon>
				<text>微信登录</text>
			</view>
			<view class="oauth-btn" @click="toPhoneLogin">
				<u-icon size="50" color="#42d392" name="phone"></u-icon>
				<text>手机号登录</text>
			</view>
		</view>
	</view>
</template>
<script>
/**
 * Copyright (c) 2013-Now http://jeesite.com All rights reserved.
 */
import base64 from '@/common/base64.js';
import config from '@/common/config.js';
export default {
	data() {
		return {
			username: '',
			password: '',
			showPassword: false,
			remember: true,
			isValidCodeLogin: false,
			validCode: '',
			imgValidCodeSrc: null,
			baseUrlList: config.baseUrlList,
			baseUrlValue: '',
			counter: 60,
			counting: false,
			loading: false,
			showServerSelect: false
		};
	},
	onLoad() {
		this.$u.api.index({loginCheck: true}).then(res => {
			if (typeof res === 'object' && res.result && res.result !== 'login'){
				uni.reLaunch({
					url: '/pages/sys/home/index'
				});
			}
		});
		this.baseUrlList.forEach(item => {
			if (item.baseUrl == this.vuex_baseUrl){
				this.baseUrlValue = item.value;
				return;
			}
		});
		this.initAccount();
	},
	methods: {
		initAccount() {
			if (this.vuex_baseUrl.indexOf('jeesite.com') != -1){
				this.username = 'user1';
			} else {
				this.username = 'system';
			}
			if (this.password == '') {
				this.password = 'admin';
			}
		},
		showPass() {
			this.showPassword = !this.showPassword;
		},
		refreshImgValidCode(e) {
			if (this.vuex_token == '') {
				this.$u.api.index().then(res => {
					this.imgValidCodeSrc = this.vuex_baseUrl + '/validCode?__sid='
						+ res.sessionid + '&t=' + new Date().getTime();
				});
			} else {
				this.imgValidCodeSrc = this.vuex_baseUrl + '/validCode?__sid='
						+ this.vuex_token + '&t=' + new Date().getTime();
			}
			this.validCode = '';
		},
		submit() {
			if (this.username.length == 0) {
				this.$u.toast('请输入账号');
				return;
			}
			if (this.password.length == 0) {
				this.$u.toast('请输入密码');
				return;
			}
			this.$u.api.login({
				username: base64.btoa(this.username),
				password: base64.btoa(this.password),
				validCode: base64.btoa(this.validCode),
				param_deviceType: 'mobileApp',
				param_remember: this.remember
			})
			.then(res => {
				this.$u.toast(res.message || '未连接服务器');
				if (res.result == 'true') {
					setTimeout(() => {
						uni.reLaunch({
							url: '/pages/userSetup/username/index'
						});
					}, 500);
				}
				if (res.isValidCodeLogin){
					this.isValidCodeLogin = true;
					this.refreshImgValidCode();
				}
			});
		},
		wxLogin(res) {
			this.$u.toast('微信登录');
			let self = this;
			uni.login({
				provider: 'weixin',
				success: function(wxRes) {
					self.$u.get('/wx/ma/user/default/login', {
						code: wxRes.code
					})
					.then(res => {
						if (res.sessionKey) {
							self.$u.vuex('vuex_wxSessionKey', res.sessionKey);
						}
						if (res.result === 'true') {
							self.$u.toast(res.message);
							setTimeout(() => {
								uni.reLaunch({
									url: '/pages/sys/home/index'
								});
							}, 500);
						} else if (res.result === 'bind'){
							uni.showModal({
								title: '提示',
								content: res.message,
								showCancel: true,
								success: function (res) {
									if(!res.confirm) {
										return;
									}
									uni.reLaunch({
										url: '/pages/sys/login/wx'
									});
								}
							});
						} else {
							self.$u.toast(res.message);
						}
					});
				}
			});
		},
		toPhoneLogin() {
			uni.navigateTo({
				url: '/pages/sys/login/phone'
			});
		}
	}
};
</script>
<style lang="scss">
@import 'index.scss';

.logo {
	width: 200rpx;
	height: 200rpx;
	box-shadow: 0rpx 5rpx 20rpx 5rpx rgba(66, 211, 146, 0.2);
	border-radius: 50%;
	margin: 70rpx auto 10rpx auto;
	
	image {
		width: 120rpx;
		height: 120rpx;
		border-radius: 50%;
		margin: 40rpx;
	}
}

.welcome-text {
	text-align: center;
	margin: 40rpx 0;
	
	.title {
		font-size: 48rpx;
		color: #333;
		font-weight: bold;
		display: block;
		margin-bottom: 20rpx;
	}
	
	.subtitle {
		font-size: 32rpx;
		color: #666;
	}
}

.base-url js-select {
	width: 100%;
}

.button {
	margin: 30rpx auto 0;
	background: linear-gradient(to right, #42d392, #47caab);
	box-shadow: 0 8rpx 16rpx rgba(66, 211, 146, 0.3);
	
	&.button-hover {
		background: linear-gradient(to right, #3bc085, #41b69a);
	}
}

.footer {
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	text-align: center;
	color: #42d392;
	height: 40rpx;
	line-height: 40rpx;
	font-size: 35rpx;
	margin-top: 60rpx;
}

.footer text {
	font-size: 30rpx;
	margin-left: 25rpx;
	margin-right: 25rpx;
}

.oauth2 {
	display: flex;
	flex-direction: row;
	justify-content: space-around;
	margin: 55rpx 100rpx;

	.oauth-btn {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 20rpx;
		
		text {
			font-size: 24rpx;
			color: #666;
			margin-top: 10rpx;
		}
	}
}

.phone-login-section {
	width: 100%;
	padding: 20rpx;
	
	.verify-code-wrapper {
		display: flex;
		align-items: center;
		
		.u-input {
			flex: 1;
		}
		
		.u-button {
			margin-left: 20rpx;
			white-space: nowrap;
		}
	}
}
</style>
