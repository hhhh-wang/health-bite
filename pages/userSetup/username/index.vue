<template>
    <view class="container">
      <!-- 顶部区域 -->
      <view class="header">
        <view class="back-button">
            <u-icon name="arrow-left" color="#333" size="20"></u-icon>
        </view>
        <view class="skip-btn" @click="handleSkip">
          跳过
        </view>
      </view>
    <!-- 进度指示器 -->
    <view class="progress-indicator">
      <text>1 / 8</text>
    </view>
    
    <!-- 标题区域 -->
    <view class="title-section">
      <text class="main-title">输入您的用户名</text>
      <text class="sub-title">我们需要用它来识别您</text>
    </view>

    <!-- 输入区域 -->
    <view class="input-section">
      <u-input
        v-model="username"
        :border="false"
        placeholder="请输入用户名"
        :customStyle="{
          padding: '20rpx 0',
          borderBottom: '1px solid #eee'
        }"
      ></u-input>
    </view>

    <!-- 底部区域 -->
    <view class="guide-footer">
      <view class="bottom-controls">
        <view @click="handleNext">
          <u-circle-progress 
            class="progress-btn"
            :percent="currentProgress" 
            :width="300"
            activeColor="#42d392"
            inactiveColor="rgba(66, 211, 146, 0.2)"
            :duration="1000"
          >
            <text class="arrow-icon">›</text>
          </u-circle-progress>
        </view>
        <view class="dot-indicators">
          <view class="dot active"></view>
          <view class="dot"></view>
          <view class="dot"></view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      currentProgress: 33,
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
      if (!this.username.trim()) {
        this.$u.toast('请输入用户名');
        return;
      }
      
      if (this.currentPage < this.totalPages) {
        this.currentProgress = (this.currentPage + 1) * 33
        uni.navigateTo({
          url: '/pages/userSetup/nextPage/index'
        })
      } else {
        this.handleSkip()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #ffffff;
  padding: 0 40rpx;
  box-sizing: border-box;
  
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 60rpx 0 30rpx;
    
    .back-button {
      width: 120rpx;
      height: 120rpx;
      border-radius: 50%;
      background-color: rgb(246, 247, 247);
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .skip-btn {
      width: 150rpx;
      height: 120rpx;
      border-radius: 50rpx;
      background-color: rgb(246, 247, 247);
      display: flex;
      align-items: center;
      justify-content: center;
      
      text {
        font-size: 28rpx;
        font-weight: bold;
        color: #333;
      }
    }
  }

  .progress-indicator {
    margin: 20rpx 0;
    
    text {
      font-size: 28rpx;
      color: #999;
    }
  }

  .title-section {
    margin: 60rpx 0;
    
    .main-title {
      font-size: 48rpx;
      font-weight: bold;
      color: #333;
      display: block;
      margin-bottom: 20rpx;
    }
    
    .sub-title {
      font-size: 32rpx;
      color: #666;
    }
  }

  .input-section {
    margin: 40rpx 0;
  }

  .guide-footer {
    margin-top: auto;
    padding: 40rpx 0;
    
    .bottom-controls {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 40rpx;
      
      .progress-btn {
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
        }
      }
      
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
    }
  }
}
</style> 