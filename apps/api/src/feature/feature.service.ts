import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateFeatureDto } from './dto/create-feature.dto';
import { UpdateFeatureDto } from './dto/update-feature.dto';

@Injectable()
export class FeatureService {
    constructor(private readonly databaseService: DatabaseService) { }

    async create(dto: CreateFeatureDto) {
        return this.databaseService.feature.create({
            data: dto
        })
    }

    async findAll() {
        return await this.databaseService.feature.findMany()
    }

    async findOne(id: number) {
        const feature = await this.databaseService.feature.findUnique({
            where: { id }
        })

        if (!feature) {
            throw new NotFoundException('Vehicle Feature not found!')
        }

        return feature
    }

    async update(id: number, dto: UpdateFeatureDto) {
        await this.findOne(id)

        const updateInfo = await this.databaseService.feature.update({
            where: { id },
            data: dto
        })

        return updateInfo
    }

    async remove(id: number) {
        await this.findOne(id)

        const deleteInfo = await this.databaseService.feature.delete({
            where: { id }
        })

        return { message: 'Vehicle Feature deleted successfully!', deleteInfo }
    }
}
