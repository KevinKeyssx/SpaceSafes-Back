/*
  Warnings:

  - You are about to drop the column `navlyId` on the `Account` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Account" DROP CONSTRAINT "Account_navlyId_fkey";

-- DropIndex
DROP INDEX "Account_navlyId_key";

-- DropIndex
DROP INDEX "Account_username_userId_navlyId_idx";

-- AlterTable
ALTER TABLE "Account" DROP COLUMN "navlyId",
ADD COLUMN     "isFavorite" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "name" TEXT;

-- AlterTable
ALTER TABLE "Navly" ADD COLUMN     "accountId" TEXT,
ADD COLUMN     "isFavorite" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "lastViewed" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "stars" INTEGER NOT NULL DEFAULT 0;

-- CreateIndex
CREATE INDEX "Account_username_userId_idx" ON "Account"("username", "userId");

-- AddForeignKey
ALTER TABLE "Navly" ADD CONSTRAINT "Navly_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE SET NULL ON UPDATE CASCADE;
