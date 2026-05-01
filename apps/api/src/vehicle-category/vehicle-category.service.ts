import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateVehicleCategoryDto } from './dto/create-vehicle-category.dto';
import slugify from 'slugify';
import { UpdateVehicleCategoryDto } from './dto/update-vehicle-category.dto';

@Injectable()
export class VehicleCategoryService {
    constructor(private readonly databaseService: DatabaseService) {}

    private async generateSlug(name: string): Promise<string> {
        const base = slugify(`${name}`, { lower: true, strict: true, });

        const existing = await this.databaseService.vehicleCategory.findUnique({
            where: { slug: base },
            select: { slug: true },
        });

        if (!existing) {
            return base;
        }

        const suffix = Math.random().toString(36).substring(2, 10);

        return `${base}-${suffix}`;
    }
    
    async create(dto: CreateVehicleCategoryDto) {
        return await this.databaseService.vehicleCategory.create({
            data: {
                ...dto,
                slug: await this.generateSlug(dto.name)
            }
        })
    }

    async findAll() {
        return await this.databaseService.vehicleCategory.findMany()
    }

    async findOne(id: number) {
        const vehicleCategory = await this.databaseService.vehicleCategory.findUnique({
            where: { id }
        })

        if (!vehicleCategory) {
            throw new NotFoundException('Vehicle Category not found!')
        }

        return vehicleCategory;
    }

    async update(id:number, dto: UpdateVehicleCategoryDto) {
        await this.findOne(id)
        
        const updateInfo = await this.databaseService.vehicleCategory.update({
            where: { id },
            data: {
                ...dto,
                slug: await this.generateSlug(dto.name)
            }
        })

        return updateInfo;
    }

    async remove(id: number) {
        await this.findOne(id)

        const deleteInfo = await this.databaseService.vehicleCategory.delete({
            where: { id }
        })

        return { message: 'Vehicle Category deleted successfully!', deleteInfo };
    }
}
