<template>
  <view class="container">
    <!-- 顶部导航 -->
    <page-header 
      :show-back="true"
      :show-skip="false"
      back-redirect-url="/pages/userSetup/index"
      :back-is-tab="true"
      skip-redirect-url="/pages/sys/home/index"          
      :skip-is-tab="true"
    />
    
    <!-- 进度指示器 -->
    <view class="progress-indicator">
      <text>2 / 8</text>
    </view>
    
    <!-- 标题区域 -->
    <view class="title-section">
      <text class="main-title">选择您的目标</text>
      <text class="sub-title">我们将根据您的目标制定饮食计划</text>
    </view>

    <!-- 选项区域 -->
    <view class="target-options">
      <view 
        class="target-item" 
        :class="{ active: selectedTarget === 'reduce' }"
        @click="selectTarget('reduce')"
      >
        <image src="/static/images/target/banana.png" mode="aspectFit" class="target-icon"></image>
        <view class="target-text">
          <text class="target-title">我要减重</text>
          <text class="target-desc">控制热量摄入，健康瘦身</text>
        </view>
      </view>
      
      <view 
        class="target-item"
        :class="{ active: selectedTarget === 'maintain' }"
        @click="selectTarget('maintain')"
      >
        <image src="/static/images/target/dumbbell.png" mode="aspectFit" class="target-icon"></image>
        <view class="target-text">
          <text class="target-title">我要增重</text>
          <text class="target-desc">科学增肌，提升体质</text>
        </view>
      </view>
      
      <view 
        class="target-item"
        :class="{ active: selectedTarget === 'keep' }"
        @click="selectTarget('keep')"
      >
        <image src="/static/images/target/muscle.png" mode="aspectFit" class="target-icon"></image>
        <view class="target-text">
          <text class="target-title">保持健康</text>
          <text class="target-desc">均衡营养，维持体重</text>
        </view>
      </view>
    </view>

    <!-- 底部区域 -->
    <view class="guide-footer">
      <progress-button
        ref="progressBtn"
        :percent="currentProgress"
        next-url="/pages/userSetup/gender"
        :need-validate="true"
        validate-msg="请选择您的目标"
        @validate="validateForm"
        @success="handleSuccess"
      />
    </view>
  </view>
</template>

<script>
// 引入 page-header 组件
import PageHeader from '@/components/page-header/index.vue'
import ProgressButton from '@/components/progress-button/index.vue'

export default {
  // 注册组件
  components: {
    PageHeader,
    ProgressButton
  },
  
  data() {
    return {
      selectedTarget: '',
      currentProgress: 25, // 8个页面，每页增加12.5%，第二页是25%
      currentPage: 2,
      totalPages: 8  // 总页数改为8
    }
  },
  methods: {
    selectTarget(target) {
      this.selectedTarget = target;
    },
    validateForm() {
      if (!this.selectedTarget) {
        this.$u.toast('请选择您的目标');
        return;
      }
      // 验证通过，手动触发组件的跳转方法
      this.$refs.progressBtn.navigateToNext();
    },
    handleSuccess() {
      // 跳转成功后更新进度
      this.currentProgress = (this.currentPage + 1) * 12.5;
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
      color: #333;
      display: block;
      margin-bottom: 20rpx;
      text-align: center;
      background: linear-gradient(to right, #4cd964, #2ac845);
      -webkit-background-clip: text;
      color: transparent;
    }
    
    .sub-title {
      font-size: 32rpx;
      color: #666;
      text-align: center;
    }
  }

  .target-options {
    margin-top: 40rpx;
    
    .target-item {
      height: 180rpx;
      margin-bottom: 30rpx;
      background-color: #f8f8f8;
      border-radius: 50rpx;
      display: flex;
      align-items: center;
      padding: 0 40rpx;
      transition: all 0.3s;
      box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.05);
      border: 2rpx solid transparent;
      
      &.active {
        background-color: rgba(76, 217, 100, 0.1);
        border: 2rpx solid #4cd964;
        box-shadow: 0 8rpx 16rpx rgba(76, 217, 100, 0.15);
        transform: translateY(-4rpx);
      }
      
      .target-icon {
        width: 90rpx;
        height: 90rpx;
        margin-right: 30rpx;
      }
      
      .target-text {
        flex: 1;
        
        .target-title {
          font-size: 34rpx;
          color: #333;
          font-weight: 600;
          display: block;
          margin-bottom: 10rpx;
        }
        
        .target-desc {
          font-size: 26rpx;
          color: #999;
          display: block;
        }
      }
    }
  }

  .guide-footer {
    margin-top: auto;
    margin-bottom: 60rpx;
  }
}
</style> 