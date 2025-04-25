import React from 'react'
// import accountRepo from '@/app/repo/accounts-repo'
// client cannot use server side
//rfc react function component we can call it in the tayout page as <Accounts/>
export default function Accounts() {
  return (
    <>
        <h1>Welcome to /accounts</h1>
    </>
  )
}


/*    
Rules of jsx language:
1-TAGS always should be inside a single parent elment like div inside it h1
2-If an HTML elment attribute is a reserved word in JS,use camelCase
   class---->className
   for--->tmlFor
   onclick--->onClick
   onchange---->onChange
   [only if I am using global css]
   style="background-color:red"-->style={{backgroundColor:'red'}}
*/
