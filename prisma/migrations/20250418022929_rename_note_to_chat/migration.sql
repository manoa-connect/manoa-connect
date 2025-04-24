/*
  Warnings:

  - You are about to drop the column `note` on the `Chat` table. All the data in the column will be lost.
  - Added the required column `chat` to the `Chat` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Chat" DROP COLUMN "note",
ADD COLUMN     "chat" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "firstName" DROP NOT NULL,
ALTER COLUMN "lastName" DROP NOT NULL;
