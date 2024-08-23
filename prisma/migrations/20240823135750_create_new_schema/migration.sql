/*
  Warnings:

  - You are about to drop the `Gallery` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Gallery";

-- CreateTable
CREATE TABLE "LocalStorage" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image_url" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LocalStorage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CloudStorage" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image_url" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CloudStorage_pkey" PRIMARY KEY ("id")
);
