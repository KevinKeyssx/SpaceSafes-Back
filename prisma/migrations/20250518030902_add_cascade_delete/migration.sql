-- DropForeignKey
ALTER TABLE "PaymentDetail" DROP CONSTRAINT "PaymentDetail_balanceId_fkey";

-- DropForeignKey
ALTER TABLE "PaymentDetail" DROP CONSTRAINT "PaymentDetail_paymentServiceId_fkey";

-- DropForeignKey
ALTER TABLE "PaymentService" DROP CONSTRAINT "PaymentService_navlyId_fkey";

-- DropForeignKey
ALTER TABLE "PaymentService" DROP CONSTRAINT "PaymentService_serviceId_fkey";

-- DropForeignKey
ALTER TABLE "Service" DROP CONSTRAINT "Service_expenseId_fkey";

-- AddForeignKey
ALTER TABLE "Service" ADD CONSTRAINT "Service_expenseId_fkey" FOREIGN KEY ("expenseId") REFERENCES "Expense"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaymentService" ADD CONSTRAINT "PaymentService_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaymentService" ADD CONSTRAINT "PaymentService_navlyId_fkey" FOREIGN KEY ("navlyId") REFERENCES "Navly"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaymentDetail" ADD CONSTRAINT "PaymentDetail_balanceId_fkey" FOREIGN KEY ("balanceId") REFERENCES "Balance"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaymentDetail" ADD CONSTRAINT "PaymentDetail_paymentServiceId_fkey" FOREIGN KEY ("paymentServiceId") REFERENCES "PaymentService"("id") ON DELETE CASCADE ON UPDATE CASCADE;
