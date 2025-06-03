/*
  Warnings:

  - Added the required column `agent` to the `Quotation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quoteType` to the `Quotation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Quotation` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "QuoteType" AS ENUM ('ORIGINAL', 'DUMMY');

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "sku" TEXT;

-- AlterTable
ALTER TABLE "Quotation" ADD COLUMN     "agent" TEXT NOT NULL,
ADD COLUMN     "quoteType" "QuoteType" NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "QuotationItem" ADD COLUMN     "sku" TEXT;
