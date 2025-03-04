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
        <text>我要减重</text>
      </view>
      
      <view 
        class="target-item"
        :class="{ active: selectedTarget === 'maintain' }"
        @click="selectTarget('maintain')"
      >
        <image src="/static/images/target/dumbbell.png" mode="aspectFit" class="target-icon"></image>
        <text>我要增重</text>
      </view>
      
      <view 
        class="target-item"
        :class="{ active: selectedTarget === 'keep' }"
        @click="selectTarget('keep')"
      >
        <image src="/static/images/target/muscle.png" mode="aspectFit" class="target-icon"></image>
        <text>保持健康</text>
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
    }
    
    .sub-title {
      font-size: 32rpx;
      color: #666;
    }
  }

  .target-options {
    margin-top: 60rpx;
    
    .target-item {
      height: 160rpx;
      margin-bottom: 30rpx;
      background-color: #f8f8f8;
      border-radius: 20rpx;
      display: flex;
      align-items: center;
      padding: 0 40rpx;
      transition: all 0.3s;
      
      &.active {
        background-color: rgba(66, 211, 146, 0.1);
        border: 2rpx solid #42d392;
      }
      
      .target-icon {
        width: 80rpx;
        height: 80rpx;
        margin-right: 30rpx;
      }
      
      text {
        font-size: 32rpx;
        color: #333;
        font-weight: 500;
      }
    }
  }

  .guide-footer {
    margin-top: auto;
  }
}
</style> 