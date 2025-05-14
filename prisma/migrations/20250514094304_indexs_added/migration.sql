-- DropIndex
DROP INDEX "PaymentService_userId_idx";

-- CreateIndex
CREATE INDEX "PaymentDetail_userId_paymentId_paymentServiceId_idx" ON "PaymentDetail"("userId", "paymentId", "paymentServiceId");

-- CreateIndex
CREATE INDEX "PaymentService_userId_serviceId_navlyId_idx" ON "PaymentService"("userId", "serviceId", "navlyId");
