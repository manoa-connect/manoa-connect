-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_email_fkey";

-- DropIndex
DROP INDEX "Profile_email_key";
