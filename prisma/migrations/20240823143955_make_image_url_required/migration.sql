/*
  Warnings:

  - Made the column `image_url` on table `UploadCloud` required. This step will fail if there are existing NULL values in that column.
  - Made the column `image_url` on table `UploadLocal` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "UploadCloud" ALTER COLUMN "image_url" SET NOT NULL;

-- AlterTable
ALTER TABLE "UploadLocal" ALTER COLUMN "image_url" SET NOT NULL;
