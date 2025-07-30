/*
  Warnings:

  - Added the required column `pageNo` to the `MDAProduct` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "MDAProduct" ADD COLUMN     "pageNo" INTEGER NOT NULL;
