/*
  Warnings:

  - Added the required column `effectiveDate` to the `MDAProduct` table without a default value. This is not possible if the table is not empty.
  - Added the required column `expiryDate` to the `MDAProduct` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `MDAProduct` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_mdaProductId_fkey";

-- DropForeignKey
ALTER TABLE "_MDAProductToSupplier" DROP CONSTRAINT "_MDAProductToSupplier_A_fkey";

-- DropForeignKey
ALTER TABLE "_MDAProductToSupplier" DROP CONSTRAINT "_MDAProductToSupplier_B_fkey";

-- AlterTable
ALTER TABLE "MDAProduct" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "effectiveDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "expiryDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_mdaProductId_fkey" FOREIGN KEY ("mdaProductId") REFERENCES "MDAProduct"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MDAProductToSupplier" ADD CONSTRAINT "_MDAProductToSupplier_A_fkey" FOREIGN KEY ("A") REFERENCES "MDAProduct"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MDAProductToSupplier" ADD CONSTRAINT "_MDAProductToSupplier_B_fkey" FOREIGN KEY ("B") REFERENCES "Supplier"("id") ON DELETE CASCADE ON UPDATE CASCADE;
