-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('root', 'admin', 'moderator', 'user');

-- CreateEnum
CREATE TYPE "AuthMethod" AS ENUM ('credentials', 'uak');

-- CreateEnum
CREATE TYPE "VisibleStatus" AS ENUM ('draft', 'published', 'archived');

-- CreateEnum
CREATE TYPE "RatingSystem" AS ENUM ('everyone', 'teen', 'mature', 'adult');

-- CreateEnum
CREATE TYPE "FileType" AS ENUM ('note', 'image', 'video', 'archive', 'audio');

-- CreateTable
CREATE TABLE "files" (
    "id" SERIAL NOT NULL,
    "folder_id" INTEGER,
    "url" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "original_name" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "extension" TEXT NOT NULL,
    "type" "FileType" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "files_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "folders" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(64) NOT NULL,
    "description" VARCHAR(128),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "folders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "avatar" TEXT,
    "password" TEXT NOT NULL,
    "UAK" TEXT NOT NULL,
    "nickname" VARCHAR(64),
    "blocking" BOOLEAN NOT NULL DEFAULT false,
    "role" "UserRole" NOT NULL DEFAULT 'user',
    "method" "AuthMethod" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_UAK_key" ON "users"("UAK");

-- AddForeignKey
ALTER TABLE "files" ADD CONSTRAINT "files_folder_id_fkey" FOREIGN KEY ("folder_id") REFERENCES "folders"("id") ON DELETE SET NULL ON UPDATE CASCADE;
