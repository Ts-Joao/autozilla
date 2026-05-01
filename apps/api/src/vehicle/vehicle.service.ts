import { ForbiddenException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateVehicleDto } from './dto/create.vehicle.dto';
import { UpdateVehicleDto } from './dto/update.vehicle.dto';
import slugify from 'slugify';

@Injectable()
export class VehicleService {
    constructor(private readonly databaseService: DatabaseService) { }

    private async generateSlug(brand: string, model: string, year: number): Promise<string> {
        const base = slugify(`${brand}-${model}-${year}`, { lower: true, strict: true, });

        const existing = await this.databaseService.vehicle.findUnique({
            where: { slug: base },
            select: { slug: true },
        });

        if (!existing) {
            return base;
        }

        const suffix = Math.random().toString(36).substring(2, 10);

        return `${base}-${suffix}`;
    }

    async create(dto: CreateVehicleDto, ownerId: string) {
        const { features, photos, model, brand, ...vehicleData } = dto;
        const slug = await this.generateSlug(brand, model, dto.year);
        const vehicle = await this.databaseService.vehicle.create({
            data: {
                ...vehicleData,
                slug,
                ownerId,
                photos: {
                    create: photos.map((url, index) => ({ url, isCover: index === 0, order: index })),
                },
                features: features?.length ? {
                    create: features.map((featureId) => ({ featureId }))
                } : undefined,
            },
        })

        return vehicle;
    }

    async findAll() {
        const vehicles = await this.databaseService.vehicle.findMany({
            where: { deletedAt: null },
            include: {
                photos: true,
                features: {
                    include: {
                        feature: true,
                    }
                },
            },
        });

        if (!vehicles) {
            throw new NotFoundException('Vehicles not found');
        }

        return vehicles;
    }

    async findOne(id: string) {
        const vehicle = await this.databaseService.vehicle.findUnique({
            where: { id, deletedAt: null },
            include: {
                photos: true,
                features: {
                    include: {
                        feature: true,
                    }
                },
            },
        });

        if (!vehicle) {
            throw new NotFoundException('Vehicle not found');
        }

        return vehicle;
    }

    async update(id: string, dto: UpdateVehicleDto, ownerId: string) {
        const vehicle = await this.findOne(id)

        if (vehicle.ownerId !== ownerId) {
            throw new ForbiddenException('You are not the owner of this vehicle');
        }

        const { addFeatures, removeFeatures, addPhotos, removePhotos, model, brand, ...vehicleData } = dto;

        const updatedVehicle = await this.databaseService.vehicle.update({
            where: { id },
            data: {
                ...vehicleData,
                photos: {
                    deleteMany: removePhotos?.length ? { id: { in: removePhotos } } : undefined,
                    create: addPhotos?.map((url, index) => ({ url, isCover: index === 0, order: index })) ?? [],
                },
                features: {
                    deleteMany: removeFeatures?.length ? { featureId: { in: removeFeatures } } : undefined,
                    create: addFeatures?.map((featureId) => ({ featureId })) ?? [],
                }
            }
        });

        if (!updatedVehicle) {
            throw new InternalServerErrorException('Error to update vehicle');
        }

        return updatedVehicle;
    }

    async remove(id: string, ownerId: string) {
        const vehicle = await this.findOne(id)

        if (vehicle.ownerId !== ownerId) {
            throw new ForbiddenException('You are not the owner of this vehicle');
        }

        const deletedVehicle = await this.databaseService.vehicle.update({
            where: { id },
            data: {
                deletedAt: new Date(),
            },
        });

        if (!deletedVehicle) {
            throw new InternalServerErrorException('Error to delete vehicle');
        }

        return deletedVehicle;
    }
}   