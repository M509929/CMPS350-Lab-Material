import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

class LibraryRepo {

    async getAllAuthors() {
        return await prisma.author.findMany({
            include: { books: true }
        })
    }

    // Get a specific book by ID
    async getAuthorById(authorId) {
        return await prisma.author.findUnique({
            where: { id: parseInt(authorId) },
            include: { books: true }

        })
    }

    // Create a new book
    async createAuthor(authorData) {
        return await prisma.author.create({ data: authorData })
    }


    // Get all books
    async getAllBooks() {
        return await prisma.book.findMany({
            include: { author: true }
        })
    }

    // Get a specific book by ID
    async getBookById(bookId) {

        return await prisma.book.findUnique({
            where: { id: parseInt(bookId) },
            include: { author: true }
        })
    }

    // Create a new book
    async createBook(bookData) {
        return await prisma.book.create({ data: bookData })
    }

    // Update an existing book
    async updateBook(bookId, updatedData) {
        return await prisma.book.update({ data: updatedData, where: { id: parseInt(bookId) } })
    }

    // Delete a book
    async deleteBook(bookId) {
        return await prisma.book.delete({
            where: { id: parseInt(bookId) }
        })
    }

}

export default new LibraryRepo()