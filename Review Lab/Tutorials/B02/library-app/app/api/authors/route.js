
import libraryRepo from "@/app/repo/library-repo"
export async function GET(req) {
    const authors = await libraryRepo.getAllAuthors()
    return Response.json(authors, { status: 200 })
}

export async function GET(req) {
    const authorData = await req.json()
    const newAuthor = await libraryRepo.createAuthor(authorData)
    return Response.json(newAuthor, { status: 200 })
}