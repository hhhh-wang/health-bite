<template>
  <view class="guide-container">
    <!-- 顶部Logo -->
    <view class="top-logo">
      <image src="/static/images/logo-green.svg" mode="aspectFit"></image>
    </view>
    
    <!-- 跳过按钮 -->
    <view class="skip-btn" @click="handleSkip">
      跳过
    </view>
    
    <!-- 主要内容区 -->
    <view class="guide-content">
      <image class="food-plate" src="/static/images/guide/plate1.svg" mode="aspectFit"></image>
      <view class="guide-text">
        <text class="title">知道你应该吃什么</text>
        <text class="subtitle">了解您的营养习惯</text>
        <text class="desc">详细统计数据</text>
      </view>
    </view>
    
    <!-- 底部指示器和按钮 -->
    <view class="guide-footer">
      <view class="dot-indicators">
        <view class="dot active"></view>
        <view class="dot"></view>
        <view class="dot"></view>
      </view>
      <view class="next-btn" @click="handleNext">
        <view class="circle-progress">
          <view class="progress-inner"></view>
        </view>
        <text class="arrow">›</text>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      currentPage: 1,
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
      if (this.currentPage < this.totalPages) {
        // 跳转到下一个引导页
        uni.navigateTo({
          url: `/pages/guide/guide${this.currentPage + 1}`
        })
      } else {
        this.handleSkip()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.guide-container {
  width: 100%;
  min-height: 100vh;
  background: #ffffff;
  position: relative;
  
  .top-logo {
    position: absolute;
    top: 40rpx;
    left: 40rpx;
    
    image {
      width: 60rpx;
      height: 60rpx;
    }
  }
  
  .skip-btn {
    position: absolute;
    top: 40rpx;
    right: 40rpx;
    padding: 10rpx 30rpx;
    border-radius: 30rpx;
    background: rgba(0, 0, 0, 0.05);
    color: #666;
    font-size: 28rpx;
  }
  
  .guide-content {
    padding-top: 200rpx;
    display: flex;
    flex-direction: column;
    align-items: center;
    
    .food-plate {
      width: 600rpx;
      height: 600rpx;
      margin-bottom: 60rpx;
    }
    
    .guide-text {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      
      .title {
        font-size: 48rpx;
        color: #333;
        font-weight: bold;
        margin-bottom: 20rpx;
      }
      
      .subtitle {
        font-size: 32rpx;
        color: #666;
        margin-bottom: 10rpx;
      }
      
      .desc {
        font-size: 28rpx;
        color: #999;
      }
    }
  }
  
  .guide-footer {
    position: fixed;
    bottom: 60rpx;
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 60rpx;
    
    .dot-indicators {
      display: flex;
      gap: 20rpx;
      
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
    
    .next-btn {
      position: relative;
      width: 100rpx;
      height: 100rpx;
      
      .circle-progress {
        position: absolute;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background: #f0f0f0;
        
        .progress-inner {
          position: absolute;
          width: 80%;
          height: 80%;
          top: 10%;
          left: 10%;
          border-radius: 50%;
          background: #42d392;
        }
      }
      
      .arrow {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: #fff;
        font-size: 40rpx;
        font-weight: bold;
      }
    }
  }
}
</style> 