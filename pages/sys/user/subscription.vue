<template>
  <view class="subscription-container">
    <!-- 顶部标题区域 -->
    <view class="header">
      <image class="crown-icon" src="/static/images/crown.png"></image>
      <view class="title">升级计划以</view>
      <view class="subtitle">充分利用健康饮食</view>
      <view class="stats">99%用户建议您升级计划!</view>
    </view>

    <!-- 订阅计划卡片 -->
    <view class="plan-cards">
      <!-- 初学者计划 -->
      <view class="plan-card beginner" @click="selectPlan('beginner')">
        <view class="plan-content">
          <view class="plan-title">初学者适用</view>
          <view class="plan-price">
            <text class="currency">¥</text>
            <text class="amount">39</text>
            <text class="period">/月</text>
          </view>
          <view class="plan-desc">适用于初学者</view>
        </view>
        <image class="plan-image" src="/static/images/beginner.png"></image>
      </view>

      <!-- 专业版计划 -->
      <view class="plan-card professional" @click="selectPlan('professional')">
        <view class="plan-content">
          <view class="plan-title">专业者适用</view>
          <view class="plan-price">
            <text class="currency">¥</text>
            <text class="amount">199</text>
            <text class="period">/年</text>
          </view>
          <view class="plan-desc">适用于专业者</view>
        </view>
        <image class="plan-image" src="/static/images/professional.png"></image>
      </view>
    </view>

    <!-- 确认升级按钮 -->
    <view class="confirm-button" @click="handleUpgrade">
      确定升级
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      selectedPlan: ''
    }
  },
  methods: {
    selectPlan(plan) {
      this.selectedPlan = plan;
    },
    handleUpgrade() {
      if (!this.selectedPlan) {
        this.$u.toast('请选择订阅计划');
        return;
      }
      // 这里添加订阅逻辑
      uni.showModal({
        title: '确认订阅',
        content: '是否确认订阅该计划？',
        success: (res) => {
          if (res.confirm) {
            // 调用订阅API
            this.$u.toast('订阅成功');
          }
        }
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.subscription-container {
  min-height: 100vh;
  padding: 40rpx;
  background-color: #ffffff;
}

.header {
  text-align: center;
  margin-bottom: 60rpx;
  
  .crown-icon {
    width: 80rpx;
    height: 80rpx;
    margin-bottom: 20rpx;
  }
  
  .title {
    font-size: 40rpx;
    font-weight: bold;
    color: #333;
  }
  
  .subtitle {
    font-size: 36rpx;
    color: #333;
    margin-top: 10rpx;
  }
  
  .stats {
    font-size: 28rpx;
    color: #666;
    margin-top: 20rpx;
  }
}

.plan-cards {
  .plan-card {
    margin-bottom: 30rpx;
    padding: 40rpx;
    border-radius: 20rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    &.beginner {
      background-color: #FFF5E6;
    }
    
    &.professional {
      background-color: #F5F5F5;
    }
    
    .plan-content {
      .plan-title {
        font-size: 32rpx;
        font-weight: bold;
        margin-bottom: 20rpx;
      }
      
      .plan-price {
        .currency {
          font-size: 28rpx;
          color: #333;
        }
        
        .amount {
          font-size: 48rpx;
          font-weight: bold;
          color: #333;
        }
        
        .period {
          font-size: 24rpx;
          color: #666;
        }
      }
      
      .plan-desc {
        font-size: 24rpx;
        color: #666;
        margin-top: 10rpx;
      }
    }
    
    .plan-image {
      width: 120rpx;
      height: 120rpx;
    }
  }
}

.confirm-button {
  position: fixed;
  bottom: 40rpx;
  left: 40rpx;
  right: 40rpx;
  height: 90rpx;
  line-height: 90rpx;
  text-align: center;
  background-color: #42d392;
  color: #ffffff;
  border-radius: 45rpx;
  font-size: 32rpx;
  font-weight: bold;
}
</style> 