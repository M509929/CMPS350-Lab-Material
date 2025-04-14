import accountRepo from "@/app/repo/account-repo";

export async function GET(req, { params }) {
    const accountNo = params.accountNo;
    const account = await accountRepo.getAccount(accountNo);
    return Response.json(account, { status: 200 });

}

export async function DELETE(req, { params }) {
    const accountNo = params.accountNo;
    const message = await accountRepo.deleteAccount(accountNo);
    return Response.json(message, { status: 200 });

}

export async function PUT(req, { params }) {
    const accountNo = params.accountNo;
    const accountUpdates = await req.json();

    const updatedAccount = await accountRepo.updateAccount(accountNo, accountUpdates);
    return Response.json(updatedAccount, { status: 200 });

}