import libraryRepo from "@/app/repo/library-repo";

export async function GET(req, { params }) {
    const { id } = await params
    const book = await libraryRepo.getBookById(id)
    return Response.json(book, { status: 200 })
}

