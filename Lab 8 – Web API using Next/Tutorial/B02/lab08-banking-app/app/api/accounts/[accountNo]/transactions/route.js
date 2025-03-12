import accountRepo from "@/app/repo/account-repo";

export async function GET(req, { params }) {
    const transactions = await accountRepo.getTransactions(params.accountNo);
    return Response.json(transactions, { status: 200 });
}

export async function POST(req) {
    //capture the request body
    const transaction = await req.json();
    const newAccount = await accountRepo.addTransaction(transaction);
    return Response.json(newAccount, { status: 201 });
}