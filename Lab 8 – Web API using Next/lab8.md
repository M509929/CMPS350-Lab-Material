# CMPS 350 – Web Development Fundamentals

## **Lab 08 – Web API using Next.js**

### **Objective**

- Develop a Web API using Next.js
- Utilize Next.js routing
- Test the Web API using Postman and Chai HTTP

### **Resources**

- Next.js: Getting Started, Routing Fundamentals, Defining Routes, Route Handlers, and File Conventions
- HTTP response status codes
- Getting Started with Postman

---

## **Part 1 - Bank Web API**

The goal of this exercise is to develop a Web API using Next.js 13.2 for managing a collection of bank accounts and their associated transactions.

### **Project Setup**

1. Create a new folder named `lab08-bank-app` and open it in VS Code.
2. Run the following command to create a Next.js application:
   ```sh
   npx create-next-app@latest --experimental-app
   ```

   - Answer "No" to all setup questions to keep it simple.
3. Start the app using:
   ```sh
   npm run dev
   ```
4. Create a new `data` directory under `lab08-bank-app`, and then add the provided `accounts.json` and `trans.json` files.
   - These files store account and transaction data.

### **Project Structure**

```
lab08-bank-app/
├── data/
│   ├── accounts.json
│   ├── trans.json
├── pages/
├── api/
│   ├── accounts/
│   │   ├── route.js
│   │   ├── accounts-repo.js
```

### **Implementing API Routes**

- Create `accounts-repo.js` under `/api/accounts/` to implement functions to:

  - Retrieve, add, update, and delete accounts in `accounts.json`.
  - Retrieve and add transactions in `trans.json`.
  - Ensure account balances update correctly upon transactions.
- Within the `/api/accounts/` directory, create `route.js` to define and handle the following API routes:

| **Method** | **URL**                             | **Description**                                                  |
| ---------------- | ----------------------------------------- | ---------------------------------------------------------------------- |
| GET              | `/api/accounts/`                        | Returns all accounts. Filters by type if `?type=acctType` is passed. |
| POST             | `/api/accounts`                         | Adds a new account and returns it.                                     |
| GET              | `/api/accounts/:accountNo`              | Returns the account by `accountNo`.                                  |
| PUT              | `/api/accounts/:accountNo`              | Updates the account by `accountNo` and returns it.                   |
| DELETE           | `/api/accounts/:accountNo`              | Deletes the account by `accountNo`.                                  |
| GET              | `/api/accounts/:accountNo/transactions` | Returns all transactions for the account.                              |
| POST             | `/api/accounts/:accountNo/transactions` | Adds a transaction and returns the transaction ID.                     |

### **Key Considerations**

- Account identifiers are **unique and randomly generated** using **Nano ID**.
- Implement a **catch-all route** (`[[...all]]`) to handle invalid routes.
- Use **try...catch** statements to handle errors.
- Return JSON responses with appropriate HTTP status codes using:
  ```js
  Response.json(body, { status: code })
  ```
- Ensure meaningful error messages accompany failed requests.

### **API Testing**

- Test API routes using **Postman**.
- Create a `bank-api.spec.js` file and test the API using **Mocha, Chai, and Chai HTTP**.

**Example API Test (Chai HTTP):**

```js
it("should return all accounts", (done) => {
  chai.request(server)
    .get("/api/accounts")
    .end((err, res) => {
      res.should.have.status(200);
      res.body.should.be.a("array");
      done();
    });
});
```

---

## **Part 2 – Bank Front-end Client**

The goal of this part is to develop a front-end client that interacts with the bank Web API and allows users to manage accounts and transactions.

### **Required Pages**

1. **`accounts.html`**

   - Displays a **table** with all account details.
   - Includes a **drop-down filter** by account type.
   - Provides a **link beside each account** to view transactions.
   - Provides a **link beside each account** to add a new transaction.
   - Includes a **delete button** for accounts with a zero balance (with a confirmation prompt).
2. **`transactions.html`**

   - Displays a **table** of transactions for a particular account.
   - Includes **transaction type, amount, and date**.
3. **`new-account.html`**

   - Provides a **form** to create a new account.
   - Requires input for **account type and initial balance**.
4. **`new-transaction.html`**

   - Provides a **form** to create a new transaction.
   - Requires input for **account number, transaction type, and amount**.
   - Displays a **message when a transaction fails** (e.g., insufficient balance for withdrawals).

### **Front-end Enhancements**

- Use **Bootstrap or TailwindCSS** for improved UI design.
- Display proper **error messages** when transactions fail.
- Validate input fields before sending API requests.
- Implement a **modal confirmation** for account deletions.
