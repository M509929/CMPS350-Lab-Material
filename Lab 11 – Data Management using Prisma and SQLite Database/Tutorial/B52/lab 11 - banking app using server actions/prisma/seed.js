// npm i fs-extra
import fs from 'fs-extra'
import { nanoid } from 'nanoid'
import path from 'path'

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const accountFilePath = path.join(process.cwd(), 'app/data/accounts.json')
const transactionFilePath = path.join(process.cwd(), 'app/data/transactions.json')

async function seed() {
    console.log('Seeding database...');
    const accounts = await fs.readJSON(accountFilePath)
    for (const account of accounts) {
        await prisma.account.create({ data: account })
    }
}

seed().catch((err) => {
    console.error(err)
}).finally(async () => {
    await prisma.$disconnect()
    console.log('Seeding completed')
})


