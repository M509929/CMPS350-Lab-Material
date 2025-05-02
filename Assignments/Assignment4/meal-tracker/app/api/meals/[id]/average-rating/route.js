import MealsRepo from "@/app/repo/meals-repo";

export async function GET(request, { params }) {
    const id = params.id;
    const avg = await MealsRepo.avgRating(id);
    console.log(avg);
    return Response.json( avg , { status: 200 });

}

