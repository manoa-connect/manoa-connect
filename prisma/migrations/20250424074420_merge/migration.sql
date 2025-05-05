-- CreateEnum
CREATE TYPE "Commute" AS ENUM ('Dorm', 'Commuter', 'Other');

-- CreateEnum
CREATE TYPE "Year" AS ENUM ('Freshman', 'Sophomore', 'Junior', 'Senior', 'Graduate');

-- AlterTable
ALTER TABLE "Stuff" ALTER COLUMN "condition" SET DEFAULT 'good';

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "firstName" TEXT NOT NULL DEFAULT 'First',
ADD COLUMN     "lastName" TEXT NOT NULL DEFAULT 'Last';

-- CreateTable
CREATE TABLE "Chat" (
    "id" SERIAL NOT NULL,
    "contactId" INTEGER NOT NULL,
    "chat" TEXT NOT NULL,
    "owner" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Chat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Profile" (
    "id" SERIAL NOT NULL,
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

-- CreateTable
CREATE TABLE "_LikesGiven" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_LikesGiven_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_MatchedProfiles" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_MatchedProfiles_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Profile_email_key" ON "Profile"("email");

-- CreateIndex
CREATE INDEX "_LikesGiven_B_index" ON "_LikesGiven"("B");

-- CreateIndex
CREATE INDEX "_MatchedProfiles_B_index" ON "_MatchedProfiles"("B");

-- AddForeignKey
ALTER TABLE "Chat" ADD CONSTRAINT "Chat_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_email_fkey" FOREIGN KEY ("email") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LikesGiven" ADD CONSTRAINT "_LikesGiven_A_fkey" FOREIGN KEY ("A") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LikesGiven" ADD CONSTRAINT "_LikesGiven_B_fkey" FOREIGN KEY ("B") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MatchedProfiles" ADD CONSTRAINT "_MatchedProfiles_A_fkey" FOREIGN KEY ("A") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MatchedProfiles" ADD CONSTRAINT "_MatchedProfiles_B_fkey" FOREIGN KEY ("B") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
