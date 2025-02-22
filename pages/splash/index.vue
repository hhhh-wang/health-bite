<template>
  <view class="splash-container">
    <view class="content-wrapper">
      <view class="splash-content">
        <image class="logo" src="/static/images/logo.svg" mode="aspectFit"></image>
        <text class="title">健康饮食</text>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  onLoad() {
    // 检查是否是首次启动
    const isFirstLaunch = !uni.getStorageSync('notFirstLaunch')
    
    setTimeout(() => {
      if (isFirstLaunch) {
        // 首次启动，跳转到引导页
        uni.setStorageSync('notFirstLaunch', true)
        uni.reLaunch({
          url: '/pages/guide/index'
        })
      } else {
        // 非首次启动，直接跳转登录页
        uni.reLaunch({
          url: '/pages/sys/login/index'
        })
      }
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
  
  .content-wrapper {
    position: relative;
    width: 750rpx;
    height: 500rpx;
    display: flex;
    align-items: center;
    justify-content: center;

    .splash-content {
      position: relative;
      z-index: 2;
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
}
</style>