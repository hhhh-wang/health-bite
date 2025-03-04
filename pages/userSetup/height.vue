<template>
  <view class="container">
    <!-- 顶部导航 -->
    <page-header 
      :show-back="true"
      :show-skip="false"
      back-redirect-url="/pages/userSetup/birthday"
      :back-is-tab="false"
      skip-redirect-url="/pages/sys/home/index"          
      :skip-is-tab="true"
    />
    
    <!-- 进度指示器 -->
    <view class="progress-indicator">
      <text>4 / 8</text>
    </view>
    
    <!-- 标题区域 -->
    <view class="title-section">
      <text class="main-title">选择您的<text class="highlight">身高</text></text>
      <text class="sub-title">我们将使用这些数据为您提供更好的饮食类型</text>
    </view>

    <!-- 身高选择器 -->
    <view class="height-selector">
      <view class="selector-container">
        <view class="btn minus" @click="decreaseHeight">
          <text>-</text>
        </view>
        <view class="value-container">
          <text class="value">{{ height }}</text>
          <text class="unit">cm</text>
        </view>
        <view class="btn plus" @click="increaseHeight">
          <text>+</text>
        </view>
      </view>
    </view>

    <!-- 底部区域 -->
    <view class="guide-footer">
      <progress-button
        ref="progressBtn"
        :percent="currentProgress"
        next-url="/pages/userSetup/weight"
        :need-validate="true"
        validate-msg="请选择您的身高"
        @validate="validateForm"
        @success="handleSuccess"
      />
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
      height: 160,
      currentProgress: 50,
      currentPage: 4,
      totalPages: 8,
      minHeight: 140,
      maxHeight: 220
    }
  },
  
  methods: {
    increaseHeight() {
      if (this.height < this.maxHeight) {
        this.height++
      }
    },
    
    decreaseHeight() {
      if (this.height > this.minHeight) {
        this.height--
      }
    },
    
    validateForm() {
      if (!this.height || this.height < this.minHeight || this.height > this.maxHeight) {
        this.$u.toast('请选择有效的身高')
        return false
      }
      return true
    },
    
    handleSuccess() {
      this.currentProgress = (this.currentPage + 1) * 12.5
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
      
      .highlight {
        color: #42d392;
      }
    }
    
    .sub-title {
      font-size: 32rpx;
      color: #666;
    }
  }

  .height-selector {
    margin: 60rpx auto;
    
    .selector-container {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 40rpx;
      
      .btn {
        width: 80rpx;
        height: 80rpx;
        border-radius: 50%;
        background-color: #42d392;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        
        text {
          color: #fff;
          font-size: 48rpx;
          font-weight: bold;
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          line-height: 1;
          height: 48rpx;
          width: 48rpx;
          text-align: center;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        &:active {
          opacity: 0.8;
        }
      }
      
      .value-container {
        min-width: 200rpx;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 4rpx;
        
        .value {
          font-size: 80rpx;
          font-weight: bold;
          color: #333;
        }
        
        .unit {
          font-size: 32rpx;
          color: #666;
          margin-left: 10rpx;
          padding-bottom: 10rpx;
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