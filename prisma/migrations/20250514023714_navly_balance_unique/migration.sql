/*
  Warnings:

  - A unique constraint covering the columns `[navlyId,balanceId]` on the table `NavlyBalance` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "NavlyBalance_balanceId_idx";

-- DropIndex
DROP INDEX "NavlyBalance_navlyId_idx";

-- CreateIndex
CREATE INDEX "NavlyBalance_navlyId_balanceId_idx" ON "NavlyBalance"("navlyId", "balanceId");

-- CreateIndex
CREATE UNIQUE INDEX "NavlyBalance_navlyId_balanceId_key" ON "NavlyBalance"("navlyId", "balanceId");
