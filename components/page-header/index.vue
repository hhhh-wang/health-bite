<template>
  <view class="header">
    <view class="left-area">
      <view class="back-button" @click="handleBack" v-if="showBack">
        <u-icon name="arrow-left" color="#333" size="20"></u-icon>
      </view>
    </view>
    <view class="right-area">
      <view class="skip-btn" @click="handleSkip" v-if="showSkip">
        <text>{{ skipText }}</text>
      </view>
    </view>
  </view>
</template>

<script>
import { navigateBack } from '@/common/utils/navigate';

export default {
  name: 'PageHeader',
  props: {
    // 是否显示返回按钮
    showBack: {
      type: Boolean,
      default: true
    },
    // 是否显示跳过按钮
    showSkip: {
      type: Boolean,
      default: true
    },
    // 跳过按钮文字
    skipText: {
      type: String,
      default: '跳过'
    },
    // 返回按钮跳转地址
    backRedirectUrl: {
      type: String,
      required: true
    },
    // 返回按钮是否为 tab 页面
    backIsTab: {
      type: Boolean,
      default: false
    },
    // 跳过按钮跳转地址
    skipRedirectUrl: {
      type: String,
      required: true
    },
    // 跳过按钮是否为 tab 页面
    skipIsTab: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleBack() {
      navigateBack({
        redirectUrl: this.backRedirectUrl,
        isTab: this.backIsTab
      });
    },
    handleSkip() {
      navigateBack({
        redirectUrl: this.skipRedirectUrl,
        isTab: this.skipIsTab
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 60rpx 0 30rpx;
  
  .left-area {
    width: 120rpx; // 固定宽度
    
    .back-button {
      width: 120rpx;
      height: 120rpx;
      border-radius: 50%;
      background-color: rgb(246, 247, 247);
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  .right-area {
    width: 120rpx; // 固定宽度
    
    .skip-btn {
      width: 120rpx;
      height: 120rpx;
      border-radius: 50rpx;
      background-color: rgb(246, 247, 247);
      display: flex;
      align-items: center;
      justify-content: center;
      
      text {
        font-size: 28rpx;
        font-weight: bold;
        color: #333;
      }
    }
  }
}
</style> 
