<template>
  <view class="help-container">
    <!-- 搜索框 -->
    <view class="search-box">
      <u-search
        v-model="searchKeyword"
        placeholder="请输入您的问题..."
        :show-action="false"
        shape="round"
      ></u-search>
    </view>

    <!-- 帮助分类卡片 -->
    <view class="help-grid">
      <!-- 平台入口 -->
      <view class="help-card" @click="navigateToDetail('platform')">
        <view class="card-content">
          <view class="icon-wrapper green">
            <u-icon name="file-text" color="#ffffff" size="44"></u-icon>
          </view>
          <view class="card-title">平台入口</view>
          <view class="card-desc">基础教程讲解清晰，值得您的细心了解</view>
          <view class="article-count">10 篇文章</view>
        </view>
      </view>

      <!-- 健康管理 -->
      <view class="help-card" @click="navigateToDetail('health')">
        <view class="card-content">
          <view class="icon-wrapper blue">
            <u-icon name="heart" color="#ffffff" size="44"></u-icon>
          </view>
          <view class="card-title">健康管理</view>
          <view class="card-desc">了解您的身体状况，做好健康管理</view>
          <view class="article-count">14 篇文章</view>
        </view>
      </view>

      <!-- 账户管理 -->
      <view class="help-card" @click="navigateToDetail('account')">
        <view class="card-content">
          <view class="icon-wrapper purple">
            <u-icon name="account" color="#ffffff" size="44"></u-icon>
          </view>
          <view class="card-title">账户管理</view>
          <view class="card-desc">管理您的账户、个人信息等</view>
          <view class="article-count">10 篇文章</view>
        </view>
      </view>

      <!-- 订阅说明 -->
      <view class="help-card" @click="navigateToDetail('subscription')">
        <view class="card-content">
          <view class="icon-wrapper orange">
            <u-icon name="question-circle" color="#ffffff" size="44"></u-icon>
          </view>
          <view class="card-title">订阅说明</view>
          <view class="card-desc">停启开通说明、服务升级建议等</view>
          <view class="article-count">10 篇文章</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      searchKeyword: ''
    }
  },
  methods: {
    navigateToDetail(category) {
      uni.navigateTo({
        url: `/pages/sys/user/help/detail?category=${category}`
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.help-container {
  min-height: 100vh;
  background-color: #f5f5f5;
  padding: 30rpx;
}

.search-box {
  margin-bottom: 30rpx;
}

.help-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20rpx;
}

.help-card {
  background-color: #ffffff;
  border-radius: 16rpx;
  padding: 30rpx;
  
  .card-content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    
    .icon-wrapper {
      width: 88rpx;
      height: 88rpx;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 20rpx;
      
      &.green {
        background-color: #42d392;
      }
      
      &.blue {
        background-color: #3c9cff;
      }
      
      &.purple {
        background-color: #906efe;
      }
      
      &.orange {
        background-color: #ff9900;
      }
    }
    
    .card-title {
      font-size: 32rpx;
      font-weight: bold;
      color: #333;
      margin-bottom: 10rpx;
    }
    
    .card-desc {
      font-size: 24rpx;
      color: #666;
      margin-bottom: 20rpx;
      line-height: 1.4;
    }
    
    .article-count {
      font-size: 24rpx;
      color: #999;
    }
  }
}
</style> 