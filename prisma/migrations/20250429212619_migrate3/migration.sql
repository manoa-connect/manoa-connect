/*
  Warnings:

  - You are about to drop the column `profileId` on the `Class` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `Class` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `Class` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Class" DROP CONSTRAINT "Class_profileId_fkey";

-- AlterTable
ALTER TABLE "Class" DROP COLUMN "profileId",
ADD COLUMN     "email" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Class_email_key" ON "Class"("email");

-- AddForeignKey
ALTER TABLE "Class" ADD CONSTRAINT "Class_email_fkey" FOREIGN KEY ("email") REFERENCES "Profile"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
