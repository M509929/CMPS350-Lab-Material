'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import accountsRepo from '@/app/repo/accounts-repo';


function removeServerActionProperty(data) {
    // this is a helper function to remove the $ACTION_ID_ prefix from the keys
    for (const key in data) {
        if (key.startsWith('$ACTION_ID_')) {
            delete data[key];
            break
        }
    }

    return data
}
export async function loadAccountsAction(acctType) {
    const accounts = await accountsRepo.getAccounts(acctType);
    return accounts;
}


export async function addOrEditAccountAction(formData) {
    let account = Object.fromEntries(formData);
    account = removeServerActionProperty(account)

    account.balance = parseFloat(account.balance)
    if (account.accountNo !== '') {
        await accountsRepo.updateAccount(account.accountNo, account);
        console.log('updating account', account.accountNo);

    }
    else
        await accountsRepo.addAccount(account);

    redirect('/')
}

export async function deleteAccountAction(accountNo) {
    console.log('deleting account', accountNo);

    const response = await accountsRepo.deleteAccount(accountNo);
    revalidatePath('/');
}

export async function addTransactionAction(formData) {
    let transaction = Object.fromEntries(formData)
    transaction.amount = parseFloat(transaction.amount)

    transaction = removeServerActionProperty(transaction)
    await accountsRepo.addTransaction(transaction.accountNo, transaction);

    revalidatePath('/');
    redirect('/')
}