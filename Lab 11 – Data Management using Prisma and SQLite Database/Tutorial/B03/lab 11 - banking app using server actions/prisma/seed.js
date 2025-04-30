// npm i fs-extra
import fs from 'fs-extra'
import path from 'path'

// we need prisma client to connect to the database

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
const accountPath = path.join(process.cwd(), 'app/data/accounts.json')

async function seed() {
    console.log('Seeding Database...');
    const accounts = await fs.readJSON(accountPath)
    for (const account of accounts)
        await prisma.account.create({ data: account })
}

try {
    await seed()
    console.log('Database Seeding finished.');

}
catch (e) {
    console.error(e)
} finally {
    await prisma.$disconnect()

}


