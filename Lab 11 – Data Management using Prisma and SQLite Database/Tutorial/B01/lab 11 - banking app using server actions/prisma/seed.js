// npm i fs-extra
import fs from 'fs-extra'
import { nanoid } from 'nanoid'
import path from 'path'

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const accountFilePath = path.join(process.cwd(), 'app/data/accounts.json')
const transFilePath = path.join(process.cwd(), 'app/data/transactions.json')

async function seed() {
    // first I want to check if the database is already seeded
    const accounts = await fs.readJSON(accountFilePath)
    for (let account of accounts) //add to the database
        await prisma.account.create({
            data: account
        })
}

seed()
