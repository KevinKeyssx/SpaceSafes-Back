/*
  Warnings:

  - You are about to drop the column `name` on the `PaymentService` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "PaymentService_name_userId_idx";

-- AlterTable
ALTER TABLE "PaymentService" DROP COLUMN "name";

-- CreateIndex
CREATE INDEX "PaymentService_userId_idx" ON "PaymentService"("userId");
