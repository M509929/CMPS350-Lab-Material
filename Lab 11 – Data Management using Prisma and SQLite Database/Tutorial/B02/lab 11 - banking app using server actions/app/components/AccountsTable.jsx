'use client'
import React from 'react'
import AccountRow from './AccountRow'
import { useState } from 'react'
import { loadAccountsAction, deleteAccountAction } from '@/app/actions/server-actions'


export default function AccountsTable({ initialAccounts }) {
    const [accounts, setAccounts] = useState(initialAccounts)
    const [acctType, setAcctType] = useState("All")

    async function handleLoadAccounts(type) {
        const filteredAccounts = await loadAccountsAction(type)
        setAccounts(filteredAccounts)
        setAcctType(type)
    }
    async function handleDeleteAccount(accountNo) {
        if (!confirm('Are you sure you want to delete this account?')) return
        await deleteAccountAction(accountNo)
        handleLoadAccounts(acctType)
        // alert('Account deleted successfully ' + accountNo + 'current type is ' + acctType)
    }

    return (
        <>
            <label htmlFor="acctType">
                Account Type
            </label>
            <select id="acctType" onChange={e => handleLoadAccounts(e.target.value)} className="filter-dropdown">
                <option value="All">All</option>
                <option value="Saving">Saving</option>
                <option value="Current">Current</option>
            </select>
            <table id="accounts">
                <thead>
                    <tr>
                        <th>Profile Image</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Gender</th>
                        <th>Account No</th>
                        <th>Account Type</th>
                        <th>Balance</th>
                        <th>Email</th>
                        <th>Date Opened</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        accounts.map((acct, index) =>
                            <AccountRow
                                key={index}
                                acct={acct}
                                onDeleteAccount={handleDeleteAccount}
                            />
                        )}
                </tbody>
            </table>
        </>
    )
}
