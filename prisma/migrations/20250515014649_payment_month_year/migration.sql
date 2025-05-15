/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `date` on the `Payment` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[month,year,userId]` on the table `Payment` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `month` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `year` to the `Payment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Payment" DROP COLUMN "createdAt",
DROP COLUMN "date",
ADD COLUMN     "month" INTEGER NOT NULL,
ADD COLUMN     "year" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Payment_month_year_userId_key" ON "Payment"("month", "year", "userId");
