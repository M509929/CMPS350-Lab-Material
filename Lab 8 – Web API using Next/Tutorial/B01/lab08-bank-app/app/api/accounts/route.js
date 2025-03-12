import AccountRepo from "@/app/repo/account-repo";
const accountRepo = new AccountRepo();

export async function GET(req) {

    const { searchParams } = new URL(req.url);
    const { type } = Object.fromEntries(searchParams.entries());

    const accounts = await accountRepo.getAccounts(type);
    return Response.json(accounts, { status: 200 });
}
export async function POST(req) {

    // first capture the modified account
    const newAccount = await req.json();
    const response = await accountRepo.createAccount(newAccount);
    return Response.json(response, { status: 201 });
}

