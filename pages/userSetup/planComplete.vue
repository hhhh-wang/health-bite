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
      // 简化图表数据，只保留一条线
      meals: ['今天', '结束日期'],  // 时间轴数据
      nutritionData: [
        [60, 72]    // 只保留一条主线：当前体重到目标体重
      ],
      yAxisConfig: {
        min: 55,     // 根据体重范围自动计算
        max: 75      // 根据体重范围自动计算
      }
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
    },
    
    chartConfig() {
      // 计算图表的最小值和最大值
      const minWeight = Math.min(this.currentWeight, this.targetWeight)
      const maxWeight = Math.max(this.currentWeight, this.targetWeight)
      const range = maxWeight - minWeight
      
      return {
        min: Math.floor(minWeight - range * 0.1),  // 留出10%的边距
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
    },

    initChartData() {
      // 更新图表数据，只保留一条线
      this.meals = ['今天', this.endDate]
      this.nutritionData = [
        [this.currentWeight, this.targetWeight]  // 只保留主要数据线
      ]
      // 更新Y轴配置
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
  },

  watch: {
    // 监听相关数据变化，更新图表
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
  background: linear-gradient(to bottom, #f8fffa, #ffffff);
  padding: 0 40rpx;
  box-sizing: border-box;
  
  .title-section {
    margin: 50rpx 0;
    text-align: center;  // 标题区域居中
    display: flex;
    flex-direction: column;
    gap: 20rpx;  // 设置段落之间的间距
    
    .main-title {
      font-size: 48rpx;
      font-weight: bold;
      display: block;
      text-align: center;  // 主标题居中
      color: #333;
      margin-bottom: 30rpx;  // 主标题与副标题之间的间距
    }
    
    .sub-title {
      font-size: 32rpx;
      color: #666;
      text-align: center;  // 副标题居中
      display: block;  // 确保块级显示以实现居中
      line-height: 1.5;  // 增加行高，提高可读性
      
      &:last-child {
        margin-top: 10rpx;  // 最后一段副标题增加额外的上边距
      }
    }
  }

  .plan-card {
    margin: 20rpx;
    padding: 30rpx;
    background-color: #ffffff;
    border-radius: 50rpx;
    box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.05);
    
    .calorie-total {
      text-align: center;
      margin-bottom: 15rpx;
      
      .number {
        font-size: 48rpx;
        font-weight: bold;
        color: #333;
      }
      
      .unit {
        font-size: 28rpx;
        color: #666;
        margin-left: 10rpx;
      }
    }
    
    .date-info {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 20rpx;
      color: #666;
      font-size: 28rpx;
      margin-bottom: 20rpx;
      
      .exercise-count {
        color: #42d392;
      }
    }
  }

  .guide-footer {
    margin-top: auto;
    padding-bottom: 40rpx;
  }
}
</style> 