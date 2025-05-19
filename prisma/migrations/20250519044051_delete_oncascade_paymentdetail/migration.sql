-- DropForeignKey
ALTER TABLE "PaymentDetail" DROP CONSTRAINT "PaymentDetail_balanceId_fkey";

-- DropForeignKey
ALTER TABLE "PaymentDetail" DROP CONSTRAINT "PaymentDetail_paymentServiceId_fkey";

-- AddForeignKey
ALTER TABLE "PaymentDetail" ADD CONSTRAINT "PaymentDetail_balanceId_fkey" FOREIGN KEY ("balanceId") REFERENCES "Balance"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaymentDetail" ADD CONSTRAINT "PaymentDetail_paymentServiceId_fkey" FOREIGN KEY ("paymentServiceId") REFERENCES "PaymentService"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
