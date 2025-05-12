/*
  Warnings:

  - You are about to drop the column `accountId` on the `Navly` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[navlyId]` on the table `Account` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Navly" DROP CONSTRAINT "Navly_accountId_fkey";

-- DropIndex
DROP INDEX "Account_username_idx";

-- AlterTable
ALTER TABLE "Account" ADD COLUMN     "navlyId" TEXT,
ALTER COLUMN "updatedAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Navly" DROP COLUMN "accountId",
ALTER COLUMN "name" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Account_navlyId_key" ON "Account"("navlyId");

-- CreateIndex
CREATE INDEX "Account_username_userId_navlyId_idx" ON "Account"("username", "userId", "navlyId");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_navlyId_fkey" FOREIGN KEY ("navlyId") REFERENCES "Navly"("id") ON DELETE SET NULL ON UPDATE CASCADE;
