/*
  Warnings:

  - You are about to drop the column `expenses` on the `Service` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[navlyId,balanceId,userId]` on the table `NavlyBalance` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name,expenseId,userId]` on the table `Service` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `expenseId` to the `Service` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Service` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Balance_name_idx";

-- DropIndex
DROP INDEX "Navly_name_idx";

-- DropIndex
DROP INDEX "NavlyBalance_navlyId_balanceId_idx";

-- DropIndex
DROP INDEX "NavlyBalance_navlyId_balanceId_key";

-- DropIndex
DROP INDEX "Note_title_idx";

-- DropIndex
DROP INDEX "PaymentService_name_idx";

-- DropIndex
DROP INDEX "TypeNote_name_idx";

-- AlterTable
ALTER TABLE "PaymentService" ADD COLUMN     "description" TEXT;

-- AlterTable
ALTER TABLE "Service" DROP COLUMN "expenses",
ADD COLUMN     "expenseId" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT,
ALTER COLUMN "description" DROP NOT NULL;

-- DropEnum
DROP TYPE "Expenses";

-- CreateTable
CREATE TABLE "Expense" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "Expense_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Expense_name_userId_idx" ON "Expense"("name", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "Expense_name_userId_key" ON "Expense"("name", "userId");

-- CreateIndex
CREATE INDEX "Balance_name_userId_idx" ON "Balance"("name", "userId");

-- CreateIndex
CREATE INDEX "Navly_name_userId_idx" ON "Navly"("name", "userId");

-- CreateIndex
CREATE INDEX "NavlyBalance_navlyId_balanceId_userId_idx" ON "NavlyBalance"("navlyId", "balanceId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "NavlyBalance_navlyId_balanceId_userId_key" ON "NavlyBalance"("navlyId", "balanceId", "userId");

-- CreateIndex
CREATE INDEX "Note_title_userId_idx" ON "Note"("title", "userId");

-- CreateIndex
CREATE INDEX "PaymentService_name_userId_idx" ON "PaymentService"("name", "userId");

-- CreateIndex
CREATE INDEX "Service_expenseId_userId_idx" ON "Service"("expenseId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "Service_name_expenseId_userId_key" ON "Service"("name", "expenseId", "userId");

-- CreateIndex
CREATE INDEX "TypeNote_name_userId_idx" ON "TypeNote"("name", "userId");

-- AddForeignKey
ALTER TABLE "Service" ADD CONSTRAINT "Service_expenseId_fkey" FOREIGN KEY ("expenseId") REFERENCES "Expense"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
