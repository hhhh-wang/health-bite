<template>
  <view class="container">
    <!-- 顶部导航 -->
    <page-header 
      :show-back="true"
      :show-skip="true"
      back-redirect-url="/pages/userSetup/gender"
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
      <text class="main-title">选择您的<text class="highlight">生日</text></text>
      <text class="sub-title">我们将使用这些数据为您提供更好的饮食类型</text>
    </view>

    <!-- 年龄显示 -->
    <view class="age-display">
      <text class="age-number">{{ calculateAge }}</text>
    </view>

    <!-- 日期选择区域 -->
    <view class="birthday-picker">
      <view class="picker-box" @click="showDatePicker">
        <text>{{ formatDate }}</text>
        <u-icon name="calendar" color="#42d392" size="40"></u-icon>
      </view>
    </view>

    <!-- 日期选择器 -->
    <u-picker
      v-model="showPicker"
      mode="time"
      @confirm="onConfirm"
      @cancel="showPicker = false"
    >
      <u-calendar
        :show="showPicker"
        mode="single"
        :defaultDate="birthday"
        @change="dateChange"
        @confirm="onConfirm"
        @close="showPicker = false"
        color="#42d392"
      ></u-calendar>
    </u-picker>

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
// 引入 page-header 组件
import PageHeader from '@/components/page-header/index.vue'

export default {
  // 注册组件
  components: {
    PageHeader
  },
  
  data() {
    return {
      birthday: '',
      showPicker: false,
      currentProgress: 50, // 8个页面，每页12.5%，第四页是50%
      currentPage: 4,
      totalPages: 8,
      minDate: new Date().getTime() - (100 * 365 * 24 * 60 * 60 * 1000), // 100年前
      maxDate: new Date().getTime() // 当前时间
    }
  },
  computed: {
    formatDate() {
      if (!this.birthday) return '请选择日期'
      const date = new Date(this.birthday)
      const year = date.getFullYear()
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const day = String(date.getDate()).padStart(2, '0')
      return `${year}-${month}-${day}`
    },
    calculateAge() {
      if (!this.birthday) return '23'
      const birthDate = new Date(this.birthday)
      const today = new Date()
      let age = today.getFullYear() - birthDate.getFullYear()
      const monthDiff = today.getMonth() - birthDate.getMonth()
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--
      }
      return age.toString()
    }
  },
  methods: {
    showDatePicker() {
      this.showPicker = true
    },
    dateChange(e) {
      this.birthday = e
    },
    onConfirm(e) {
      this.birthday = e
      this.showPicker = false
    },
    handleNext() {
      if (!this.birthday) {
        this.$u.toast('请选择您的生日');
        return;
      }
      
      if (this.currentPage < this.totalPages) {
        this.currentProgress = (this.currentPage + 1) * 12.5
        uni.navigateTo({
          url: '/pages/userSetup/height'
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
      
      .highlight {
        color: #42d392;
      }
    }
    
    .sub-title {
      font-size: 32rpx;
      color: #666;
    }
  }

  .age-display {
    margin: 60rpx 0;
    display: flex;
    justify-content: center;
    
    .age-number {
      font-size: 120rpx;
      font-weight: bold;
      color: #333;
    }
  }

  .birthday-picker {
    margin-top: 40rpx;
    
    .picker-box {
      height: 120rpx;
      background-color: #f8f8f8;
      border-radius: 20rpx;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 40rpx;
      
      text {
        font-size: 32rpx;
        color: #333;
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