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
      <view class="weight-container">
        <!-- 左侧大号数字显示 -->
        <view class="weight-display">
          <text class="number">{{ weight.toFixed(1) }}</text>
          <text class="unit">kg</text>
        </view>

        <!-- 右侧体重选择器 -->
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
    </view>

    <!-- 底部区域 -->
    <view class="guide-footer">
      <progress-button
        ref="progressBtn"
        :percent="currentProgress" 
        next-url="/pages/userSetup/targetWeight"
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
      weight: 60.0,
      weightIndex: [0],
      // 在 data 中直接初始化 weightRange
      weightRange: Array.from({ length: 1701 }, (_, i) => (i + 300) / 10), // 30.0kg 到 200.0kg
      minWeight: 30,
      maxWeight: 200,
      currentProgress: 75,
      currentPage: 6,
      totalPages: 8,
      // 选中框的样式
      indicatorStyle: 'height: 100rpx; background-color: rgba(76, 217, 100, 0.1);',
      // 蒙层的样式
      maskStyle: 'background-image: linear-gradient(180deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.4)), linear-gradient(0deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.4));'
    }
  },

  created() {
    // 只设置默认选中值
    this.weightIndex = [Math.round((this.weight - 30) * 10)]
  },

  methods: {
    onWeightChange(e) {
      const index = e.detail.value[0]
      this.weight = this.weightRange[index]
    },

    validateForm() {
      if (!this.weight || this.weight < this.minWeight || this.weight > this.maxWeight) {
        this.$u.toast('请选择有效的体重')
        return false
      }
      // 验证通过，手动触发组件的跳转方法
      this.$refs.progressBtn.navigateToNext()
      return true
    },

    handleSuccess() {
      console.log('handleSuccess triggered')
      // 跳转到目标体重页面，并携带当前体重数据
      uni.navigateTo({
        url: `/pages/userSetup/targetWeight?currentWeight=${this.weight}`
      })
      // 更新进度
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
    text-align: center;  // 进度指示器居中
    
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
    text-align: center;  // 标题区域居中
    
    .main-title {
      font-size: 48rpx;
      font-weight: bold;
      display: block;
      margin-bottom: 20rpx;
      text-align: center;  // 主标题居中
      color: #333;
      
      .highlight {
        color: #4cd964;
      }
    }
    
    .sub-title {
      font-size: 32rpx;
      color: #666;
      text-align: center;  // 副标题居中
      display: block;  // 确保块级显示以实现居中
    }
  }

  .weight-section {
    margin: 60rpx 0;
    padding: 0 20rpx;
    
    .weight-container {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 40rpx;
      
      .weight-display {
        flex: 1;
        display: flex;
        align-items: center;
        padding-left: 40rpx;
        
        .number {
          font-size: 80rpx;
          font-weight: bold;
          color: #333;
        }
        
        .unit {
          font-size: 32rpx;
          color: #666;
          margin-left: 10rpx;
          padding-bottom: 10rpx;
        }
      }

      .weight-picker {
        flex: 1;
        height: 400rpx;
        
        picker-view {
          width: 100%;
          height: 100%;
          
          .column-item {
            line-height: 100rpx;
            text-align: center;
            color: #333;
            font-size: 36rpx;
          }
        }
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