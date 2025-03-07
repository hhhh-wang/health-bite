<template>
  <view class="food-card" :style="{ top: top + 'rpx' }">
    <view class="card-content">
      <view class="left">
        <text class="food-name">{{ food.name }}</text>
        <text class="portion">{{ food.portion }}份</text>
      </view>
      <view class="right">
        <text class="calories">{{ getCalories.value }} {{ getCalories.unit }}</text>
        <view class="nutrients">
          <text v-for="item in getNutrients" 
                :key="item.key" 
                class="nutrient">
            {{ item.label }} {{ item.value }}{{ item.unit }}
          </text>
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
  },
  computed: {
    // 获取热量信息
    getCalories() {
      return this.food.nutrients?.find(item => item.key === 'calories') || { value: 0, unit: '千卡' };
    },
    // 获取其他营养成分（除热量外）
    getNutrients() {
      return this.food.nutrients?.filter(item => item.key !== 'calories') || [];
    }
  }
}
</script>

<style>
.food-card {
  position: absolute;
  left: 30rpx;
  right: 30rpx;
  z-index: 500;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 50rpx;
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