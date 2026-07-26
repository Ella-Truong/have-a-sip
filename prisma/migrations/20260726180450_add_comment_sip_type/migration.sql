/*
  Warnings:

  - A unique constraint covering the columns `[articleId,cupName]` on the table `Comment` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `sipType` to the `Comment` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "SipType" AS ENUM ('ESPRESSO', 'AMERICANO', 'LATTE', 'CAPPUCCINO', 'MATCHA', 'HOT_CHOCOLATE', 'LEMONADE', 'JASMINE_TEA', 'CROISSANT', 'BAGEL', 'MUFFIN', 'DONUT');

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_articleId_fkey";

-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "sipType" "SipType" NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Comment_articleId_cupName_key" ON "Comment"("articleId", "cupName");

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "Article"("id") ON DELETE CASCADE ON UPDATE CASCADE;
