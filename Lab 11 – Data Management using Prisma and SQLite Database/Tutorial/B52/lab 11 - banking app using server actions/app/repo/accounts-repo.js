// npm i fs-extra
import fs from 'fs-extra'
import { nanoid } from 'nanoid'
import path from 'path'

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

class AccountsRepo {
    constructor() {
        this.filePath = path.join(process.cwd(), 'app/data/accounts.json')
        this.transFilePath = path.join(process.cwd(), 'app/data/transactions.json')
    }

    async getAccounts(type) {
        // const accounts = await fs.readJSON(this.filePath)
        // if (type == 'Saving' || type == 'Current')
        //     return accounts.filter(account => account
        //         .acctType.toLowerCase() === type.toLowerCase())
        // return accounts

        if (type == 'Saving' || type == 'Current')
            return await prisma.account.findMany({ where: { acctType: type } })

        return await prisma.account.findMany()


    }
    async addAccount(account) {

        // account.accountNo = nanoid().slice(0, 4)
        // const accounts = await this.getAccounts()
        // accounts.push(account)
        // await fs.writeJSON(this.filePath, accounts)
        // return account

        return await prisma.account.create({ data: account })
    }

    async updateAccount(accountNo, account) {
        // const accounts = await fs.readJson(this.filePath)
        // const index = accounts.findIndex(acc => acc.accountNo == accountNo)
        // if (index >= 0) {
        //     accounts[index] = account
        //     await fs.writeJson(this.filePath, accounts)
        //     return "updated successfully"
        // }
        // return "Unable to update account because it does not exist"

        const newAccount = await prisma.account.update({ data: account, where: { accountNo } })
        if (newAccount)
            return newAccount
        else
            return { errorMessage: 'Unable to update account because it does not exist' }

    }

    async getAccount(accNo) {
        const accounts = await fs.readJson(this.filePath)
        const account = accounts.find(acc => acc.accountNo == accNo)
        if (account)
            return account
        else
            return { errorMessage: 'Account does not exit' }
    }

    async getAccount(accountNo) {
        return await prisma.account.findUnique({ where: { accountNo } })
    }
    async deleteAccount(accNo) {
        // const accounts = await fs.readJson(this.filePath)
        // const filteredAccounts = accounts.filter(acc => acc.accountNo != accNo)
        // await fs.writeJson(this.filePath, filteredAccounts)
        // return "deleted successfully"
        const deleted = await prisma.account.delete({ where: { accountNo: accNo } })
        if (deleted)
            return deleted
        else
            return { errorMessage: 'Unable to delete account because it does not exist' }
    }

    async addTransaction(accountNo, transaction) {

        // update the missing information of the transaction object
        transaction.accountNo = accountNo
        transaction.amount = parseInt(transaction.amount.toString());

        try {
            // const accounts = await this.getAccounts();
            // const account = accounts.find(account => account.accountNo == accountNo);
            const account = await prisma.account.findUnique({ where: { accountNo } })

            if (transaction.transType == 'Deposit')
                account.balance += transaction.amount;
            else if (transaction.transType == 'Withdraw')
                if (account.balance < transaction.amount)
                    return "Insufficient balance";
                else
                    account.balance -= transaction.amount;

            // // update the account
            // await fs.writeJSON(this.filePath, accounts)

            // update the transaction file  
            transaction.accountBalance = account.balance
            await prisma.transaction.create({ data: transaction })

            await this.updateAccount(accountNo, account)
            return { message: 'transaction successful' }
        } catch (err) {
            throw err;
        }
    }

    async getTrans(acctNo, fromDate, toDate) {
        return await prisma.transaction.findMany({
            where: {
                accountNo: acctNo,
                dateCreated: {
                    gte: new Date(fromDate),
                    lte: new Date(toDate)
                }
            }
        })
    }

    async getAvgBalance() {
        const averageBalance = await prisma.account.aggregate({
            _avg: {
                balance: true
            }
        })
    }
    async getAccountsTransactionByType(accountNo) {
        await prisma.transaction.groupBy({
            by: ['transType'],
            _count: {
                transType: true
            },
            where: { accountNo },
        })
    }
}

export default new AccountsRepo()