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

  .input-section {
    margin: 40rpx 0;
  }

  .guide-footer {
    margin-top: auto;
  }
}
</style> 