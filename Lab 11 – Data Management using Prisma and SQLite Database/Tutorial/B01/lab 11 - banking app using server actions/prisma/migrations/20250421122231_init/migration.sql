-- CreateTable
CREATE TABLE "account" (
    "accountNo" TEXT NOT NULL PRIMARY KEY,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "acctType" TEXT NOT NULL,
    "balance" REAL NOT NULL,
    "email" TEXT NOT NULL,
    "dateOpened" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "minimumBalance" REAL DEFAULT 0,
    "profileImage" TEXT
);

-- CreateTable
CREATE TABLE "transaction" (
    "transId" TEXT NOT NULL PRIMARY KEY,
    "accountNo" TEXT NOT NULL,
    "transType" TEXT NOT NULL,
    "amount" REAL NOT NULL,
    "accountBalance" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "transaction_accountNo_fkey" FOREIGN KEY ("accountNo") REFERENCES "account" ("accountNo") ON DELETE RESTRICT ON UPDATE CASCADE
);
