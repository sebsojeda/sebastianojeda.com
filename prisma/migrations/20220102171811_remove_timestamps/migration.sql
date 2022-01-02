/*
  Warnings:

  - You are about to drop the column `createdAt` on the `PostViews` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `PostViews` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Tokens` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Tokens` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `PostViews` DROP COLUMN `createdAt`,
    DROP COLUMN `updatedAt`;

-- AlterTable
ALTER TABLE `Tokens` DROP COLUMN `createdAt`,
    DROP COLUMN `updatedAt`;
