/*
  Warnings:

  - A unique constraint covering the columns `[applicantId]` on the table `KajasepApplication` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "KajasepApplication_applicantId_key" ON "KajasepApplication"("applicantId");
