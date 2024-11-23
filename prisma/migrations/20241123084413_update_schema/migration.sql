/*
  Warnings:

  - Changed the type of `dueDate` on the `AssignmentForStudent` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "StudentAssignment" DROP CONSTRAINT "StudentAssignment_assignmentId_fkey";

-- DropForeignKey
ALTER TABLE "StudentAssignment" DROP CONSTRAINT "StudentAssignment_userId_fkey";

-- AlterTable
ALTER TABLE "AssignmentForStudent" ADD COLUMN     "linkAttach" STRING;
ALTER TABLE "AssignmentForStudent" DROP COLUMN "dueDate";
ALTER TABLE "AssignmentForStudent" ADD COLUMN     "dueDate" TIMESTAMP(3) NOT NULL;

-- DropEnum
DROP TYPE "crdb_internal_region";

-- CreateTable
CREATE TABLE "Widget" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),

    CONSTRAINT "Widget_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "StudentAssignment_userId_idx" ON "StudentAssignment"("userId");

-- CreateIndex
CREATE INDEX "StudentAssignment_assignmentId_idx" ON "StudentAssignment"("assignmentId");
