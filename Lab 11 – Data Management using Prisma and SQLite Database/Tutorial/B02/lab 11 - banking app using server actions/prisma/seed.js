// npm i fs-extra
import fs from 'fs-extra'
import { nanoid } from 'nanoid'
import path from 'path'

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const accountFilePath = path.join(process.cwd(), 'app/data/accounts.json')

async function seed() {
    console.log('Seeding database...');

    // check if the database is empty or not
    const accounts = await fs.readJSON(accountFilePath)
    for (const account of accounts) {
        await prisma.account.create({
            data: account
        })
    }
}

seed()
    .catch(e => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
        console.log('Database seeded successfully');

    })
