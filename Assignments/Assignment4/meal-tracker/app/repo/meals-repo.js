const fs = require('fs-extra');
import path from 'path'


class MealsRepo {
    constructor(){
        this.filePath = path.join(process.cwd(), 'app/data/meals.json')
    }

     
    async  getMeals(){
        try {
            return await fs.readJson(this.filePath);
          } catch (err) {
            console.error('Failed to read meals.json:', err.message);
            return [];
          }

}
   async Addmeal(mealData){
        try {
          const meals = await this.getMeals();  
          const newId = meals.length > 0
            ? Math.max(...meals.map(meal => meal.id)) + 1  
            : 1;  
          const newMeal = { ...mealData, id: newId };
          meals.push(newMeal);
          await fs.writeJson(this.filePath, meals);
          return newMeal;  
        } catch (err) {
          console.error('Failed to add meal:', err.message);
          throw new Error('Failed to add meal');
        }
      }
      async getMeal(id) {
        const Meals = await fs.readJson(this.filePath)
        const meal = Meals.find(m => m.id == id)
        if (meal)
            return meal
        else
            return { errorMessage: 'Meal does not exit' }
    }
    async updateMeal(id, newMealData) {
        const meals = await fs.readJson(this.filePath);
        const index = meals.findIndex(meal => meal.id == id);
        if (index === -1) return null;
      
        meals[index] = { ...meals[index], ...newMealData };
        await fs.writeJson(this.filePath, meals, { spaces: 2 });
      
        return meals[index];
      }


      async deleteMeal(id){
        const Meals = await fs.readJson(this.filePath)
        const filteredMeals = Meals.filter(m => m.id != id)
        await fs.writeJson(this.filePath, filteredMeals)
        return "deleted successfully"
      }
      async getMealbytag(tag){
        try {
          const meals = await fs.readJson(this.filePath);
          return meals.filter(
            meal => Array.isArray(meal.tags) && meal.tags.includes(tag)
          );
        } catch (error) {
          console.error("Failed to read meals by tag:", error.message);
          return [];
        }
      }

      async getMealsByDate(date) {
        try {
            const meals = await fs.readJson(this.filePath);
            const targetDate = new Date(date);
            if (isNaN(targetDate)) {
                throw new Error("Invalid date format");
            }
            const filteredMeals = meals.filter(meal => {
                const mealDate = new Date(meal.date);
                return mealDate.toISOString().split('T')[0] === targetDate.toISOString().split('T')[0];
            });

            return filteredMeals;
        } catch (err) {
            console.error("Failed to filter meals by date:", err.message);
            return [];
        }
    }
    async rateMeal(id, rating) {
      const meals = await this.getMeals();
      const index = meals.findIndex(m => m.id == id);
      if (index === -1) return null;
  
      if (!Array.isArray(meals[index].ratings)) {
        meals[index].ratings = [];
      }
  
      meals[index].ratings.push(rating);
      await fs.writeJson(this.filePath, meals, { spaces: 2 });
      return meals[index];
    }

    async avgRating(id) {
      const meals = await this.getMeals();
      const meal = meals.find(m => m.id == id);
      
      if (!meal || !Array.isArray(meal.ratings) || meal.ratings.length === 0) {
        return { average: 0, message: "No ratings available." };
      }
    
      const total = meal.ratings.reduce((sum, rating) => sum + rating, 0);
      const average = total / meal.ratings.length;
    
      return { average };
    }
    
    async summary() {
      const meals = await this.getMeals();
      console.log('Meals data:', meals); // Log meals data to check structure
      const tagMap = new Map();
    
      meals.forEach(meal => {
        if (!meal.tags || !Array.isArray(meal.tags)) {
          console.warn('Meal with invalid tags:', meal); // Log any meal with invalid tags
          return;
        }
    
        const ratings = meal.ratings || [];
        const avgRating = ratings.length
          ? ratings.reduce((a, b) => a + b, 0) / ratings.length
          : 0;
    
        meal.tags.forEach(tag => {
          const { total = 0, count = 0 } = tagMap.get(tag) || {};
          tagMap.set(tag, {
            total: total + avgRating,
            count: count + 1
          });
        });
      });
    
      const summary = [];
      for (const [tag, { total, count }] of tagMap.entries()) {
        summary.push({
          tag,
          mealCount: count,
          avgSatisfaction: total / count || 0
        });
      }
    
      return { summary };
    }
    
    
}
   
export default new MealsRepo()