/*
  Warnings:

  - The values [Dorm,Commuter,Other] on the enum `Commute` will be removed. If these variants are still used in the database, this will fail.
  - The values [Freshman,Sophomore,Junior,Senior,Graduate] on the enum `Year` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `userId` on the `Profile` table. All the data in the column will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Commute_new" AS ENUM ('dorm', 'commuter', 'other');
ALTER TABLE "Profile" ALTER COLUMN "commute" TYPE "Commute_new" USING ("commute"::text::"Commute_new");
ALTER TYPE "Commute" RENAME TO "Commute_old";
ALTER TYPE "Commute_new" RENAME TO "Commute";
DROP TYPE "Commute_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "Year_new" AS ENUM ('freshman', 'sophomore', 'junior', 'senior', 'graduate');
ALTER TABLE "Profile" ALTER COLUMN "year" TYPE "Year_new" USING ("year"::text::"Year_new");
ALTER TYPE "Year" RENAME TO "Year_old";
ALTER TYPE "Year_new" RENAME TO "Year";
DROP TYPE "Year_old";
COMMIT;

-- DropIndex
DROP INDEX "Profile_userId_key";

-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "userId";
