<template>
  <view class="food-card" :style="{ top: top + 'rpx' }">
    <view class="card-content">
      <view class="left">
        <text class="food-name">{{ food.name }}</text>
        <text class="portion">{{ food.portion }}份</text>
      </view>
      <view class="right">
        <text class="calories">{{ food.calories }} kcal</text>
        <view class="nutrients">
          <text class="nutrient">{{ food.protein }}g</text>
          <text class="nutrient">{{ food.fat }}g</text>
          <text class="nutrient">{{ food.carbs }}g</text>
        </view>
      </view>
      <view class="add-btn">
        <text class="add-icon">+</text>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    food: {
      type: Object,
      default: () => ({})
    },
    top: {
      type: Number,
      default: 100
    }
  }
}
</script>

<style>
.food-card {
  position: absolute;
  left: 30rpx;
  right: 30rpx;
  z-index: 100;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 20rpx;
  padding: 20rpx;
}

.card-content {
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.left {
  flex: 1;
}

.food-name {
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
}

.portion {
  font-size: 24rpx;
  color: #666;
  margin-top: 4rpx;
}

.right {
  align-items: flex-end;
}

.calories {
  font-size: 28rpx;
  color: #42d392;
  font-weight: bold;
}

.nutrients {
  flex-direction: row;
  margin-top: 4rpx;
}

.nutrient {
  font-size: 24rpx;
  color: #666;
  margin-left: 16rpx;
}

.add-btn {
  width: 60rpx;
  height: 60rpx;
  border-radius: 30rpx;
  background-color: #42d392;
  align-items: center;
  justify-content: center;
  margin-left: 20rpx;
}

.add-icon {
  color: #fff;
  font-size: 40rpx;
  font-weight: bold;
}
</style> 