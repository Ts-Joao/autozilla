import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { VehicleModelService } from './vehicle-model.service';
import { JwtGuard } from 'src/common/guards/jwt-guard.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorator/roles.decorator';
import { CreateVehicleModelDto } from './dto/create-vehicle-model.dto';
import { UpdateVehicleModelDto } from './dto/update-vehicle-model.dto';

@Controller('vehicle-model')
export class VehicleModelController {
    constructor(private readonly modelService: VehicleModelService) {}

    @Post()
    @Roles('ADMIN')
    @UseGuards(JwtGuard, RolesGuard)
    createModel(@Body() dto: CreateVehicleModelDto) {
        return this.modelService.create(dto)
    }

    @Get()
    findAll() {
        return this.modelService.findAll()
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.modelService.findOne(id)
    }

    @Patch(':id')
    @Roles('ADMIN')
    @UseGuards(JwtGuard, RolesGuard)
    update(@Param('id') id: number, @Body() dto: UpdateVehicleModelDto) {
        return this.modelService.update(id, dto)
    }

    @Delete(':id')
    @Roles('ADMIN')
    @UseGuards(JwtGuard, RolesGuard)
    remove(@Param('id') id: number) {
        return this.modelService.remove(id)
    }
}
