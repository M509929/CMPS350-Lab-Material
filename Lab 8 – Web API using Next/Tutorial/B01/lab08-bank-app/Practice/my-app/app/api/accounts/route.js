import accountRepo from "@/app/repo/account-repo";

export async function GET(req) {
    const {searchParams}=new URL(req.url); //https://localhost:3000....../accounts?type=saving
    //one entity
    // const userQuery=searchParams.get('type');
    const type=searchParams.get('type');
    // //all entities
    // const allusers=Object.fromEntries(searchParams);
    const accounts=await accountRepo.getAccounts(type);
    return Response.json(accounts, {
        status: 200});
    
    
    }  
      //200 status code (indicating success). return to the user
    
    //Server creates a JavaScript object:
    // const response={ message:'API endpoint http://localhost:3000/api/accounts',allusers: allusers};
    //Server converts it to JSON using Response.json():
    //could be an array
    // const response=[
    //     { id:1,name:'Ali'},
    //     { id:2,name:'Mohammed'}
    // ]
 
// Receives a GET request with a query like ?type=admin.
// Reads the type value.
// Sends back a JSON object with a message and the type.
// It's a simple way to test or simulate an API returning dynamic data based on user input.

// Step 1: Define an asynchronous function to handle GET requests to the API endpoint
// Step 2: Create a response js object with the data to be returned (e.g., message)
// Step 3: Return the response object as JSON format, with an HTTP status code of 200 (OK)
//----------------------------------------------------------------------------------------//
// Step 1: Client sends a GET request to the server at /api
// Step 2: Server receives the GET request and runs the corresponding handler
// Step 3: Server creates a JavaScript object with the response data
// Step 4: Server converts the object to a JSON string using Response.json()
// Step 5: Server sends the JSON response back to the client
// Step 6: Client receives the response from the server
// Step 7: Client parses the JSON string into a JavaScript object using response.json()
// Step 8: Client uses or displays the data (e.g., shows it in the console or UI)


//POST for adding new like adding new account
export async function POST(req) {
    const account=await req.json();
    const newAcc=await accountRepo.createAccount(account);
    // const response={ message:'API endpoint http://localhost:3000/api/accounts'}
    return Response.json(newAcc,{status:201}); //status:201 for creating
}

//put for update
// export async function PUT(req) {
//     const response={ message:'API endpoint http://localhost:3000/api/accounts'}
//     return Response.json(response,{status:200});
// }

// //delete for delete
// export async function DELETE(req) {
//     const response={ message:'API endpoint http://localhost:3000/api/accounts'}
//     return Response.json(response,{status:200});
// }


// const person={
//     name: 'Jhon',
//     age:30 ,
//     adress:"doha"

// }
// const {adress} =person;




//Methods in the pdf
