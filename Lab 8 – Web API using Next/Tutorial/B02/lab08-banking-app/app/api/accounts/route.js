import accountRepo from "@/app/repo/account-repo";

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const { type } = Object.fromEntries(searchParams.entries())
    const accounts = await accountRepo.getAccounts(type);
    return Response.json(accounts, { status: 200 });
}

export async function POST(req) {
    //capture the request body
    const account = await req.json();
    const newAccount = await accountRepo.createAccount(account);
    return Response.json(newAccount, { status: 201 });
}