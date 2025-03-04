<template>
  <view class="container">
    <!-- 顶部导航 -->
    <page-header 
      :show-back="false"
      :show-skip="false"
      :show-close="true"
      back-redirect-url=""
      :back-is-tab="false"
      skip-redirect-url=""
      :skip-is-tab="false"
      @close="handleClose"
    />
    
    <!-- 标题区域 -->
    <view class="title-section">
      <text class="main-title">您的个人计划已准备就绪</text>
      <text class="sub-title">为了达到您的目标体重我们为您量身定制了此计划</text>
    </view>

    <!-- 计划卡片 -->
    <view class="plan-card">
      <!-- 增重目标 -->
      <view class="weight-goal">
        <text class="goal-text">+{{ totalWeightGain }} kg</text>
      </view>

      <!-- 计划周期 -->
      <view class="plan-duration">
        <text>{{ duration }} 周</text>
        <text>+{{ weeklyGain }}kg/周</text>
      </view>

      <!-- 进度图表 -->
      <view class="progress-chart">
        <!-- 起点体重 -->
        <view class="weight-point start">
          <text class="weight">{{ currentWeight }}kg</text>
          <text class="label">今天</text>
        </view>
        
        <!-- 曲线 -->
        <view class="curve-line"></view>
        
        <!-- 终点体重 -->
        <view class="weight-point end">
          <text class="weight">{{ targetWeight }}kg</text>
          <text class="label">{{ endDate }}</text>
        </view>
      </view>
    </view>

    <!-- 底部按钮 -->
    <view class="guide-footer">
      <u-button 
        type="primary" 
        @click="handleStart"
        :custom-style="{
          width: '100%',
          height: '100rpx',
          background: '#42d392',
          border: 'none'
        }"
      >开始训练</u-button>
    </view>
  </view>
</template>

<script>
import PageHeader from '@/components/page-header/index.vue'

export default {
  components: {
    PageHeader
  },
  
  data() {
    return {
      currentWeight: 60,
      targetWeight: 72,
      duration: 16,
      weeklyGain: 0.75,
      selectedProgress: 'beginner'
    }
  },

  computed: {
    totalWeightGain() {
      return this.targetWeight - this.currentWeight
    },
    
    endDate() {
      // 使用原生 Date 对象计算结束日期
      const date = new Date()
      date.setDate(date.getDate() + this.duration * 7) // 将周数转换为天数
      return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
    }
  },

  methods: {
    handleClose() {
      uni.reLaunch({
        url: '/pages/sys/home/index'
      })
    },

    handleStart() {
      // 保存用户计划数据到本地或服务器
      this.savePlanData()
      // 跳转到首页
      uni.reLaunch({
        url: '/pages/sys/home/index'
      })
    },

    savePlanData() {
      const today = new Date()
      const planData = {
        currentWeight: this.currentWeight,
        targetWeight: this.targetWeight,
        duration: this.duration,
        weeklyGain: this.weeklyGain,
        selectedProgress: this.selectedProgress,
        startDate: `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`,
        endDate: this.endDate
      }
      // 存储计划数据
      uni.setStorageSync('userPlanData', planData)
    }
  },

  onLoad(options) {
    // 获取从上一页传递的数据
    if (options.currentWeight) {
      this.currentWeight = parseFloat(options.currentWeight)
    }
    if (options.targetWeight) {
      this.targetWeight = parseFloat(options.targetWeight)
    }
    if (options.selectedProgress) {
      this.selectedProgress = options.selectedProgress
      // 根据选择的进度设置相应的周期和每周增重
      switch(options.selectedProgress) {
        case 'advanced':
          this.duration = 4
          this.weeklyGain = 3
          break
        case 'intermediate':
          this.duration = 8
          this.weeklyGain = 1.5
          break
        case 'beginner':
          this.duration = 16
          this.weeklyGain = 0.75
          break
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

  .plan-card {
    background: rgba(66, 211, 146, 0.1);
    border-radius: 20rpx;
    padding: 40rpx;
    margin: 40rpx 0;

    .weight-goal {
      text-align: center;
      margin-bottom: 30rpx;
      
      .goal-text {
        font-size: 64rpx;
        font-weight: bold;
        color: #42d392;
      }
    }

    .plan-duration {
      display: flex;
      justify-content: center;
      gap: 40rpx;
      margin-bottom: 60rpx;
      
      text {
        font-size: 32rpx;
        color: #666;
      }
    }

    .progress-chart {
      position: relative;
      height: 200rpx;
      margin-top: 60rpx;

      .weight-point {
        position: absolute;
        display: flex;
        flex-direction: column;
        align-items: center;
        
        .weight {
          font-size: 28rpx;
          font-weight: bold;
          color: #333;
          background: #fff;
          padding: 8rpx 16rpx;
          border-radius: 16rpx;
          margin-bottom: 10rpx;
        }
        
        .label {
          font-size: 24rpx;
          color: #666;
        }

        &.start {
          left: 0;
          bottom: 0;
        }

        &.end {
          right: 0;
          bottom: 0;
        }
      }

      .curve-line {
        position: absolute;
        left: 10%;
        right: 10%;
        bottom: 50rpx;
        height: 100rpx;
        background: linear-gradient(to right, transparent, #42d392);
        border-radius: 100rpx 100rpx 0 0;
        &::after {
          content: '';
          position: absolute;
          top: 0;
          right: 0;
          width: 16rpx;
          height: 16rpx;
          background: #42d392;
          border-radius: 50%;
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