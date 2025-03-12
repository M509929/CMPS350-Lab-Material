import accountRepo from "@/app/repo/account-repo";
export async function GET(req, { params }) {
    const accountNo = params.accountNo;
    const response = await accountRepo.getTransactions(accountNo);
    return Response.json(response, { status: 200 });
}

export async function POST(req, { params }) {
    const transaction = await req.json();
    const response = await accountRepo.addTransaction(transaction);
    return Response.json(response, { status: 201 });
}