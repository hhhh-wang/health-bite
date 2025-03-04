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
        <image src="/static/images/gender/male.png" mode="aspectFit" class="gender-icon"></image>
        <text>男士</text>
      </view>
      
      <view 
        class="gender-item"
        :class="{ active: selectedGender === 'female' }"
        @click="selectGender('female')"
      >
        <image src="/static/images/gender/female.png" mode="aspectFit" class="gender-icon"></image>
        <text>女士</text>
      </view>
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
      </view>
    </view>
  </view>
</template>

<script>
import PageHeader from '@/components/page-header/index.vue'

export default {
      // 注册组件
  components: {
    PageHeader
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
      this.selectedGender = gender;
    },
    handleNext() {
      if (!this.selectedGender) {
        this.$u.toast('请选择您的性别');
        return;
      }
      
      if (this.currentPage < this.totalPages) {
        this.currentProgress = (this.currentPage + 1) * 12.5
        uni.navigateTo({
          url: '/pages/userSetup/birthday'
        });
      } else {
        this.handleSkip();
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
    padding: 40rpx 0;
    
    .bottom-controls {
      display: flex;
      flex-direction: column;
      align-items: center;
      
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
    }
  }
}
</style> 