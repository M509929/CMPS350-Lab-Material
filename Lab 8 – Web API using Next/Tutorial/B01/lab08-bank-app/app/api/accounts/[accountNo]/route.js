//GET THE RECORDS
import AccountRepo from "@/app/repo/account-repo";
const accountRepo = new AccountRepo();

export async function GET(req, { params }) {

    const accountNo = params.accountNo;
    const account = await accountRepo.getAccount(accountNo);
    return Response.json(account, { status: 200 });

}
// UPDATE EXISTING RECORD
export async function PUT(req, { params }) {
    const { accountNo } = params;
    const modifiedAccount = await req.json();
    const response = await accountRepo.updateAccount(accountNo, modifiedAccount);
    return Response.json(response, { status: 200 });

}
// DELETE RECORD
export async function DELETE(req, { params }) {
    const { accountNo } = params;
    const response = await accountRepo.deleteAccount(accountNo);
    return Response.json(response, { status: 200 });
}