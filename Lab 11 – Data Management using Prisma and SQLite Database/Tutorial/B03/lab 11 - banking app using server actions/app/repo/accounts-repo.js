import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

class AccountsRepo {


    async getAccounts(type) {
        if (type == 'Saving' || type == 'Current')
            return await prisma.account.findMany({ where: { acctType: type } })
        return await prisma.account.findMany()

    }
    async addAccount(account) {
        return await prisma.account.create({ data: account })
    }

    async updateAccount(accountNo, propertiesToUpdate) {
        return await prisma.account.update({ data: propertiesToUpdate, where: { accountNo } })
    }

    async getAccount(accNo) {
        const account = await prisma.account.findUnique({ where: { accountNo: accNo } })
        if (account)
            return account
        else
            return { errorMessage: 'Account does not exit' }
    }

    async deleteAccount(accNo) {
        const deleted = await prisma.account.delete({ where: { accountNo: accNo } })
        if (deleted)
            return "deleted successfully"
        else
            return "Account does not exist"
    }
    async addTransaction(accountNo, transaction) {

        // update the missing information of the transaction object
        transaction.accountNo = accountNo
        // transaction.transId = nanoid().slice(0, 4)
        transaction.amount = parseInt(transaction.amount.toString());

        try {
            // const accounts = await this.getAccounts();
            // const account = accounts.find(account => account.accountNo == accountNo);

            const account = await this.getAccount(accountNo);

            if (transaction.transType == 'Deposit')
                account.balance += transaction.amount;
            else if (transaction.transType == 'Withdraw')
                if (account.balance < transaction.amount)
                    return "Insufficient balance";
                else
                    account.balance -= transaction.amount;

            // update the transaction file
            transaction.accountBalance = account.balance

            await prisma.transaction.create({ data: transaction })
            // update the account balance
            await this.updateAccount(accountNo, { balance: account.balance })

            return { message: 'transaction successful' }
        } catch (err) {
            throw err;
        }
    }

    async getTrans(acctNo, fromDate, toDate) {
        const transactions = await prisma.transaction.findMany({
            where: {
                accountNo: acctNo,
                dateCreated: {
                    gte: new Date(fromDate),
                    lte: new Date(toDate)
                }
            }
        })
        return transactions
    }


    async getReport() {
        const report = await prisma.account.aggregate({
            _count: { accountNo: true },
            _sum: { balance: true },
            _avg: { balance: true },
        })
        return report
    }
}

export default new AccountsRepo()