// export async function GET(req ,{params}) {
//     const response={message:`API endpoint http://localhost:3000/api/accounts/${params.accountNo}`};
//     return Response.json(response,{status:200});
   
// }
//[accountNo]----->a variable 
//Dynamic routes because the last part could always change

// app/api/accounts/[accountNo]/route.js

// app/api/accounts/[accountNo]/route.js

// export async function GET(req, context) {
//     const params = await context.params;
//     const { accountNo } = params;
  
//     const response = {
//       message: `API endpoint http://localhost:3000/api/accounts/${accountNo}`
//     };
  
//     return Response.json(response, { status: 200 });
//   }

import accountRepo from "@/app/repo/account-repo";


export async function GET(req ,{params}){
    const acccountNo=params.acccountNo;
    // const transaction=await req.json();
    // const message={
    //     message: `API endpoint http://localhost:3000/api/accounts/${params.acccountNo}/transactions`,
    //     transaction
    // }
    const account=await accountRepo.getAccount(acccountNo);
    return Response.json(account,{status:200});
}


export async function PUT(req ,{params}){
  const accountNo=params.accountNo;
  const account =await req.json();
  // const transaction=await req.json();
  // const message={
  //     message: `API endpoint http://localhost:3000/api/accounts/${params.acccountNo}/transactions`,
  //     transaction
  // }
  const update_account=await accountRepo.updateAccount(accountNo,account);
  return Response.json(update_account,{status:200});
}


export async function DELETE(req,{params}){
  const acccountNo=params.accountNo;
  // const transaction=await req.json();
  // const message={
  //     message: `API endpoint http://localhost:3000/api/accounts/${params.acccountNo}/transactions`,
  //     transaction
  // }
  const account=await accountRepo.deleteAccount(acccountNo);
  return Response.json(account,{status:200});
}



//prameters
//links 
//req.json one json object 
// const acccountNo=params.acccountNo; parmeters of the link