-- CreateTable
CREATE TABLE "QuizSubmission" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "xScore" REAL NOT NULL,
    "yScore" REAL NOT NULL,
    "answersJson" TEXT NOT NULL,
    "optionalName" TEXT
);
