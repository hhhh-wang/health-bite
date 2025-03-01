/**
 * 通用返回方法
 * @param {Object} options 配置项
 * @param {string} options.redirectUrl 重定向的路径
 * @param {boolean} options.isTab 是否是 tab 页面
 * @param {number} options.delta 返回的层级数
 */
export const navigateBack = (options = {}) => {
	const {
		redirectUrl = '/pages/sys/home/index',
		isTab = true,
		delta = 1
	} = options;
	
	// 获取当前页面栈
	const pages = getCurrentPages();
	if (pages.length > 1) {
		// 如果有上一页，则正常返回
		uni.navigateBack({
			delta: delta,
			animationType: 'pop-out',
			animationDuration: 300,
			success: () => {
				console.log('返回成功');
			},
			fail: (err) => {
				console.error('返回失败:', err);
				// 如果返回失败，则重定向
				if (isTab) {
					uni.switchTab({
						url: redirectUrl
					});
				} else {
					uni.redirectTo({
						url: redirectUrl
					});
				}
			}
		});
	} else {
		// 如果没有上一页，则重定向
		if (isTab) {
			uni.switchTab({
				url: redirectUrl
			});
		} else {
			uni.redirectTo({
				url: redirectUrl
			});
		}
	}
}; 