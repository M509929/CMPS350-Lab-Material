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

        let accounts = []
        if (type == 'Saving' || type == 'Current') {
            accounts = await prisma.account.findMany({
                where: { acctType: type },
                include: { transactions: true }
            })
        }
        else
            accounts = prisma.account.findMany()

        return accounts

    }
    async addAccount(account) {

        // account.accountNo = nanoid().slice(0, 4)
        // const accounts = await this.getAccounts()
        // accounts.push(account)
        // await fs.writeJSON(this.filePath, accounts)
        return prisma.account.create({ data: account })

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
        const updatedAccount = await prisma.account.update({
            data: account,
            where: { accountNo }
        })
        return "updated successfully"
    }

    async getAccount(accNo) {
        // const accounts = await fs.readJson(this.filePath)
        // const account = accounts.find(acc => acc.accountNo == accNo)
        // if (account)
        //     return account
        // else
        //     return { errorMessage: 'Account does not exit' }
        const account = await prisma.account.findUnique({
            where: { accountNo: accNo }
        })
        if (account)
            return account
        else
            return { errorMessage: 'Account does not exit' }
    }

    async deleteAccount(accNo) {
        // const accounts = await fs.readJson(this.filePath)
        // const filteredAccounts = accounts.filter(acc => acc.accountNo != accNo)
        // await fs.writeJson(this.filePath, filteredAccounts)
        // return "deleted successfully"
        const account = await prisma.account.delete({
            where: { accountNo: accNo }
        })
        return "deleted successfully"
    }
    async addTransaction(accountNo, transaction) {

        transaction.accountNo = accountNo
        transaction.amount = parseInt(transaction.amount.toString());


        try {
            // const accounts = await this.getAccounts();
            const account = await this.getAccount(accountNo);

            if (transaction.transType == 'Deposit')
                account.balance += transaction.amount;
            else if (transaction.transType == 'Withdraw')
                if (account.balance < transaction.amount)
                    return "Insufficient balance";
                else
                    account.balance -= transaction.amount;


            transaction.accountBalance = account.balance
            await prisma.transaction.create({
                data: transaction
            })

            await prisma.account.update({
                where: { accountNo },
                data: { balance: account.balance }
            })

            return { message: 'transaction successful' }
        } catch (err) {
            throw err;
        }
    }

    async getTrans(acctNo, fromDate, toDate) {
        const transactions = await prisma.transaction.findMany({
            where: {
                accountNo: acctNo,
                transDate: {
                    gte: new Date(fromDate),
                    lte: new Date(toDate)
                }
            },
            orderBy: {
                transDate: 'desc'
            },
            include: {
                account: true
            }
        }

        )
        return transactions
    }

    async getAvgBalance() {
        const accounts = await prisma.account.aggregate({
            _avg: {
                balance: true
            },
            groupBy: {
                acctType: true
            }
        })
        return accounts
    }

    async getTransSum(fromDate, toDate) {
        const sumBalance = await prisma.transaction.aggregate({
            where: {
                transDate: {
                    gte: new Date(fromDate),
                    lte: new Date(toDate)
                }
            },
            _sum: {
                amount: true
            },

        })
        return transactions
    }
    // a. getAccounts(type): returns all accounts of a particular type
    // const transactions = await

    //     h.
    // getTrans(acctNo, fromDate, toDate): get transactions for a particular account for date range
    // i.
    // getAvgBalance(): returns average account balance by account type
    // j.
    // getTransSum(fromDate, toDate): returns the sum of debit and sum of credit transactions completed during a date range

}

export default new AccountsRepo()