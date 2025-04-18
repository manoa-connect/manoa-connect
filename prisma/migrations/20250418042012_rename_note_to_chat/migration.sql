-- CreateTable
CREATE TABLE "_LikesGiven" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_MatchedProfiles" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_LikesGiven_AB_unique" ON "_LikesGiven"("A", "B");

-- CreateIndex
CREATE INDEX "_LikesGiven_B_index" ON "_LikesGiven"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_MatchedProfiles_AB_unique" ON "_MatchedProfiles"("A", "B");

-- CreateIndex
CREATE INDEX "_MatchedProfiles_B_index" ON "_MatchedProfiles"("B");

-- AddForeignKey
ALTER TABLE "_LikesGiven" ADD CONSTRAINT "_LikesGiven_A_fkey" FOREIGN KEY ("A") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LikesGiven" ADD CONSTRAINT "_LikesGiven_B_fkey" FOREIGN KEY ("B") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MatchedProfiles" ADD CONSTRAINT "_MatchedProfiles_A_fkey" FOREIGN KEY ("A") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MatchedProfiles" ADD CONSTRAINT "_MatchedProfiles_B_fkey" FOREIGN KEY ("B") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
