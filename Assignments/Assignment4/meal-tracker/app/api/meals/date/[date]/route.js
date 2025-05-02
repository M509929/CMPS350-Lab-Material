import MealsRepo from "@/app/repo/meals-repo";


export async function GET(request, { params }) {
    const { date } = params; 
    const mealsOnDate = await MealsRepo.getMealsByDate(date);
    if (mealsOnDate.length === 0) {
        return Response.json({ message: "No meals found on this date." }, { status: 404 });
    }
    return Response.json(mealsOnDate, { status: 200 });
}
