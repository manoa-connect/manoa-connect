-- CreateEnum
CREATE TYPE "Year" AS ENUM ('freshman', 'sophomore', 'junior', 'senior', 'graduate');

-- AlterTable
ALTER TABLE "UserProfile" ADD COLUMN     "year" "Year";
