<template>
  <view class="container">
    <!-- 顶部导航 -->
    <page-header 
      :show-back="true"
      :show-skip="false"
      back-redirect-url="/pages/userSetup/height"
      :back-is-tab="false"
      skip-redirect-url="/pages/sys/home/index"          
      :skip-is-tab="true"
    />
    
    <!-- 进度指示器 -->
    <view class="progress-indicator">
      <text>6 / 8</text>
    </view>
    
    <!-- 标题区域 -->
    <view class="title-section">
      <text class="main-title">选择您的<text class="highlight">体重</text></text>
      <text class="sub-title">我们将使用这些数据为您提供更好的饮食类型</text>
    </view>

    <!-- 体重显示 -->
    <view class="weight-display">
      <text class="weight-value">{{ weight }}kg</text>
    </view>

    <!-- 底部区域 -->
    <view class="guide-footer">
      <progress-button
        ref="progressBtn"
        :percent="currentProgress" 
        next-url="/pages/userSetup/nextPage"
        :need-validate="true"
        validate-msg="请选择您的体重"
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
      weight: 60,
      minWeight: 30,
      maxWeight: 200
    }
  },

  computed: {
    currentProgress() {
      return (this.weight - this.minWeight) / (this.maxWeight - this.minWeight) * 100;
    }
  },

  methods: {
    validateForm() {
      return this.weight >= this.minWeight && this.weight <= this.maxWeight;
    },

    handleSuccess() {
      console.log('体重数据:', this.weight);
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

  .weight-display {
    text-align: center;
    margin: 40rpx 0;
    padding: 40rpx;
    background: rgba(66, 211, 146, 0.1);
    border-radius: 20rpx;
    
    .weight-value {
      font-size: 100rpx;
      font-weight: bold;
      color: #333;
    }
  }

  .guide-footer {
    margin-top: auto;
    padding: 40rpx;
    background: #fff;
  }
}
</style> 