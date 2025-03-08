<template>
  <view class="food-card" :style="{ top: top + 'rpx' }">
    <view class="card-content">
      <view class="left">
        <text class="food-name">{{ food.name }}</text>
        <text class="portion">{{ food.portion }}</text>
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
      <view class="add-btn" @click="handleAddFood">
        <text class="add-icon">+</text>
      </view>
    </view>
  </view>
</template>

<script>
import { navigateBack } from '@/common/utils/navigate'

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
  
  methods: {
    handleAddFood() {
      // 构造食物数据
      const foodData = {
        name: this.food.name,
        portion: this.food.portion,
        calories: this.getCalories.value,
        carbs: this.getNutrients.find(n => n.key === 'carbs')?.value || 0,
        fat: this.getNutrients.find(n => n.key === 'fat')?.value || 0,
        protein: this.getNutrients.find(n => n.key === 'protein')?.value || 0
      }
      
      // 添加到 store
      this.$store.dispatch('meal/addFood', foodData)
      
      // 显示提示
      uni.showToast({
        title: '添加成功',
        icon: 'success'
      })
      
      // 使用通用导航方法返回
      navigateBack({
        redirectUrl: '/pages/meal/detail/index',
        isTab: false,
        delta: 1
      })
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
  border-radius: 20rpx;
  padding: 20rpx;
  margin: 50rpx 0;
}

.card-content {
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.left {
  flex: 1;
  margin-left: 30rpx; 
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
  margin-bottom: 20rpx;
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
  width: 80rpx;
  height: 80rpx;
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