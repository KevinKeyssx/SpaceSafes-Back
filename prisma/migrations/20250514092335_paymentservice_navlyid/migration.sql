/*
  Warnings:

  - You are about to drop the column `navlyBalanceId` on the `PaymentService` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "PaymentService" DROP CONSTRAINT "PaymentService_navlyBalanceId_fkey";

-- AlterTable
ALTER TABLE "PaymentService" DROP COLUMN "navlyBalanceId",
ADD COLUMN     "navlyId" TEXT;

-- AddForeignKey
ALTER TABLE "PaymentService" ADD CONSTRAINT "PaymentService_navlyId_fkey" FOREIGN KEY ("navlyId") REFERENCES "Navly"("id") ON DELETE SET NULL ON UPDATE CASCADE;
