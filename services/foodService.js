// 模拟食材数据
const mockFoodData = {
  "hotdog": {
    name: "热狗",
    portion: 1,
    calories: 152,
    protein: 13,
    fat: 0,
    carbs: 8
  },
  // 可以添加更多食材数据...
};

export const getFoodInfo = (foodName) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockFoodData[foodName] || null);
    }, 500); // 模拟网络延迟
  });
}; 