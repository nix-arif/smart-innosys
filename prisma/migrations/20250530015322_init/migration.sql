/*
  Warnings:

  - A unique constraint covering the columns `[organizationTINNo]` on the table `CustomerOrganization` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "CustomerOrganization" ADD COLUMN     "organizationTINNo" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "CustomerOrganization_organizationTINNo_key" ON "CustomerOrganization"("organizationTINNo");
