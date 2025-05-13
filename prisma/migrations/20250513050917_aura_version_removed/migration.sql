/*
  Warnings:

  - The values [Aura] on the enum `TypeCard` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `version` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `version` on the `Balance` table. All the data in the column will be lost.
  - You are about to drop the column `version` on the `Navly` table. All the data in the column will be lost.
  - You are about to drop the column `version` on the `Note` table. All the data in the column will be lost.
  - You are about to drop the column `version` on the `PaymentDetail` table. All the data in the column will be lost.
  - You are about to drop the column `version` on the `PaymentService` table. All the data in the column will be lost.
  - You are about to drop the column `version` on the `TypeNote` table. All the data in the column will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "TypeCard_new" AS ENUM ('VISA', 'VISA_ELECTRON', 'MASTERCARD', 'AMERICAN_EXPRESS', 'DISCOVER', 'JCB', 'DINERS_CLUB', 'UNIONPAY', 'MAESTRO', 'ELO', 'HIPERCARD', 'AURA');
ALTER TABLE "Balance" ALTER COLUMN "typeCard" TYPE "TypeCard_new" USING ("typeCard"::text::"TypeCard_new");
ALTER TYPE "TypeCard" RENAME TO "TypeCard_old";
ALTER TYPE "TypeCard_new" RENAME TO "TypeCard";
DROP TYPE "TypeCard_old";
COMMIT;

-- AlterTable
ALTER TABLE "Account" DROP COLUMN "version";

-- AlterTable
ALTER TABLE "Balance" DROP COLUMN "version";

-- AlterTable
ALTER TABLE "Navly" DROP COLUMN "version";

-- AlterTable
ALTER TABLE "Note" DROP COLUMN "version";

-- AlterTable
ALTER TABLE "PaymentDetail" DROP COLUMN "version";

-- AlterTable
ALTER TABLE "PaymentService" DROP COLUMN "version";

-- AlterTable
ALTER TABLE "TypeNote" DROP COLUMN "version";
