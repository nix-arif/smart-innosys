/*
  Warnings:

  - You are about to drop the column `county` on the `CustomerOrganization` table. All the data in the column will be lost.
  - You are about to drop the column `poscode` on the `Store` table. All the data in the column will be lost.
  - You are about to drop the column `state` on the `Store` table. All the data in the column will be lost.
  - You are about to drop the column `poscode` on the `Supplier` table. All the data in the column will be lost.
  - You are about to drop the column `poscode` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `state` on the `User` table. All the data in the column will be lost.
  - Added the required column `province` to the `CustomerOrganization` table without a default value. This is not possible if the table is not empty.
  - Added the required column `country` to the `Store` table without a default value. This is not possible if the table is not empty.
  - Added the required column `postcode` to the `Store` table without a default value. This is not possible if the table is not empty.
  - Added the required column `province` to the `Store` table without a default value. This is not possible if the table is not empty.
  - Added the required column `postcode` to the `Supplier` table without a default value. This is not possible if the table is not empty.
  - Added the required column `province` to the `Supplier` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CustomerOrganization" DROP COLUMN "county",
ADD COLUMN     "province" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Store" DROP COLUMN "poscode",
DROP COLUMN "state",
ADD COLUMN     "country" TEXT NOT NULL,
ADD COLUMN     "postcode" TEXT NOT NULL,
ADD COLUMN     "province" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Supplier" DROP COLUMN "poscode",
ADD COLUMN     "postcode" TEXT NOT NULL,
ADD COLUMN     "province" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "poscode",
DROP COLUMN "state",
ADD COLUMN     "country" TEXT,
ADD COLUMN     "postcode" TEXT,
ADD COLUMN     "province" TEXT;
