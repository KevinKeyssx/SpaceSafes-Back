/*
  Warnings:

  - You are about to drop the column `balanceId` on the `PaymentService` table. All the data in the column will be lost.
  - Added the required column `balanceId` to the `PaymentDetail` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "PaymentService" DROP CONSTRAINT "PaymentService_balanceId_fkey";

-- AlterTable
ALTER TABLE "PaymentDetail" ADD COLUMN     "balanceId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "PaymentService" DROP COLUMN "balanceId";

-- AddForeignKey
ALTER TABLE "PaymentDetail" ADD CONSTRAINT "PaymentDetail_balanceId_fkey" FOREIGN KEY ("balanceId") REFERENCES "Balance"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
