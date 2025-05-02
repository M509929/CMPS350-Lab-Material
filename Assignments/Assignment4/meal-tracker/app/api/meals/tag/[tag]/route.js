import MealsRepo from "@/app/repo/meals-repo";

export async function GET(request, { params }) {
  const { tag } = params;
  const filteredMeals = await MealsRepo.getMealbytag(tag);
  return Response.json(filteredMeals, { status: 200 });
}
