
import accountRepo from "@/app/repo/account-repo";

//body should have accountNo
//"body" in an API request?
// In a POST (or PUT, PATCH) request, the body is the part of the request where the client (frontend or another service) sends data to the server.
// params	Data from the URL (e.g., 123 from /accounts/123/transactions)
// body	Data from the request content (e.g., transaction details like amount, type)
// req.json()	Method to read the request body and convert it into a JavaScript object

//Creating user interface libraray for user interface
export async function GET(req ,{params}){
    const accountNo=params.accountNo;
    const account=await accountRepo.getTransactions(accountNo);
    return Response.json(account , {status:200});
}


export async function POST(req ,{params}){
    const transaction=await req.json();
    const newTransaction=await accountRepo.addTransaction(transaction);
    return Response.json(newTransaction , {status:201});
    
}
