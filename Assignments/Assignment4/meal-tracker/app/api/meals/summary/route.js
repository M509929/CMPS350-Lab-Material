import MealsRepo from "@/app/repo/meals-repo";

export async function GET() {
  const summary = await MealsRepo.summary();
  return Response.json(summary);
}
