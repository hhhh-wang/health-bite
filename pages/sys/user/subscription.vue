<template>
  <view class="subscription-container">
    <!-- 返回按钮 -->
    <view class="back-button" @click="goBack">
      <u-icon name="arrow-left" color="#333" size="34"></u-icon>
    </view>
    
    <!-- 顶部标题区域 -->
    <view class="header">
      <image class="header-image" src="/static/images/premium_food.png" mode="aspectFit"></image>
      <view class="title">升级计划</view>
      <view class="subtitle">充分利用健康饮食</view>
      <view class="benefits">
        <view class="benefit-item">
          <u-icon name="checkmark-circle" color="#42d392" size="28"></u-icon>
          <text>个性化饮食计划</text>
        </view>
        <view class="benefit-item">
          <u-icon name="checkmark-circle" color="#42d392" size="28"></u-icon>
          <text>专业营养师指导</text>
        </view>
        <view class="benefit-item">
          <u-icon name="checkmark-circle" color="#42d392" size="28"></u-icon>
          <text>无限食谱解锁</text>
        </view>
      </view>
      <view class="stats">99%用户建议您升级计划!</view>
    </view>

    <!-- 订阅计划卡片 -->
    <view class="plan-cards">
      <!-- 初学者计划 -->
      <view class="plan-card" :class="{ 'selected': selectedPlan === 'beginner' }" @click="selectPlan('beginner')">
        <view class="plan-content">
          <view class="plan-header">
            <view class="plan-title">初学者计划</view>
            <view class="plan-badge">推荐</view>
          </view>
          <view class="plan-price">
            <text class="currency">¥</text>
            <text class="amount">39</text>
            <text class="period">/月</text>
          </view>
          <view class="plan-features">
            <view class="feature">
              <u-icon name="checkmark" color="#42d392" size="24"></u-icon>
              <text>基础营养分析</text>
            </view>
            <view class="feature">
              <u-icon name="checkmark" color="#42d392" size="24"></u-icon>
              <text>个性化饮食建议</text>
            </view>
            <view class="feature">
              <u-icon name="checkmark" color="#42d392" size="24"></u-icon>
              <text>每周更新健康食谱</text>
            </view>
          </view>
          <view class="plan-footer">适合刚开始健康饮食的你</view>
        </view>
      </view>

      <!-- 专业版计划 -->
      <view class="plan-card" :class="{ 'selected': selectedPlan === 'professional' }" @click="selectPlan('professional')">
        <view class="plan-content">
          <view class="plan-header">
            <view class="plan-title">专业版计划</view>
            <view class="plan-badge premium">超值</view>
          </view>
          <view class="plan-price">
            <text class="currency">¥</text>
            <text class="amount">199</text>
            <text class="period">/年</text>
            <text class="discount">相当于¥16.6/月</text>
          </view>
          <view class="plan-features">
            <view class="feature">
              <u-icon name="checkmark" color="#42d392" size="24"></u-icon>
              <text>高级营养分析与追踪</text>
            </view>
            <view class="feature">
              <u-icon name="checkmark" color="#42d392" size="24"></u-icon>
              <text>专业营养师在线咨询</text>
            </view>
            <view class="feature">
              <u-icon name="checkmark" color="#42d392" size="24"></u-icon>
              <text>完整食谱库与自定义功能</text>
            </view>
            <view class="feature">
              <u-icon name="checkmark" color="#42d392" size="24"></u-icon>
              <text>季度健康饮食评估报告</text>
            </view>
          </view>
          <view class="plan-footer">适合追求更全面健康生活的你</view>
        </view>
      </view>
    </view>

    <!-- 用户反馈 -->
    <view class="testimonial">
      <image class="quote-icon" src="/static/images/quote.png"></image>
      <text class="testimonial-text">"升级后，我的饮食习惯完全改变，精力充沛，身体状况明显改善！"</text>
      <view class="user-info">
        <text class="user-name">- 李女士, 会员24个月</text>
      </view>
    </view>

    <!-- 确认升级按钮 -->
    <view class="confirm-button" :class="{'active': selectedPlan}" @click="handleUpgrade">
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
    goBack() {
      uni.navigateBack();
    },
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
  padding: 30rpx;
  background-color: #ffffff;
  position: relative;
}

.back-button {
  position: absolute;
  top: 40rpx;
  left: 30rpx;
  z-index: 10;
  width: 70rpx;
  height: 70rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 50%;
}

.header {
  text-align: center;
  margin-bottom: 40rpx;
  padding-top: 20rpx;
  
  .header-image {
    width: 240rpx;
    height: 200rpx;
    margin-bottom: 20rpx;
  }
  
  .title {
    font-size: 44rpx;
    font-weight: bold;
    color: #333;
    margin-bottom: 8rpx;
  }
  
  .subtitle {
    font-size: 32rpx;
    color: #666;
    margin-bottom: 30rpx;
  }
  
  .benefits {
    margin: 0 auto 20rpx;
    width: 80%;
    
    .benefit-item {
      display: flex;
      align-items: center;
      margin-bottom: 12rpx;
      
      text {
        margin-left: 12rpx;
        font-size: 28rpx;
        color: #444;
      }
    }
  }
  
  .stats {
    font-size: 28rpx;
    color: #ff6b6b;
    font-weight: 500;
    margin-top: 10rpx;
  }
}

.plan-cards {
  margin-bottom: 40rpx;
  
  .plan-card {
    margin-bottom: 30rpx;
    padding: 30rpx;
    border-radius: 20rpx;
    background-color: #f9f9f9;
    border: 2rpx solid transparent;
    transition: all 0.3s;
    
    &.selected {
      border-color: #42d392;
      background-color: #f1fbf6;
      transform: translateY(-5rpx);
      box-shadow: 0 10rpx 20rpx rgba(66, 211, 146, 0.1);
    }
    
    .plan-content {
      .plan-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20rpx;
        
        .plan-title {
          font-size: 32rpx;
          font-weight: bold;
          color: #333;
        }
        
        .plan-badge {
          background-color: #ffad42;
          color: white;
          font-size: 24rpx;
          padding: 4rpx 16rpx;
          border-radius: 20rpx;
          
          &.premium {
            background-color: #ff6b6b;
          }
        }
      }
      
      .plan-price {
        margin-bottom: 30rpx;
        position: relative;
        
        .currency {
          font-size: 32rpx;
          color: #333;
          vertical-align: top;
          position: relative;
          top: 8rpx;
        }
        
        .amount {
          font-size: 64rpx;
          font-weight: bold;
          color: #333;
        }
        
        .period {
          font-size: 28rpx;
          color: #666;
          margin-left: 4rpx;
        }
        
        .discount {
          font-size: 24rpx;
          color: #42d392;
          display: block;
          margin-top: 4rpx;
        }
      }
      
      .plan-features {
        margin-bottom: 30rpx;
        
        .feature {
          display: flex;
          align-items: center;
          margin-bottom: 16rpx;
          
          text {
            margin-left: 12rpx;
            font-size: 28rpx;
            color: #555;
          }
        }
      }
      
      .plan-footer {
        font-size: 26rpx;
        color: #888;
        font-style: italic;
      }
    }
  }
}

.testimonial {
  background-color: #f1fbf6;
  border-radius: 20rpx;
  padding: 30rpx;
  margin-bottom: 120rpx;
  position: relative;
  
  .quote-icon {
    width: 60rpx;
    height: 60rpx;
    position: absolute;
    top: -20rpx;
    left: 30rpx;
  }
  
  .testimonial-text {
    font-size: 28rpx;
    color: #444;
    line-height: 1.6;
    margin-bottom: 16rpx;
    font-style: italic;
  }
  
  .user-info {
    text-align: right;
    
    .user-name {
      font-size: 26rpx;
      color: #666;
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
  background-color: #e0e0e0;
  color: #888;
  border-radius: 45rpx;
  font-size: 32rpx;
  font-weight: bold;
  transition: all 0.3s;
  
  &.active {
    background-color: #42d392;
    color: #ffffff;
    box-shadow: 0 5rpx 15rpx rgba(66, 211, 146, 0.3);
  }
}
</style> 