// 模拟食材数据
const mockFoodData = {
  "hotdog": {
    name: "热狗",
    portion: 1,
    nutrients: [
      {
        key: "calories",
        value: 152,
        unit: "千卡",
        label: "热量"
      },
      {
        key: "protein",
        value: 13,
        unit: "g",
        label: "蛋白质"
      },
      {
        key: "fat",
        value: 0,
        unit: "g",
        label: "脂肪"
      },
      {
        key: "carbs",
        value: 8,
        unit: "g",
        label: "碳水"
      }
    ]
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