<template>
  <view class="splash-container">
    <view class="splash-content">
      <image class="logo" src="/static/images/logo.svg" mode="aspectFit"></image>
      <text class="title">健康饮食</text>
    </view>
  </view>
</template>

<script>
export default {
  onLoad() {
    // 3秒后跳转到登录页面
    setTimeout(() => {
      uni.reLaunch({
        url: '/pages/sys/login/index'
      })
    }, 3000)
  }
}
</script>

<style lang="scss" scoped>
.splash-container {
  width: 100%;
  height: 100vh;
  background: linear-gradient(to bottom, #42d392, #47caab);
  display: flex;
  align-items: center;
  justify-content: center;
  
  .splash-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    
    .logo {
      width: 240rpx;
      height: 240rpx;
      margin-bottom: 40rpx;
    }
    
    .title {
      color: #ffffff;
      font-size: 40rpx;
      font-weight: 500;
    }
  }
}
</style> 