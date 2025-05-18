-- DropForeignKey
ALTER TABLE "NavlyBalance" DROP CONSTRAINT "NavlyBalance_balanceId_fkey";

-- DropForeignKey
ALTER TABLE "NavlyBalance" DROP CONSTRAINT "NavlyBalance_navlyId_fkey";

-- AddForeignKey
ALTER TABLE "NavlyBalance" ADD CONSTRAINT "NavlyBalance_navlyId_fkey" FOREIGN KEY ("navlyId") REFERENCES "Navly"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NavlyBalance" ADD CONSTRAINT "NavlyBalance_balanceId_fkey" FOREIGN KEY ("balanceId") REFERENCES "Balance"("id") ON DELETE CASCADE ON UPDATE CASCADE;
