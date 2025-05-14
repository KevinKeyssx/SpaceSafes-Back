/*
  Warnings:

  - You are about to drop the column `status` on the `PaymentService` table. All the data in the column will be lost.
  - Added the required column `status` to the `PaymentDetail` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PaymentDetail" ADD COLUMN     "status" "StatusPayment" NOT NULL;

-- AlterTable
ALTER TABLE "PaymentService" DROP COLUMN "status";
