-- CreateEnum
CREATE TYPE "Major" AS ENUM ('computerscience', 'business', 'engineering', 'arts', 'sciences', 'socialsciences');

-- AlterTable
ALTER TABLE "Stuff" ALTER COLUMN "condition" SET DEFAULT 'good';

-- CreateTable
CREATE TABLE "UserProfile" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "major" "Major" NOT NULL,
    "owner" TEXT NOT NULL,

    CONSTRAINT "UserProfile_pkey" PRIMARY KEY ("id")
);
