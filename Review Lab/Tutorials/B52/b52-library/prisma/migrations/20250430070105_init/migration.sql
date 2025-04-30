-- CreateTable
CREATE TABLE "author" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "photo" TEXT NOT NULL,
    "bio" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "book" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "genre" TEXT NOT NULL,
    "publishedYear" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "cover" TEXT NOT NULL,
    "authorId" INTEGER NOT NULL,
    CONSTRAINT "book_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "author" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
