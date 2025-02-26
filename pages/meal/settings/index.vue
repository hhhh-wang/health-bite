<template>
    <view class="container">
      <!-- 顶部导航栏 -->
      <u-navbar
        title="设置"
        :border-bottom="false"
        :is-back="true"
      ></u-navbar>
  
      <!-- 当前饮食区域 -->
      <view class="meal-section">
        <view class="section-header">
          <text class="section-title">当前</text>
          <view class="count-badge">3</view>
        </view>
  
        <!-- 当前饮食列表 -->
        <view class="meal-list current">
          <!-- 早餐 -->
          <view class="meal-item">
            <image src="/static/common/img/breakfast.png" class="meal-icon"></image>
            <view class="meal-info">
              <text class="meal-name">早餐</text>
              <text class="meal-cal">631kcal</text>
            </view>
            <u-icon name="more-dot-fill" size="40" color="#999"></u-icon>
          </view>
  
          <!-- 午餐 -->
          <view class="meal-item">
            <image src="/static/common/img/lunch.png" class="meal-icon"></image>
            <view class="meal-info">
              <text class="meal-name">午餐</text>
              <text class="meal-cal">1262kcal</text>
            </view>
            <u-icon name="more-dot-fill" size="40" color="#999"></u-icon>
          </view>
  
          <!-- 晚餐 -->
          <view class="meal-item">
            <image src="/static/common/img/dinner.png" class="meal-icon"></image>
            <view class="meal-info">
              <text class="meal-name">晚餐</text>
              <text class="meal-cal">946kcal</text>
            </view>
            <u-icon name="more-dot-fill" size="40" color="#999"></u-icon>
          </view>
        </view>
      </view>
  
      <!-- 其他选项区域 -->
      <view class="meal-section">
        <view class="section-title">其他可选</view>
        <view class="meal-list other">
          <!-- 早饭后茶点 -->
          <view class="meal-item">
            <image src="/static/common/img/morning-snack.png" class="meal-icon"></image>
            <view class="meal-info">
              <text class="meal-name">早饭后茶点</text>
              <text class="meal-cal">53kcal</text>
            </view>
            <u-icon name="plus" size="40" color="#42d392"></u-icon>
          </view>
  
          <!-- 午餐后水果 -->
          <view class="meal-item">
            <image src="/static/common/img/afternoon-fruit.png" class="meal-icon"></image>
            <view class="meal-info">
              <text class="meal-name">午餐后水果</text>
              <text class="meal-cal">96kcal</text>
            </view>
            <u-icon name="plus" size="40" color="#42d392"></u-icon>
          </view>
  
          <!-- 运动前补给 -->
          <view class="meal-item">
            <image src="/static/common/img/pre-workout.png" class="meal-icon"></image>
            <view class="meal-info">
              <text class="meal-name">运动前补给</text>
              <text class="meal-cal">46kcal</text>
            </view>
            <u-icon name="plus" size="40" color="#42d392"></u-icon>
          </view>
        </view>
      </view>
    </view>
  </template>
  
  <script>
  export default {
    data() {
      return {
        currentMeals: [
          { name: '早餐', calories: 631, icon: '/static/common/img/breakfast.png' },
          { name: '午餐', calories: 1262, icon: '/static/common/img/lunch.png' },
          { name: '晚餐', calories: 946, icon: '/static/common/img/dinner.png' }
        ],
        otherMeals: [
          { name: '早饭后茶点', calories: 53, icon: '/static/common/img/morning-snack.png' },
          { name: '午餐后水果', calories: 96, icon: '/static/common/img/afternoon-fruit.png' },
          { name: '运动前补给', calories: 46, icon: '/static/common/img/pre-workout.png' }
        ]
      }
    },
    methods: {
      // 添加新的饮食项目
      addMeal(meal) {
        // TODO: 实现添加逻辑
      },
      
      // 移除现有饮食项目
      removeMeal(meal) {
        // TODO: 实现移除逻辑
      }
    }
  }
  </script>
  
  <style lang="scss">
  .container {
    padding: 30rpx;
    min-height: 100vh;
    background: #f8f8f8;
  }
  
  .meal-section {
    margin-bottom: 50rpx;
    
    .section-header {
      display: flex;
      align-items: center;
      margin-bottom: 30rpx;
      
      .section-title {
        font-size: 32rpx;
        font-weight: bold;
        color: #333;
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
      font-weight: bold;
      color: #333;
      margin-bottom: 30rpx;
    }
  }
  
  .meal-list {
    border-radius: 30rpx;
    background: #fff;
    padding: 20rpx;
    
    &.current {
      background: rgb(235, 246, 214);
    }
    
    .meal-item {
      display: flex;
      align-items: center;
      padding: 30rpx;
      margin-bottom: 20rpx;
      
      &:last-child {
        margin-bottom: 0;
      }
      
      .meal-icon {
        width: 80rpx;
        height: 80rpx;
        margin-right: 30rpx;
      }
      
      .meal-info {
        flex: 1;
        
        .meal-name {
          font-size: 32rpx;
          color: #333;
          font-weight: bold;
          margin-bottom: 10rpx;
        }
        
        .meal-cal {
          font-size: 28rpx;
          color: #999;
        }
      }
    }
  }
  </style>