import accountRepo from "@/app/repo/account-repo";

export async function GET(req, { params }) {
    const account = await accountRepo.getAccount(params.accountNo);
    return Response.json(account, { status: 200 });
}

export async function DELETE(req, { params }) {
    const response = await accountRepo.deleteAccount(params.accountNo);
    return Response.json(response, { status: 200 });
}

export async function PUT(req, { params }) {
    const accountUpdates = await req.json();
    const updatedAccount = await accountRepo.updateAccount(params.accountNo, accountUpdates);
    return Response.json(updatedAccount, { status: 200 });
}