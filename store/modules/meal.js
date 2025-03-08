export default {
  namespaced: true,
  
  state: {
    foodList: [],  // 食物列表
    dailyCalories: 1194,  // 每日卡路里
    remainingCalories: 49,  // 剩余卡路里
    nutritionStats: {
      totalCalories: 1739,
      carbs: 58,
      fat: 26,
      protein: 28
    }
  },
  
  mutations: {
    // 添加食物
    ADD_FOOD(state, food) {
      state.foodList.push({
        ...food,
        id: Date.now(),
        createTime: new Date().toISOString()
      })
    },
    
    // 删除食物
    REMOVE_FOOD(state, foodId) {
      const index = state.foodList.findIndex(food => food.id === foodId)
      if (index > -1) {
        state.foodList.splice(index, 1)
      }
    },
    
    // 更新食物
    UPDATE_FOOD(state, { foodId, updatedFood }) {
      const index = state.foodList.findIndex(food => food.id === foodId)
      if (index > -1) {
        state.foodList[index] = { ...state.foodList[index], ...updatedFood }
      }
    },
    
    // 更新营养统计
    UPDATE_NUTRITION_STATS(state) {
      const stats = state.foodList.reduce((acc, food) => {
        acc.totalCalories += Number(food.calories || 0)
        acc.carbs += Number(food.carbs || 0)
        acc.fat += Number(food.fat || 0)
        acc.protein += Number(food.protein || 0)
        return acc
      }, {
        totalCalories: 0,
        carbs: 0,
        fat: 0,
        protein: 0
      })
      
      state.nutritionStats = stats
      state.remainingCalories = state.dailyCalories - stats.totalCalories
    }
  },
  
  actions: {
    // 添加食物
    addFood({ commit }, food) {
      commit('ADD_FOOD', food)
      commit('UPDATE_NUTRITION_STATS')
    },
    
    // 删除食物
    removeFood({ commit }, foodId) {
      commit('REMOVE_FOOD', foodId)
      commit('UPDATE_NUTRITION_STATS')
    },
    
    // 更新食物
    updateFood({ commit }, { foodId, food }) {
      commit('UPDATE_FOOD', { foodId, updatedFood: food })
      commit('UPDATE_NUTRITION_STATS')
    }
  },
  
  getters: {
    // 食物总数
    foodCount: state => state.foodList.length,
    
    // 营养成分百分比
    nutritionPercentages: state => ({
      calories: Math.round((state.nutritionStats.totalCalories / 2000) * 100),
      carbs: Math.round((state.nutritionStats.carbs / 100) * 100),
      fat: Math.round((state.nutritionStats.fat / 44) * 100),
      protein: Math.round((state.nutritionStats.protein / 62) * 100)
    })
  }
} 