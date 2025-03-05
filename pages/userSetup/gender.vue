<template>
  <view class="container">
    <!-- 顶部导航 -->
    <page-header 
      :show-back="true"
      :show-skip="false"
      back-redirect-url="/pages/userSetup/target"
      :back-is-tab="false"
      skip-redirect-url="/pages/sys/home/index"          
      :skip-is-tab="true"
    />
    
    <!-- 进度指示器 -->
    <view class="progress-indicator">
      <text>3 / 8</text>
    </view>
    
    <!-- 标题区域 -->
    <view class="title-section">
      <text class="main-title">选择您的性别</text>
      <text class="sub-title">我们将根据您的性别制定饮食建议</text>
    </view>

    <!-- 性别选择区域 -->
    <view class="gender-options">
      <view 
        class="gender-item" 
        :class="{ active: selectedGender === 'male' }"
        @click="selectGender('male')"
      >
        <image src="/static/common/img/plan/guy.png" mode="aspectFit" class="gender-icon"></image>
        <text>男士</text>
      </view>
      
      <view 
        class="gender-item"
        :class="{ active: selectedGender === 'female' }"
        @click="selectGender('female')"
      >
        <image src="/static/common/img/plan/lady.png" mode="aspectFit" class="gender-icon"></image>
        <text>女士</text>
      </view>
    </view>

    <!-- 底部区域 -->
    <view class="guide-footer">
      <progress-button
        ref="progressBtn"
        :percent="currentProgress"
        next-url="/pages/userSetup/birthday"
        :need-validate="true"
        validate-msg="请选择您的性别"
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
      selectedGender: '',
      currentProgress: 37.5, // 8个页面，每页12.5%，第三页是37.5%
      currentPage: 3,
      totalPages: 8
    }
  },
  methods: {
    selectGender(gender) {
      this.selectedGender = gender
    },
    validateForm() {
      if (!this.selectedGender) {
        this.$u.toast('请选择您的性别')
        return
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

  .gender-options {
    margin-top: 60rpx;
    display: flex;
    justify-content: space-between;
    gap: 30rpx;
    
    .gender-item {
      flex: 1;
      height: 360rpx;
      background-color: #f8f8f8;
      border-radius: 20rpx;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 30rpx;
      transition: all 0.3s;
      
      &.active {
        background-color: rgba(66, 211, 146, 0.1);
        border: 2rpx solid #42d392;
      }
      
      .gender-icon {
        width: 160rpx;
        height: 160rpx;
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