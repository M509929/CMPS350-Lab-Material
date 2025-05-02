
import MealsRepo from "@/app/repo/meals-repo";

export async function GET() {
  const meals = await MealsRepo.getMeals();
  return Response.json(meals, { status: 200 });
}


export async function POST(request) {

    const Meal = await request.json()
    const newMeal = await MealsRepo.Addmeal(Meal)
    return Response.json(newMeal , {status :200})
}

