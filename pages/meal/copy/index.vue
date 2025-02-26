<template>
  <view class="container">
    <!-- 日期选择器 -->
    <view class="date-selector">
      <scroll-view 
        class="date-list" 
        scroll-x 
        :scroll-left="scrollLeft"
        scroll-with-animation
        @scroll="onScroll"
      >
        <view class="date-wrapper">
          <view 
            v-for="(date, index) in dates" 
            :key="index"
            :id="'date-' + index"
            :class="['date-item', { active: selectedIndex === index }]"
            @click="selectDate(index)"
          >
            <text class="day">{{ date.day }}</text>
            <text class="date">{{ date.weekday }}</text>
          </view>
        </view>
      </scroll-view>
    </view>

    <!-- 有食物记录时显示的内容 -->
    <template v-if="hasMeal">
      <!-- 已选食物列表 -->
      <view class="meal-section">
        <view class="section-header">
          <text class="section-title">已选食物</text>
          <view class="count-badge">1</view>
        </view>
        
        <view class="meal-list selected">
          <view class="meal-item">
            <view class="meal-info">
              <text class="meal-name">炸鸡</text>
              <text class="meal-cal">164kcal</text>
            </view>
            <view class="meal-count">1份食物</view>
            <view class="delete-btn" @click="removeMeal(0)">×</view>
          </view>
        </view>
      </view>

      <!-- 全部饮食列表 -->
      <view class="meal-section">
        <view class="section-title">全部饮食</view>
        <view class="meal-list">
          <view class="meal-item">
            <view class="meal-info">
              <text class="meal-name">三文鱼</text>
              <text class="meal-cal">166kcal</text>
            </view>
            <view class="meal-count">2份食物</view>
            <view class="add-btn" @click="addMeal(0)">+</view>
          </view>
        </view>
      </view>

 

    </template>
    
    <!-- 无食物记录时显示的提示 -->
    <view v-else class="no-food-tip">
      <image src="/static/common/img/nofood.png" mode="aspectFit" class="no-food-icon"></image>
      <text class="no-food-text">这一天没有晚餐</text>
    </view>

    <!-- 添加空白区域，防止内容被固定按钮遮挡 -->
    <view class="bottom-space"></view>
    
    <!-- 固定在底部的按钮区域 -->
    <view class="fixed-bottom-btns">
      <!-- 有食物记录时显示选择饮食按钮 -->
      <view v-if="hasMeal" class="select-meal" @click="goToSelectMeal">
        <text>选择饮食</text>
        <u-icon name="arrow-right" color="#42d392"></u-icon>
      </view>
      <!-- 取消按钮 - 始终显示 -->
      <view class="cancel-btn" :class="{'full-width': !hasMeal}" @click="cancel">
        <text>现在取消</text>
        <u-icon name="close" color="#ff0000"></u-icon>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      selectedIndex: 15,
      dates: [],
      scrollLeft: 0,
      itemWidth: 140,
      selectedDate: '',
      hasMeal: false  // 添加控制是否有食物记录的变量
    }
  },
  created() {
    this.generateDates()
  },
  mounted() {
    this.$nextTick(() => {
      // 初始化选中日期
      if (this.dates.length > 0 && this.selectedIndex < this.dates.length) {
        this.selectedDate = this.dates[this.selectedIndex].fullDate
      }
      
      setTimeout(() => {
        this.centerSelectedDate(this.selectedIndex)
      }, 100)
    })
  },
  methods: {
    generateDates() {
      const today = new Date()
      const dates = []
      for (let i = -15; i < 15; i++) {
        const date = new Date(today)
        date.setDate(date.getDate() + i)
        dates.push({
          day: date.getDate(),
          weekday: this.getWeekDay(date),
          fullDate: this.formatDate(date)
        })
      }
      this.dates = dates
    },
    
    getWeekDay(date) {
      const weekdays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
      return weekdays[date.getDay()]
    },
    
    formatDate(date) {
      const year = date.getFullYear()
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const day = String(date.getDate()).padStart(2, '0')
      return `${year}-${month}-${day}`
    },

    selectDate(index) {
      this.selectedIndex = index
      
      // 更新选中的日期
      if (this.dates.length > 0 && index < this.dates.length) {
        this.selectedDate = this.dates[index].fullDate
        
        // 这里可以根据日期检查是否有食物记录
        // 模拟数据，实际应该从服务器获取或本地存储中读取
        this.checkMealData(this.selectedDate)
      }
      
      // 直接调用居中方法，不使用scrollIntoView
      this.centerSelectedDate(index)
    },

    centerSelectedDate(index) {
      try {
        const query = uni.createSelectorQuery().in(this)
        query.select('#date-' + index).boundingClientRect()
        query.select('.date-list').boundingClientRect()
        
        query.exec(res => {
          if (!res[0] || !res[1]) return
          
          const dateItem = res[0]
          const scrollView = res[1]
          
          // 计算使得选中项居中的scrollLeft值
          const centerPosition = dateItem.left - scrollView.left
          const targetScrollLeft = this.scrollLeft + centerPosition - (scrollView.width / 2) + (dateItem.width / 2)
          
          // 确保scrollLeft不小于0
          this.scrollLeft = Math.max(0, targetScrollLeft)
        })
      } catch (e) {
        console.error('计算scrollLeft出错', e)
      }
    },
    
    onScroll(e) {
      // 保存当前滚动位置
      if (e.detail && typeof e.detail.scrollLeft !== 'undefined') {
        this.scrollLeft = e.detail.scrollLeft
      }
    },

    goToSelectMeal() {
      uni.navigateTo({
        url: '/pages/meal/select/index'
      })
    },
    
    cancel() {
      uni.navigateBack()
    },
    
    addMeal(index) {
      // 添加食物逻辑
      console.log('添加食物:', index)
    },
    
    removeMeal(index) {
      // 移除食物逻辑
      console.log('移除食物:', index)
    },

    // 添加检查食物记录方法
    checkMealData(date) {
      // 这里应该是实际检查数据的逻辑
      // 示例：偶数日期有食物，奇数日期没有食物
      const day = parseInt(date.split('-')[2])
      this.hasMeal = day % 2 === 0
    }
  }
}
</script>

<style lang="scss">
.container {
  padding: 30rpx;
  padding-bottom: 150rpx; /* 为固定按钮留出空间 */
  font-family: "Microsoft YaHei", sans-serif;
  min-height: 100vh; /* 确保容器至少占满整个视口高度 */
}

.date-selector {
  margin-bottom: 40rpx;
  
  .date-list {
    width: 100%;
    
    .date-wrapper {
      display: flex;
      padding: 0 40%;
      
      .date-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        width: 100rpx;
        height: 120rpx;
        margin: 0 20rpx;
        border-radius: 20rpx;
        background: #f5f5f5;
        
        &.active {
          background: #e8f5e9;
          transform: scale(1.1);
          transition: all 0.3s;
          .day, .date {
            color: #42d392;
          }
        }
        
        .day {
          font-size: 32rpx;
          font-weight: bold;
          color: #333;
        }
        
        .date {
          font-size: 24rpx;
          color: #999;
          margin-top: 8rpx;
        }
      }
    }
  }
}

.meal-section {
  margin-bottom: 50rpx;
  
  // 标题样式
  .section-header, .section-title {
    margin-bottom: 50rpx;
    font-weight: bold;
  }
  
  .section-header {
    display: flex;
    align-items: center;
    
    .section-title {
      font-size: 32rpx;
      color: #333;
      margin-bottom: 0;
    }
    
    .count-badge {
      margin-left: 20rpx;
      padding: 4rpx 16rpx;
      background: #42d392;
      color: #fff;
      border-radius: 20rpx;
      font-size: 24rpx;
    }
  }
  
  .section-title {
    font-size: 32rpx;
    color: #333;
  }
  
  // 列表通用样式
  .meal-list {
    border-radius: 50rpx;
    padding: 20rpx;
    font-weight: bold;
   
    
    // 已选食物列表特殊样式
    &.selected {
      background: rgb(235, 246, 214);
    }
    
    // 全部饮食列表特殊样式（默认样式）
    background: rgb(246, 247, 247);

    // 食物项通用样式
    .meal-item {
      display: flex;
      align-items: center;
      padding: 40rpx 30rpx;
      margin-bottom: 20rpx;
      
      // 根据父容器设置背景色
      .selected & {
        background: rgb(235, 246, 214);
      }

      &:last-child {
        margin-bottom: 0;
      }
      
      .meal-info {
        flex: 1;
        display: flex;
        flex-direction: column;
        
        .meal-name {
          font-size: 35rpx;
          color: #333;
          margin-bottom: 15rpx;
        }
        
        .meal-cal {
          font-size: 30rpx;
          color: #999;
        }
      }
      
      .meal-count {
        font-size: 30rpx;
        color: #666;
        margin: 0 20rpx;
      }
      
      .delete-btn, .add-btn {
        font-size: 32rpx;
      }
      
      .delete-btn {
        color: #ff0000;
      }
      
      .add-btn {
        color: #42d392;
      }
    }
  }
}

.select-meal, .cancel-btn {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 30rpx;
  background: #fff;
  border-radius: 20rpx;
  margin-bottom: 30rpx;
  
  text {
    font-size: 30rpx;
    font-weight: bold;
  }
}

.select-meal {
  text {
    color: #333;
  }
  
  .u-icon {
    color: #42d392 !important;
  }
}

.cancel-btn {
  text {
    color: #ff0000;
  }
}

.no-food-tip {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 120rpx 0;
  margin: 100rpx 0;
  
  .no-food-icon {
    width: 160rpx;
    height: 160rpx;
    margin-bottom: 40rpx;
  }
  
  .no-food-text {
    font-size: 34rpx;
    color: #666;
  }
}

.bottom-space {
  height: 120rpx; /* 额外空白区域，防止内容被固定按钮遮挡 */
}

.fixed-bottom-btns {
  position: fixed;
  bottom: 30rpx;
  left: 30rpx;
  right: 30rpx;
  z-index: 100;
  display: flex;
  justify-content: space-between;
  gap: 20rpx;
  
  .select-meal, .cancel-btn {
    flex: 1;
    box-shadow: 0 0 20rpx rgba(0,0,0,0.1);
    margin-bottom: 0;
    border-radius: 20rpx;
  }
  
  .full-width {
    width: 100%;
  }
}
</style> 