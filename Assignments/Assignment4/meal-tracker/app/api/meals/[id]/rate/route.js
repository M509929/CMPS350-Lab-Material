import MealsRepo from "@/app/repo/meals-repo";

export async function POST(request, { params }) {
  const id = parseInt(params.id);
  const { rating } = await request.json();

  if (!rating || rating < 1 || rating > 5) {
    return Response.json({ error: "Rating must be between 1 and 5" }, { status: 400 });
  }
  const updatedMeal = await MealsRepo.rateMeal(id, rating);
  if (!updatedMeal) {
    return Response.json({ error: "Meal not found" }, { status: 404 });
  }
  return Response.json(updatedMeal, { status: 201 });
}
