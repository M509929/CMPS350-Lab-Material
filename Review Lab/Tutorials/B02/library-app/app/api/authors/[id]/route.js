
import libraryRepo from "@/app/repo/library-repo"
export async function GET(req, { params }) {
    const id = await params.id
    const author = await libraryRepo.getAuthorById(id)
    return Response.json(author, { status: 200 })
}