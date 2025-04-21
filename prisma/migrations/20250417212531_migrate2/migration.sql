-- CreateEnum
CREATE TYPE "Commute" AS ENUM ('Dorm', 'Commute', 'Other');

-- CreateEnum
CREATE TYPE "Year" AS ENUM ('freshman', 'sophomore', 'junior', 'senior', 'graduate');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "firstName" TEXT NOT NULL DEFAULT 'first',
ADD COLUMN     "lastName" TEXT NOT NULL DEFAULT 'last';

-- CreateTable
CREATE TABLE "Profile" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "year" "Year" NOT NULL,
    "major" TEXT NOT NULL,
    "likes" TEXT NOT NULL,
    "mbti" TEXT NOT NULL,
    "commute" "Commute" NOT NULL,
    "current" TEXT NOT NULL,
    "previous" TEXT NOT NULL,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Profile_userId_key" ON "Profile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_email_key" ON "Profile"("email");

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_email_fkey" FOREIGN KEY ("email") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
