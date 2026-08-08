/*
  Warnings:

  - Added the required column `company` to the `Feedback` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `sentiment` on the `Feedback` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Made the column `userId` on table `Feedback` required. This step will fail if there are existing NULL values in that column.
  - Made the column `company` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Feedback" DROP CONSTRAINT "Feedback_userId_fkey";

-- AlterTable
ALTER TABLE "Feedback" ADD COLUMN     "company" TEXT NOT NULL,
DROP COLUMN "sentiment",
ADD COLUMN     "sentiment" TEXT NOT NULL,
ALTER COLUMN "userId" SET NOT NULL,
ALTER COLUMN "theme" DROP NOT NULL,
ALTER COLUMN "theme" DROP DEFAULT;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "company" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Feedback" ADD CONSTRAINT "Feedback_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
