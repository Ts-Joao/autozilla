/*
  Warnings:

  - The primary key for the `vehicles_features` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `vehicles_features` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `vehicles_features` table. All the data in the column will be lost.
  - Added the required column `feature_id` to the `vehicles_features` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "vehicles_features_name_key";

-- AlterTable
ALTER TABLE "vehicles" ADD COLUMN     "deleted_at" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "vehicles_features" DROP CONSTRAINT "vehicles_features_pkey",
DROP COLUMN "id",
DROP COLUMN "name",
ADD COLUMN     "feature_id" INTEGER NOT NULL,
ADD CONSTRAINT "vehicles_features_pkey" PRIMARY KEY ("vehicle_id", "feature_id");

-- CreateTable
CREATE TABLE "features" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "features_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "vehicles_deleted_at_idx" ON "vehicles"("deleted_at");

-- CreateIndex
CREATE INDEX "vehicles_features_feature_id_idx" ON "vehicles_features"("feature_id");

-- AddForeignKey
ALTER TABLE "vehicles_features" ADD CONSTRAINT "vehicles_features_feature_id_fkey" FOREIGN KEY ("feature_id") REFERENCES "features"("id") ON DELETE CASCADE ON UPDATE CASCADE;
