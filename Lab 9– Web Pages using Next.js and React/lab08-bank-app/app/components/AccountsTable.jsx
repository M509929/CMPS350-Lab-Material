

"use client";
import {React ,useState} from 'react'



//props is an object 

export default function AccountsTable({initialAccounts}) {
    const[accounts,setAccounts]=useState(initialAccounts);
    async function handleDeleteAccount(accountNo) {
        if(!confirm('Are you sure you want to delete this account?')){
            return ;
        }
        const BASE_URL= `http://localhost:3000/api/accounts?type=${accountNo}`;
        const response=await fetch(BASE_URL,{method:'DELETE'});
        handleLoadAccounts('All');
    }

    async function handleLoadAccounts(type) {
        
        //to get type we will get it from api server side
        const BASE_URL =`http://localhost:3000/api/accounts?type=${type}` //this js script code 
        const response=await fetch(BASE_URL);
        const filteredAccounts=await response.json();
        setAccounts(filteredAccounts);
        
    }
    
  
    return (
        <>
         <label htmlFor="acctType">
            Account Type
        </label>
        <select id="acctType" onChange={e=>handleLoadAccounts(e.target.value)} className="filter-dropdown">
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
        {accounts.map((acct) => (
          <tr key={acct.accountNo} id={"row-" + acct.accountNo}>
            <td>
              <img
                src={acct.profileImage}
                alt="Profile Image"
                className="profile-pic"
              />
            </td>
            <td>{acct.firstname}</td>
            <td>{acct.lastname}</td>
            <td>{acct.gender}</td>
            <td>{acct.accountNo}</td>
            <td>{acct.acctType}</td>
            <td>{acct.balance} QR</td>
            <td>{acct.email}</td>
            <td>{acct.dateOpened}</td>
            <td>
              {acct.balance >= 0 ? (
                <button
                  onClick={e => handleDeleteAccount(acct.accountNo)}
                  className="btn-delete"
                >
                  <i className="fas fa-trash">Delete</i>
                </button>
              ) : (
                ""
              )}
              <button
                onClick={() => handleEditAccount(acct.accountNo)}
                className="btn-edit"
              >
                <i className="fas fa-edit">Edit</i>
              </button>
            </td>
          </tr>
        ))}
        </tbody>
        
      </table>
        </>
      
    );
  }
  
   

 //always remove `` and dollar sign