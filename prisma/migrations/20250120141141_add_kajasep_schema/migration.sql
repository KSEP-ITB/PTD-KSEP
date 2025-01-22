-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN', 'KAJASEP');

-- CreateEnum
CREATE TYPE "ApplicationStatus" AS ENUM ('APPLIED', 'APPROVED', 'REJECTED');

-- CreateTable
CREATE TABLE "User" (
    "id" STRING NOT NULL,
    "username" STRING NOT NULL,
    "role" "Role" NOT NULL,
    "password" STRING NOT NULL,
    "acceptedKajasepId" STRING,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StudentAssignment" (
    "id" STRING NOT NULL,
    "link" STRING NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" STRING NOT NULL,
    "assignmentId" STRING NOT NULL,

    CONSTRAINT "StudentAssignment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AssignmentForStudent" (
    "id" STRING NOT NULL,
    "day" STRING NOT NULL,
    "title" STRING NOT NULL,
    "description" STRING NOT NULL,
    "dueDate" STRING NOT NULL,
    "linkAttach" STRING,

    CONSTRAINT "AssignmentForStudent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Announcement" (
    "id" STRING NOT NULL,
    "title" STRING NOT NULL,
    "content" STRING NOT NULL,

    CONSTRAINT "Announcement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Handbook" (
    "id" STRING NOT NULL,
    "day" STRING NOT NULL,
    "title" STRING NOT NULL,
    "link" STRING NOT NULL,

    CONSTRAINT "Handbook_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Kajasep" (
    "id" STRING NOT NULL,
    "userId" STRING NOT NULL,
    "name" STRING NOT NULL,
    "nickname" STRING NOT NULL,
    "description" STRING NOT NULL,
    "requirement" STRING NOT NULL,
    "quota" INT4 NOT NULL,
    "totalApplicants" INT4 NOT NULL,
    "imageUrl" STRING NOT NULL,

    CONSTRAINT "Kajasep_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "KajasepApplication" (
    "id" STRING NOT NULL,
    "kajasepId" STRING NOT NULL,
    "applicantId" STRING NOT NULL,
    "message" STRING,
    "applyStatus" "ApplicationStatus" NOT NULL DEFAULT 'APPLIED',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "KajasepApplication_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE INDEX "User_acceptedKajasepId_idx" ON "User"("acceptedKajasepId");

-- CreateIndex
CREATE INDEX "StudentAssignment_userId_idx" ON "StudentAssignment"("userId");

-- CreateIndex
CREATE INDEX "StudentAssignment_assignmentId_idx" ON "StudentAssignment"("assignmentId");

-- CreateIndex
CREATE UNIQUE INDEX "Kajasep_userId_key" ON "Kajasep"("userId");

-- CreateIndex
CREATE INDEX "KajasepApplication_kajasepId_idx" ON "KajasepApplication"("kajasepId");

-- CreateIndex
CREATE INDEX "KajasepApplication_applicantId_idx" ON "KajasepApplication"("applicantId");
