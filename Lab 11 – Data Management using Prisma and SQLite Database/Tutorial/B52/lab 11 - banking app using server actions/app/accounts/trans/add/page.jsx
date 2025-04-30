'use client'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { loadAccountsAction, addTransactionAction } from '@/app/actions/server-actions'



export default function Transactions() {


    const router = useRouter()
    const [accounts, setAccounts] = useState([])

    async function handleLoadAccounts() {
        const filteredAccounts = await loadAccountsAction('All')
        setAccounts(filteredAccounts)
    }

    useEffect(() => {
        handleLoadAccounts()
    }, [])

    return (
        <>
            <h3>Add Transaction</h3>
            <form id="trans-form" action={addTransactionAction} className="form">
                <label htmlFor="accountNo">Account No</label>
                <select name="accountNo" id="accountNo" required>
                    {accounts.map((acct, index) =>
                        <option key={index}
                            value={acct.accountNo}>
                            {acct.accountNo} - {acct.firstname} {acct.lastname} - {acct.balance} QR
                        </option>
                    )}

                </select>

                <label htmlFor="type">Transaction Type</label>
                <select name="transType" id="transType" required>
                    <option value="Deposit">Deposit</option>
                    <option value="Withdraw">Withdraw</option>
                </select>

                <label htmlFor="amount">Amount</label>
                <input type="number" id="amount" name="amount" required />
                <button type="Submit">Submit</button>
            </form>
        </>
    )
}
