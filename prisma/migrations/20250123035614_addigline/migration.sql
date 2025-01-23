-- AlterTable
ALTER TABLE "Kajasep" ADD COLUMN     "instagram" STRING;
ALTER TABLE "Kajasep" ADD COLUMN     "line" STRING;
ALTER TABLE "Kajasep" ALTER COLUMN "imageUrl" DROP NOT NULL;
