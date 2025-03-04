<template>
  <view class="bottom-controls">
    <view @click="handleNext">
      <u-circle-progress 
        class="progress-btn"
        :percent="percent" 
        :width="300"
        activeColor="#42d392"
        inactiveColor="rgba(66, 211, 146, 0.2)"
        :duration="1000"
      >
        <text class="arrow-icon">›</text>
      </u-circle-progress>
    </view>
  </view>
</template>

<script>
export default {
  name: 'ProgressButton',
  props: {
    // 进度百分比
    percent: {
      type: Number,
      default: 0
    },
    // 下一页路径
    nextUrl: {
      type: String,
      required: true
    },
    // 是否需要验证
    needValidate: {
      type: Boolean,
      default: false
    },
    // 验证失败的提示信息
    validateMsg: {
      type: String,
      default: '请完成必填项'
    }
  },
  methods: {
    handleNext() {
      // 如果需要验证，先触发父组件的验证方法
      if (this.needValidate) {
        this.$emit('validate')
        return
      }
      
      // 直接跳转
      this.navigateToNext()
    },
    navigateToNext() {
      uni.navigateTo({
        url: this.nextUrl,
        success: () => {
          this.$emit('success')
        },
        fail: (err) => {
          console.error('跳转失败：', err)
          this.$u.toast('页面跳转失败')
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.bottom-controls {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40rpx 0;
  
  .progress-btn {
    position: relative;
    background-color: #f8f8f8;
    border-radius: 50%;
    
    .arrow-icon {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: #42d392;
      font-size: 100rpx;
      line-height: 80rpx;
      font-weight: bold;
    }
  }
}
</style> 