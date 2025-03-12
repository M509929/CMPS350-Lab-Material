import fse from 'fs-extra';
import path from 'path';
import { nanoid } from 'nanoid';

class AccountRepo {
    constructor() {
        this.accountFilePath = path.join(process.cwd(), 'app/data/accounts.json');
        this.transactionFilePath = path.join(process.cwd(), 'app/data/transactions.json');
    }

    // we will create a helper method to save the accounts to the file

    async saveAccounts(accounts) {
        await fse.writeJson(this.accountFilePath, accounts);
    }
    async saveTransactions(transactions) {
        await fse.writeJson(this.transactionFilePath, transactions);
    }

    async getAccounts(type) {
        console.log('called with ', type);

        const accounts = await fse.readJson(this.accountFilePath);
        if (type) {
            return accounts.filter(account => account.acctType.toLowerCase() == type.toLowerCase());
        }
        return accounts;
    }

    async getAccount(accountNo) {
        const accounts = await this.getAccounts();
        const account = accounts.find(account => account.accountNo == accountNo);
        if (!account) {
            return { error: 'Account not found' };
        }
        return account;
    }

    async createAccount(account) {
        const accounts = await this.getAccounts();
        account.accountNo = nanoid();
        accounts.push(account);
        await this.saveAccounts(accounts);
        return account;
    }

    async updateAccount(accountNo, account) {
        const accounts = await this.getAccounts();

        const index = accounts.findIndex(account => account.accountNo == accountNo);

        if (index < 0) {
            return { error: 'Account not found' };
        }
        accounts[index] = { ...accounts[index], ...account };

        await this.saveAccounts(accounts);
        return accounts[index];
    }

    async deleteAccount(accountNo) {
        const accounts = await this.getAccounts();
        const index = accounts.findIndex(account => account.accountNo == accountNo);
        if (index < 0) {
            return { error: 'Account not found' };
        }
        accounts.splice(index, 1);
        await this.saveAccounts(accounts);
        return { message: 'Account deleted successfully' };
    }

    async getTransactions(accountNo) {
        const transactions = await fse.readJson(this.transactionFilePath);
        if (accountNo) {
            return transactions.filter(transaction => transaction.accountNo == accountNo);
        }
        return transactions;
    }

    async addTransaction(transaction) {
        transaction.amount = parseFloat(transaction.amount.toString());
        const transactions = await this.getTransactions();
        try {
            const accounts = await this.getAccounts();
            const account = accounts.find(account => account.accountNo == transaction.accountNo);

            if (transaction.transType == 'Deposit') {
                account.balance += transaction.amount;
            } else {
                if (account.balance < transaction.amount) {
                    return { error: 'Insufficient funds' };
                }
                account.balance -= transaction.amount;
            }
            transactions.push(transaction);
            await this.saveTransactions(transactions);
            await fs.writeJson(this.accountFilePath, accounts)

            return { message: 'Transaction successful' };

        } catch (err) {
            throw err;
        }
    }

}

export default new AccountRepo();