<template>
  <view class="container">
    <!-- 顶部导航 -->
    <page-header 
      :show-back="true"
      :show-skip="false"
      back-redirect-url="/pages/userSetup/weight"
      :back-is-tab="false"
      skip-redirect-url="/pages/sys/home/index"          
      :skip-is-tab="true"
    />
    
    <!-- 进度指示器 -->
    <view class="progress-indicator">
      <text>7 / 8</text>
    </view>
    
    <!-- 标题区域 -->
    <view class="title-section">
      <text class="main-title">选择您的<text class="highlight">目标体重</text></text>
      <text class="sub-title">我们将使用这些数据为您提供更好的饮食类型</text>
    </view>

    <!-- 当前体重显示 -->
    <view class="current-weight">
      <text class="label">当前体重</text>
      <view class="weight-value">
        <text class="number">{{ currentWeight }}</text>
        <text class="unit">kg</text>
      </view>
    </view>

    <!-- 目标体重选择器 -->
    <view class="weight-section">
      <!-- 大号数字显示 -->
      <view class="weight-display">
        <text class="number">{{ targetWeight.toFixed(1) }}</text>
        <text class="unit">kg</text>
      </view>

      <!-- 体重选择器 -->
      <view class="weight-picker">
        <picker-view
          :value="weightIndex"
          @change="onWeightChange"
          :indicator-style="indicatorStyle"
          :mask-style="maskStyle"
        >
          <picker-view-column>
            <view class="column-item" v-for="item in weightRange" :key="item">
              {{ item.toFixed(1) }}kg
            </view>
          </picker-view-column>
        </picker-view>
      </view>
    </view>

    <!-- 底部区域 -->
    <view class="guide-footer">
      <progress-button
        ref="progressBtn"
        :percent="currentProgress"
        next-url="/pages/userSetup/progress"
        :need-validate="true"
        validate-msg="请选择您的目标体重"
        @validate="validateForm"
      >
      </progress-button>
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
      currentWeight: 60, // 从上一页传递过来的当前体重
      targetWeight: 55, // 默认目标体重
      weightIndex: [250], // 默认55kg的索引位置
      minWeight: 30,
      maxWeight: 200,
      currentProgress: 87.5,
      currentPage: 7,
      totalPages: 8,
      // 选中框的样式
      indicatorStyle: 'height: 100rpx; border-top: 1rpx solid #eee; border-bottom: 1rpx solid #eee;',
      // 蒙层的样式
      maskStyle: 'background-image: linear-gradient(180deg, rgba(255,255,255,0.95), rgba(255,255,255,0.6));',
    }
  },

  computed: {
    weightRange() {
      const range = []
      // 生成0.1kg间隔的体重范围
      for (let i = this.minWeight * 10; i <= this.maxWeight * 10; i++) {
        range.push(i / 10)
      }
      return range
    }
  },

  methods: {
    onWeightChange(e) {
      const index = e.detail.value[0]
      this.targetWeight = this.weightRange[index]
      this.weightIndex = [index]
    },

    validateForm() {
      if (!this.targetWeight || this.targetWeight < this.minWeight || this.targetWeight > this.maxWeight) {
        this.$u.toast('请选择有效的目标体重')
        return false
      }
      // 直接跳转
      uni.navigateTo({
        url: `/pages/userSetup/progress?currentWeight=${this.currentWeight}&targetWeight=${this.targetWeight}`
      })
    }
  },

  onLoad(options) {
    // 获取从上一页传递过来的当前体重
    if (options.currentWeight) {
      this.currentWeight = parseFloat(options.currentWeight)
      // 设置默认目标体重为当前体重
      this.targetWeight = this.currentWeight
      const initialIndex = this.weightRange.indexOf(this.targetWeight)
      this.weightIndex = [initialIndex]
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
      color: #333;
      
      .highlight {
        color: #4cd964;
      }
    }
    
    .sub-title {
      font-size: 32rpx;
      color: #666;
      text-align: center;
      display: block;
    }
  }

  .current-weight {
    margin: 40rpx auto;
    padding: 30rpx 40rpx;
    background: rgba(66, 211, 146, 0.08);  // 柔和的绿色背景
    border-radius: 50rpx;
    width: 90%;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: 0 8rpx 24rpx rgba(66, 211, 146, 0.1);  // 柔和的阴影
    position: relative;
    overflow: hidden;
    
    &::before {  // 装饰性背景图案
      content: '';
      position: absolute;
      right: -20rpx;
      top: -20rpx;
      width: 120rpx;
      height: 120rpx;
      background: rgba(66, 211, 146, 0.06);
      border-radius: 50%;
    }
    
    .label {
      font-size: 28rpx;
      color: #666;
      margin-bottom: 16rpx;
      position: relative;
      z-index: 1;
      
      &::after {  // 下划线装饰
        content: '';
        position: absolute;
        bottom: -6rpx;
        left: 50%;
        transform: translateX(-50%);
        width: 40rpx;
        height: 3rpx;
        background: rgba(66, 211, 146, 0.3);
        border-radius: 4rpx;
      }
    }
    
    .weight-value {
      display: flex;
      align-items: baseline;
      position: relative;
      z-index: 1;
      
      .number {
        font-size: 64rpx;
        font-weight: bold;
        background: linear-gradient(45deg, #42d392, #47c98e);
        -webkit-background-clip: text;
        color: transparent;
        line-height: 1;
      }
      
      .unit {
        font-size: 28rpx;
        color: #666;
        margin-left: 8rpx;
        opacity: 0.9;
      }
    }
  }

  .weight-section {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 40rpx auto;
    padding: 0 20rpx;
    
    .weight-display {
      flex: 0 0 auto;
      display: flex;
      align-items: flex-end;
      padding: 40rpx;
      background: rgba(66, 211, 146, 0.1);
      border-radius: 50rpx;
      margin-right: 40rpx;
      
      .number {
        font-size: 120rpx;
        font-weight: bold;
        color: #333;
        line-height: 1;
      }
      
      .unit {
        font-size: 32rpx;
        color: #666;
        margin-left: 10rpx;
        margin-bottom: 20rpx;
      }
    }
    
    .weight-picker {
      flex: 1;
      width: 200rpx;
      
      picker-view {
        width: 100%;
        height: 500rpx;
        text-align: center;
      }

      .column-item {
        line-height: 100rpx;
        text-align: center;
        font-size: 36rpx;
        color: #333;
      }
    }
  }

  .guide-footer {
    margin-top: auto;
    padding-bottom: 40rpx;
  }
}
</style> 