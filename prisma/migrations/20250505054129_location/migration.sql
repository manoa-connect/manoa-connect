-- CreateEnum
CREATE TYPE "Days" AS ENUM ('M', 'T', 'W', 'R', 'F');

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "Location" ADD VALUE 'ArchitectureSchool';
ALTER TYPE "Location" ADD VALUE 'AgriculturalScience';
ALTER TYPE "Location" ADD VALUE 'BiomedicalSciences';
ALTER TYPE "Location" ADD VALUE 'BurnsHall';
ALTER TYPE "Location" ADD VALUE 'CenterforKoreanStudies';
ALTER TYPE "Location" ADD VALUE 'CrawfordHall';
ALTER TYPE "Location" ADD VALUE 'DanceBuilding';
ALTER TYPE "Location" ADD VALUE 'DeanHall';
ALTER TYPE "Location" ADD VALUE 'EdmondsonHall';
ALTER TYPE "Location" ADD VALUE 'GartleyHall';
ALTER TYPE "Location" ADD VALUE 'GeorgeHall';
ALTER TYPE "Location" ADD VALUE 'HenkeHall';
ALTER TYPE "Location" ADD VALUE 'InformationTechnologyCenter';
ALTER TYPE "Location" ADD VALUE 'JohnsonHall';
ALTER TYPE "Location" ADD VALUE 'KamakakuokalaniCenterforHawaiianStudies';
ALTER TYPE "Location" ADD VALUE 'MusicBuildingComplex';
ALTER TYPE "Location" ADD VALUE 'PacificBiosciencesResearchCenter';
ALTER TYPE "Location" ADD VALUE 'PhysicalPlantBuilding';
ALTER TYPE "Location" ADD VALUE 'PopeLaboratory';
ALTER TYPE "Location" ADD VALUE 'ShermanLaboratory';
ALTER TYPE "Location" ADD VALUE 'StJohnPlantScienceLab';

-- AlterTable
ALTER TABLE "Class" ADD COLUMN     "days" "Days"[];
