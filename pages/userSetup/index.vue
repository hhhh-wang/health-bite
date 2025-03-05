<template>
    <view class="container">
      <!-- 使用封装的顶部组件 -->
      <page-header 
        :show-back="false"
        :show-skip="true"
        back-redirect-url="/pages/sys/login/index"
        :back-is-tab="true"
        skip-redirect-url="/pages/sys/home/index"          
        :skip-is-tab="true"
      />
    <!-- 进度指示器 -->
    <view class="progress-indicator">
      <text>1 / 8</text>
    </view>
    
    <!-- 主要内容区域 -->
    <view class="content-wrapper">
      <!-- 标题区域 -->
      <view class="title-section">
        <text class="main-title">输入您的用户名</text>
        <text class="sub-title">我们使用这些数据为您提供更好的饮食类型</text>
        <image class="healthy-icon" src="/static/images/healthy-user.png" mode="aspectFit"></image>
      </view>

      <!-- 输入区域 -->
      <view class="input-section">
        <u-input
          v-model="username"
          :border="false"
          placeholder="请输入用户名"
          :customStyle="{
            padding: '20rpx 30rpx',
            border: '2rpx solid #4cd964',
            borderRadius: '50rpx'
          }"
        >
          <template slot="prefix">
            <u-icon name="account" color="#4cd964" size="40"></u-icon>
          </template>
        </u-input>
      </view>
    </view>

    <!-- 底部区域 -->
    <view class="guide-footer">
      <progress-button
        ref="progressBtn"
        :percent="currentProgress"
        next-url="/pages/userSetup/target"
        :need-validate="true"
        validate-msg="请输入用户名"
        @validate="validateForm"
        @success="handleSuccess"
      />
    </view>
  </view>
</template>

<script>
// 引入组件
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
      username: '',
      currentProgress: 12.5,
      currentPage: 1,
      totalPages: 8
    }
  },
  methods: {
    validateForm() {
      if (!this.username.trim()) {
        this.$u.toast('请输入用户名');
        return;
      }
      // 验证通过，手动触发组件的跳转方法
      this.$refs.progressBtn.navigateToNext()
    },
    handleSuccess() {
      // 跳转成功后更新进度
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
  background: linear-gradient(to bottom, #f8fffa, #ffffff);
  padding: 0 40rpx;
  box-sizing: border-box;
  
  .content-wrapper {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: -100rpx; // 向上偏移以实现视觉上的居中
  }

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
    text-align: center;
    margin: 40rpx 0;
    position: relative;
    width: 100%;
    
    .main-title {
      font-size: 48rpx;
      font-weight: bold;
      display: block;
      margin-bottom: 20rpx;
      background: linear-gradient(to right, #4cd964, #2ac845);
      -webkit-background-clip: text;
      color: transparent;
    }
    
    .sub-title {
      font-size: 32rpx;
      color: #666;
    }
    
    .healthy-icon {
      width: 120rpx;
      height: 120rpx;
      position: absolute;
      right: 0;
      top: 10rpx;
    }
  }

  .input-section {
    margin: 60rpx 0;
    background-color: rgba(76, 217, 100, 0.05);
    padding: 30rpx;
    border-radius: 16rpx;
    box-shadow: 0 4rpx 12rpx rgba(76, 217, 100, 0.1);
    width: 100%;
  }

  .guide-footer {
    margin-top: auto;
    margin-bottom: 60rpx;
  }
}
</style> 