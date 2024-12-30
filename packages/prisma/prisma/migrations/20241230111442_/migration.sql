/*
  Warnings:

  - Added the required column `createdAt` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lineNumber` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "lineNumber" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Sheet" ALTER COLUMN "content" SET DEFAULT '',
ALTER COLUMN "lastUpdatedAt" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "lastUpdatedId" DROP NOT NULL;
