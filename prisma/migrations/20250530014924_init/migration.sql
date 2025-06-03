/*
  Warnings:

  - A unique constraint covering the columns `[organizationName]` on the table `CustomerOrganization` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[organizationSSMNo]` on the table `CustomerOrganization` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "CustomerOrganization" ADD COLUMN     "organizationSSMNo" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "CustomerOrganization_organizationName_key" ON "CustomerOrganization"("organizationName");

-- CreateIndex
CREATE UNIQUE INDEX "CustomerOrganization_organizationSSMNo_key" ON "CustomerOrganization"("organizationSSMNo");
