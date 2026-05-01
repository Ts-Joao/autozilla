import 'dotenv/config';
import { PrismaClient } from "@prisma/client";
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import slugify from "slugify"

const pool = new Pool({ connectionString: process.env.DATABASE_URL })
const adapter = new PrismaPg(pool as any)
const prisma = new PrismaClient({ adapter })

function toSlugify(name: string): string {
    return slugify(name, { lower: true, trim: true })
}

async function main() {
    // Create Vehicle Categories
    const vehicleCategories = [
        'HATCHBACK', 'SEDAN', 'COUPE', 'SUV', 'PICKUP', 'VAN',
        'CONVERTIBLE', 'COMERCIAL', 'ELÉTRICO', 'HÍBRIDO'
    ]

    for (const name of vehicleCategories) {
        const slug = toSlugify(name)

        await prisma.vehicleCategory.upsert({
            where: { slug },
            update: {},
            create: { name, slug }
        })
    }

    // Create Models and Brands
    const brandsWithModels = {
        Honda: ['City', 'Civic', 'WR-V'],
        Chevrolet: ['Tracker', 'Onix', 'Cruze'],
        Fiat: ['Palio', 'Uno', 'Argo'],
        Volkswagen: ['Gol', 'Polo', 'Virtus', 'Saveiro'],
        Hyundai: ['HB20', 'Creta', 'Tucson'],
        Toyota: ['Corolla', 'Hilux', 'Camry'],
    }

    for (const [brandName, models] of Object.entries(brandsWithModels)) {
        const brand = await prisma.vehicleBrand.upsert({
            where: { slug: toSlugify(brandName) },
            update: {},
            create: { name: brandName, slug: toSlugify(brandName) }
        })

        for (const modelName of models) {
            await prisma.vehicleModel.upsert({
                where: { slug: toSlugify(modelName) },
                update: {},
                create: { name: modelName, slug: toSlugify(modelName), brandId: brand.id }
            })
        }
    }

    // Create Features
    const features = [
        'Airbag',
        'Suspensão a ar',
        'Tração 4x4',
        'Teto solar',
        'Bancos de couro',
        'Câmera de ré',
        'Sensores de estacionamento',
        'Freios ABS',
        'Controle de estabilidade',
        'Assistente de partida em rampa',
        'Central multimídia',
        'GPS',
        'Bluetooth',
        'Direção elétrica',
        'Ar-condicionado'
    ]

    for (const name of features) {
        await prisma.feature.upsert({
            where: { name },
            update: {},
            create: { name }
        })
    }
}

main()
    .catch((e) => { console.error(e); process.exit(1) })
    .finally(async () => { await prisma.$disconnect() })