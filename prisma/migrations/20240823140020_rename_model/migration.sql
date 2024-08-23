/*
  Warnings:

  - You are about to drop the `CloudStorage` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `LocalStorage` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "CloudStorage";

-- DropTable
DROP TABLE "LocalStorage";

-- CreateTable
CREATE TABLE "UploadLocal" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image_url" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UploadLocal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UploadCloud" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image_url" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UploadCloud_pkey" PRIMARY KEY ("id")
);
