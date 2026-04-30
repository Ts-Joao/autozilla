/*
  Warnings:

  - You are about to drop the column `user_id` on the `photos` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "photos" DROP CONSTRAINT "photos_user_id_fkey";

-- DropIndex
DROP INDEX "photos_user_id_key";

-- AlterTable
ALTER TABLE "photos" DROP COLUMN "user_id";

-- CreateTable
CREATE TABLE "avatars" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "avatars_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "avatars_user_id_key" ON "avatars"("user_id");

-- CreateIndex
CREATE INDEX "avatars_user_id_idx" ON "avatars"("user_id");

-- AddForeignKey
ALTER TABLE "avatars" ADD CONSTRAINT "avatars_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
