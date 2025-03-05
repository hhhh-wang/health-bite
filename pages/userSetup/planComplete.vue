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
      <text class="sub-title">为了达到您的目标体重</text>
      <text class="sub-title">我们为您量身定制了此计划</text>
    </view>

    <!-- 计划卡片 -->
    <view class="plan-card" style="background-color: rgb(255, 232, 215);">
      <view class="calorie-total">
        <text class="number">{{ totalWeightGain }}</text>
        <text class="unit">kg</text>
      </view>
      <view class="date-info">
        <text>{{ duration }} 周</text>
        <text class="exercise-count">+{{ weeklyGain }}kg/周</text>
      </view>
      
      <!-- 图表区域 -->
      <nutrition-chart
        :meals="meals"
        :nutritionData="nutritionData"
        :yAxis="yAxisConfig"
        :lineNames="['体重']"
        canvasId="weightProgress"
      />
    </view>

    <!-- 营养搭配建议卡片 -->
    <view class="nutrition-card">
      <text class="card-title">营养搭配建议</text>
      <view class="daily-calories">
        <text class="number">{{ dailyCalories }}</text>
        <text class="unit">kcal</text>
        <text class="desc">每日总热量</text>
      </view>
      
      <view class="nutrition-list">
        <view class="nutrition-item" v-for="(item, index) in nutritionRatio" :key="index">
          <view class="label">{{ item.name }}</view>
          <view class="progress-bar">
            <view class="progress" :style="{ width: item.percentage + '%', backgroundColor: item.color }"></view>
          </view>
          <view class="percentage">{{ item.percentage }}%</view>
        </view>
        
        <view class="water-intake">
          <view class="label">日均水量</view>
          <view class="value">2000ml</view>
        </view>
      </view>
    </view>

    <!-- 如何实现目标卡片 -->
    <view class="target-card">
      <view class="target-title">
        <view class="title-line"></view>
        <text>如何实现目标</text>
        <view class="title-line"></view>
      </view>
      <text class="target-subtitle">进行以下4项活动</text>
      
      <view class="target-grid">
        <view class="target-item">
          <image src="/static/common/img/plan/food-data.png" mode="aspectFit"></image>
          <text>查看您的食物数据</text>
        </view>
        <view class="target-item">
          <image src="/static/common/img/plan/balanced-intake.png" mode="aspectFit"></image>
          <text>平衡您的摄入量</text>
        </view>
        <view class="target-item">
          <image src="/static/common/img/plan/hydration.png" mode="aspectFit"></image>
          <text>保持水分充足</text>
        </view>
        <view class="target-item">
          <image src="/static/common/img/plan/fitness.png" mode="aspectFit"></image>
          <text>更好的体适能</text>
        </view>
      </view>
    </view>

    <!-- 底部按钮 -->
    <view class="guide-footer">
      <u-button 
        type="curve" 
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
import NutritionChart from '@/components/nutrition-chart/index.vue'

export default {
  components: {
    PageHeader,
    NutritionChart
  },
  
  data() {
    return {
      currentWeight: 60,
      targetWeight: 72,
      duration: 16,
      weeklyGain: 0.75,
      selectedProgress: 'beginner',
      meals: ['今天', '结束日期'],
      nutritionData: [
        [60, 72]
      ],
      yAxisConfig: {
        min: 55,
        max: 75
      },
      dailyCalories: 2925,
      nutritionRatio: [
        { name: '碳水化合物', percentage: 50, color: '#42d392' },
        { name: '脂肪', percentage: 30, color: '#ff7875' },
        { name: '蛋白质', percentage: 20, color: '#597ef7' },
      ],
    }
  },

  computed: {
    totalWeightGain() {
      return this.targetWeight - this.currentWeight
    },
    
    endDate() {
      const date = new Date()
      date.setDate(date.getDate() + this.duration * 7)
      return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
    },
    
    chartConfig() {
      const minWeight = Math.min(this.currentWeight, this.targetWeight)
      const maxWeight = Math.max(this.currentWeight, this.targetWeight)
      const range = maxWeight - minWeight
      
      return {
        min: Math.floor(minWeight - range * 0.1),
        max: Math.ceil(maxWeight + range * 0.1)
      }
    }
  },

  methods: {
    handleClose() {
      uni.reLaunch({
        url: '/pages/sys/home/index'
      })
    },

    handleStart() {
      this.savePlanData()
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
      uni.setStorageSync('userPlanData', planData)
    },

    initChartData() {
      this.meals = ['今天', this.endDate]
      this.nutritionData = [
        [this.currentWeight, this.targetWeight]
      ]
      this.yAxisConfig = {
        min: this.chartConfig.min,
        max: this.chartConfig.max
      }
    }
  },

  mounted() {
    this.initChartData()
  },

  onLoad(options) {
    if (options.currentWeight) {
      this.currentWeight = parseFloat(options.currentWeight)
    }
    if (options.targetWeight) {
      this.targetWeight = parseFloat(options.targetWeight)
    }
    if (options.selectedProgress) {
      this.selectedProgress = options.selectedProgress
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
  },

  watch: {
    currentWeight() {
      this.initChartData()
    },
    targetWeight() {
      this.initChartData()
    },
    duration() {
      this.initChartData()
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
  background: linear-gradient(135deg, #eaffef 0%, #f8fffa 100%);
  padding: 0 40rpx;
  box-sizing: border-box;
  
  .title-section {
    margin: 60rpx 0;
    text-align: center;
    display: flex;
    flex-direction: column;
    gap: 20rpx;
    
    .main-title {
      font-size: 52rpx;
      font-weight: 800;
      display: block;
      text-align: center;
      color: #1b3a2b;
      margin-bottom: 30rpx;
      letter-spacing: 1px;
    }
    
    .sub-title {
      font-size: 34rpx;
      color: #3a6351;
      text-align: center;
      display: block;
      line-height: 1.5;
      
      &:last-child {
        margin-top: 10rpx;
      }
    }
  }

  .plan-card {
    margin: 20rpx 0 40rpx;
    padding: 40rpx 30rpx;
    background: linear-gradient(135deg, #ffeddf 0%, #fff2e8 100%);
    border-radius: 30rpx;
    box-shadow: 0 8rpx 20rpx rgba(255, 142, 66, 0.1);
    position: relative;
    overflow: hidden;
    
    &::before {
      content: '';
      position: absolute;
      top: -10rpx;
      right: -10rpx;
      width: 100rpx;
      height: 100rpx;
      background: rgba(255, 142, 66, 0.1);
      border-radius: 50%;
      z-index: 0;
    }
    
    .calorie-total {
      text-align: center;
      margin-bottom: 20rpx;
      position: relative;
      z-index: 1;
      
      .number {
        font-size: 72rpx;
        font-weight: 800;
        color: #ff7e36;
        letter-spacing: -1px;
      }
      
      .unit {
        font-size: 32rpx;
        color: #ff7e36;
        margin-left: 10rpx;
        font-weight: 600;
      }
    }
    
    .date-info {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 30rpx;
      color: #785a44;
      font-size: 30rpx;
      margin-bottom: 30rpx;
      position: relative;
      z-index: 1;
      font-weight: 500;
      
      .exercise-count {
        color: #ff7e36;
        font-weight: 700;
        position: relative;
        padding: 6rpx 14rpx;
        background-color: rgba(255, 126, 54, 0.1);
        border-radius: 50rpx;
      }
    }
  }

  .nutrition-card {
    margin: 30rpx 0;
    padding: 40rpx 30rpx;
    background-color: #ffffff;
    border-radius: 50rpx;
    box-shadow: 0 8rpx 20rpx rgba(66, 211, 146, 0.1);
    position: relative;
    overflow: hidden;
    
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 6rpx;
      background: linear-gradient(90deg, #42d392 0%, #a6e9c8 100%);
    }

    .card-title {
      font-size: 36rpx;
      font-weight: 700;
      color: #1b3a2b;
      margin-bottom: 40rpx;
      display: block;
      position: relative;
      
      &::after {
        content: '';
        position: absolute;
        bottom: -10rpx;
        left: 0;
        width: 60rpx;
        height: 3rpx;
        background-color: #42d392;
      }
    }

    .daily-calories {
      text-align: center;
      margin-bottom: 50rpx;
      background: rgba(66, 211, 146, 0.1);
      border-radius: 50rpx;
      padding: 20rpx;
      
      .number {
        font-size: 64rpx;
        font-weight: 800;
        color: #42d392;
        letter-spacing: -1px;
      }
      
      .unit {
        font-size: 28rpx;
        color: #42d392;
        margin-left: 8rpx;
        font-weight: 600;
      }
      
      .desc {
        font-size: 26rpx;
        color: #3a6351;
        margin-left: 20rpx;
        font-weight: 500;
      }
    }

    .nutrition-list {
      .nutrition-item {
        display: flex;
        align-items: center;
        margin-bottom: 35rpx;
        
        .label {
          width: 180rpx;
          font-size: 30rpx;
          color: #3a6351;
          font-weight: 600;
        }
        
        .progress-bar {
          flex: 1;
          height: 16rpx;
          background-color: #f5f5f5;
          border-radius: 50rpx;
          margin: 0 20rpx;
          overflow: hidden;
          position: relative;
          
          .progress {
            height: 100%;
            border-radius: 50rpx;
            transition: width 0.3s ease;
            position: relative;
            
            &::after {
              content: '';
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              background: linear-gradient(90deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0));
            }
          }
        }
        
        .percentage {
          width: 80rpx;
          font-size: 26rpx;
          color: #3a6351;
          font-weight: 600;
        }
      }

      .water-intake {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 30rpx;
        padding: 25rpx 20rpx;
        border-radius: 20rpx;
        background-color: rgba(66, 168, 211, 0.1);
        
        .label {
          font-size: 30rpx;
          color: #3a6351;
          font-weight: 600;
          position: relative;
          padding-left: 35rpx;
          
          &::before {
            content: '';
            position: absolute;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
            width: 24rpx;
            height: 24rpx;
            background-color: #42a8d3;
            border-radius: 50%;
          }
        }
        
        .value {
          font-size: 32rpx;
          color: #42a8d3;
          font-weight: 700;
        }
      }
    }
  }

  .target-card {
    margin: 30rpx 0 40rpx;
    padding: 40rpx 30rpx;
    background: linear-gradient(135deg, #1b3a2b 0%, #2d5d44 100%);
    border-radius: 30rpx;
    box-shadow: 0 10rpx 25rpx rgba(27, 58, 43, 0.2);
    position: relative;
    overflow: hidden;
    
    &::before {
      content: '';
      position: absolute;
      top: -30rpx;
      right: -30rpx;
      width: 150rpx;
      height: 150rpx;
      background: rgba(255, 255, 255, 0.05);
      border-radius: 50%;
    }
    
    &::after {
      content: '';
      position: absolute;
      bottom: -40rpx;
      left: -40rpx;
      width: 200rpx;
      height: 200rpx;
      background: rgba(255, 255, 255, 0.03);
      border-radius: 50%;
    }
    
    .target-title {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 30rpx;
      position: relative;
      z-index: 1;
      
      .title-line {
        width: 40rpx;
        height: 2rpx;
        background-color: rgba(255, 255, 255, 0.6);
      }
      
      text {
        color: #ffffff;
        font-size: 36rpx;
        font-weight: bold;
        margin: 0 20rpx;
        letter-spacing: 1px;
      }
    }
    
    .target-subtitle {
      display: block;
      text-align: center;
      color: rgba(255, 255, 255, 0.8);
      font-size: 26rpx;
      margin-bottom: 50rpx;
      position: relative;
      z-index: 1;
    }
    
    .target-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 30rpx;
      position: relative;
      z-index: 1;
      
      .target-item {
        background-color: rgba(255, 255, 255, 0.1);
        border-radius: 20rpx;
        padding: 30rpx;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        transition: transform 0.3s ease, background-color 0.3s ease;
        backdrop-filter: blur(5px);
        
        &:hover {
          transform: translateY(-5rpx);
          background-color: rgba(255, 255, 255, 0.15);
        }
        
        image {
          width: 90rpx;
          height: 90rpx;
          margin-bottom: 25rpx;
          filter: drop-shadow(0 4rpx 6rpx rgba(0, 0, 0, 0.1));
        }
        
        text {
          color: #ffffff;
          font-size: 28rpx;
          text-align: center;
          font-weight: 500;
          line-height: 1.4;
        }
      }
    }
  }

  .guide-footer {
    margin-top: auto;
    padding: 20rpx 0 50rpx;
    
    /deep/ .u-button {
      background: linear-gradient(135deg, #42d392 0%, #3bb077 100%) !important;
      height: 110rpx !important;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 8rpx 15rpx rgba(66, 211, 146, 0.2);
      border-radius: 55rpx !important;
      font-size: 36rpx !important;
      font-weight: 600 !important;
      letter-spacing: 2px;
      
      &::after {
        border: none !important;
      }
    }
  }
}
</style>