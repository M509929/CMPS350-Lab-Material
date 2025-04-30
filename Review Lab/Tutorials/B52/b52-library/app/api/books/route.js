import libraryRepo from "@/app/repo/library-repo"

export async function GET(req) {
    const books = await libraryRepo.getAllBooks()

    return Response.json(books, { status: 200 })
}