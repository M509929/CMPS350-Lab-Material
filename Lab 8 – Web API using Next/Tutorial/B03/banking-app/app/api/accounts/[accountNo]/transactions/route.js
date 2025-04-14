import accountRepo from "@/app/repo/account-repo";

export async function GET(req, { params }) {
    const accountNo = params.accountNo;
    const transactions = await accountRepo.getTransactions(accountNo);
    return Response.json(transactions, { status: 200 });
}

export async function POST(req, { params }) {
    const transaction = await req.json();
    const newTransaction = await accountRepo.addTransaction(transaction);
    return Response.json(newTransaction, { status: 201 });
}