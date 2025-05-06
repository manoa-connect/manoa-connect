-- DropForeignKey
ALTER TABLE "Class" DROP CONSTRAINT "Class_email_fkey";

-- AddForeignKey
ALTER TABLE "Class" ADD CONSTRAINT "Class_email_fkey" FOREIGN KEY ("email") REFERENCES "Profile"("email") ON DELETE SET NULL ON UPDATE CASCADE;
