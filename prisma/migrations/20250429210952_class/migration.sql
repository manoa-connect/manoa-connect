/*
  Warnings:

  - The primary key for the `_LikesGiven` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `_MatchedProfiles` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[A,B]` on the table `_LikesGiven` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[A,B]` on the table `_MatchedProfiles` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "Location" AS ENUM ('ArtBuilding', 'BachmanHall', 'BilgerHall', 'FrearHall', 'GilmoreHall', 'HawaiiHall', 'HemenwayHall', 'HolmesHall', 'JeffersonHall', 'JohnABurnsSchoolofMedicine', 'KellerHall', 'KennedyTheatre', 'KraussHall', 'KuykendallHall', 'LawSchool', 'LincolnHall', 'MarineSciencesBuilding', 'MillerHall', 'MooreHall', 'PacificOceanScienceandTechnology', 'PhysicalScienceBuilding', 'SakamakiHall', 'SaundersHall', 'ShidlerCollegeofBusiness', 'SnyderHall', 'SpaldingHall', 'WatanabeHall', 'WebsterHall', 'Other');

-- AlterTable
ALTER TABLE "_LikesGiven" DROP CONSTRAINT "_LikesGiven_AB_pkey";

-- AlterTable
ALTER TABLE "_MatchedProfiles" DROP CONSTRAINT "_MatchedProfiles_AB_pkey";

-- CreateTable
CREATE TABLE "Class" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "location" "Location" NOT NULL,
    "profileId" INTEGER NOT NULL,

    CONSTRAINT "Class_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "_LikesGiven_AB_unique" ON "_LikesGiven"("A", "B");

-- CreateIndex
CREATE UNIQUE INDEX "_MatchedProfiles_AB_unique" ON "_MatchedProfiles"("A", "B");

-- AddForeignKey
ALTER TABLE "Class" ADD CONSTRAINT "Class_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
