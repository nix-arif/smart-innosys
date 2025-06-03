/*
  Warnings:

  - You are about to drop the column `poscode` on the `CustomerOrganization` table. All the data in the column will be lost.
  - Added the required column `postcode` to the `CustomerOrganization` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CustomerOrganization" DROP COLUMN "poscode",
ADD COLUMN     "postcode" TEXT NOT NULL;
