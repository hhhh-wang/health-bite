<template>
  <view class="meal-card" :style="{ borderLeftColor: color }">
    <view class="card-content">
      <view class="card-main">
        <text class="card-value">{{ calories }}</text>
        <text class="card-percentage" :style="{ color }">{{ percentage }}%</text>
      </view>
      <text class="card-name">{{ name }}</text>
    </view>
  </view>
</template>

<script>
export default {
  name: 'MealCard',
  props: {
    // 卡路里值
    calories: {
      type: [Number, String],
      required: true
    },
    // 餐食名称
    name: {
      type: String,
      required: true
    },
    // 百分比
    percentage: {
      type: [Number, String],
      required: true
    },
    // 颜色
    color: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.meal-card {
  width: 100%;
  background-color: #ffffff;
  border-radius: 50rpx;
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.04);
  border-left: 8rpx solid;
  overflow: hidden;
  
  .card-content {
    padding: 24rpx 28rpx;
    
    .card-main {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 4rpx;
      
      .card-value {
        font-size: 42rpx;
        font-weight: 600;
        color: #333333;
        line-height: 1.2;
      }
      
      .card-percentage {
        font-size: 34rpx;
        font-weight: 600;
        line-height: 1.2;
      }
    }
    
    .card-name {
      font-size: 28rpx;
      color: #666666;
      font-weight: 400;
    }
  }
}
</style> 