/*
  Warnings:

  - You are about to drop the column `state` on the `CustomerOrganization` table. All the data in the column will be lost.
  - Added the required column `county` to the `CustomerOrganization` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CustomerOrganization" DROP COLUMN "state",
ADD COLUMN     "county" TEXT NOT NULL;
