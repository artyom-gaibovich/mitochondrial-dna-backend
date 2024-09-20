/*
  Warnings:

  - You are about to drop the column `rflp` on the `buff` table. All the data in the column will be lost.
  - You are about to drop the column `snp` on the `buff` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "buff" DROP COLUMN "rflp",
DROP COLUMN "snp";
