/*
  Warnings:

  - You are about to drop the column `mdaProductId` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the `MDAProduct` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_MDAProductToSupplier` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `brandName` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_mdaProductId_fkey";

-- DropForeignKey
ALTER TABLE "_MDAProductToSupplier" DROP CONSTRAINT "_MDAProductToSupplier_A_fkey";

-- DropForeignKey
ALTER TABLE "_MDAProductToSupplier" DROP CONSTRAINT "_MDAProductToSupplier_B_fkey";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "mdaProductId",
ADD COLUMN     "brandName" TEXT NOT NULL,
ADD COLUMN     "mdaEffectiveDate" TIMESTAMP(3),
ADD COLUMN     "mdaExpiryDate" TIMESTAMP(3),
ADD COLUMN     "mdaPageNo" INTEGER,
ADD COLUMN     "mdaRegistrationNo" TEXT;

-- DropTable
DROP TABLE "MDAProduct";

-- DropTable
DROP TABLE "_MDAProductToSupplier";
