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

    <!-- 已选食物列表 -->
    <view class="meal-section">
      <view class="section-title">已选食物</view>
      <view class="meal-list">
        <view class="meal-item">
          <view class="meal-info">
            <text class="meal-name">炸鸡</text>
            <text class="meal-cal">164kcal</text>
          </view>
          <text class="meal-count">1份食物</text>
          <u-icon name="close" color="#ff0000" @click="removeMeal(0)"></u-icon>
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
          <text class="meal-count">2份食物</text>
          <u-icon name="plus" color="#42d392" @click="addMeal(0)"></u-icon>
        </view>
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
      selectedDate: ''
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

    addMeal(index) {
      // 添加食物逻辑
    },

    removeMeal(index) {
      // 移除食物逻辑
    }
  }
}
</script>

<style lang="scss">
.container {
  padding: 30rpx;
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
  margin-bottom: 30rpx;
  
  .section-title {
    font-size: 32rpx;
    font-weight: bold;
    color: #333;
    margin-bottom: 20rpx;
  }
  
  .meal-list {
    background: #fff;
    border-radius: 20rpx;
    
    .meal-item {
      display: flex;
      align-items: center;
      padding: 30rpx;
      border-bottom: 1rpx solid #f5f5f5;
      
      &:last-child {
        border-bottom: none;
      }
      
      .meal-info {
        flex: 1;
        
        .meal-name {
          font-size: 28rpx;
          color: #333;
          margin-bottom: 8rpx;
        }
        
        .meal-cal {
          font-size: 24rpx;
          color: #999;
        }
      }
      
      .meal-count {
        font-size: 24rpx;
        color: #666;
        margin: 0 20rpx;
      }
    }
  }
}
</style> 