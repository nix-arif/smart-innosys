/*
  Warnings:

  - Added the required column `mdaProductId` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN "mdaProductId" TEXT;


-- CreateTable
CREATE TABLE "MDAProduct" (
    "id" TEXT NOT NULL,
    "registrationNo" TEXT NOT NULL,

    CONSTRAINT "MDAProduct_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_MDAProductToSupplier" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_MDAProductToSupplier_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_MDAProductToSupplier_B_index" ON "_MDAProductToSupplier"("B");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_mdaProductId_fkey" FOREIGN KEY ("mdaProductId") REFERENCES "MDAProduct"("id");

-- AddForeignKey
ALTER TABLE "_MDAProductToSupplier" ADD CONSTRAINT "_MDAProductToSupplier_A_fkey" FOREIGN KEY ("A") REFERENCES "MDAProduct"("id");

-- AddForeignKey
ALTER TABLE "_MDAProductToSupplier" ADD CONSTRAINT "_MDAProductToSupplier_B_fkey" FOREIGN KEY ("B") REFERENCES "Supplier"("id");
