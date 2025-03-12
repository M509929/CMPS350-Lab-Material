import AccountRepo from "@/app/repo/account-repo";
const accountRepo = new AccountRepo();

export async function GET(req, { params }) {
    return Response.json({ message: `/api/accounts/${params.accountNo}/transactions` });
}
export async function POST(req, { params }) {
    const newTransaction = await req.json();
    const response = await accountRepo.addTransaction(newTransaction);
    return Response.json(response, { status: 201 });
}

