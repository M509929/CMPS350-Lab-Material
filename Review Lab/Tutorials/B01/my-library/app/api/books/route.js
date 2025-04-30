import libraryRepo from "@/app/repo/library-repo";

export async function GET(req) {
    const books = await libraryRepo.getAllBooks()
    return Response.json(books, { status: 200 })
}


export async function POST(req, { params }) {
    const bookData = await req.json()
    const newBook = await libraryRepo.createBook(bookData)
    return Response.json(newBook, { status: 201 })
}