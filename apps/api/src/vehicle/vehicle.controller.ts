import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { GetUser } from 'src/common/decorator/get-user.decorator';
import { JwtGuard } from 'src/common/guards/jwt-guard.guard';
import { CreateVehicleDto } from './dto/create.vehicle.dto';
import { VehicleService } from './vehicle.service';
import * as client from '@prisma/client';
import { UpdateVehicleDto } from './dto/update.vehicle.dto';

@Controller('vehicle')
export class VehicleController {
    constructor(private readonly vehicleService: VehicleService) { }

    @Post()
    @UseGuards(JwtGuard)
    create(@Body() dto: CreateVehicleDto, @GetUser() user: client.User) {
        return this.vehicleService.create(dto, user.id)
    }

    @Get()
    getAll() {
        return this.vehicleService.findAll()
    }

    @Get(':id')
    getById(@Param('id') id: string) {
        return this.vehicleService.findOne(id)
    }

    @Patch(':id')
    @UseGuards(JwtGuard)
    update(@Param('id') id: string, @Body() dto: UpdateVehicleDto, @GetUser() user: client.User) {
        return this.vehicleService.update(id, dto, user.id)
    }

    @Delete(':id')
    @UseGuards(JwtGuard)
    delete(@Param('id') id: string, @GetUser() user: client.User) {
        return this.vehicleService.remove(id, user.id)
    }
}
