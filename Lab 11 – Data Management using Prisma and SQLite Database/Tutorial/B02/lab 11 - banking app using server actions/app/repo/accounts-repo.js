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
        let accounts = []
        if (type == 'Saving' || type == 'Current')
            accounts = await prisma.account.findMany({
                where: {
                    acctType: type
                }
            })
        else
            accounts = await prisma.account.findMany()

        return accounts


    }
    async addAccount(account) {
        const newAccount = await prisma.account.create({ data: account })
        return newAccount
    }

    async updateAccount(accountNo, account) {
        const updatedAccount = await prisma.account.update({ data: account, where: { accountNo } })
        if (updatedAccount)
            return "Updated successfully"
        else
            return "Unable to update account because it does not exist"
    }

    async getAccount(accNo) {
        const account = await prisma.account.findUnique({ where: { accountNo: accNo } })
        if (account)
            return account
        else
            return { errorMessage: 'Account does not exit' }
    }

    async deleteAccount(accNo) {
        await prisma.account.delete({ where: { accountNo: accNo } })
        return "deleted successfully"
    }
    async addTransaction(accountNo, transaction) {

        // update the missing information of the transaction object
        transaction.accountNo = accountNo
        transaction.amount = parseInt(transaction.amount.toString());

        try {

            const account = await this.getAccount(accountNo)
            if (!account)
                return { errorMessage: 'Account does not exist' }

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

            this.updateAccount(accountNo, account)

            return { message: 'transaction successful' }
        } catch (err) {
            throw err;
        }
    }


}

export default new AccountsRepo()