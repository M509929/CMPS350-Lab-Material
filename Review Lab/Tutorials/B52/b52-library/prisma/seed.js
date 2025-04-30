import { PrismaClient } from "@prisma/client"
import fs from "fs-extra"
import path from "path"

const prisma = new PrismaClient()

async function seed() {
    console.log("Seeding Started.....");

    const authors = await fs.readJSON(path.join(process.cwd(), 'app/data/authors.json'))
    const books = await fs.readJSON(path.join(process.cwd(), 'app/data/books.json'))

    for (const author of authors)
        await prisma.author.create({ data: author })
    for (const book of books)
        await prisma.book.create({ data: book })

    prisma.$disconnect
    console.log('Completed Seeding');

}

seed()