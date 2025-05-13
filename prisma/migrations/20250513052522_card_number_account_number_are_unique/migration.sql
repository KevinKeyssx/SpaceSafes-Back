/*
  Warnings:

  - A unique constraint covering the columns `[cardNumber]` on the table `Balance` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[accountNumber]` on the table `Balance` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Balance_cardNumber_key" ON "Balance"("cardNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Balance_accountNumber_key" ON "Balance"("accountNumber");
