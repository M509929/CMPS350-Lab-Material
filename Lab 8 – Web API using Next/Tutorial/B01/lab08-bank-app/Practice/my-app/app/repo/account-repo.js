import fse from 'fs-extra';
import path from 'path';
import { nanoid } from 'nanoid';
//nanoid id for the accouns
class AccountRepo {
    constructor() {
        //cwm current working directory
        this.accountFilePath = path.join(process.cwd(), 'app/data/accounts.json'); //path for json file
        this.transactionFilePath = path.join(process.cwd(), 'app/data/transactions.json');
    }

    // we will create a helper method to save the accounts to the file

    async saveAccounts(accounts) {
        await fse.writeJson(this.accountFilePath, accounts); //write to json file using path 
    }
    async saveTransactions(transactions) {
        await fse.writeJson(this.transactionFilePath, transactions);
    }
    
// Action Keeps old data?	Adds new data?	Deletes existing data?
// Overwrite	❌ No	✅ Yes	               ✅ Yes
// Append	    ✅ Yes	✅ Yes	               ❌ No


    //get account type  saving or current
    async getAccounts(type) {
        const accounts = await fse.readJson(this.accountFilePath);
        if (type) {
            return accounts.filter(account => account.acctType.toLowerCase() == type.toLowerCase());
        }
        return accounts;
    }
//     1️⃣ const accounts = await fse.readJson(this.accountFilePath);
// This reads the entire JSON file (accounts.json) and loads it into the accounts variable.

// It waits (await) for the file to finish loading.

// accounts will now be an array of account objects, like:
// [
//   { acctType: "savings", name: "Ali" },
//   { acctType: "checking", name: "Sara" },
//   ...
// ]
// 2️⃣ if (type) { ... }
// This checks if a type argument was passed into the function.

// If yes → it filters the list.

// If no → it returns all accounts.

// 3️⃣ return accounts.filter(account => account.acctType.toLowerCase() == type.toLowerCase());
// This filters the accounts list to only return those that match the type provided.

// Example: If you called getAccounts("savings"), it would return only the accounts where acctType is "savings".

// It uses .toLowerCase() to make it case-insensitive (so "Savings", "SAVINGS", or "savings" all match).

// 4️⃣ return accounts;
// If no type was provided, it just returns all accounts.



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
    // await updateAccount("12345", { balance: 2000 });

    // [
    //     { accountNo: "12345", name: "Ali", balance: 1000, type: "savings" },
    //     { accountNo: "67890", name: "Sara", balance: 1500, type: "checking" }
    //   ]

    // accounts[index] = {
    //     ...{ accountNo: "12345", name: "Ali", balance: 1000, type: "savings" }, // existing data
    //     ...{ balance: 2000 } // new data
    //   };
      
      

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
            await fse.writeJson(this.accountFilePath, accounts); // ← fixed!
    
            return { message: 'Transaction successful' };
    
        } catch (err) {
            throw err;
        }
    }
}    
export default new AccountRepo();
