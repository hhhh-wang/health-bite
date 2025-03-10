<template>
  <view class="pie-chart-container">
    <qiun-data-charts 
      type="pie"
      :opts="chartOpts"
      :chartData="formattedData"
      :canvasId="canvasId"
    />
  </view>
</template>

<script>
export default {
  name: 'CaloriePieChart',
  props: {
    // 餐食数据，格式为 { name: 餐食名称, value: 卡路里值 }
    mealData: {
      type: Array,
      required: true,
      default: () => []
    },
    // 自定义Canvas ID
    canvasId: {
      type: String,
      default: 'calorie-pie-chart'
    },
    // 自定义颜色
    colors: {
      type: Array,
      default: () => []
    },
    // 其他图表配置
    options: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      // 默认饼图配置
      defaultOpts: {
        padding: [15, 15, 15, 15],
        enableScroll: false,
        dataLabel: true,
        extra: {
          pie: {
            activeOpacity: 0.8,
            activeRadius: 10,
            offsetAngle: 0,
            labelWidth: 15,
            border: false,
            borderWidth: 3,
            borderColor: "#FFFFFF"
          }
        }
      },
      // 默认颜色集
      defaultColors: [
        "#43B3AE", // 柔和绿松石
        "#5B9BD5", // 柔和天蓝
        "#F8BD7F", // 柔和橙黄
        "#E99497", // 柔和粉红
        "#8BBF9F", // 薄荷绿
        "#7D9D9C", // 灰绿色
        "#CF9893", // 藕荷色
        "#ECBE7A", // 淡姜黄
        "#B3A6C3", // 薰衣草
        "#6BAFBD"  // 蓝绿色
      ]
    }
  },
  computed: {
    // 合并配置
    chartOpts() {
      const colors = this.colors.length > 0 ? this.colors : this.defaultColors;
      return {
        ...this.defaultOpts,
        ...this.options,
        color: colors
      }
    },
    
    // 格式化数据
    formattedData() {
      if (!this.mealData || this.mealData.length === 0) {
        return { series: [] };
      }
      
      return {
        series: [{
          data: this.mealData,
          format: {
            label: function(item) {
              return item.name
            },
            value: function(item) {
              return item.value.toFixed(0)
            },
            percent: function(item) {
              if (item.value === 0) {
                return '0%'
              }
              let total = 0
              for (let subitem of item.series.data) {
                total += subitem.value
              }
              return (item.value / total * 100).toFixed(2) + '%'
            }
          }
        }]
      };
    }
  },
  methods: {
    drawPieChart() {
      // ... 其他代码
      
      // 调整饼图在画布中的位置和大小
      const radius = Math.min(width, height - 80) / 2 * 0.8; // 减小半径留出底部空间
      const centerY = (height - 80) / 2; // 将饼图向上移动一些
      
      // ... 其他绘图代码
      
      // 确保图例有足够的空间
      const legendY = centerY + radius + 40; // 图例位置下移
      
      // ... 绘制图例的代码
    }
  }
}
</script>

<style lang="scss" scoped>
.pie-chart-container {
  width: 100%;
  height: 300px;
}
</style>
