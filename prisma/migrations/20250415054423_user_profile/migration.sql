/*
  Warnings:

  - Made the column `year` on table `UserProfile` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "UserProfile" ALTER COLUMN "year" SET NOT NULL;
