<template>
	<view class="chart-container">
		<qiun-data-charts 
			type="line"
			:opts="chartOpts"
			:chartData="formatChartData"
			:canvasId="canvasId"
			background="none"
		/>
	</view>
</template>

<script>
export default {
	name: 'nutrition-chart',
	props: {
		// 餐食类型数组
		meals: {
			type: Array,
			default: () => ['早餐', '午餐', '晚餐']
		},
		// 营养数据数组
		nutritionData: {
			type: Array,
			default: () => []
		},
		// Y轴配置
		yAxis: {
			type: Object,
			default: () => ({
				min: 0,
				max: 50
			})
		},
		// canvas ID
		canvasId: {
			type: String,
			default: 'nutritionChart'
		}
	},
	computed: {
		formatChartData() {
			return {
				categories: this.meals,
				series: [{
					name: '总热量',
					linearColor: [
						[0, '#42d392'],
						[0.25, '#50d89d'],
						[0.5, '#5edca8'],
						[0.75, '#6ce0b3'],
						[1, '#7ae4be']
					],
					data: this.nutritionData[0] || []
				}, {
					name: '碳水化合物',
					linearColor: [
						[0, '#ff6b6b'],
						[0.25, '#ff7a7a'],
						[0.5, '#ff8989'],
						[0.75, '#ff9898'],
						[1, '#ffa7a7']
					],
					data: this.nutritionData[1] || []
				}, {
					name: '脂肪',
					linearColor: [
						[0, '#ffa500'],
						[0.33, '#ffb733'],
						[0.66, '#ffc966'],
						[1, '#ffdb99']
					],
					data: this.nutritionData[2] || []
				}, {
					name: '蛋白质',
					linearColor: [
						[0, '#8a2be2'],
						[0.33, '#9f55e7'],
						[0.66, '#b47fec'],
						[1, '#c9a9f1']
					],
					data: this.nutritionData[3] || []
				}]
			}
		},
		chartOpts() {
			return {
				padding: [15, 10, 0, 15],
				background: 'rgb(255, 232, 215)',
				enableScroll: false,
				dataLabel: false,
				dataPointShape: false,
				legend: {
					show: false
				},
				xAxis: {
					disableGrid: true,
					type: 'category',
					axisLine: true,
					axisLineColor: '#cccccc'
				},
				yAxis: {
					gridType: "dash",
					dashLength: 2,
					data: [{
						min: this.yAxis.min,
						max: this.yAxis.max,
						splitNumber: 5
					}],
					showTitle: false,
					gridColor: '#cccccc'
				},
				extra: {
					line: {
						type: "curve",
						width: 2,
						activeType: "hollow",
						linearType: "custom"
					}
				},
				width: 750,
				height: 300
			}
		}
	}
}
</script>

<style lang="scss" scoped>
.chart-container {
	height: 300rpx;
	width: 100%;
	margin: 30rpx 0;
	position: relative;
	
	:deep(.qiun-charts) {
		width: 100% !important;
		height: 100% !important;
	}
}
</style> 