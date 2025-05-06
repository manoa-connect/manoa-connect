-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- CreateEnum
CREATE TYPE "Condition" AS ENUM ('excellent', 'good', 'fair', 'poor');

-- CreateEnum
CREATE TYPE "Commute" AS ENUM ('Dorm', 'Commuter', 'Other');

-- CreateEnum
CREATE TYPE "Year" AS ENUM ('Freshman', 'Sophomore', 'Junior', 'Senior', 'Graduate');

-- CreateEnum
CREATE TYPE "Location" AS ENUM ('ArchitectureSchool', 'AgriculturalScience', 'ArtBuilding', 'BachmanHall', 'BilgerHall', 'BiomedicalSciences', 'BurnsHall', 'CenterforKoreanStudies', 'CrawfordHall', 'DanceBuilding', 'DeanHall', 'EdmondsonHall', 'FrearHall', 'GartleyHall', 'GeorgeHall', 'GilmoreHall', 'HawaiiHall', 'HemenwayHall', 'HenkeHall', 'HolmesHall', 'InformationTechnologyCenter', 'JeffersonHall', 'JohnsonHall', 'JohnABurnsSchoolofMedicine', 'KamakakuokalaniCenterforHawaiianStudies', 'KellerHall', 'KennedyTheatre', 'KraussHall', 'KuykendallHall', 'LawSchool', 'LincolnHall', 'MarineSciencesBuilding', 'MillerHall', 'MooreHall', 'MusicBuildingComplex', 'PacificBiosciencesResearchCenter', 'PacificOceanScienceandTechnology', 'PhysicalPlantBuilding', 'PhysicalScienceBuilding', 'PopeLaboratory', 'SakamakiHall', 'SaundersHall', 'ShermanLaboratory', 'ShidlerCollegeofBusiness', 'SnyderHall', 'SpaldingHall', 'StJohnPlantScienceLab', 'WatanabeHall', 'WebsterHall', 'Other');

-- CreateEnum
CREATE TYPE "Days" AS ENUM ('M', 'T', 'W', 'R', 'F', 'Other');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL DEFAULT 'First',
    "lastName" TEXT NOT NULL DEFAULT 'Last',
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Stuff" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "condition" "Condition" NOT NULL DEFAULT 'good',
    "owner" TEXT NOT NULL,

    CONSTRAINT "Stuff_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Chat" (
    "id" SERIAL NOT NULL,
    "contactId" INTEGER NOT NULL,
    "chat" TEXT NOT NULL,
    "owner" TEXT NOT NULL,
    "isRead" BOOLEAN NOT NULL DEFAULT false,
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
    "clubs" TEXT NOT NULL,
    "languages" TEXT NOT NULL,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Class" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "startTime" TEXT NOT NULL,
    "endTime" TEXT NOT NULL,
    "location" "Location" NOT NULL,
    "days" "Days"[],
    "email" TEXT NOT NULL,

    CONSTRAINT "Class_pkey" PRIMARY KEY ("id")
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
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

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
ALTER TABLE "Class" ADD CONSTRAINT "Class_email_fkey" FOREIGN KEY ("email") REFERENCES "Profile"("email") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LikesGiven" ADD CONSTRAINT "_LikesGiven_A_fkey" FOREIGN KEY ("A") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LikesGiven" ADD CONSTRAINT "_LikesGiven_B_fkey" FOREIGN KEY ("B") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MatchedProfiles" ADD CONSTRAINT "_MatchedProfiles_A_fkey" FOREIGN KEY ("A") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MatchedProfiles" ADD CONSTRAINT "_MatchedProfiles_B_fkey" FOREIGN KEY ("B") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
