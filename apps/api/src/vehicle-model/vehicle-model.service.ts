import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import slugify from 'slugify';
import { CreateVehicleModelDto } from './dto/create-vehicle-model.dto';
import { UpdateVehicleModelDto } from './dto/update-vehicle-model.dto';

@Injectable()
export class VehicleModelService {
    constructor(private readonly databaseService: DatabaseService) {}

    private async generateSlug(name: string): Promise<string> {
        const base = slugify(`${name}`, { lower: true, strict: true, });

        const existing = await this.databaseService.vehicleModel.findUnique({
            where: { slug: base },
            select: { slug: true },
        });

        if (!existing) {
            return base;
        }

        const suffix = Math.random().toString(36).substring(2, 10);

        return `${base}-${suffix}`;
    }

    async create(dto: CreateVehicleModelDto) {
        return this.databaseService.vehicleModel.create({
            data: {
                ...dto,
                slug: await this.generateSlug(dto.name)
            }
        })
    }

    async findAll() {
        return await this.databaseService.vehicleModel.findMany()
    }

    async findOne(id: number) {
        const model = await this.databaseService.vehicleModel.findUnique({
            where: { id }
        })

        if (!model) {
            throw new NotFoundException('Vehicle Model not found!')
        }

        return model
    }

    async update(id: number, dto: UpdateVehicleModelDto) {
        await this.findOne(id)

        const updateInfo = await this.databaseService.vehicleModel.update({
            where: { id },
            data: {
                ...dto,
                ...(dto.name && { slug: await this.generateSlug(dto.name) })
            }
        })

        return updateInfo
    }

    async remove(id: number) {
        await this.findOne(id)

        const deleteInfo = await this.databaseService.vehicleModel.delete({
            where: { id }
        })

        return { message: 'Vehicle Model deleted successfully!', deleteInfo }
    }
}
