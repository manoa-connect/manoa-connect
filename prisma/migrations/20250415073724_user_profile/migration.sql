/*
  Warnings:

  - A unique constraint covering the columns `[owner]` on the table `Stuff` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Stuff_owner_key" ON "Stuff"("owner");
