export async function GET(req, { params }) {
    const message = { message: `API endpoint GET http://localhost:3000/api/accounts/${params.accountNo}/transactions` };
    return Response.json(message, { status: 200 });
}

export async function POST(req, { params }) {
    const transaction = await req.json();
    const message = {
        message: `API endpoint POST http://localhost:3000/api/accounts/${params.accountNo}/transactions`,
        transaction
        // transaction: transaction
    };
    return Response.json(message, { status: 200 });
}