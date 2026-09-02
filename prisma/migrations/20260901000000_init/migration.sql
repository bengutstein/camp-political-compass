-- CreateTable
CREATE TABLE "QuizSubmission" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "xScore" DOUBLE PRECISION NOT NULL,
    "yScore" DOUBLE PRECISION NOT NULL,
    "answersJson" TEXT NOT NULL,
    "optionalName" TEXT,

    CONSTRAINT "QuizSubmission_pkey" PRIMARY KEY ("id")
);
