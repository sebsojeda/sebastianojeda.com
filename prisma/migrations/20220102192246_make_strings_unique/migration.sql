/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Tokens` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `PostViews` MODIFY `slug` VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE `Tokens` MODIFY `value` VARCHAR(255) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Tokens_name_key` ON `Tokens`(`name`);
