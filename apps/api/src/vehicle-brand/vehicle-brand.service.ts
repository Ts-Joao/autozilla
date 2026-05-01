import { Injectable, NotFoundException } from '@nestjs/common';
import slugify from 'slugify';
import { DatabaseService } from 'src/database/database.service';
import { CreateVehicleBrandDto } from './dto/create-vehicle-brand.dto';
import { UpdateVehicleBrandDto } from './dto/update-vehicle-brand.dto';

@Injectable()
export class VehicleBrandService {
    constructor(private readonly databaseService: DatabaseService) {}

    private async generateSlug(name: string): Promise<string> {
        const base = slugify(`${name}`, { lower: true, strict: true, });

        const existing = await this.databaseService.vehicleBrand.findUnique({
            where: { slug: base },
            select: { slug: true },
        });

        if (!existing) {
            return base;
        }

        const suffix = Math.random().toString(36).substring(2, 10);

        return `${base}-${suffix}`;
    }

    async create(dto: CreateVehicleBrandDto) {
        return await this.databaseService.vehicleBrand.create({
            data: {
                ...dto,
                slug: await this.generateSlug(dto.name)
            }
        })
    }

    async findAll() {
        return await this.databaseService.vehicleBrand.findMany()
    }

    async findOne(id: number) {
        const brand = await this.databaseService.vehicleBrand.findUnique({
            where: { id }
        })

        if (!brand) {
            throw new NotFoundException('Vehicle Brand Not Found!')
        }

        return brand
    } 

    async update(id: number, dto: UpdateVehicleBrandDto) {
        await this.findOne(id)

        return await this.databaseService.vehicleBrand.update({
            where: { id },
            data: {
                ...dto,
                slug: await this.generateSlug(dto.name)
            }
        })
    }

    async remove(id: number) {
        await this.findOne(id)

        return await this.databaseService.vehicleBrand.delete({
            where: { id }
        })
    }
}
