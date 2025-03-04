<template>
  <view class="container">
    <!-- 顶部导航 -->
    <page-header 
      :show-back="true"
      :show-skip="false"
      back-redirect-url="/pages/userSetup/height"
      :back-is-tab="false"
      skip-redirect-url="/pages/sys/home/index"          
      :skip-is-tab="true"
    />
    
    <!-- 进度指示器 -->
    <view class="progress-indicator">
      <text>6 / 8</text>
    </view>
    
    <!-- 标题区域 -->
    <view class="title-section">
      <text class="main-title">选择您的<text class="highlight">体重</text></text>
      <text class="sub-title">我们将使用这些数据为您提供更好的饮食类型</text>
    </view>

    <!-- 体重显示和选择区域 -->
    <view class="weight-section">
      <!-- 大号数字显示 -->
      <view class="weight-display">
        <text class="number">{{ weight.toFixed(1) }}</text>
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
        next-url="/pages/userSetup/nextPage"
        :need-validate="true"
        validate-msg="请选择您的体重"
        @validate="validateForm"
        @success="handleSuccess"
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
      weight: 60,
      weightIndex: [300], // 默认60kg的索引位置
      minWeight: 30,
      maxWeight: 200,
      currentProgress: 75,
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
      this.weight = this.weightRange[index]
      this.weightIndex = [index]
    },

    validateForm() {
      if (!this.weight || this.weight < this.minWeight || this.weight > this.maxWeight) {
        this.$u.toast('请选择有效的体重')
        return false
      }
      return true
    },

    handleSuccess() {
      console.log('体重数据:', this.weight)
    }
  },

  mounted() {
    // 初始化选中值的索引
    const initialIndex = this.weightRange.indexOf(this.weight)
    this.weightIndex = [initialIndex]
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
      border-radius: 20rpx;
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
    padding: 40rpx;
    background: #fff;
  }
}
</style> 