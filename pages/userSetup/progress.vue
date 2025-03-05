<template>
  <view class="container">
    <!-- 顶部导航 -->
    <page-header 
      :show-back="true"
      :show-skip="false"
      back-redirect-url="/pages/userSetup/targetWeight"
      :back-is-tab="false"
      skip-redirect-url="/pages/sys/home/index"          
      :skip-is-tab="true"

    />
    
    <!-- 进度指示器 -->
    <view class="progress-indicator">
      <text>8 / 8</text>
    </view>
    
    <!-- 标题区域 -->
    <view class="title-section">
      <text class="main-title">选择您的<text class="highlight">进度</text></text>
      <text class="sub-title">我们将使用这些数据为您提供更好的饮食类型</text>
    </view>

    <!-- 进度选择区域 -->
    <view class="progress-options">
      <!-- 增强版 -->
      <view 
        class="option-card" 
        :class="{ active: selectedProgress === 'advanced' }"
        @click="selectProgress('advanced')"
      >
        <view class="option-header">
          <text class="title">增强版</text>
          <text class="difficulty">很难</text>
        </view>
        <view class="option-content">
          <text class="duration">4 周</text>
          <text class="gain">+3kg/周</text>
        </view>
        <view class="option-icon">
          <image src="/static/images/trophy.png" mode="aspectFit"></image>
        </view>
      </view>

      <!-- 进阶版 -->
      <view 
        class="option-card" 
        :class="{ active: selectedProgress === 'intermediate' }"
        @click="selectProgress('intermediate')"
      >
        <view class="option-header">
          <text class="title">进阶版</text>
          <text class="difficulty">较难</text>
        </view>
        <view class="option-content">
          <text class="duration">8 周</text>
          <text class="gain">+1.5kg/周</text>
        </view>
        <view class="option-icon">
          <image src="/static/images/bulb.png" mode="aspectFit"></image>
        </view>
      </view>

      <!-- 初级版 -->
      <view 
        class="option-card" 
        :class="{ active: selectedProgress === 'beginner' }"
        @click="selectProgress('beginner')"
      >
        <view class="option-header">
          <text class="title">初级版</text>
          <text class="difficulty">容易</text>
        </view>
        <view class="option-content">
          <text class="duration">16 周</text>
          <text class="gain">+0.75kg/周</text>
        </view>
        <view class="option-icon">
          <image src="/static/images/thumbs-up.png" mode="aspectFit"></image>
        </view>
      </view>
    </view>

    <!-- 底部区域 -->
    <view class="guide-footer">
      <progress-button
        ref="progressBtn"
        :percent="currentProgress"
        next-url="/pages/sys/home/index"
        :need-validate="true"
        validate-msg="请选择训练进度"
        @validate="validateForm"
        @success="handleSuccess"
      >
      </progress-button>
    </view>
  </view>
</template>

<script>
import PageHeader from '@/components/page-header/index.vue'
import ProgressButton from '@/components/progress-button/index.vue'

export default {
  components: {
    PageHeader,
    ProgressButton
  },
  
  data() {
    return {
      selectedProgress: '',
      currentProgress: 100,
      currentPage: 8,
      totalPages: 8
    }
  },

  methods: {
    handleBack() {
      uni.navigateBack({
        delta: 1
      })
    },

    selectProgress(type) {
      this.selectedProgress = type
    },

    validateForm() {
      if (!this.selectedProgress) {
        this.$u.toast('请选择训练进度')
        return false
      }
      this.handleSuccess()
      return true
    },

    handleSuccess() {
      console.log('选择的进度:', this.selectedProgress)
      uni.navigateTo({
        url: `/pages/userSetup/planComplete?currentWeight=${this.currentWeight}&targetWeight=${this.targetWeight}&selectedProgress=${this.selectedProgress}`
      })
    }
  },

  onLoad(options) {
    if (options.currentWeight && options.targetWeight) {
      this.currentWeight = parseFloat(options.currentWeight)
      this.targetWeight = parseFloat(options.targetWeight)
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
  background: linear-gradient(to bottom, #f8fffa, #ffffff);
  padding: 0 40rpx;
  box-sizing: border-box;
  
  .progress-indicator {
    margin: 20rpx 0;
    text-align: center;
    
    text {
      font-size: 28rpx;
      color: #4cd964;
      font-weight: bold;
      display: inline-block;
      padding: 8rpx 24rpx;
      background: rgba(76, 217, 100, 0.1);
      border-radius: 50rpx;
    }
  }

  .title-section {
    margin: 50rpx 0;
    text-align: center;
    
    .main-title {
      font-size: 48rpx;
      font-weight: bold;
      display: block;
      margin-bottom: 20rpx;
      text-align: center;
      color: #333;
      
      .highlight {
        color: #4cd964;
      }
    }
    
    .sub-title {
      font-size: 32rpx;
      color: #666;
      text-align: center;
      display: block;
    }
  }

  .progress-options {
    display: flex;
    flex-direction: column;
    gap: 30rpx;
    margin: 40rpx 0;

    .option-card {
      padding: 30rpx;
      background: #f8f8f8;
      border-radius: 50rpx;
      position: relative;
      transition: all 0.3s;

      &.active {
        background: rgba(66, 211, 146, 0.1);
        border: 2rpx solid #42d392;
      }

      .option-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20rpx;

        .title {
          font-size: 36rpx;
          font-weight: bold;
          color: #333;
        }

        .difficulty {
          font-size: 24rpx;
          color: #ff6b6b;
          background: rgba(255, 107, 107, 0.1);
          padding: 4rpx 16rpx;
          border-radius: 50rpx;
        }
      }

      .option-content {
        display: flex;
        gap: 40rpx;

        .duration, .gain {
          font-size: 32rpx;
          color: #666;
        }
      }

      .option-icon {
        position: absolute;
        right: 30rpx;
        top: 50%;
        transform: translateY(-50%);
        width: 80rpx;
        height: 80rpx;

        image {
          width: 100%;
          height: 100%;
        }
      }
    }
  }

  .guide-footer {
    margin-top: auto;
    padding-bottom: 40rpx;
  }
}
</style> 