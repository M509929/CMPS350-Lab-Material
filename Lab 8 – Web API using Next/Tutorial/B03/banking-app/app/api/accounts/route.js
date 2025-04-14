import accountRepo from "@/app/repo/account-repo";
export async function GET(req) {
    // type = saving
    const { searchParams } = new URL(req.url);  //http://localhost:3000/api/accounts?type=saving
    const type = searchParams.get('type'); // saving

    // const allQuery = Object.fromEntries(searchParams.entries());
    const accounts = await accountRepo.getAccounts(type);
    return Response.json(accounts, { status: 200 });
}

// adding a new content [add a new account]
export async function POST(req) {
    const account = await req.json();
    const newAccount = await accountRepo.createAccount(account);
    return Response.json(newAccount, { status: 201 });

}



// const person = {
//     name: 'John',
//     age: 30,
//     address: {
//         city: 'New York',
//         state: 'NY'
//     }
// }

// const {address} = person;