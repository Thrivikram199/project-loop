-- DropForeignKey
ALTER TABLE "Feedback" DROP CONSTRAINT "Feedback_userId_fkey";

-- AlterTable
ALTER TABLE "Feedback" ADD COLUMN     "theme" TEXT NOT NULL DEFAULT 'General',
ALTER COLUMN "userId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "company" TEXT DEFAULT 'LOOP',
ADD COLUMN     "department" TEXT DEFAULT '',
ADD COLUMN     "phone" TEXT DEFAULT '';

-- AddForeignKey
ALTER TABLE "Feedback" ADD CONSTRAINT "Feedback_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
