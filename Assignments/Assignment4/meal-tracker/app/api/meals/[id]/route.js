import MealsRepo from "@/app/repo/meals-repo";


// export async function GET() {
//   const meals = await MealsRepo.getMeals();
//   return Response.json(meals, { status: 200 });
// }

export async function GET(request, { params }) {
    const id = params.id;
    const meal = await MealsRepo.getMeal(id);
    return Response.json(meal, { status: 200 });
}


export async function PUT(request, context) {
  const { params } = await context;
  const id = params.id;

  const mealData = await request.json();
  const updatedMeal = await MealsRepo.updateMeal(id, mealData);

  if (!updatedMeal) {
    return new Response('Meal not found', { status: 404 });
  }

  return Response.json(updatedMeal);
}


  export async function DELETE(request, { params }) {
      const { id } = params;
      const meal = await MealsRepo.deleteMeal(id)
      return Response.json( meal, { status: 200 });
  }
  