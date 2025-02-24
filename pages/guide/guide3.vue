<template>
  <view class="container">
    <!-- 顶部区域 -->
    <view class="header">
      <view class="top-logo">
        <image src="/static/images/logo.svg" mode="aspectFit"></image>
      </view>
      <view class="skip-btn" @click="handleSkip">
        跳过
      </view>
    </view>

    <!-- 主要内容区 -->
    <view class="guide-content">
      <view class="plate-wrapper">
        <image class="guide-img" src="/static/images/guide/guide3.png" mode="aspectFit"></image>
      </view>
    </view>

    <!-- 底部区域 -->
    <view class="guide-footer">
      <view class="guide-text">
        <text class="title">健康生活获得荣誉</text>
        <text class="subtitle">让我们开始这段旅程</text>
        <text class="desc">一起健康生活</text>
      </view>
      
      <view class="bottom-controls">
        <view @click="handleNext">
          <u-circle-progress 
            class="progress-btn"
            :percent="100" 
            :width="300"
            activeColor="#42d392"
            inactiveColor="rgba(66, 211, 146, 0.2)"
            :duration="1000"
          >
            <text class="arrow-icon">›</text>
          </u-circle-progress>
        </view>
        <view class="dot-indicators">
          <view class="dot"></view>
          <view class="dot"></view>
          <view class="dot active"></view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      currentPage: 3,
      totalPages: 3
    }
  },
  methods: {
    handleSkip() {
      uni.reLaunch({
        url: '/pages/sys/login/index'
      })
    },
    handleNext() {
      this.handleSkip()
    }
  }
}
</script>

<style lang="scss" scoped>
// 复用引导页1的样式
.container {
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #ffffff;
  margin: 0 auto;
  
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 60rpx 40rpx 0;
    
    .top-logo {
      image {
        width: 60rpx;
        height: 60rpx;
      }
    }
    
    .skip-btn {
      padding: 10rpx 30rpx;
      border-radius: 30rpx;
      background: rgba(0, 0, 0, 0.05);
      color: #666;
      font-size: 28rpx;
      margin: 20rpx 20rpx 0 0;
      min-width: 100rpx;
      text-align: center;
    }
  }
  
  .guide-content {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    
    .plate-wrapper {
      width: 600rpx;
      height: 600rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      
      .guide-img {
        width: 100%;
        height: 100%;
      }
    }
  }
  
  .guide-footer {
    width: 100%;
    background-color: #f8f8f8;
    border-radius: 40rpx 40rpx 0 0;
    padding: 40rpx 10rpx;
    margin: 0 20rpx;
    width: calc(100% - 40rpx);
    
    .guide-text {
      margin: 0 auto;
      text-align: center;
      margin-bottom: 80rpx;
      
      .title {
        font-size: 48rpx;
        color: #333;
        font-weight: bold;
        margin-bottom: 20rpx;
        display: block;
      }
      
      .subtitle {
        font-size: 32rpx;
        color: #666;
        margin-bottom: 10rpx;
        display: block;
      }
      
      .desc {
        font-size: 28rpx;
        color: #999;
        display: block;
      }
    }
    
    .bottom-controls {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 40rpx;
      
      .progress-btn {
        margin-top: 20rpx;
        position: relative;
        background-color: #f8f8f8;
        border-radius: 50%;
        
        .arrow-icon {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          color: #42d392;
          font-size: 100rpx;
          line-height: 80rpx;
          font-weight: bold;
          z-index: 1;
        }
      }
      
      .dot-indicators {
        display: flex;
        gap: 20rpx;
        margin-bottom: 20rpx;
        
        .dot {
          width: 16rpx;
          height: 16rpx;
          border-radius: 50%;
          background: #ddd;
          
          &.active {
            background: #42d392;
            width: 32rpx;
            border-radius: 8rpx;
          }
        }
      }
    }
  }
}
</style> 