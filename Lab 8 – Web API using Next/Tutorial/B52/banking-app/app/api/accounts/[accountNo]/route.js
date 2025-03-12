import accountRepo from "@/app/repo/account-repo"

export async function GET(req, { params }) {
    const response = await accountRepo.getAccount(params.accountNo)
    return Response.json(response, { status: 200 })
}

export async function PUT(req, { params }) {
    const accountNo = params.accountNo;
    const account = await req.json();
    const response = await accountRepo.updateAccount(accountNo, account);
    return Response.json(response, { status: 200 })
}

export async function DELETE(req, { params }) {
    const accountNo = params.accountNo;
    const response = await accountRepo.deleteAccount(accountNo);
    return Response.json(response, { status: 200 })
}