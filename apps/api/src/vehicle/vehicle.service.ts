import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateVehicleDto } from './dto/create.vehicle.dto';

@Injectable()
export class VehicleService {
    constructor(private readonly databaseService: DatabaseService) {}

    // async create(createVehicleDto: CreateVehicleDto) {
    //     const vehicle = await this.databaseService.vehicle.create({
    //         data: createVehicleDto
    //     })
    // } 
}
