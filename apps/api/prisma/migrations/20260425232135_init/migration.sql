-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('BUYER', 'ADMIN', 'SELLER');

-- CreateEnum
CREATE TYPE "FuelType" AS ENUM ('GASOLINE', 'ETHANOL', 'DIESEL', 'ELECTRIC', 'HYBRID', 'FLEX');

-- CreateEnum
CREATE TYPE "VehicleCondition" AS ENUM ('NEW', 'USED');

-- CreateEnum
CREATE TYPE "VehicleColor" AS ENUM ('WHITE', 'BLACK', 'SILVER', 'GRAY', 'RED', 'BLUE', 'YELLOW', 'GREEN', 'ORANGE', 'PURPLE', 'BROWN', 'BEIGE', 'GOLD', 'BRONZE');

-- CreateEnum
CREATE TYPE "Transmission" AS ENUM ('MANUAL', 'AUTOMATIC', 'CVT', 'SEMI_AUTOMATIC');

-- CreateEnum
CREATE TYPE "VehicleStatus" AS ENUM ('AVAILABLE', 'SOLD', 'RESERVED', 'INACTIVE');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phone" TEXT,
    "role" "UserRole" NOT NULL DEFAULT 'BUYER',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vehicles_categories" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,

    CONSTRAINT "vehicles_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vehicles_brands" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,

    CONSTRAINT "vehicles_brands_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vehicles_models" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "brand_id" INTEGER NOT NULL,

    CONSTRAINT "vehicles_models_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vehicles" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,
    "version" TEXT NOT NULL,
    "mileage" INTEGER NOT NULL,
    "description" TEXT,
    "sponsored" BOOLEAN NOT NULL DEFAULT false,
    "city" TEXT NOT NULL,
    "state" CHAR(2) NOT NULL,
    "plate_final" TEXT NOT NULL,
    "fuel_type" "FuelType" NOT NULL,
    "condition" "VehicleCondition" NOT NULL,
    "color" "VehicleColor" NOT NULL,
    "transmission" "Transmission" NOT NULL,
    "status" "VehicleStatus" NOT NULL,
    "inspected" BOOLEAN NOT NULL DEFAULT false,
    "armored" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "category_id" INTEGER NOT NULL,
    "model_id" INTEGER NOT NULL,
    "owner_id" TEXT NOT NULL,

    CONSTRAINT "vehicles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "photos" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "isCover" BOOLEAN NOT NULL DEFAULT false,
    "order" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" TEXT NOT NULL,
    "vehicle_id" TEXT NOT NULL,

    CONSTRAINT "photos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vehicles_features" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "vehicle_id" TEXT NOT NULL,

    CONSTRAINT "vehicles_features_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "view_histories" (
    "id" SERIAL NOT NULL,
    "viewed_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" TEXT NOT NULL,
    "vehicle_id" TEXT NOT NULL,
    "category_id" INTEGER NOT NULL,

    CONSTRAINT "view_histories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "favorites" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" TEXT NOT NULL,
    "vehicle_id" TEXT NOT NULL,

    CONSTRAINT "favorites_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "vehicles_categories_name_key" ON "vehicles_categories"("name");

-- CreateIndex
CREATE UNIQUE INDEX "vehicles_categories_slug_key" ON "vehicles_categories"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "vehicles_brands_name_key" ON "vehicles_brands"("name");

-- CreateIndex
CREATE UNIQUE INDEX "vehicles_brands_slug_key" ON "vehicles_brands"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "vehicles_models_slug_key" ON "vehicles_models"("slug");

-- CreateIndex
CREATE INDEX "vehicles_models_brand_id_idx" ON "vehicles_models"("brand_id");

-- CreateIndex
CREATE UNIQUE INDEX "vehicles_slug_key" ON "vehicles"("slug");

-- CreateIndex
CREATE INDEX "vehicles_category_id_idx" ON "vehicles"("category_id");

-- CreateIndex
CREATE INDEX "vehicles_model_id_idx" ON "vehicles"("model_id");

-- CreateIndex
CREATE INDEX "vehicles_owner_id_idx" ON "vehicles"("owner_id");

-- CreateIndex
CREATE INDEX "vehicles_status_idx" ON "vehicles"("status");

-- CreateIndex
CREATE INDEX "vehicles_price_idx" ON "vehicles"("price");

-- CreateIndex
CREATE INDEX "vehicles_year_idx" ON "vehicles"("year");

-- CreateIndex
CREATE INDEX "vehicles_mileage_idx" ON "vehicles"("mileage");

-- CreateIndex
CREATE INDEX "vehicles_condition_idx" ON "vehicles"("condition");

-- CreateIndex
CREATE INDEX "vehicles_fuel_type_idx" ON "vehicles"("fuel_type");

-- CreateIndex
CREATE INDEX "vehicles_city_state_idx" ON "vehicles"("city", "state");

-- CreateIndex
CREATE INDEX "vehicles_sponsored_created_at_idx" ON "vehicles"("sponsored", "created_at");

-- CreateIndex
CREATE INDEX "vehicles_armored_idx" ON "vehicles"("armored");

-- CreateIndex
CREATE INDEX "vehicles_color_idx" ON "vehicles"("color");

-- CreateIndex
CREATE INDEX "vehicles_transmission_idx" ON "vehicles"("transmission");

-- CreateIndex
CREATE INDEX "vehicles_inspected_idx" ON "vehicles"("inspected");

-- CreateIndex
CREATE UNIQUE INDEX "photos_user_id_key" ON "photos"("user_id");

-- CreateIndex
CREATE INDEX "photos_vehicle_id_idx" ON "photos"("vehicle_id");

-- CreateIndex
CREATE UNIQUE INDEX "vehicles_features_name_key" ON "vehicles_features"("name");

-- CreateIndex
CREATE INDEX "vehicles_features_vehicle_id_idx" ON "vehicles_features"("vehicle_id");

-- CreateIndex
CREATE INDEX "view_histories_user_id_idx" ON "view_histories"("user_id");

-- CreateIndex
CREATE INDEX "view_histories_category_id_idx" ON "view_histories"("category_id");

-- CreateIndex
CREATE INDEX "view_histories_viewed_at_user_id_idx" ON "view_histories"("viewed_at", "user_id");

-- CreateIndex
CREATE INDEX "favorites_user_id_idx" ON "favorites"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "favorites_user_id_vehicle_id_key" ON "favorites"("user_id", "vehicle_id");

-- AddForeignKey
ALTER TABLE "vehicles_models" ADD CONSTRAINT "vehicles_models_brand_id_fkey" FOREIGN KEY ("brand_id") REFERENCES "vehicles_brands"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vehicles" ADD CONSTRAINT "vehicles_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "vehicles_categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vehicles" ADD CONSTRAINT "vehicles_model_id_fkey" FOREIGN KEY ("model_id") REFERENCES "vehicles_models"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vehicles" ADD CONSTRAINT "vehicles_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "photos" ADD CONSTRAINT "photos_vehicle_id_fkey" FOREIGN KEY ("vehicle_id") REFERENCES "vehicles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "photos" ADD CONSTRAINT "photos_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vehicles_features" ADD CONSTRAINT "vehicles_features_vehicle_id_fkey" FOREIGN KEY ("vehicle_id") REFERENCES "vehicles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "view_histories" ADD CONSTRAINT "view_histories_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "view_histories" ADD CONSTRAINT "view_histories_vehicle_id_fkey" FOREIGN KEY ("vehicle_id") REFERENCES "vehicles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "view_histories" ADD CONSTRAINT "view_histories_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "vehicles_categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favorites" ADD CONSTRAINT "favorites_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favorites" ADD CONSTRAINT "favorites_vehicle_id_fkey" FOREIGN KEY ("vehicle_id") REFERENCES "vehicles"("id") ON DELETE CASCADE ON UPDATE CASCADE;
