/*
  Warnings:

  - You are about to drop the `CustomerOrganizationDepartment` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CustomerOrganizationDepartment" DROP CONSTRAINT "CustomerOrganizationDepartment_customerOrganizationId_fkey";

-- AlterTable
ALTER TABLE "CustomerOrganization" ADD COLUMN     "department" TEXT[];

-- DropTable
DROP TABLE "CustomerOrganizationDepartment";
